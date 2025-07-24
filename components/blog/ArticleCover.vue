<template>
  <div class="mb-8">
    <NuxtImg
      v-if="cover?.url"
      :src="cover.url"
      :alt="cover?.alternativeText || cover?.caption || 'Article cover'"
      class="w-full h-auto"
      loading="lazy"
    />
    <div
      v-else
      class="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg"
    >
      <span class="text-gray-500 dark:text-gray-400 text-lg font-semibold">
        {{ $t('article.no_cover') }}
      </span>
    </div>
    <div
      v-if="cover?.caption || cover?.alternativeText"
      class="mt-3 text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed"
    >
      {{ cover.caption || cover.alternativeText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StrapiArticle } from '@/types/strapi';

defineProps<{
  cover: StrapiArticle['cover'];
}>();
</script>
