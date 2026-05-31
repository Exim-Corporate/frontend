<template>
  <div
    v-if="cover?.url"
    class="mb-8"
  >
    <NuxtImg
      :src="cover.url"
      :alt="cover?.alternativeText || cover?.caption || 'Article cover'"
      class="w-full h-auto aspect-7/3 object-cover rounded-lg"
      loading="eager"
      fetchpriority="high"
      quality="85"
      format="webp"
      sizes="100vw"
    />
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
