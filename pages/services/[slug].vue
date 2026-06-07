<template>
  <main class="min-h-screen mt-20">
    <ServiceHeroSection
      v-if="resolvedPage.hero"
      :hero="resolvedPage.hero"
    />

    <ServicesCardsSection
      v-if="resolvedPage.serviceCardsSection"
      mode="service"
      :page-title="resolvedPage.title"
      :section-data="resolvedPage.serviceCardsSection"
      :breadcrumb-items="breadcrumbItems"
    />

    <ServicesAboutSection
      v-if="resolvedPage.serviceAboutSection"
      :section-data="resolvedPage.serviceAboutSection"
    />

    <ServicesBenefitsSection
      v-if="resolvedPage.serviceBenefitsSection"
      :section-data="resolvedPage.serviceBenefitsSection"
    />

    <CtaSection
      v-if="resolvedPage.ctaSection?.title"
      :section-data="resolvedPage.ctaSection"
      scroll-target-id="calendly-booking"
    />

    <TestimonialsSection />
    <FAQSection />
    <CalendlyBookingSection section-id="calendly-booking" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createError, useAsyncData, useRoute, useRuntimeConfig } from 'nuxt/app';
import { useLocalePath } from '#imports';
import { useI18n } from 'vue-i18n';
import CtaSection from '@/components/CtaSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import ServiceHeroSection from '@/components/services/ServiceHeroSection.vue';
import ServicesCardsSection from '@/components/services/ServicesCardsSection.vue';
import ServicesAboutSection from '@/components/services/ServicesAboutSection.vue';
import ServicesBenefitsSection from '@/components/services/ServicesBenefitsSection.vue';
import { usePageContentApi } from '@/composables/usePageContentApi';
import { useSEO } from '@/composables/useSEO';
import type { StrapiServicePage } from '@/types/strapi';
import { FAQSection, TestimonialsSection } from '#components';

const route = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();
const { fetchServicePage } = usePageContentApi();

const slug = computed(() => String(route.params.slug || ''));

const { data: page, error } = await useAsyncData<StrapiServicePage | null>(
  `service-page-${slug.value}-${locale.value}`,
  async () => await fetchServicePage(slug.value, locale.value),
  { default: () => null, watch: [slug, locale], server: true, lazy: false },
);

if (error.value || !page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const resolvedPage = computed<StrapiServicePage>(() => page.value as StrapiServicePage);

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
