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
const { fetchArticleBySlug, fetchArticleById } = useStrapiData();
const route = useRoute();
const { locale } = useI18n();

// Get slug from route params and documentId from query
const slug = computed(() => route.params.slug as string);
const documentId = computed(() => route.query.id as string | undefined);

// Fetch article data
const {
  data: article,
  pending,
  error,
} = useLazyAsyncData(
  `article-${documentId.value || slug.value}-${locale.value}`,
  async () => {
    if (documentId.value) {
      return await fetchArticleById(documentId.value, locale.value);
    }
    return await fetchArticleBySlug(slug.value, locale.value);
  },
  {
    default: () => null,
    watch: [locale, slug, documentId],
  },
);
// SEO Meta
watch(
  article,
  newArticle => {
    if (newArticle) {
      useSeoMeta({
        title: newArticle.title,
        description: newArticle.description || '',
        ogTitle: newArticle.title,
        ogDescription: newArticle.description || '',
        ogImage: newArticle.cover?.url,
        twitterCard: 'summary_large_image',
      });
    }
  },
  { immediate: true },
);
</script>
