<template>
  <main class="grow min-h-[80vh]">
    <section class="container mx-auto max-w-350">
      <!-- <BlogButton
        :label="'Home'"
        :variant="'text'"
        :icon="'pi pi-arrow-left'"
        pt:root:class="group !bg-transparent !border-0 !shadow-none !text-text-dark hover:!bg-transparent hover:!text-text-dark focus:!bg-transparent focus:!text-text-dark active:!bg-transparent active:!text-text-dark transition-transform duration-200 hover:scale-105 focus:scale-105 active:scale-105"
        pt:label:class="!text-text-dark font-normal transition-all duration-200 group-hover:font-bold group-focus:font-bold group-active:font-bold"
        pt:icon:class="!text-text-dark transition-all duration-200"
        @click="goHome"
      /> -->

      <!-- Loading State -->
      <div
        v-if="isInitialLoading"
        class="py-14 text-center"
      >
        <AppLoader />
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="py-14 text-center text-red-500"
      >
        <p>{{ $t('blog.error_loading') }}</p>
      </div>

      <template v-else>
        <BlogHeroSection :article="heroArticle" />

        <div ref="articlesTopAnchor" />

        <!-- Articles List -->
        <Transition
          v-if="articles.length > 0"
          name="blog-page"
          mode="out-in"
        >
          <div
            :key="currentPage"
            class="mt-8 md:mt-12"
          >
            <div
              v-for="article in articles"
              :key="article.id"
              class="blog-page-item"
            >
              <ArticleCard :article="article" />
            </div>
          </div>
        </Transition>
        <ArticlePagination
          v-if="articles.length > 0"
          :current-page="currentPage"
          :total-items="totalItems"
          :page-size="pageSize"
          :page-count="totalPages"
          @page-change="onPageChange"
        />

        <!-- No Articles State -->
        <div
          v-else
          class="text-center"
        >
          <p>{{ $t('blog.no_articles') }}</p>
        </div>
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import { navigateTo, useAsyncData, useRoute } from '#imports';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePageContentApi } from '@/composables/usePageContentApi';
import { useSEO } from '@/composables/useSEO';
import ArticleCard from '@/components/blog/ArticleCard.vue';
import BlogHeroSection from '@/components/blog/BlogHeroSection.vue';
import ArticlePagination from '@/components/blog/ArticlePagination.vue';
import AppLoader from '@/components/UI/AppLoader.vue';
import type { StrapiArticle } from '@/types/strapi';

const { fetchArticleList } = usePageContentApi();
const { locale, t } = useI18n();
const route = useRoute();
const pageSize = ref(12);
const totalItems = ref(0);
const totalPages = ref(0);
const articlesTopAnchor = ref<HTMLElement | null>(null);

const currentPage = computed<number>(() => {
  const rawQueryPage = Array.isArray(route.query.page)
    ? route.query.page[0]
    : route.query.page;
  const parsedPage = Number.parseInt(String(rawQueryPage ?? '1'), 10);

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
});

const { data: articleData, pending, error } = await useAsyncData(
  () => `blog-articles-${locale.value}-page-${currentPage.value}`,
  async () => {
    const response = await fetchArticleList({
      locale: locale.value,
      page: currentPage.value,
      pageSize: pageSize.value,
    });

    const total = response?.meta?.pagination?.total ?? 0;
    const pageCountFromApi = response?.meta?.pagination?.pageCount ?? 0;

    totalItems.value = total;
    totalPages.value = pageCountFromApi > 0
      ? pageCountFromApi
      : Math.max(1, Math.ceil(total / pageSize.value));

    return response?.data ?? ([] as StrapiArticle[]);
  },
  {
    default: () => [] as StrapiArticle[],
    server: true,
    lazy: false,
    watch: [locale, currentPage, pageSize],
  },
);

const articles = computed<Array<StrapiArticle>>(() => articleData.value ?? []);
const heroArticle = computed<StrapiArticle | null>(() => articles.value[0] ?? null);
const isInitialLoading = computed<boolean>(() => pending.value && articles.value.length === 0);

const scrollToArticlesTop = (): void => {
  const anchor = articlesTopAnchor.value;
  if (!anchor || typeof window === 'undefined') {
    return;
  }

  const headerOffset = 96;
  const targetTop = Math.max(0, window.scrollY + anchor.getBoundingClientRect().top - headerOffset);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({
    top: targetTop,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
};

const onPageChange = (page: number): void => {
  if (page === currentPage.value) {
    return;
  }

  scrollToArticlesTop();

  const nextQuery = {
    ...route.query,
    page: page > 1 ? String(page) : undefined,
  };

  void navigateTo(
    {
      path: route.path,
      query: nextQuery,
    },
    {
      replace: false,
    },
  );
};

useSEO({
  title: t('blog.title'),
  description: t('blog.description'),
});
</script>

<style scoped>
.blog-page-enter-active,
.blog-page-leave-active {
  transition: transform 320ms ease, opacity 320ms ease;
}

.blog-page-enter-from {
  opacity: 0;
  transform: translateX(-32px);
}

.blog-page-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.blog-page-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.blog-page-leave-to {
  opacity: 0;
  transform: translateX(32px);
}

.blog-page-item + .blog-page-item {
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .blog-page-item + .blog-page-item {
    margin-top: 2rem;
  }
}
</style>
