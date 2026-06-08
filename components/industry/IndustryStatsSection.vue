<template>
  <section class="container bg-white md:min-h-240.25">
    <div class="flex flex-col gap-14 md:grid md:min-h-240.25 md:grid-cols-[minmax(0,658px)_minmax(0,548px)] md:items-center md:justify-between">
      <AnimatedElement direction="bottom">
        <BaseTitle
          tag="h2"
          variant="main"
          class-name="max-w-92.5 m-auto text-center lg:m-0 lg:text-left lg:max-w-164.5"
        >
          {{ sectionData.title }}
        </BaseTitle>
      </AnimatedElement>

      <div
        v-if="statsItems.length"
        class="flex max-w-92.5 m-auto flex-col gap-14 md:max-w-137 md:gap-28"
      >
        <AnimatedElement
          v-for="(item, index) in statsItems"
          :key="item.title + '-' + index"
          direction="bottom"
        >
          <article class="flex flex-col gap-2 md:gap-4">
            <BaseText
              variant="main"
              class-name="text-left text-[36px] leading-11 font-light text-text-dark md:text-[48px] md:leading-14.5 break-words"
            >
              <AnimatedCounterValue :value="item.title" />
            </BaseText>
            <BaseText
              v-if="item.description"
              variant="main"
              class-name="text-left text-[16px] leading-7 font-light text-text-dark md:text-[20px] md:leading-8 break-words"
            >
              {{ item.description }}
            </BaseText>
          </article>
        </AnimatedElement>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AnimatedCounterValue from '@/components/UI/AnimatedCounterValue.vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import type { StrapiIndustryStats } from '@/types/strapi';

const props = defineProps<{
  sectionData: StrapiIndustryStats;
}>();

const statsItems = computed(() => props.sectionData.accordions ?? []);
</script>
