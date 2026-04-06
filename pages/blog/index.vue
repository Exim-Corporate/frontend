<template>
  <div class="pt-20 grow min-h-[80vh]">
    <div class="container mx-auto max-w-350 px-4 py-12">
      <BlogButton
        :label="'Home'"
        :variant="'text'"
        :severity="'accent'"
        :icon="'pi pi-arrow-left'"
        @click="goHome"
      />

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
        <TransitionGroup
          v-if="articles.length > 0"
          name="blog-card"
          tag="div"
          class="mt-8 md:mt-12"
        >
          <div
            v-for="(article, index) in articles"
            :key="article.id"
            class="blog-card-item"
            :style="{ transitionDelay: `${Math.min(index, 6) * 45}ms` }"
          >
            <ArticleCard :article="article" />
          </div>
        </TransitionGroup>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app';
import { useLazyAsyncData } from '#imports';
import { ref, computed, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStrapiData } from '@/composables/useStrapiData';
import { useSEO } from '@/composables/useSEO';
// import type { StrapiResponse, StrapiArticle } from '../../types/strapi';
import ArticleCard from '@/components/blog/ArticleCard.vue';
import BlogHeroSection from '@/components/blog/BlogHeroSection.vue';
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
const articlesTopAnchor = ref<HTMLElement | null>(null);
const shouldScrollToListTop = ref(false);

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
      sort: ['publishedAt:desc'],
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
        sort: ['publishedAt:desc'],
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
const heroArticle = computed<StrapiArticle | null>(() => articles.value[0] ?? null);
const isInitialLoading = computed<boolean>(() => pending.value && articles.value.length === 0);

const onPageChange = (page: number): void => {
  if (page === currentPage.value) {
    return;
  }

  shouldScrollToListTop.value = true;
  currentPage.value = page;
};

watch(pending, async (isPending) => {
  if (isPending || !shouldScrollToListTop.value) {
    return;
  }

  await nextTick();
  const anchor = articlesTopAnchor.value;
  if (anchor) {
    const headerOffset = 96;
    const targetTop = Math.max(0, window.scrollY + anchor.getBoundingClientRect().top - headerOffset);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  shouldScrollToListTop.value = false;
});

// Basic SEO Meta
useSEO({
  title: t('blog.title'),
  description: t('blog.description'),
});
</script>

<style scoped>
.blog-card-enter-active,
.blog-card-leave-active,
.blog-card-move {
  transition: transform 360ms ease, opacity 360ms ease;
}

.blog-card-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.blog-card-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.blog-card-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.blog-card-leave-to {
  opacity: 0;
  transform: translateX(28px);
}

.blog-card-leave-active {
  position: absolute;
  width: calc(100% - 2rem);
}
</style>
