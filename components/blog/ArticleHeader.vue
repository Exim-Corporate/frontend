<template>
  <header class="mb-8">
    <!-- Category Badge (if exists) -->
    <div class="flex items-center justify-between mb-4">
      <div
        v-if="article?.categories?.length"
        class="mb-4 flex gap-4"
      >
        <Badge
          v-for="category in article.categories"
          :key="category.name"
          :value="category.name"
          :severity:="'secondary'"
          class="uppercase font-medium text-md p-4"
        />
      </div>
      <BlogButton
        :icon="'pi pi-arrow-left'"
        :severity="'secondary'"
        @click="goBack"
      />
    </div>

    <!-- Main Title -->
    <h1 class="text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white font-georgia">
      {{ article.title }}
    </h1>

    <!-- Article Description -->
    <div
      v-if="article.description"
      class="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8 font-georgia"
    >
      {{ article.description }}
    </div>
    <div class="border-t border-gray-300 dark:border-gray-600" />

    <!-- Actions Bar -->
    <div class="flex items-center justify-between py-4 mb-6">
      <time
        :datetime="article.publishedAt"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        {{ formattedDate }}
      </time>
      <div class="gap-4 flex">
        <ArticleActions
          :article-id="article.documentId"
          :title="article.title"
        />
      </div>
    </div>

    <!-- Gray Divider -->
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app';

import type { StrapiArticle } from '@/types/strapi';
import BlogButton from '@/components/UI/blog/BlogButton.vue';
// import type { StrapiArticle } from '/types/strapi';
import ArticleActions from './ArticleActions.vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const router = useRouter();

function goBack(): void {
  router.push('/blog');
}

const formattedDate = computed(() => {
  if (!props.article.publishedAt) return '';
  return new Date(props.article.publishedAt).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const props = defineProps<{
  article: StrapiArticle;
  // formattedDate: string;
}>();
</script>
