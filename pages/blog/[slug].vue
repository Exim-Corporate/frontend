<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 pt-20">
    <!-- Loading, Error, Not Found States -->
    <ArticleState
      :pending="pending"
      :error="error"
      :article="article"
    />

    <!-- Article Content -->
    <article
      v-if="!pending && !error && article"
      class="max-w-4xl mx-auto px-4 pt-8 pb-20"
    >
      <!-- Header -->
      <ArticleHeader :article="article" />

      <!-- Cover -->
      <ArticleCover :cover="article.cover" />

      <!-- Author -->
      <ArticleAuthor :authors="article.authors ?? null" />

      <!-- Tags -->
      <!-- <ArticleTags :tags="article.tags" /> -->

      <!-- Content -->
      <ArticleContent :content="article.content" />

      <!-- Footer -->
      <ArticleFooter />
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStrapiData } from '@/composables/useStrapiData';
import ArticleHeader from '@/components/blog/ArticleHeader.vue';
import ArticleCover from '@/components/blog/ArticleCover.vue';
import ArticleAuthor from '@/components/blog/ArticleAuthor.vue';
// import ArticleTags from '@/components/blog/ArticleTags.vue';
import ArticleContent from '@/components/blog/ArticleContent.vue';
import ArticleFooter from '@/components/blog/ArticleFooter.vue';
import ArticleState from '@/components/blog/ArticleState.vue';

// Composables
const { fetchArticleBySlug } = useStrapiData();
const route = useRoute();
const { locale } = useI18n();

// Get slug from route params
const slug = computed(() => route.params.slug as string);
console.log('slug', slug);

// Fetch article data on the server (useAsyncData so meta can be set during SSR)
const {
  data: article,
  pending,
  error,
} = await useAsyncData(
  `article-${slug.value}-${locale.value}`,
  () => fetchArticleBySlug(slug.value, locale.value),
  { default: () => null },
);

// Build SEO meta when article is available (this runs during SSR because useAsyncData resolved)
const config = useRuntimeConfig();
const siteBase = config.public.siteUrl || config.public.strapiUrl || 'https://www.exim.eu.com';

if (article && article.value) {
  const newArticle = article.value;
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
