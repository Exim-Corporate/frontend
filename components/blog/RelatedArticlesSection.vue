<template>
  <section class="container">
    <div>
      <AnimatedElement direction="bottom">
        <BaseTitle
          tag="h2"
          variant="main"
          class-name="text-left leading-[35px] md:leading-[58px]"
        >
          {{ title }}
        </BaseTitle>
      </AnimatedElement>

      <div class="mt-3 md:mt-4">
        <AnimatedElement
          v-for="article in articles"
          :key="article.id"
          direction="bottom"
        >
          <ArticleCard
            :article="article"
          />
        </AnimatedElement>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { StrapiArticle } from '@/types/strapi';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import ArticleCard from '@/components/blog/ArticleCard.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';

interface Props {
  title: string;
  articles: StrapiArticle[];
}

defineProps<Props>();
</script>
