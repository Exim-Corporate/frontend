<template>
  <main class="min-h-screen mt-20 bg-white dark:bg-gray-900">
    <article
      class="mx-auto container"
    >
      <ArticleHeader :article="resolvedArticle" />
      <!-- <ArticleCover :cover="resolvedArticle.cover" /> -->
      <ArticleAuthor :authors="resolvedArticle.authors ?? null" />
      <ArticleContent :content="resolvedArticle.content" />
      <ArticleFooter />
    </article>

    <RelatedArticlesSection
      v-if="relatedArticlesByCategory.length > 0"
      :title="$t('blog.related_by_category')"
      :articles="relatedArticlesByCategory"
    />

    <CtaSection
      :section-data="pageCtaSection"
      scroll-target-id="calendly-booking"
    />
    <FAQSection />
    <CalendlyBookingSection section-id="calendly-booking" />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createError, useAsyncData, useRoute, useRuntimeConfig } from '#imports';
import { usePageContentApi } from '@/composables/usePageContentApi';
import { useResolvedLocale } from '@/composables/useResolvedLocale';
import { useSEO } from '@/composables/useSEO';
import CtaSection from '@/components/CtaSection.vue';
import ArticleHeader from '@/components/blog/ArticleHeader.vue';
// import ArticleCover from '@/components/blog/ArticleCover.vue';
import ArticleAuthor from '@/components/blog/ArticleAuthor.vue';
import ArticleContent from '@/components/blog/ArticleContent.vue';
import ArticleFooter from '@/components/blog/ArticleFooter.vue';
import RelatedArticlesSection from '@/components/blog/RelatedArticlesSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import type { StrapiArticle, StrapiArticlePagePayload, StrapiCtaSection } from '@/types/strapi';
import { FAQSection } from '#components';

const { fetchArticlePage } = usePageContentApi();
const resolvedLocale = useResolvedLocale();
const route = useRoute();

const slug = route.params.slug as string;

const { data: articlePage, error } = await useAsyncData<StrapiArticlePagePayload | null>(
  `article-page-${slug}-${resolvedLocale.value}`,
  async () => await fetchArticlePage(slug, resolvedLocale.value),
  { default: () => null, getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] || nuxtApp.static.data[key] }
);

if (error.value || !articlePage.value?.article) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const resolvedArticle = computed<StrapiArticle>(() => articlePage.value?.article as StrapiArticle);
const relatedArticlesByCategory = computed<StrapiArticle[]>(() => articlePage.value?.relatedArticles ?? []);

const pageCtaSection = computed<StrapiCtaSection>(() => ({
  title: 'Build Your Dream Team Faster',
  description: 'We believe great technology thrives on collaboration, precision, and cultural fit. That’s why we provide accurate project estimations within 48 hours and offer flexible engagement models — whether you need AI initiatives, full product development cycles, or long-term technical support.',
  buttonText: 'Start Project',
  buttonUrl: '#calendly-booking',
  image: null,
  imageAlt: 'CTA image',
}));

const config = useRuntimeConfig();
const siteBase = config.public.siteUrl || config.public.strapiUrl || 'https://www.exim.eu.com';

const rawImage = (resolvedArticle.value.cover?.url as unknown as string) || '/images/og-image.jpg';
const ogImage =
  typeof rawImage === 'string' && rawImage.startsWith('http')
    ? rawImage
    : new URL(String(rawImage), String(siteBase)).href;
const ogUrl = new URL(String(route.fullPath || route.path || '/'), String(siteBase)).href;

useSEO({
  title: resolvedArticle.value.title,
  description: resolvedArticle.value.description || '',
  image: ogImage,
  imageWidth: resolvedArticle.value.cover?.width,
  imageHeight: resolvedArticle.value.cover?.height,
  url: ogUrl,
  type: 'article',
});
</script>
