<template>
  <main class="min-h-screen pt-15">
    <IndustryHeroSection
      v-if="resolvedPage.hero"
      :hero="resolvedPage.hero"
    />

    <section v-if="!resolvedPage.hero" class="container">
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

    <IndustryDescriptionSection
      v-if="resolvedPage.industryDescription"
      :section-data="resolvedPage.industryDescription"
      :breadcrumb-items="breadcrumbItems"
    />

    <TechStackSection />

    <IndustryStatsSection
      v-if="resolvedPage.industryStats"
      :section-data="resolvedPage.industryStats"
    />

    <TestimonialsSection />

    <CtaSection
      v-if="resolvedPage.ctaSection?.title"
      :section-data="resolvedPage.ctaSection"
      scroll-target-id="calendly-booking"
    />

    <FAQSection />

    <CalendlyBookingSection section-id="calendly-booking" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createError, useAsyncData, useRoute, useRuntimeConfig } from 'nuxt/app';
import { useLocalePath } from '#imports';
import { useI18n } from 'vue-i18n';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import CtaSection from '@/components/CtaSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import IndustryHeroSection from '@/components/industry/IndustryHeroSection.vue';
import IndustryDescriptionSection from '@/components/industry/IndustryDescriptionSection.vue';
import IndustryStatsSection from '@/components/industry/IndustryStatsSection.vue';
import { usePageContentApi } from '@/composables/usePageContentApi';
import { useSEO } from '@/composables/useSEO';
import type { StrapiIndustryPage } from '@/types/strapi';
import { FAQSection, TestimonialsSection } from '#components';

const route = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();
const { fetchIndustryPage } = usePageContentApi();

const slug = computed(() => String(route.params.slug || ''));

const { data: page, error } = await useAsyncData<StrapiIndustryPage | null>(
  `industry-page-${slug.value}-${locale.value}`,
  async () => await fetchIndustryPage(slug.value, locale.value),
  { default: () => null, watch: [slug, locale], server: true, lazy: false },
);

if (error.value || !page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const resolvedPage = computed<StrapiIndustryPage>(() => page.value as StrapiIndustryPage);

const breadcrumbItems = computed(() => [
  {
    label: t('navigation.home'),
    to: localePath('/'),
  },
  {
    label: resolvedPage.value.hero?.title || resolvedPage.value.title || slug.value,
  },
]);

const config = useRuntimeConfig();
const siteBase = config.public.siteUrl || 'https://www.exim.eu.com';

useSEO({
  title: resolvedPage.value?.seo?.metaTitle || resolvedPage.value?.title || t('error.404.title'),
  description:
    resolvedPage.value?.seo?.metaDescription ||
    resolvedPage.value?.description ||
    t('meta.description'),
  url: new URL(String(route.fullPath || route.path || '/'), String(siteBase)).href,
});
</script>
