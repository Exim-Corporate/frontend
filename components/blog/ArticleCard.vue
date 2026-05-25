<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath, useRuntimeConfig } from '#imports';
import type { StrapiArticle, StrapiUploadFile } from '../../types/strapi';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';

interface ArticleCardData extends Pick<StrapiArticle, 'title'> {
  description?: string;
  slug?: string;
  publishedAt?: string;
  cover?: StrapiUploadFile | null;
}

interface Props {
  article: ArticleCardData;
  to?: string;
  hideImage?: boolean;
  hideDate?: boolean;
  compact?: boolean;
  sm?: boolean;
  as?: 'link' | 'div';
}
const props = defineProps<Props>();

const config = useRuntimeConfig();
const { locale } = useI18n();
const localePath = useLocalePath();
const isStaticCard = computed(() => props.as === 'div');

const strapiUrl = String(config.public.strapiUrl ?? '');
const mobileCoverUrl = computed(() => normalizeImageUrl(props.article.cover?.url ?? '', strapiUrl));
const desktopCoverUrl = computed(() => normalizeImageUrl(props.article.cover?.formats?.thumbnail?.url ?? props.article.cover?.url ?? '', strapiUrl));

const articleLink = computed(() => {
  if (props.to) {
    return props.to;
  }

  if (props.article.slug) {
    return localePath(`/blog/${props.article.slug}`);
  }

  return localePath('/blog');
});

