<template>
  <div
    v-if="authors?.length ?? 0 > 0"
    class="py-2"
  >
    <div
      v-for="author in authors"
      :key="author.id"
      class="flex items-start gap-4 p-1 bg-gray-700/60 rounded-full max-w-[400px]"
    >
      <!-- Author Avatar -->
      <div class="flex-shrink-0">
        <NuxtImg
          v-if="authorAvatarUrl"
          :src="authorAvatarUrl"
          :alt="author.name"
          class="w-12 h-12 rounded-full object-cover object-top"
          loading="lazy"
        />
        <div
          v-else
          class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        >
          <Icon
            name="mdi:account"
            class="w-6 h-6 text-gray-400"
          />
        </div>
      </div>

      <!-- Author Info -->
      <div class="flex-1">
        <span class="flex">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1"
            >{{ $t('article.by') }}&nbsp;&nbsp;</div
          >
          <div class="font-semibold text-gray-900 dark:text-white">{{ author?.name }}</div>
        </span>
        <div
          v-if="author.position || author.bio"
          class="text-sm text-gray-600 dark:text-gray-400 mt-1"
        >
          {{ author.position || author.bio }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { StrapiAuthor } from '@/types/strapi';

const props = defineProps<{
  authors: StrapiAuthor[] | null;
}>();

const config = useRuntimeConfig();

const authorAvatarUrl = computed(() => {
  const url = props.authors?.[0]?.avatar?.url;
  if (!url) return '';
  return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`;
});
</script>
