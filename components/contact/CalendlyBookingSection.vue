<template>
  <section
    :id="sectionId || undefined"  >
    <div class="container">
      <div class="mx-auto max-w-5xl text-center">
        <AnimatedElement direction="bottom" :delay="100">
          <BaseTitle tag="h2" variant="main" class-name="text-center">
            {{ calendlyContent?.title || $t('booking.title') }}
          </BaseTitle>
        </AnimatedElement>
      </div>

      <AnimatedElement direction="bottom" :delay="220">
          <div
            v-if="showFallbackState"
            class="flex min-h-180 flex-col items-center justify-center text-center"
          >
            <BaseText class-name="max-w-xl text-text-dark">
              {{ widgetError ? $t('booking.failedToLoad') : $t('booking.unavailable') }}
            </BaseText>

            <a
              v-if="bookingLink"
              :href="bookingLink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Calendly booking page in a new tab"
              class="mt-5 inline-flex items-center justify-center rounded-full bg-text-dark px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-text-dark/90"
            >
              {{ $t('heroNew.scheduleButton') }}
            </a>
          </div>

          <div
            v-else
            class="overflow-hidden rounded-3xl p-5"
          >
            <div :id="widgetId" class="min-h-180 w-full" />
          </div>

          <div
            v-if="contactEmail"
            class="mt-6 text-center text-sm text-text-dark/60"
          >
            <span>Prefer email? Reach us directly at </span>
            <a
              :href="`mailto:${contactEmail}`"
              :aria-label="`Email ${contactEmail}`"
              class="font-medium text-text-dark underline decoration-black/25 underline-offset-4 transition-colors duration-300 hover:text-text-dark/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-dark"
            >
              {{ contactEmail }}
            </a>
          </div>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useAsyncData, useHead, useRuntimeConfig } from '#imports';
import { useI18n } from 'vue-i18n';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import type { StrapiMainCalendly } from '@/types/strapi';

const props = defineProps({
  sectionId: {
    type: String,
    default: '',
  },
  embedded: {
    type: Boolean,
    default: false,
  },
  utmSource: {
    type: String,
    default: 'website',
  },
});

interface CalendlyWindow extends Window {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: HTMLElement;
      resize?: boolean;
    }) => void;
  };
}

const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const widgetError = ref(false);
const widgetId = `calendly-widget-${props.sectionId || (props.embedded ? 'embedded' : 'main')}`;

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://assets.calendly.com/assets/external/widget.css',
    },
  ],
  script: [
    {
      src: 'https://assets.calendly.com/assets/external/widget.js',
      defer: true,
    },
  ],
});

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
  {
    server: true,
    lazy: false,
    default: () => null,
  },
);

const bookingLink = computed(() => {
  const link = calendlyContent.value?.link?.trim();

  if (!link) {
    return '';
  }

  try {
    const url = new URL(link);
    url.searchParams.set('hide_gdpr_banner', '1');
    url.searchParams.set('primary_color', '111827');
    url.searchParams.set('locale', locale.value);
    url.searchParams.set('utm_source', props.utmSource);
    return url.toString();
  }
  catch {
    return '';
  }
});

const showFallbackState = computed(() => !bookingLink.value || widgetError.value);
const contactEmail = computed(() => runtimeConfig.public.contactEmail);

const renderCalendlyWidget = async () => {
  if (import.meta.server || !bookingLink.value) {
    return;
  }

  await nextTick();

  const calendlyWindow = window as CalendlyWindow;
  const parentElement = document.getElementById(widgetId);

  if (!parentElement) {
    return;
  }

  parentElement.innerHTML = '';

  if (!calendlyWindow.Calendly?.initInlineWidget) {
    widgetError.value = true;
    return;
  }

  try {
    calendlyWindow.Calendly.initInlineWidget({
      url: bookingLink.value,
      parentElement,
      resize: !props.embedded,
    });
    widgetError.value = false;
  }
  catch {
    widgetError.value = true;
  }
};

onMounted(() => {
  void renderCalendlyWidget();
});

watch([bookingLink, () => pending.value], ([link, isPending]) => {
  if (!isPending && link) {
    void renderCalendlyWidget();
  }
});
</script>