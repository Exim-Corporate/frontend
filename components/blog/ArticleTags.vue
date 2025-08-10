<template>
  <div
    v-if="tags && tags.length > 0"
    class="py-6"
  >
    <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ $t('article.tags') }}</div>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in tags"
        :key="tag.id"
        class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      >
        {{ tag.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StrapiTag } from '@/types/strapi';

defineProps<{
  tags: StrapiTag[] | null;
}>();
</script>
