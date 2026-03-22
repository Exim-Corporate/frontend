<template>
    <section class=" bg-white container">
      <div class="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-between">
        <AnimatedElement direction="bottom" :delay="100">
          <BaseTitle tag="h2" variant="main" class-name="text-center lg:text-left">
            {{ $t('heroBlog.title') }}
          </BaseTitle>
        </AnimatedElement>

        <AnimatedElement direction="bottom" :delay="160">
          <div class="hidden lg:block">
            <AppButton variant="gray" class="w-auto! rounded-full" :label="$t('heroBlog.viewMore')" @click="openBlog" />
          </div>
        </AnimatedElement>
      </div>

      <div class="mt-2">
        <AnimatedElement v-if="pending" direction="bottom" :delay="180">
          <BaseText variant="section" class-name="text-left text-text-secondary">
            {{ $t('blog.loading') }}
          </BaseText>
        </AnimatedElement>

        <AnimatedElement v-else-if="articles.length === 0" direction="bottom" :delay="180">
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
            <NuxtLink
              :to="getArticlePath(article)"
              class="group relative block py-8 last:border-b-0 lg:py-10"
            >
              <div class="flex flex-col gap-4 lg:grid lg:grid-cols-[180px_minmax(0,1fr)_160px_40px] lg:items-center lg:gap-5">
                <div class="relative aspect-18/10 w-full overflow-hidden rounded-[18px] lg:h-25 lg:w-45 lg:rounded-2xl lg:aspect-auto">
                  <NuxtImg
                    v-if="getCoverUrl(article)"
                    :src="getCoverUrl(article)"
                    :alt="article.cover?.alternativeText || article.title"
                    class="absolute inset-0 h-full w-full object-cover"
                    width="360"
                    height="200"
                    loading="lazy"
                    quality="85"
                    format="webp"
                    sizes="(max-width: 1023px) 100vw, 180px"
                  />
                </div>

                <div class="min-w-0">
                  <BaseTitle tag="h3" variant="subheader" class-name="text-left text-text-dark">
                    {{ article.title }}
                  </BaseTitle>
                  <BaseText variant="section" class-name="mt-2 max-w-3xl text-left text-text-secondary line-clamp-2">
                    {{ getExcerpt(article.description) }}
                  </BaseText>
                  <BaseText variant="card" class-name="mt-3 text-left text-text-secondary lg:hidden !leading-5">
                    {{ formatPublishedAt(article.publishedAt) }}
                  </BaseText>
                </div>

                <BaseText
                  variant="card"
                  class-name="hidden text-right text-text-secondary transition-opacity duration-200 lg:block lg:group-hover:opacity-0"
                >
                  {{ formatPublishedAt(article.publishedAt) }}
                </BaseText>

                <div class="hidden items-center justify-end opacity-0 transition-all duration-250 ease-out lg:flex lg:-translate-x-2 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
                  <Icon icon="ri:arrow-right-line" class="text-2xl text-text-dark" />
                </div>
              </div>

              <span class="absolute bottom-0 left-0 h-px w-full bg-black/10" />
              <span class="absolute bottom-0 left-0 hidden h-0.5 w-0 bg-text-dark transition-all duration-500 ease-out lg:block lg:group-hover:w-full" />
            </NuxtLink>
          </AnimatedElement>
        </div>
      </div>

      <div class="container">
        <AnimatedElement v-if="articles.length > 0" direction="bottom" :delay="260">
          <div class="mt-8 flex justify-center lg:hidden">
            <AppButton variant="gray" class="w-auto! rounded-full" :label="$t('heroBlog.viewMore')" @click="openBlog" />
          </div>
        </AnimatedElement>
      </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { navigateTo, useAsyncData, useLocalePath, useRuntimeConfig } from '#imports';
import { useI18n } from 'vue-i18n';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import AppButton from '@/components/UI/AppButton.vue';
import { useStrapiData } from '@/composables/useStrapiData';
import type { StrapiArticle, StrapiResponse } from '@/types/strapi';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';

const { fetchArticles } = useStrapiData();
const { locale } = useI18n();
const localePath = useLocalePath();
const config = useRuntimeConfig();

const key = computed(() => `hero-blog-${locale.value}`);

const { data: articleResponse, pending } = await useAsyncData<StrapiResponse<StrapiArticle[]> | null>(
  key,
  () =>
    fetchArticles({
      locale: locale.value,
      page: 1,
      pageSize: 4,
      populate: {
        cover: {
          fields: ['url', 'alternativeText', 'formats'],
        },
      },
      sort: ['publishedAt:desc'],
    }),
  {
    watch: [locale],
    default: () => null,
  },
);

const articles = computed<StrapiArticle[]>(() => articleResponse.value?.data ?? []);
const blogPath = computed(() => localePath('/blog'));

const getCoverUrl = (article: StrapiArticle): string => {
  return normalizeImageUrl(
    article.cover?.formats?.small?.url ?? article.cover?.formats?.thumbnail?.url ?? article.cover?.url ?? '',
    String(config.public.strapiUrl ?? ''),
  );
};

const getExcerpt = (description: string): string => {
  const normalized = description?.trim() ?? '';
  if (normalized.length <= 150) {
    return normalized;
  }

  return `${normalized.slice(0, 147).trimEnd()}...`;
};

const formatPublishedAt = (publishedAt: string): string => {
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));
};

const getArticlePath = (article: StrapiArticle): string => {
  return localePath(`/blog/${article.slug}`);
};

const openBlog = async (): Promise<void> => {
  await navigateTo(blogPath.value);
};
</script>
