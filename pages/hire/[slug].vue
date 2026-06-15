<template>
  <main class="min-h-screen bg-white dark:bg-gray-900">
    <AnimatedElement direction="bottom">
      <HireHero
        :title="hirePage.heroTitle"
        :subtitle="hirePage.heroSubtitle"
        :hero-image="heroImage"
        :flag-icon="flagIcon"
        :country-name="hirePage.country?.name"
      />
    </AnimatedElement>

    <AnimatedElement
      v-if="stats.length"
      direction="bottom"
    >
      <HireAtGlance
        :stats="stats"
      />
    </AnimatedElement>

    <AnimatedElement direction="bottom">
      <!-- <HireWhyHire
        :country-name="hirePage.country?.name || 'Germany'"
        :content="whyHireContent"
        :image="whyHireImage"
      /> -->
    </AnimatedElement>

    <AnimatedElement direction="bottom">
      <HireCTA />
    </AnimatedElement>

    <AnimatedElement direction="bottom">
      <HireEmploymentConditions />
    </AnimatedElement>

    <AnimatedElement direction="bottom">
      <CtaSection
        :section-data="pageCtaSection"
        scroll-target-id="calendly-booking"
      />
    </AnimatedElement>

    <AnimatedElement direction="bottom">
      <FAQSection />
    </AnimatedElement>

    <AnimatedElement direction="bottom">
      <CalendlyBookingSection section-id="calendly-booking" />
    </AnimatedElement>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createError, useAsyncData, useRoute, useRuntimeConfig, useSeoMeta } from '#imports';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import CtaSection from '@/components/CtaSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import { usePageContentApi } from '@/composables/usePageContentApi';
import { useResolvedLocale } from '@/composables/useResolvedLocale';
import HireHero from '@/components/hire/HireHero.vue';
import HireAtGlance from '@/components/hire/HireAtGlance.vue';
import HireWhyHire from '@/components/hire/HireWhyHire.vue';
import HireCTA from '@/components/hire/HireCTA.vue';
import HireEmploymentConditions from '@/components/hire/HireEmploymentConditions.vue';
import type { StrapiCtaSection, StrapiUploadFile } from '@/types/strapi';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';
import { FAQSection } from '#components';

interface HirePageData {
  heroTitle: string;
  heroSubtitle?: string;
  customOverview?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  country?: {
    name?: string;
    overview?: string;
    atAGlance?: unknown[];
    heroImage?: StrapiUploadFile | null;
    flagIcon?: StrapiUploadFile | null;
  } | null;
  serviceRole?: { heroImage?: StrapiUploadFile | null } | null;
  service_role?: { heroImage?: StrapiUploadFile | null } | null;
}

const { fetchHirePage } = usePageContentApi();
const route = useRoute();
const resolvedLocale = useResolvedLocale();
const config = useRuntimeConfig();

const slug = route.params.slug as string;

const { data: hirePageData, error } = await useAsyncData<HirePageData | null>(
  `hire-page-${slug}-${resolvedLocale.value}`,
  async () => await fetchHirePage<HirePageData>(slug, resolvedLocale.value),
  { default: () => null, getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] || nuxtApp.static.data[key] }
);

if (error.value || !hirePageData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const hirePage = computed<HirePageData>(() => hirePageData.value as HirePageData);

const getServiceRole = computed(() => {
  const page = hirePage.value;
  return page?.serviceRole || page?.service_role || null;
});

const heroImage = computed(() => {
  const countryImage = hirePage.value?.country?.heroImage?.url;
  const serviceImage = getServiceRole.value?.heroImage?.url;
  const img = countryImage || serviceImage;
  return img ?? '/images/hero/bg.webp';
});

const flagIcon = computed(() => {
  const icon = hirePage.value?.country?.flagIcon?.url;
  return icon ? normalizeImageUrl(icon, String(config.public.strapiUrl ?? '')) : undefined;
});

const stats = computed(() => hirePage.value?.country?.atAGlance || []);

const whyHireContent = computed(
  () => hirePage.value?.customOverview || hirePage.value?.country?.overview,
);

const whyHireImage = computed(() => {
  const img = hirePage.value?.country?.heroImage?.url;
  return img ?? '/images/germany.webp';
});

const pageCtaSection = computed<StrapiCtaSection>(() => ({
  title: hirePage.value?.country?.name
    ? `Need help hiring in ${hirePage.value.country.name}?`
    : 'Need help hiring your next team?',
  description: hirePage.value?.country?.name
    ? `Check the FAQ below, then schedule a call to plan your hiring process in ${hirePage.value.country.name}.`
    : 'Check the FAQ below, then schedule a call with our team to plan your hiring process.',
  buttonText: 'Book a Call',
  buttonUrl: '#calendly-booking',
  image: hirePage.value?.country?.heroImage ?? getServiceRole.value?.heroImage ?? null,
  imageAlt: hirePage.value?.country?.name
    ? `${hirePage.value.country.name} hiring CTA image`
    : 'Hiring CTA image',
}));

useSeoMeta({
  title: hirePage.value.seo?.metaTitle || hirePage.value.heroTitle,
  description: hirePage.value.seo?.metaDescription || hirePage.value.heroSubtitle || '',
  keywords: hirePage.value.seo?.keywords,
  ogTitle: hirePage.value.seo?.metaTitle || hirePage.value.heroTitle,
  ogDescription: hirePage.value.seo?.metaDescription || hirePage.value.heroSubtitle || '',
  ogImage: heroImage.value,
  twitterCard: 'summary_large_image',
});
</script>
