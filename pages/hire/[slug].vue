<template>
  <main class="min-h-screen bg-white dark:bg-gray-900">
    <AppLoader v-if="pending" />

    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center"
    >
      <p class="text-red-500">{{ $t('hire.error') }}</p>
    </div>

    <div
      v-else-if="!hirePage"
      class="min-h-screen flex items-center justify-center"
    >
      <p class="text-gray-500">{{ $t('hire.notFound') }}</p>
    </div>

    <template v-else>
      <HireHero
        :title="hirePage.heroTitle"
        :subtitle="hirePage.heroSubtitle"
        :hero-image="heroImage"
        :flag-icon="flagIcon"
        :country-name="hirePage.country?.name"
      />

      <HireAtGlance
        v-if="stats.length"
        :stats="stats"
      />

      <HireWhyHire
        :country-name="hirePage.country?.name || 'Germany'"
        :content="whyHireContent"
        :image="whyHireImage"
      />

      <HireCTA />

      <HireEmploymentConditions />

      <CtaSection
        :section-data="pageCtaSection"
        scroll-target-id="calendly-booking"
      />

      <FAQSection />

      <CalendlyBookingSection section-id="calendly-booking" />
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useLazyAsyncData, useRoute, useRuntimeConfig, useSeoMeta } from '#imports';
import { useI18n } from 'vue-i18n';
import CtaSection from '@/components/CtaSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import { useHireData } from '@/composables/useStrapiData';
import HireHero from '@/components/hire/HireHero.vue';
import HireAtGlance from '@/components/hire/HireAtGlance.vue';
import HireWhyHire from '@/components/hire/HireWhyHire.vue';
import HireCTA from '@/components/hire/HireCTA.vue';
import HireEmploymentConditions from '@/components/hire/HireEmploymentConditions.vue';
import AppLoader from '@/components/UI/AppLoader.vue';
import type { StrapiCtaSection, StrapiUploadFile } from '@/types/strapi';
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

const { fetchHirePageBySlug } = useHireData();
const route = useRoute();
const { locale } = useI18n();
const config = useRuntimeConfig();

const slug = computed(() => route.params.slug as string);

const {
  data: hirePage,
  pending,
  error,
} = useLazyAsyncData<HirePageData | null>(
  `hire-${slug.value}-${locale.value}`,
  async () => await fetchHirePageBySlug(slug.value, locale.value) as HirePageData | null,
  {
    default: () => null,
    watch: [locale, slug],
  },
);

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
  return icon ? `${config.public.strapiUrl}${icon}` : undefined;
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

watch(
  hirePage,
  page => {
    if (page) {
      useSeoMeta({
        title: page.seo?.metaTitle || page.heroTitle,
        description: page.seo?.metaDescription || page.heroSubtitle || '',
        keywords: page.seo?.keywords,
        ogTitle: page.seo?.metaTitle || page.heroTitle,
        ogDescription: page.seo?.metaDescription || page.heroSubtitle || '',
        ogImage: heroImage.value,
        twitterCard: 'summary_large_image',
      });
    }
  },
  { immediate: true },
);
</script>
