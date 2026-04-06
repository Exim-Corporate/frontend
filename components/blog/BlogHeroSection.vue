<template>
  <section
    id="blog-hero"
    class="mt-6 md:mt-8"
  >
    <div class="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
      <div class="mx-auto flex w-full max-w-md flex-col items-center gap-5 md:mx-0 md:w-2/5 md:items-start md:gap-8">
        <BaseTitle
          tag="h1"
          variant="main"
          class-name="w-full text-center text-[28px] leading-[110%] md:text-left md:text-[76px] md:leading-[80px]"
        >
          {{ $t('blog.hero_label') }}
        </BaseTitle>
        <BaseText
          variant="main"
          class-name="max-w-xs text-center md:max-w-md md:text-left md:text-[24px] md:leading-[29px]"
        >
          {{ $t('blog.hero_subtitle') }}
        </BaseText>
      </div>

      <NuxtLink
        v-if="article"
        :to="heroArticlePath"
        class="group isolate relative ml-auto block h-90 w-full max-w-2xl overflow-hidden rounded-[20px] md:h-112 md:w-3/5 md:max-w-none"
      >
        <NuxtImg
          v-if="heroCoverUrl"
          :src="heroCoverUrl"
          :alt="article.cover?.alternativeText || article.title"
          class="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-2500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          width="820"
          height="450"
          loading="lazy"
          quality="90"
          format="webp"
          sizes="(max-width: 767px) 100vw, 820px"
        />
        <div class="absolute inset-0 bg-linear-to-b from-black/60 to-transparent" />

        <div class="absolute left-8 right-8 top-8 flex h-11 items-center justify-between md:left-15 md:right-15 md:h-14">
          <BaseText
            variant="main"
            class-name="text-[20px] leading-[28px] text-white drop-shadow-md md:text-[32px] md:leading-[32px]"
          >
            {{ $t('blog.hero_new_post') }}
          </BaseText>
          <span class="flex h-11 w-11 items-center justify-center rounded-full bg-black transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:scale-105 group-hover:bg-black/30 md:h-14 md:w-14">
            <i class="pi pi-arrow-right text-xl text-white md:text-2xl" />
          </span>
        </div>

        <div class="absolute bottom-5 left-5 right-5 flex flex-col items-start gap-2 rounded-xl bg-white/90 p-4 md:bottom-7 md:left-7 md:right-7 md:gap-3 md:rounded-2xl md:p-8">
          <BaseTitle
            tag="h2"
            variant="subheader"
            class-name="w-full text-[16px] leading-[24px] md:text-[24px] md:leading-[32px]"
          >
            {{ article.title }}
          </BaseTitle>
          <BaseText
            variant="section"
            class-name="line-clamp-2 w-full text-[12px] leading-[20px] font-normal md:text-[18px] md:leading-[28px] md:font-light"
          >
            {{ article.description }}
          </BaseText>
          <BaseText
            variant="card12"
            class-name="w-full text-text-dark/50"
          >
            {{ formatPublishedAt(article.publishedAt) }}
          </BaseText>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocalePath, useRuntimeConfig } from '#imports';
import { useI18n } from 'vue-i18n';
import type { StrapiArticle } from '@/types/strapi';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';

interface BlogHeroSectionProps {
  article: StrapiArticle | null;
}

const props = defineProps<BlogHeroSectionProps>();
const localePath = useLocalePath();
const config = useRuntimeConfig();
const { locale } = useI18n();

const heroArticlePath = computed<string>(() => {
  if (!props.article) {
    return localePath('/blog');
  }

  return localePath(`/blog/${props.article.slug}`);
});

const heroCoverUrl = computed<string>(() => {
  if (!props.article) {
    return '';
  }

  return normalizeImageUrl(
    props.article.cover?.formats?.large?.url ?? props.article.cover?.formats?.medium?.url ?? props.article.cover?.url ?? '',
    String(config.public.strapiUrl ?? ''),
  );
});

const formatPublishedAt = (publishedAt: string): string => {
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));
};
</script>