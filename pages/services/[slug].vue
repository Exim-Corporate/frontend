<template>
  <section class="container mx-auto px-4 pb-16 pt-32 sm:px-6">
    <div v-if="pending" class="text-center">
      <BaseText variant="section" class-name="text-text-secondary">
        {{ $t('footer.loading') }}
      </BaseText>
    </div>

    <div v-else-if="error || !resolvedPage" class="text-center">
      <BaseTitle tag="h1" variant="main" class-name="text-text-dark dark:text-text-light">
        {{ $t('error.404.title') }}
      </BaseTitle>
      <BaseText variant="section" class-name="mt-4 text-text-secondary dark:text-text-light/70">
        {{ $t('error.404.description') }}
      </BaseText>
    </div>

    <div v-else class="mx-auto max-w-3xl text-left">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAsyncData, useRoute, useRuntimeConfig } from 'nuxt/app';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import { useSEO } from '@/composables/useSEO';
import { useStrapiData } from '@/composables/useStrapiData';
import type { StrapiServicePage } from '@/types/strapi';

const route = useRoute();
const { locale, t } = useI18n();
const { fetchSingleBySlug } = useStrapiData();

const slug = computed(() => String(route.params.slug || ''));

const { data: page, pending, error } = await useAsyncData<StrapiServicePage | false>(
  `service-page-${slug.value}-${locale.value}`,
  async () => (await fetchSingleBySlug<StrapiServicePage>('service-pages', slug.value, locale.value, ['seo'])) ?? false,
);

const resolvedPage = computed<StrapiServicePage | null>(() => {
  return page.value === false ? null : (page.value ?? null);
});

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
