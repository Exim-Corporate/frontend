<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
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

      <ContactSection />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHireData } from '@/composables/useStrapiData';
import HireHero from '@/components/hire/HireHero.vue';
import HireAtGlance from '@/components/hire/HireAtGlance.vue';
import HireWhyHire from '@/components/hire/HireWhyHire.vue';
import HireCTA from '@/components/hire/HireCTA.vue';
import HireEmploymentConditions from '@/components/hire/HireEmploymentConditions.vue';
import ContactSection from '@/components/ContactSection.vue';
import AppLoader from '@/components/UI/AppLoader.vue';

const { fetchHirePageBySlug } = useHireData();
const route = useRoute();
const { locale } = useI18n();
const config = useRuntimeConfig();

const slug = computed(() => route.params.slug as string);

const {
  data: hirePage,
  pending,
  error,
} = useLazyAsyncData(
  `hire-${slug.value}-${locale.value}`,
  async () => await fetchHirePageBySlug(slug.value, locale.value),
  {
    default: () => null,
    watch: [locale, slug],
  },
);

// Helper to get service role (handles both camelCase and snake_case from Strapi)
const getServiceRole = computed(() => {
  // @ts-expect-error - Strapi may return service_role instead of serviceRole
  return hirePage.value?.serviceRole || hirePage.value?.service_role;
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
