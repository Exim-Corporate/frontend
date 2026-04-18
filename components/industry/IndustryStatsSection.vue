<template>
  <section class="container bg-white md:min-h-240.25">
    <div class="flex flex-col gap-14 md:grid md:min-h-240.25 md:grid-cols-[minmax(0,658px)_minmax(0,548px)] md:items-center md:justify-between">
      <BaseTitle
        tag="h2"
        variant="main"
        class-name="max-w-92.5 text-left leading-[120%] md:max-w-164.5 md:leading-12"
      >
        {{ sectionData.title }}
      </BaseTitle>

      <div class="flex max-w-92.5 flex-col gap-14 md:max-w-137 md:gap-28">
        <article
          v-for="(item, index) in sectionData.accordions"
          :key="item.title + '-' + index"
          class="flex flex-col gap-2 md:gap-4"
        >
          <BaseText
            variant="main"
            class-name="text-left text-[36px] leading-11 font-light text-text-dark md:text-[48px] md:leading-14.5"
          >
            {{ item.title }}
          </BaseText>
          <BaseText
            v-if="item.description"
            variant="main"
            class-name="text-left text-[16px] leading-7 font-light text-text-dark md:text-[20px] md:leading-8"
          >
            {{ item.description }}
          </BaseText>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import type { StrapiIndustryStats } from '@/types/strapi';

defineProps<{
  sectionData: StrapiIndustryStats;
}>();
</script>
