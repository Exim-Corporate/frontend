<script setup lang="ts">
import type { StrapiArticle } from '../../types/strapi';

// Используем defineProps для строгой типизации входных данных
interface Props {
  article: StrapiArticle;
}
const props = defineProps<Props>();

// Получаем composables для создания ссылок и форматирования
const config = useRuntimeConfig();
const { locale, t } = useI18n();

// Вычисляемое свойство для полного URL изображения
const coverUrl = computed(() => {
  const url = props.article.cover?.formats!.thumbnail.url;
  if (!url) return '';
  if (url.startsWith('http')) {
    return url;
  }
  return `${config.public.strapiUrl}${url}`;
});

// Вычисляемое свойство для создания ссылки на статью (используем только slug)
const articleLink = computed(() => {
  return {
    name: 'blog-slug___' + locale.value,
    params: { slug: props.article.slug },
  };
});

const formattedDate = computed(() => {
  return new Date(props.article.publishedAt).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<template>
  <NuxtLink
    :to="articleLink"
    class="group flex bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 flex-col border border-gray-200 dark:border-gray-700 overflow-hidden animate-zoomin hover:scale-105"
  >
    <NuxtImg
      v-if="coverUrl"
      :src="coverUrl"
      :alt="article.cover?.alternativeText || article.title"
      class="w-full h-48 object-cover group-hover:scale-120 transition-transform duration-[3000ms]"
      loading="lazy"
    />
    <div
      v-else
      class="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
    >
      <i class="pi pi-image text-4xl text-gray-400" />
    </div>

    <div class="p-4 flex flex-col flex-grow">
      <h2 class="text-xl mt-0 font-bold mb-2 line-clamp-2">
        {{ article.title }}
      </h2>
      <div
        v-if="article?.categories?.length"
        class="mb-2"
      >
        <Badge
          v-for="category in article.categories"
          :key="category.id"
          :value="category.name"
          severity="info"
          class="text-xs mr-2"
        />
      </div>

      <p
        v-if="article.description"
        class="text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow"
      >
        {{ article.description }}
      </p>

      <div
        class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center"
      >
        <div>
          <!-- <p
            v-if="(article.authors?.length ?? 0) > 0"
            class="text-sm font-medium text-gray-900 dark:text-white"
          >
            {{ article.authors?.[0].name }}
          </p> -->
          <time
            :datetime="article.publishedAt"
            class="text-sm text-gray-500 dark:text-gray-400"
          >
            {{ formattedDate }}
          </time>
        </div>
        <span
          class="text-sm font-semibold text-accent hover:underline"
          :aria-label="`${t('blog.read_more_aria')} ${article.title}`"
        >
          {{ t('blog.read_more') }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
