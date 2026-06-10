<template>
  <section :id="sectionId || undefined">
    <div class="container">
      <div class="mx-auto max-w-5xl text-center">
        <AnimatedElement direction="bottom" :delay="100">
          <BaseTitle tag="h2" variant="main" class-name="text-center">
            {{ t('booking.title') }}
          </BaseTitle>
        </AnimatedElement>
      </div>

      <!-- Fallback: no link configured -->
      <div
        v-if="showFallbackState"
        class="flex min-h-180 flex-col items-center justify-center text-center"
      >
        <BaseText class-name="max-w-xl text-text-dark">
          {{ t('booking.unavailable') }}
        </BaseText>
        <NuxtLink
          v-if="bookingLink"
          :to="bookingLink"
          external
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Calendly booking page in a new tab"
          class="mt-5 ml-1 inline-flex items-center justify-center rounded-full bg-text-dark px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-text-dark/90"
        >
          {{ t('heroNew.scheduleButton') }}
        </NuxtLink>
      </div>

      <!-- Calendly inline embed with built-in auto-resize -->
      <div v-else class="p-5">
        <div class="relative w-full overflow-visible rounded-3xl bg-transparent">
          <ClientOnly>
            <div
              ref="calendlyContainer"
              class="h-auto min-h-175 min-w-80 w-full rounded-3xl"
            />
          </ClientOnly>
        </div>
      </div>

      <div
        v-if="contactEmail"
        class="text-center -mt-5 text-sm text-text-dark/60"
      >
        <span>{{ t('booking.preferEmail') }} </span>
        <NuxtLink
          :to="`mailto:${contactEmail}`"
          external
          :aria-label="`Email ${contactEmail}`"
          class="font-medium ml-2 text-text-dark underline decoration-black/25 underline-offset-4 transition-colors duration-300 hover:text-text-dark/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-dark"
        >
          {{ contactEmail }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useAsyncData, useRuntimeConfig } from '#imports';
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

const runtimeConfig = useRuntimeConfig();
const { t } = useI18n();
const contactEmail = String(runtimeConfig.public.contactEmail || '');
const calendlyContainer = ref<HTMLElement | null>(null);
const calendlyScriptSrc = 'https://assets.calendly.com/assets/external/widget.js';

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
    return url.toString();
  }
  catch {
    return '';
  }
});

const embedBookingLink = computed(() => {
  if (!bookingLink.value) return '';
  try {
    const url = new URL(bookingLink.value);
    // Calendly docs: inline widget + resize=true enables built-in dynamic height
    // and removes internal widget scrolling when content grows.
    url.searchParams.set('hide_gdpr_banner', '1');
    // Keep analytics source
    if (props.utmSource) {
      url.searchParams.set('utm_source', props.utmSource);
    }
    // Preserve prefill email via query param
    const email = props.prefillEmail.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      url.searchParams.set('email', email);
    }
    return url.toString();
  }
  catch {
    return bookingLink.value;
  }
});

const showFallbackState = computed(() => {
  return !pending.value && !bookingLink.value;
});

const ensureCalendlyScriptLoaded = async () => {
  if (!import.meta.client) return;

  if ((window as any).Calendly?.initInlineWidget) return;

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${calendlyScriptSrc}"]`,
  );

  if (existingScript) {
    if ((window as any).Calendly?.initInlineWidget) return;
    await new Promise<void>((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Calendly script failed to load')), {
        once: true,
      });
    });
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = calendlyScriptSrc;
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly script failed to load'));
    document.head.appendChild(script);
  });
};

const renderCalendly = async () => {
  if (!import.meta.client || !calendlyContainer.value || !embedBookingLink.value) return;

  await ensureCalendlyScriptLoaded();

  const Calendly = (window as any).Calendly;
  if (!Calendly?.initInlineWidget) return;

  calendlyContainer.value.innerHTML = '';
  Calendly.initInlineWidget({
    url: embedBookingLink.value,
    parentElement: calendlyContainer.value,
    resize: true,
  });
};

onMounted(async () => {
  if (showFallbackState.value) return;
  await nextTick();
  await renderCalendly();
});

watch(embedBookingLink, async () => {
  if (!import.meta.client || showFallbackState.value) return;
  await nextTick();
  await renderCalendly();
});
</script>