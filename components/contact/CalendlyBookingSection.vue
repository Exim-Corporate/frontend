<template>
  <section :id="sectionId || undefined" ref="sectionRoot">
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

      <!-- Calendly JS widget embed -->
      <div v-else class="overflow-hidden min-h-140 rounded-3xl p-5">
        <div class="relative w-full rounded-3xl bg-white">
          <iframe
            v-if="useIframeEmbed"
            :src="iframeBookingLink"
            title="Calendly booking"
            class="w-full min-h-157.5 rounded-3xl border-0"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          />

          <template v-else>
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
          <div ref="calendlyContainer" class="w-full rounded-3xl bg-white min-h-157.5" />
          </template>
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
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
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

const runtimeConfig = useRuntimeConfig();
const { t } = useI18n();
const contactEmail = String(runtimeConfig.public.contactEmail || '');

const sectionRoot = ref<HTMLElement | null>(null);
const calendlyContainer = ref<HTMLElement | null>(null);
const widgetLoading = ref(true);
const shouldLoadWidget = ref(false);
const isWidgetInitialized = ref(false);
const useIframeEmbed = ref(false);
let sectionObserver: IntersectionObserver | null = null;
let fallbackTimer: number | null = null;
// Fallback if IntersectionObserver never fires on iOS Safari (rootMargin bugs)
let ioFallbackTimer: number | null = null;

const { data: calendlyContent, pending } = await useAsyncData<StrapiMainCalendly | null>(
  () => 'main-calendly',
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

const iframeBookingLink = computed(() => {
  if (!bookingLink.value) return '';
  try {
    const url = new URL(bookingLink.value);
    // Recommended by Calendly docs: hide Calendly's own GDPR banner if website
    // already manages consent. Reduces mobile overlay issues.
    url.searchParams.set('hide_gdpr_banner', '1');
    return url.toString();
  }
  catch {
    return bookingLink.value;
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

const showFallbackState = computed(() => {
  return !pending.value && !bookingLink.value;
});

type CalendlyInitConfig = {
  url: string;
  parentElement: HTMLElement;
  resize: boolean;
  prefill?: { email: string };
};

type CalendlyWindow = Window & {
  Calendly?: {
    initInlineWidget?: (config: CalendlyInitConfig) => void;
  };
  __asEximCalendlyScriptPromise?: Promise<void>;
};

const ensureCalendlyScript = async (): Promise<void> => {
  if (import.meta.server) return;

  const w = window as CalendlyWindow;
  if (w.Calendly?.initInlineWidget) return;

  if (!w.__asEximCalendlyScriptPromise) {
    w.__asEximCalendlyScriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-calendly-widget="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Calendly script load failed')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.defer = true;
      script.dataset.calendlyWidget = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Calendly script load failed'));
      document.head.appendChild(script);
    });
  }

  await w.__asEximCalendlyScriptPromise;
};

const initCalendlyWidget = async (): Promise<void> => {
  if (!shouldLoadWidget.value || !bookingLink.value || isWidgetInitialized.value) return;

  await nextTick();
  if (!calendlyContainer.value) return;

  widgetLoading.value = true;

  try {
    await ensureCalendlyScript();
    const calendly = (window as CalendlyWindow).Calendly;
    if (!calendly?.initInlineWidget || !calendlyContainer.value) {
      widgetLoading.value = false;
      // JS embed unavailable (content blocker / browser policy) → switch to iframe mode.
      useIframeEmbed.value = true;
      return;
    }

    const prefill = normalizedPrefillEmail.value
      ? { email: normalizedPrefillEmail.value }
      : undefined;

    calendly.initInlineWidget({
      url: bookingLink.value,
      parentElement: calendlyContainer.value,
      resize: true,
      prefill,
    });

    isWidgetInitialized.value = true;
  }
  catch {
    widgetLoading.value = false;
    // JS blocked/error on some mobile browsers → render iframe so widget still appears.
    useIframeEmbed.value = true;
  }
};

const requestCalendlyLoad = (): void => {
  if (shouldLoadWidget.value) return;
  shouldLoadWidget.value = true;
  void initCalendlyWidget();
};

// Add preconnect only when widget is actually requested
useHead(() => ({
  link: shouldLoadWidget.value && bookingOrigin.value
    ? [
        { rel: 'preconnect', href: bookingOrigin.value, crossorigin: '' },
        { rel: 'dns-prefetch', href: bookingOrigin.value },
        { rel: 'preconnect', href: 'https://assets.calendly.com', crossorigin: '' },
      ]
    : [],
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
  if (!bookingLink.value) {
    widgetLoading.value = false;
    return;
  }

  // Calendly docs recommend iframe mode when scripts are blocked by platform/browser.
  // Real mobile devices/in-app browsers commonly block third-party script execution,
  // so use iframe proactively on phones to ensure the scheduler is visible.
  if (window.matchMedia('(max-width: 768px)').matches) {
    useIframeEmbed.value = true;
    widgetLoading.value = false;
    return;
  }

  window.addEventListener('message', onCalendlyMessage);

  const shouldLoadImmediately =
    props.embedded
    || (props.sectionId && window.location.hash === `#${props.sectionId}`);

  if (shouldLoadImmediately) {
    requestCalendlyLoad();
  }
  else if (sectionRoot.value && 'IntersectionObserver' in window) {
    sectionObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        sectionObserver?.disconnect();
        sectionObserver = null;
        requestCalendlyLoad();
      }
    }, { rootMargin: '400px 0px' });

    sectionObserver.observe(sectionRoot.value);
  }
  else {
    requestCalendlyLoad();
  }

  // Safety fallback: if widget.js never loads, hide loader after 8s
  fallbackTimer = window.setTimeout(() => {
    if (!isWidgetInitialized.value) {
      widgetLoading.value = false;
      useIframeEmbed.value = true;
    }
  }, 8000);

  // Mobile fallback: IntersectionObserver with rootMargin can be unreliable on
  // iOS Safari. If the widget hasn't been triggered after 6s, force-load it.
  // requestCalendlyLoad() is idempotent — safe to call even if IO already fired.
  ioFallbackTimer = window.setTimeout(() => {
    requestCalendlyLoad();
  }, 6000);
});

onUnmounted(() => {
  window.removeEventListener('message', onCalendlyMessage);
  sectionObserver?.disconnect();
  sectionObserver = null;
  if (fallbackTimer !== null) {
    window.clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }
  if (ioFallbackTimer !== null) {
    window.clearTimeout(ioFallbackTimer);
    ioFallbackTimer = null;
  }
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