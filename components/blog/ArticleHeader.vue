<template>
  <header class="mb-8">
    <div class="mb-6 flex items-start justify-between gap-4 md:mb-8 md:items-center">
      <AppBreadcrumb :items="breadcrumbItems" />
      <BlogButton
        :icon="'pi pi-arrow-left'"
        :severity="'secondary'"
        @click="goBack"
      />
    </div>

    <!-- Main Title -->
    <div class="relative mb-6 h-90 w-full overflow-hidden rounded-[20px] md:h-110 pb-20">
      <NuxtImg
        src="/images/blog-bg.png"
        alt="Article header background"
        class="absolute inset-0 block h-full w-full object-cover"
        width="1200"
        height="420"
        loading="eager"
        quality="90"
        format="webp"
        sizes="(max-width: 767px) 100vw, 1200px"
      />
      <div class="absolute inset-0 flex items-end justify-center px-10 md:px-15 pb-10 md:pb-15">
        <BaseTitle
          tag="h1"
          variant="header56"
          class-name="text-center text-white font-normal! leading-tight"
        >
          {{ article.title }}
        </BaseTitle>
      </div>
    </div>

    <!-- Article Description -->
    <div
      v-if="article.description"
      class="mb-8 font-sans text-xl leading-relaxed text-gray-700 dark:text-gray-300"
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
import { useLocalePath } from '#imports';
import { computed } from 'vue';

import type { StrapiArticle } from '@/types/strapi';
import BlogButton from '@/components/UI/blog/BlogButton.vue';
import ArticleActions from './ArticleActions.vue';
import { useI18n } from 'vue-i18n';
import { BaseTitle } from '#components';
const { locale, t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

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

const breadcrumbItems = computed(() => ([
  {
    label: t('navigation.blog'),
    to: localePath('/blog'),
  },
  {
    label: props.article.title,
  },
]));

const props = defineProps<{
  article: StrapiArticle;
  // formattedDate: string;
}>();
</script>
