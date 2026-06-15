<template>
  <main class="min-h-screen mt-20">
    <ReferralsHero
      v-if="resolvedPage.hero"
      :hero="resolvedPage.hero"
    />

    <ReferralProgramSection
      v-if="resolvedPage.referralProgramSection"
      :section-data="resolvedPage.referralProgramSection"
    />

    <section v-else class="container pb-16 pt-32">
      <BaseTitle tag="h1" variant="header56" class-name="text-text-dark dark:text-text-light">
        {{ resolvedPage.title }}
      </BaseTitle>
      <BaseText
        v-if="resolvedPage.description"
        variant="section"
        class-name="mt-6 text-text-secondary dark:text-text-light/80"
      >
        {{ resolvedPage.description }}
      </BaseText>
    </section>

    <CtaSection
      v-if="resolvedPage.ctaSection?.title"
      :section-data="resolvedPage.ctaSection"
      scroll-target-id="calendly-booking"
    />

    <CalendlyBookingSection section-id="calendly-booking" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createError, useAsyncData, useRoute, useRuntimeConfig } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import CtaSection from '@/components/CtaSection.vue';
import { usePageContentApi } from '@/composables/usePageContentApi';
import { useResolvedLocale } from '@/composables/useResolvedLocale';
import { useSEO } from '@/composables/useSEO';
import type { StrapiReferralPage } from '@/types/strapi';
import ReferralsHero from '@/components/referrals/ReferralsHero.vue';
import ReferralProgramSection from '@/components/referrals/ReferralProgramSection.vue';

const route = useRoute();
const { t } = useI18n();
const resolvedLocale = useResolvedLocale();
const { fetchReferralPage } = usePageContentApi();

const { data: page, error } = await useAsyncData<StrapiReferralPage | null>(
  `referral-page-${resolvedLocale.value}`,
  async () => await fetchReferralPage('referrals', resolvedLocale.value),
  { default: () => null, getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] || nuxtApp.static.data[key] },
);

if (error.value || !page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const resolvedPage = computed<StrapiReferralPage>(() => page.value as StrapiReferralPage);

const config = useRuntimeConfig();
const siteBase = config.public.siteUrl || 'https://www.exim.eu.com';

useSEO({
  title: resolvedPage.value?.seo?.metaTitle || resolvedPage.value?.title || t('error.404.title'),
  description:
    resolvedPage.value?.seo?.metaDescription ||
    resolvedPage.value?.description ||
    t('meta.description'),
  image: '/images/og-referrals.jpg',
  url: new URL(String(route.fullPath || route.path || '/referrals'), String(siteBase)).href,
});
</script>
