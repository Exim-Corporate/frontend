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
            v-for="(article, index) in articles"
            :key="article.id"
            direction="bottom"
            :delay="180 + index * 60"
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
import { navigateTo, useLazyAsyncData, useLocalePath } from '#imports';
import { useI18n } from 'vue-i18n';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import AppButton from '@/components/UI/AppButton.vue';
import ArticleCard from '@/components/blog/ArticleCard.vue';
import { useStrapiData } from '@/composables/useStrapiData';
import type { StrapiArticle, StrapiResponse } from '@/types/strapi';

const { fetchArticles } = useStrapiData();
const { locale } = useI18n();
const localePath = useLocalePath();

const key = computed(() => `hero-blog-${locale.value}`);

const { data: articleResponse, pending } = useLazyAsyncData<StrapiResponse<StrapiArticle[]> | null>(
  key,
  async () => {
    let response = await fetchArticles({
      locale: locale.value,
      page: 1,
      pageSize: 4,
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
        page: 1,
        pageSize: 4,
        populate: {
          cover: {
            fields: ['url', 'alternativeText', 'formats'],
          },
        },
        sort: ['publishedAt:desc'],
      });
    }

    return response;
  },
  {
    server: false,
    immediate: true,
    watch: [locale],
    default: () => null,
  },
);

const articles = computed<StrapiArticle[]>(() => articleResponse.value?.data ?? []);
const blogPath = computed(() => localePath('/blog'));

const openBlog = async (): Promise<void> => {
  await navigateTo(blogPath.value);
};
</script>
