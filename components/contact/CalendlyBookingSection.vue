<template>
  <section
    :id="sectionId || undefined"
  >
    <div class="container">
      <div class="mx-auto max-w-5xl text-center">
        <AnimatedElement direction="bottom" :delay="100">
          <BaseTitle tag="h2" variant="main" class-name="text-center">
            {{ calendlyContent?.title || $t('booking.title') }}
          </BaseTitle>
        </AnimatedElement>
      </div>

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

          <div
            v-else
            class="overflow-hidden rounded-3xl p-5"
          >
            <iframe
              :src="bookingLink"
              title="Calendly booking widget"
              loading="lazy"
              class="min-h-180 w-full rounded-3xl border-0 bg-white"
            />
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
              class="font-medium text-text-dark underline decoration-black/25 underline-offset-4 transition-colors duration-300 hover:text-text-dark/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-dark"
            >
              {{ contactEmail }}
            </NuxtLink>
          </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAsyncData, useRuntimeConfig } from '#imports';
import { useI18n } from 'vue-i18n';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import type { StrapiMainCalendly } from '@/types/strapi';

defineProps({
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

const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const contactEmail = String(runtimeConfig.public.contactEmail || '');

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
    // url.searchParams.set('primary_color', '4b5563');
    // url.searchParams.set('text_color', '111827');
    // url.searchParams.set('background_color', 'ffffff');
    url.searchParams.set('locale', locale.value);
    // url.searchParams.set('hide_event_type_details', '1');
    return url.toString();
  }
  catch {
    return '';
  }
});

const showFallbackState = computed(() => !pending.value && !bookingLink.value);
</script>