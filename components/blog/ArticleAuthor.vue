<template>
  <div
    v-if="authors && authors.length > 0"
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
          <!-- Inline fallback avatar icon to avoid unresolved global Icon component -->
          <svg
            class="w-6 h-6 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 12c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5-5 2.2386-5 5 2.2386 5 5 5z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 21c0-4.4183-3.5817-8-8-8H11c-4.4183 0-8 3.5817-8 8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';

const props = defineProps<{
  authors: StrapiAuthor[] | null;
}>();

const config = useRuntimeConfig();

const authorAvatarUrl = computed(() => {
  const raw = props.authors?.[0]?.avatar?.url ?? '';
  return normalizeImageUrl(raw, config.public.strapiUrl);
});
</script>
