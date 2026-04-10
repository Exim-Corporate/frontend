<template>
  <main class="min-h-screen">
    <section v-if="pending" class="container pt-32 pb-16 text-center">
      <BaseText variant="section" class-name="text-text-secondary">
        {{ $t('footer.loading') }}
      </BaseText>
    </section>

    <section v-else-if="error || !resolvedPage" class="container pt-32 pb-16 text-center">
      <BaseTitle tag="h1" variant="main" class-name="text-text-dark dark:text-text-light">
        {{ $t('error.404.title') }}
      </BaseTitle>
      <BaseText variant="section" class-name="mt-4 text-text-secondary dark:text-text-light/70">
        {{ $t('error.404.description') }}
      </BaseText>
    </section>

    <template v-else>
      <IndustryHeroSection
        v-if="resolvedPage.hero"
        :hero="resolvedPage.hero"
      />
      <section v-else class="container pb-16 pt-32">
        <BaseTitle tag="h1" variant="main" class-name="text-text-dark dark:text-text-light">
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
      />

      <TechStackSection />

      <IndustryStatsSection
        v-if="resolvedPage.industryStats"
        :section-data="resolvedPage.industryStats"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLazyAsyncData, useRoute, useRuntimeConfig } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import IndustryHeroSection from '@/components/industry/IndustryHeroSection.vue';
import IndustryDescriptionSection from '@/components/industry/IndustryDescriptionSection.vue';
import IndustryStatsSection from '@/components/industry/IndustryStatsSection.vue';
import { useSEO } from '@/composables/useSEO';
import { useStrapiData } from '@/composables/useStrapiData';
import type { StrapiIndustryPage } from '@/types/strapi';

const route = useRoute();
const { locale, t } = useI18n();
const { fetchSingleBySlug } = useStrapiData();

const slug = computed(() => String(route.params.slug || ''));

const { data: page, pending, error } = useLazyAsyncData<StrapiIndustryPage | null>(
  `industry-page-${slug.value}-${locale.value}`,
  async () =>
    (await fetchSingleBySlug<StrapiIndustryPage>(
      'industry-pages',
      slug.value,
      locale.value,
      {
        seo: true,
        hero: { populate: { image: true, categories: true } },
        industryDescription: {
          populate: {
            accordions: {
              populate: {
                card: {
                  populate: { image: true },
                },
              },
            },
          },
        },
        industryStats: {
          populate: {
            accordions: true,
          },
        },
      },
    )) ?? null,
  { default: () => null, server: false, watch: [slug, locale] },
);

const resolvedPage = computed<StrapiIndustryPage | null>(() => page.value ?? null);

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
