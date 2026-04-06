<template>
  <div class="pt-20 grow min-h-[80vh] container">
    <div class="container mx-auto px-4 py-12">
      <BlogButton
        :label="'Home'"
        :variant="'text'"
        :severity="'accent'"
        :icon="'pi pi-arrow-left'"
        @click="goHome"
      />
      <h1 class="text-4xl font-bold text-center mb-10">
        {{ $t('navigation.blog') }}
      </h1>

      <!-- Loading State -->
      <div
        v-if="pending"
        class="text-center"
      >
        <AppLoader />
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="text-center text-red-500"
      >
        <p>{{ $t('blog.error_loading') }}</p>
      </div>

      <template v-else>
        <!-- Articles Grid -->
        <div
          v-if="articles.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />
        </div>
        <ArticlePagination
          v-if="articles.length > 0"
          :current-page="currentPage"
          :total-items="totalItems"
          :page-size="pageSize"
          :page-count="totalPages"
          @page-change="currentPage = $event"
        />

        <!-- No Articles State -->
        <div
          v-else
          class="text-center"
        >
          <p>{{ $t('blog.no_articles') }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app';
import { useLazyAsyncData, useSeoMeta } from '#imports';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStrapiData } from '@/composables/useStrapiData';
// import type { StrapiResponse, StrapiArticle } from '../../types/strapi';
import ArticleCard from '@/components/blog/ArticleCard.vue';
import BlogButton from '@/components/UI/blog/BlogButton.vue';
import ArticlePagination from '@/components/blog/ArticlePagination.vue';
import AppLoader from '@/components/UI/AppLoader.vue';
import type { StrapiArticle } from '@/types/strapi';
const router = useRouter();

function goHome(): void {
  router.push('/');
}

// Composables
const { fetchArticles } = useStrapiData();
const { locale, t } = useI18n();
// Pagination state
const currentPage = ref(1);
const pageSize = ref(12);
const totalItems = ref(0);
const totalPages = ref(0);

const { data: articleData, pending, error } = useLazyAsyncData(
  () => `blog-articles-${locale.value}-page-${currentPage.value}`,
  async () => {
    let response = await fetchArticles({
      locale: locale.value,
      page: currentPage.value,
      pageSize: pageSize.value,
      populate: {
        cover: {
          fields: ['url', 'alternativeText', 'formats'],
        },
      },
    });

    if (locale.value !== 'en' && (response?.data?.length ?? 0) === 0) {
      response = await fetchArticles({
        locale: 'en',
        page: currentPage.value,
        pageSize: pageSize.value,
        populate: {
          cover: {
            fields: ['url', 'alternativeText', 'formats'],
          },
        },
      });
    }

    totalItems.value = response?.meta?.pagination?.total ?? 0;
    totalPages.value = response?.meta?.pagination?.pageCount ?? 0;
    return response?.data ?? ([] as StrapiArticle[]);
  },
  {
    default: () => [] as StrapiArticle[],
    server: false,
    immediate: true,
    watch: [locale, currentPage, pageSize],
  },
);

const articles = computed<Array<StrapiArticle>>(() => articleData.value ?? []);

// Basic SEO Meta
useSeoMeta({
  title: t('blog.title'),
  description: t('blog.description'),
});
</script>
