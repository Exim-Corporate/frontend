<template>
  <div class="pt-20 grow-1 min-h-[80vh] container">
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
        v-if="error"
        class="text-center text-red-500"
      >
        <p>{{ $t('blog.error_loading') }}</p>
      </div>

      <!-- Articles Grid -->
      <div
        v-else-if="articles && articles.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
      <ArticlePagination
        v-if="articles && articles.length > 0"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
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
const pageSize = ref(10); // Можно изменить на любое значение
const totalItems = ref(0);
const totalPages = ref(0);

// Используем computed для ключа, чтобы он был динамическим
const key = computed(() => `blog-articles-${locale.value}-page-${currentPage.value}`);
const articles = ref<Array<StrapiArticle>>([]);
const isLoading = ref(false);
const { pending, error } = useLazyAsyncData(
  key,
  async () => {
    isLoading.value = true;
    const response = await fetchArticles({
      locale: locale.value,
      page: currentPage.value,
      pageSize: pageSize.value,
    });
    totalItems.value = response?.meta?.pagination?.total ?? 0;
    totalPages.value = response?.meta?.pagination?.pageCount ?? 0;
    articles.value = response?.data || [];
    isLoading.value = false;
    return null;
  },
  {
    default: () => null,
    watch: [locale, currentPage, pageSize],
  },
);

// Basic SEO Meta
useSeoMeta({
  title: t('blog.title'),
  description: t('blog.description'),
});
</script>
