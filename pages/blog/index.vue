<template>
  <main class="grow min-h-[80vh]">
    <section class="container mx-auto max-w-350">

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
          v-if="articlesForList.length > 0"
          name="blog-page"
          mode="out-in"
        >
          <div
            :key="currentPage"
            class="mt-8 md:mt-12"
          >
            <div
              v-for="article in articlesForList"
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
          v-if="articles.length === 0"
          class="text-center"
        >
          <p>{{ $t('blog.no_articles') }}</p>
        </div>
      </template>
    </section>

    <CtaSection :section-data="ctaData" />
    <FAQSection />
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
import CtaSection from '@/components/CtaSection.vue';
import FAQSection from '@/components/FAQSection.vue';
import type { StrapiArticle, StrapiCtaSection } from '@/types/strapi';

const { fetchArticleList } = usePageContentApi();
const { locale, t } = useI18n();
const route = useRoute();
const pageSize = ref(12);
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

// Hero article: always the very first (latest) article from Strapi.
// Fetched once per locale — does NOT react to currentPage changes.
const { data: heroData } = await useAsyncData(
  () => `blog-hero-${locale.value}`,
  async () => {
    const response = await fetchArticleList({
      locale: locale.value,
      page: 1,
      pageSize: 1,
    });
    return (response?.data?.[0] ?? null) as StrapiArticle | null;
  },
  {
    default: () => null as StrapiArticle | null,
    server: true,
    lazy: false,
    watch: [locale],
  },
);

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

    return {
      articles: response?.data ?? ([] as StrapiArticle[]),
      total,
      pageCount: pageCountFromApi > 0
        ? pageCountFromApi
        : Math.max(1, Math.ceil(total / pageSize.value)),
    };
  },
  {
    default: () => ({ articles: [] as StrapiArticle[], total: 0, pageCount: 0 }),
    server: true,
    lazy: false,
    watch: [locale, currentPage, pageSize],
  },
);

const articles = computed<Array<StrapiArticle>>(() => articleData.value?.articles ?? []);
const totalItems = computed<number>(() => articleData.value?.total ?? 0);
const totalPages = computed<number>(() => articleData.value?.pageCount ?? 0);
// Hero is stable — not recalculated on page change
const heroArticle = computed<StrapiArticle | null>(() => heroData.value ?? null);
const articlesForList = computed<Array<StrapiArticle>>(() => (
  currentPage.value === 1
    ? articles.value.slice(1)
    : articles.value
));
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

const ctaData = computed<StrapiCtaSection>(() => ({
  title: t('cta.title'),
  description: t('cta.description'),
  buttonText: t('cta.button'),
  buttonUrl: '/#contact-us',
}));

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
