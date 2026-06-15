<template>
    <section class=" bg-white container">
      <div class="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-between">
        <AnimatedElement direction="bottom" >
          <BaseTitle tag="h2" variant="main" class-name="text-center lg:text-left">
            {{ $t('heroBlog.title') }}
          </BaseTitle>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <div class="hidden lg:block">
            <AppButton variant="gray" class="w-auto! rounded-full" :label="$t('heroBlog.viewMore')" @click="openBlog" />
          </div>
        </AnimatedElement>
      </div>

      <div class="mt-2">
        <AnimatedElement v-if="pending" direction="bottom">
                    <BaseText variant="section" class-name="text-left text-text-secondary">
            {{ $t('blog.loading') }}
          </BaseText>
        </AnimatedElement>

        <AnimatedElement v-else-if="articles.length === 0" direction="bottom">
          <BaseText variant="section" class-name="text-left text-text-secondary">
            {{ $t('heroBlog.empty') }}
          </BaseText>
        </AnimatedElement>

        <div v-else>
          <AnimatedElement
            v-for="article in articles"
            :key="article.id"
            direction="bottom"
          >
            <ArticleCard :article="article" />
          </AnimatedElement>
        </div>
      </div>

      <div class="container">
        <AnimatedElement v-if="articles.length > 0" direction="bottom">
          <div class="mt-8 flex justify-center lg:hidden">
            <AppButton variant="gray" class="w-auto! rounded-full" :label="$t('heroBlog.viewMore')" @click="openBlog" />
          </div>
        </AnimatedElement>
      </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { navigateTo, useAsyncData, useLocalePath } from '#imports';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import AppButton from '@/components/UI/AppButton.vue';
import ArticleCard from '@/components/blog/ArticleCard.vue';
import { usePageContentApi } from '@/composables/usePageContentApi';
import { useResolvedLocale } from '@/composables/useResolvedLocale';
import type { StrapiArticle, StrapiArticleListPayload } from '@/types/strapi';

const { fetchArticleList } = usePageContentApi();
const resolvedLocale = useResolvedLocale();
const localePath = useLocalePath();

const { data: articleResponse, pending } = await useAsyncData<StrapiArticleListPayload | null>(
  `hero-blog-${resolvedLocale.value}`,
  async () => {
    return await fetchArticleList({
      locale: resolvedLocale.value,
      page: 1,
      pageSize: 4,
    });
  },
  { default: () => null, getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] || nuxtApp.static.data[key] }
);

const articles = computed<StrapiArticle[]>(() => articleResponse.value?.data ?? []);
const blogPath = computed(() => localePath('/blog'));

const openBlog = async (): Promise<void> => {
  await navigateTo(blogPath.value);
};
</script>