const formattedDate = computed(() => {
  if (!props.article.publishedAt) {
    return '';
  }

  return new Date(props.article.publishedAt).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<template>
  <NuxtLink
    v-if="!isStaticCard"
    :to="articleLink"
    class="group relative block"
    :class="sm ? 'py-3' : compact ? 'py-5' : 'py-8 lg:py-10'"
  >
    <div
      class="flex flex-col gap-3 cursor-pointer"
      :class="hideImage ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_32px] lg:items-start lg:gap-6' : 'lg:grid lg:grid-cols-[180px_minmax(0,1fr)_132px_32px] lg:items-center lg:gap-8'"
    >
      <div
        v-if="!hideImage"
        class="relative aspect-18/10 w-full overflow-hidden rounded-xl lg:h-25 lg:w-45 lg:rounded-xl lg:aspect-auto"
      >
        <NuxtImg
          v-if="mobileCoverUrl"
          :src="mobileCoverUrl"
          :alt="article.cover?.alternativeText || article.title"
          width="360"
          height="200"
          loading="lazy"
          quality="85"
          format="webp"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 lg:hidden"
        />
        <NuxtImg
          v-if="desktopCoverUrl"
          :src="desktopCoverUrl"
          :alt="article.cover?.alternativeText || article.title"
          width="180"
          height="100"
          loading="lazy"
          quality="85"
          format="webp"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 hidden lg:block"
        />
      </div>

      <div class="min-w-0">
        <BaseTitle
          tag="h3"
          :variant="sm ? 'subheader16' : 'subheader18'"
          :class-name="compact ? 'text-left text-text-dark text-[14px] leading-5 md:text-[14px] md:leading-5' : sm ? 'text-left text-text-dark leading-5 md:leading-6' : 'text-left text-text-dark leading-6 md:leading-8'"
        >
          {{ article.title }}
        </BaseTitle>
        <BaseText
          :variant="sm ? 'card12' : 'section'"
          :class-name="compact ? 'mt-0.5 text-left text-text-dark text-[11px] leading-4 line-clamp-2 whitespace-normal md:text-[11px] md:leading-4' : sm ? 'mt-0.5 text-left text-text-dark line-clamp-2 whitespace-normal' : 'mt-1 text-left text-text-dark line-clamp-2 whitespace-normal md:mt-2 md:max-w-200 md:text-[18px] md:leading-7'"
        >
          {{ article.description }}
        </BaseText>
        <BaseText
          v-if="!hideDate && formattedDate"
          variant="card"
          class-name="mt-3 text-left text-[14px]! font-normal! leading-7! text-text-dark/50 lg:hidden"
        >
          {{ formattedDate }}
        </BaseText>
      </div>

      <BaseText
        v-if="!hideDate && formattedDate"
        variant="card"
        class-name="hidden text-right text-[14px]! font-normal! leading-7! text-text-dark/50 transition-opacity duration-200 lg:block lg:group-hover:opacity-0"
      >
        {{ formattedDate }}
      </BaseText>

      <div class="hidden items-center justify-end opacity-0 transition-all duration-300 ease-out lg:flex lg:-translate-x-2 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
        <i :class="['pi pi-arrow-right text-text-dark', sm ? 'text-[20px]' : 'text-[32px]']" />
      </div>
    </div>

    <span class="absolute bottom-0 left-0 h-px w-full bg-form-border" />
    <span class="absolute bottom-0 left-0 hidden h-0.5 w-0 bg-text-dark transition-all duration-500 ease-out lg:block lg:group-hover:w-full" />
  </NuxtLink>

  <div
    v-else
    class="group relative block"
    :class="sm ? 'py-3' : compact ? 'py-5' : 'py-8 lg:py-10'"
  >
    <div
      class="flex flex-col gap-3 cursor-pointer"
      :class="hideImage ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_32px] lg:items-start lg:gap-6' : 'lg:grid lg:grid-cols-[180px_minmax(0,1fr)_132px_32px] lg:items-center lg:gap-8'"
    >
      <div
        v-if="!hideImage"
        class="relative aspect-18/10 w-full overflow-hidden rounded-xl lg:h-25 lg:w-45 lg:rounded-xl lg:aspect-auto"
      >
        <NuxtImg
          v-if="mobileCoverUrl"
          :src="mobileCoverUrl"
          :alt="article.cover?.alternativeText || article.title"
          width="360"
          height="200"
          loading="lazy"
          quality="85"
          format="webp"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 lg:hidden"
        />
        <NuxtImg
          v-if="desktopCoverUrl"
          :src="desktopCoverUrl"
          :alt="article.cover?.alternativeText || article.title"
          width="180"
          height="100"
          loading="lazy"
          quality="85"
          format="webp"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 hidden lg:block"
        />
      </div>

      <div class="min-w-0">
        <BaseTitle
          tag="h3"
          :variant="sm ? 'subheader16' : 'subheader18'"
          :class-name="compact ? 'text-left text-text-dark text-[14px] leading-5 md:text-[14px] md:leading-5' : sm ? 'text-left text-text-dark leading-5 md:leading-6' : 'text-left text-text-dark leading-6 md:leading-8'"
        >
          {{ article.title }}
        </BaseTitle>
        <BaseText
          :variant="sm ? 'card12' : 'section'"
          :class-name="compact ? 'mt-0.5 text-left text-text-dark text-[11px] leading-4 line-clamp-2 whitespace-normal md:text-[11px] md:leading-4' : sm ? 'mt-0.5 text-left text-text-dark line-clamp-2 whitespace-normal' : 'mt-1 text-left text-text-dark line-clamp-2 whitespace-normal md:mt-2 md:max-w-200 md:text-[18px] md:leading-7'"
        >
          {{ article.description }}
        </BaseText>
        <BaseText
          v-if="!hideDate && formattedDate"
          variant="card"
          class-name="mt-3 text-left text-[14px]! font-normal! leading-7! text-text-dark/50 lg:hidden"
        >
          {{ formattedDate }}
        </BaseText>
      </div>

      <BaseText
        v-if="!hideDate && formattedDate"
        variant="card"
        class-name="hidden text-right text-[14px]! font-normal! leading-7! text-text-dark/50 transition-opacity duration-200 lg:block lg:group-hover:opacity-0"
      >
        {{ formattedDate }}
      </BaseText>

      <div class="hidden items-center justify-end opacity-0 transition-all duration-300 ease-out lg:flex lg:-translate-x-2 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
        <i :class="['pi pi-arrow-right text-text-dark', sm ? 'text-[20px]' : 'text-[32px]']" />
      </div>
    </div>

    <span class="absolute bottom-0 left-0 h-px w-full bg-form-border" />
    <span class="absolute bottom-0 left-0 hidden h-0.5 w-0 bg-text-dark transition-all duration-500 ease-out lg:block lg:group-hover:w-full" />
  </div>
</template>
