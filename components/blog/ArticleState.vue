<template>
  <div>
    <!-- Loading State -->
    <div
      v-if="pending"
      class="flex items-center justify-center min-h-screen"
    >
      <p class="text-lg text-gray-600 dark:text-gray-400">{{ $t('blog.loading_article') }}</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <p class="text-lg text-red-500">{{ $t('blog.error_loading') }}</p>
    </div>

    <!-- Article Not Found -->
    <div
      v-else-if="!article"
      class="flex flex-col items-center justify-center min-h-screen"
    >
      <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {{ $t('blog.article_not_found') }}
      </h1>
      <NuxtLink
        :to="localePath('/blog')"
        class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-lg"
      >
        {{ $t('blog.back_to_blog') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StrapiArticle } from '@/types/strapi';

defineProps<{
  pending: boolean;
  error: Error | null;
  article: StrapiArticle | null;
}>();

const localePath = useLocalePath();
</script>
