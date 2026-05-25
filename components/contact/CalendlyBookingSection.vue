<template>
  <section :id="sectionId || undefined">
    <div class="container">
      <div class="mx-auto max-w-5xl text-center">
        <AnimatedElement direction="bottom" :delay="100">
          <BaseTitle tag="h2" variant="main" class-name="text-center">
            {{ calendlyContent?.title || $t('booking.title') }}
          </BaseTitle>
        </AnimatedElement>
      </div>

      <!-- Fallback: no link configured -->
      <div
        v-if="showFallbackState"
        class="flex min-h-180 flex-col items-center justify-center text-center"
      >
        <BaseText class-name="max-w-xl text-text-dark">
          {{ $t('booking.unavailable') }}
        </BaseText>
        <NuxtLink
          v-if="bookingLink"
          :to="bookingLink"
          external
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Calendly booking page in a new tab"
          class="mt-5 inline-flex items-center justify-center rounded-full bg-text-dark px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-text-dark/90"
        >
          {{ $t('heroNew.scheduleButton') }}
        </NuxtLink>
      </div>

      <!-- Calendly JS widget embed -->
      <div v-else class="overflow-hidden rounded-3xl p-5">
        <div class="relative min-h-160 w-full rounded-3xl bg-white">
          <!-- Custom loader shown until calendly fires event_type_viewed -->
          <Transition name="fade">
            <div
              v-if="widgetLoading"
              class="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white"
            >
              <svg
                class="h-10 w-10 animate-spin text-accent"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  class="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
          </Transition>

          <!-- Calendly widget container — populated by initInlineWidget on mount -->
          <div ref="calendlyContainer" class="w-full rounded-3xl bg-white" />
        </div>
      </div>

      <div
        v-if="contactEmail"
        class="mt-6 text-center text-sm text-text-dark/60"
      >
        <span>Prefer email? Reach us directly at </span>
        <NuxtLink
          :to="`mailto:${contactEmail}`"
          external
          :aria-label="`Email ${contactEmail}`"
          class="font-medium text-text-dark underline decoration-black/25 underline-offset-4 transition-colors duration-300 hover:text-text-dark/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-dark -mt-30"
        >
          {{ contactEmail }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useAsyncData, useHead, useRuntimeConfig } from '#imports';
import { useI18n } from 'vue-i18n';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import type { StrapiMainCalendly } from '@/types/strapi';

const props = defineProps({
  sectionId: { type: String, default: '' },
  embedded: { type: Boolean, default: false },
  utmSource: { type: String, default: 'website' },
  prefillEmail: { type: String, default: '' },
});

const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const contactEmail = String(runtimeConfig.public.contactEmail || '');

const calendlyContainer = ref<HTMLElement | null>(null);
const widgetLoading = ref(true);

const { data: calendlyContent, pending } = await useAsyncData<StrapiMainCalendly | null>(
  'main-calendly',
  async () => {
    try {
      return await $fetch<StrapiMainCalendly>('/api/main-calendly');
    }
    catch {
      return null;
    }
  },
  { server: true, lazy: false, default: () => null },
);

const bookingLink = computed(() => {
  const link = calendlyContent.value?.link?.trim();
  if (!link) return '';
  try {
    const url = new URL(link);
    url.searchParams.set('background_color', 'ffffff');
    url.searchParams.set('locale', locale.value);
    return url.toString();
  }
  catch {
    return '';
  }
});

const bookingOrigin = computed(() => {
  if (!bookingLink.value) return '';
  try {
    return new URL(bookingLink.value).origin;
  }
  catch {
    return '';
  }
});

const normalizedPrefillEmail = computed(() => {
  const email = props.prefillEmail.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
});

const showFallbackState = computed(() => !pending.value && !bookingLink.value);

// Preconnect + preload the Calendly widget script
useHead(() => ({
  link: bookingOrigin.value
    ? [
        { rel: 'preconnect', href: bookingOrigin.value, crossorigin: '' },
        { rel: 'dns-prefetch', href: bookingOrigin.value },
        { rel: 'preconnect', href: 'https://assets.calendly.com', crossorigin: '' },
      ]
    : [],
  script: [
    {
      src: 'https://assets.calendly.com/assets/external/widget.js',
      defer: true,
      tagPosition: 'head',
    },
  ],
}));

// Listen for Calendly postMessage to detect when widget finishes loading
function onCalendlyMessage(e: MessageEvent) {
  if (
    e.origin === 'https://calendly.com'
    && typeof e.data?.event === 'string'
    && (
      e.data.event === 'calendly.event_type_viewed'
      || e.data.event === 'calendly.profile_page_viewed'
    )
  ) {
    widgetLoading.value = false;
  }
}

onMounted(() => {
  if (!bookingLink.value) return;

  window.addEventListener('message', onCalendlyMessage);

  // Poll until the Calendly global is available (script is defer-loaded)
  const interval = setInterval(() => {
    const C = (window as any).Calendly;
    if (C?.initInlineWidget && calendlyContainer.value) {
      clearInterval(interval);
      const prefill = normalizedPrefillEmail.value
        ? { email: normalizedPrefillEmail.value }
        : undefined;

      C.initInlineWidget({
        url: bookingLink.value,
        parentElement: calendlyContainer.value,
        resize: true, // auto-adjusts height — fixes mobile clipping
        prefill,
      });
    }
  }, 50);

  // Safety fallback: if widget.js never loads, hide loader after 8s
  setTimeout(() => {
    widgetLoading.value = false;
  }, 8000);
});

onUnmounted(() => {
  window.removeEventListener('message', onCalendlyMessage);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>