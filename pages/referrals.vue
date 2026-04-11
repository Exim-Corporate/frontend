<template>
  <main class="min-h-screen">
    <section v-if="pending" class="container pb-16 pt-32 text-center">
      <BaseText variant="section" class-name="text-text-secondary">
        {{ $t('footer.loading') }}
      </BaseText>
    </section>

    <section v-else-if="error || !resolvedPage" class="container pb-16 pt-32 text-center">
      <BaseTitle tag="h1" variant="main" class-name="text-text-dark dark:text-text-light">
        {{ $t('error.404.title') }}
      </BaseTitle>
      <BaseText variant="section" class-name="mt-4 text-text-secondary dark:text-text-light/70">
        {{ $t('error.404.description') }}
      </BaseText>
    </section>

    <template v-else>
      <ReferralsHero
        v-if="resolvedPage.hero"
        :hero="resolvedPage.hero"
      />

      <ReferralProgramSection
        v-if="resolvedPage.referralProgramSection"
        :section-data="resolvedPage.referralProgramSection"
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
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLazyAsyncData, useRoute, useRuntimeConfig } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import { useSEO } from '@/composables/useSEO';
import { useStrapiData } from '@/composables/useStrapiData';
import type { StrapiReferralPage } from '@/types/strapi';
import ReferralsHero from '@/components/referrals/ReferralsHero.vue';
import ReferralProgramSection from '@/components/referrals/ReferralProgramSection.vue';

const route = useRoute();
const { locale, t } = useI18n();
const { fetchSingleBySlug } = useStrapiData();

const { data: page, pending, error } = useLazyAsyncData<StrapiReferralPage | null>(
  `referral-page-referrals-${locale.value}`,
  async () => {
    const localizedPage = await fetchSingleBySlug<StrapiReferralPage>(
      'referral-pages',
      'referrals',
      locale.value,
      {
        seo: true,
        hero: { populate: { image: true, categories: true } },
        referralProgramSection: {
          populate: {
            cards: {
              populate: {
                points: true,
              },
            },
          },
        },
      },
    );

    if (localizedPage) {
      return localizedPage;
    }

    return (await fetchSingleBySlug<StrapiReferralPage>(
      'referral-pages',
      'referrals',
      undefined,
      {
        seo: true,
        hero: { populate: { image: true, categories: true } },
        referralProgramSection: {
          populate: {
            cards: {
              populate: {
                points: true,
              },
            },
          },
        },
      },
    )) ?? null;
  },
  { default: () => null, server: false, watch: [locale] },
);

const resolvedPage = computed<StrapiReferralPage | null>(() => page.value ?? null);

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
