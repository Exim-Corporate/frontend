<template>
  <main class="min-h-screen mt-20 bg-white dark:bg-gray-900">
    <!-- Loading, Error, Not Found States -->
    <ArticleState
      :pending="pending"
      :error="error"
      :article="resolvedArticle"
    />

    <!-- Article Content -->
    <article
      v-if="!pending && !error && resolvedArticle"
      class="mx-auto container"
    >
      <!-- Header -->
      <ArticleHeader :article="resolvedArticle" />

      <!-- Cover -->
      <ArticleCover :cover="resolvedArticle.cover" />

      <!-- Author -->
      <ArticleAuthor :authors="resolvedArticle.authors ?? null" />

      <!-- Tags -->
      <!-- <ArticleTags :tags="article.tags" /> -->

      <!-- Content -->
      <ArticleContent :content="resolvedArticle.content" />

      <!-- Footer -->
      <ArticleFooter />
    </article>

    <RelatedArticlesSection
      v-if="!pending && !error && relatedArticlesByCategory.length > 0"
      :title="$t('blog.related_by_category')"
      :articles="relatedArticlesByCategory"
    />

    <template v-if="!pending && !error && resolvedArticle">
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
import { computed } from 'vue';
import { useLazyAsyncData, useRoute, useRuntimeConfig } from '#imports';
import { useStrapiData } from '@/composables/useStrapiData';
import { useSEO } from '@/composables/useSEO';
import { useI18n } from 'vue-i18n';
import CtaSection from '@/components/CtaSection.vue';
import ArticleHeader from '@/components/blog/ArticleHeader.vue';
import ArticleCover from '@/components/blog/ArticleCover.vue';
import ArticleAuthor from '@/components/blog/ArticleAuthor.vue';
// import ArticleTags from '@/components/blog/ArticleTags.vue';
import ArticleContent from '@/components/blog/ArticleContent.vue';
import ArticleFooter from '@/components/blog/ArticleFooter.vue';
import ArticleState from '@/components/blog/ArticleState.vue';
import RelatedArticlesSection from '@/components/blog/RelatedArticlesSection.vue';
import CalendlyBookingSection from '@/components/contact/CalendlyBookingSection.vue';
import type { StrapiArticle, StrapiCtaSection } from '@/types/strapi';
import { FAQSection } from '#components';

// Composables
const { fetchArticleBySlug, fetchArticles } = useStrapiData();
const route = useRoute();
const { locale } = useI18n();

// Get slug from route params
const slug = computed(() => route.params.slug as string);

// Fetch article data (client-side for visible requests, SSR may not have Strapi access)
const {
  data: article,
  pending,
  error,
} = useLazyAsyncData<StrapiArticle | null>(
  `article-${slug.value}-${locale.value}`,
  async () => {
    let result = await fetchArticleBySlug(slug.value, locale.value);
    
    // Fallback to English if not found in other locales
    if (locale.value !== 'en' && !result) {
      result = await fetchArticleBySlug(slug.value, 'en');
    }
    
    return result ?? null;
  },
  { default: () => null, server: false, immediate: true, watch: [slug, locale] },
);

const resolvedArticle = computed<StrapiArticle | null>(() => article.value ?? null);

const primaryCategoryId = computed<number | null>(() => {
  const fromSingleCategory = resolvedArticle.value?.category?.id ?? null;
  if (fromSingleCategory) {
    return fromSingleCategory;
  }

  return resolvedArticle.value?.categories?.[0]?.id ?? null;
});

const currentArticleId = computed<number | null>(() => resolvedArticle.value?.id ?? null);

const { data: relatedByCategoryData } = useLazyAsyncData<StrapiArticle[]>(
  () =>
    `related-by-category-${slug.value}-${locale.value}-${primaryCategoryId.value ?? 'none'}-${currentArticleId.value ?? 'none'}`,
  async () => {
    if (!primaryCategoryId.value || !currentArticleId.value) {
      return [];
    }

    const baseParams = {
      page: 1,
      pageSize: 3,
      populate: {
        cover: {
          fields: ['url', 'alternativeText', 'formats'],
        },
      },
      sort: ['publishedAt:desc'],
      filters: {
        category: {
          id: {
            $eq: primaryCategoryId.value,
          },
        },
        id: {
          $ne: currentArticleId.value,
        },
      },
    };

    let response = await fetchArticles({
      locale: locale.value,
      ...baseParams,
    });

    let items = response?.data ?? [];

    if (locale.value !== 'en' && items.length === 0) {
      response = await fetchArticles({
        locale: 'en',
        ...baseParams,
      });
      items = response?.data ?? [];
    }

    return items;
  },
  {
    default: () => [] as StrapiArticle[],
    server: false,
    immediate: true,
    watch: [slug, locale, primaryCategoryId, currentArticleId],
  },
);

const relatedArticlesByCategory = computed<StrapiArticle[]>(() => relatedByCategoryData.value ?? []);

const pageCtaSection = computed<StrapiCtaSection>(() => ({
  title: resolvedArticle.value
    ? `Still have questions about ${resolvedArticle.value.title}?`
    : 'Still have questions?',
  description: resolvedArticle.value
    ? `Review the answers below, then book a call if you want to discuss ${resolvedArticle.value.title.toLowerCase()} with our team.`
    : 'Review the answers below, then book a call with our team.',
  buttonText: 'Book a Call',
  buttonUrl: '#calendly-booking',
  image: resolvedArticle.value?.cover ?? null,
  imageAlt: resolvedArticle.value?.cover?.alternativeText || resolvedArticle.value?.title || 'Article CTA image',
}));

// Build SEO meta when article is available (this runs during SSR because useAsyncData resolved)
const config = useRuntimeConfig();
const siteBase = config.public.siteUrl || config.public.strapiUrl || 'https://www.exim.eu.com';

if (resolvedArticle.value) {
  const newArticle = resolvedArticle.value;
  // Ensure ogImage is an absolute URL; fall back to a site-level og-image
  const rawImage = (newArticle.cover?.url as unknown as string) || '/images/og-image.jpg';
  const ogImage =
    typeof rawImage === 'string' && rawImage.startsWith('http')
      ? rawImage
      : new URL(String(rawImage), String(siteBase)).href;
  // Use fullPath (path + query/hash) so the OG url includes the article slug during SSR
  const ogUrl = new URL(String(route.fullPath || route.path || '/'), String(siteBase)).href;

  useSEO({
    title: newArticle.title,
    description: newArticle.description || '',
    image: ogImage,
    url: ogUrl,
    type: 'article',
  });
}
</script>
