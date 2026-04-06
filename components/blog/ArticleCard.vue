<script setup lang="ts">
import type { StrapiArticle } from '../../types/strapi';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '#imports';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';

// Используем defineProps для строгой типизации входных данных
interface Props {
  article: StrapiArticle;
}
const props = defineProps<Props>();

// Получаем composables для создания ссылок и форматирования
const config = useRuntimeConfig();
const { locale } = useI18n();
const localePath = useLocalePath();

const coverUrl = computed(() => {
  return normalizeImageUrl(
    props.article.cover?.formats?.small?.url ??
      props.article.cover?.formats?.thumbnail?.url ??
      props.article.cover?.url ??
      '',
    String(config.public.strapiUrl ?? ''),
  );
});

// Вычисляемое свойство для создания ссылки на статью (используем только slug)
const articleLink = computed(() => localePath(`/blog/${props.article.slug}`));

const formattedDate = computed(() => {
  return new Date(props.article.publishedAt).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const getExcerpt = (description: string): string => {
  const normalized = description?.trim() ?? '';
  if (normalized.length <= 170) {
    return normalized;
  }

  return `${normalized.slice(0, 167).trimEnd()}...`;
};
</script>

<template>
  <NuxtLink
    :to="articleLink"
    class="group relative block py-8 last:border-b-0 lg:py-10"
  >
    <div class="flex flex-col gap-4 lg:grid lg:grid-cols-[180px_minmax(0,1fr)_160px_40px] lg:items-center lg:gap-5">
      <div class="relative aspect-18/10 w-full overflow-hidden rounded-[18px] lg:h-25 lg:w-45 lg:rounded-2xl lg:aspect-auto">
        <NuxtImg
          v-if="coverUrl"
          :src="coverUrl"
          :alt="article.cover?.alternativeText || article.title"
          width="360"
          height="200"
          loading="lazy"
          quality="85"
          format="webp"
          sizes="(max-width: 1023px) 100vw, 180px"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div class="min-w-0">
        <BaseTitle
          tag="h3"
          variant="subheader"
          class-name="text-left text-text-dark"
        >
          {{ article.title }}
        </BaseTitle>
        <BaseText
          variant="section"
          class-name="mt-2 max-w-3xl text-left text-text-secondary line-clamp-2"
        >
          {{ getExcerpt(article.description) }}
        </BaseText>
        <BaseText
          variant="card"
          class-name="mt-3 text-left text-text-secondary lg:hidden !leading-5"
        >
          {{ formattedDate }}
        </BaseText>
      </div>

      <BaseText
        variant="card"
        class-name="hidden text-right text-text-secondary transition-opacity duration-200 lg:block lg:group-hover:opacity-0"
      >
        {{ formattedDate }}
      </BaseText>

      <div class="hidden items-center justify-end opacity-0 transition-all duration-300 ease-out lg:flex lg:-translate-x-2 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
        <i class="pi pi-arrow-right text-2xl text-text-dark" />
      </div>
    </div>

    <span class="absolute bottom-0 left-0 h-px w-full bg-black/10" />
    <span class="absolute bottom-0 left-0 hidden h-0.5 w-0 bg-text-dark transition-all duration-500 ease-out lg:block lg:group-hover:w-full" />
  </NuxtLink>
</template>
