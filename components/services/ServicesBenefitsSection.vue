<template>
  <section class="w-full">
    <div class="container">
      <AnimatedElement direction="bottom" :delay="100">
        <BaseTitle
          tag="h2"
          variant="main"
          class-name="max-w-92.5 m-auto text-center lg:m-0 lg:text-left lg:max-w-164.5"
        >
          {{ sectionData.title }}
        </BaseTitle>
      </AnimatedElement>

      <div class="mt-14 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-3 md:gap-x-28 md:gap-y-24">
        <AnimatedElement
          v-for="(item, index) in normalizedItems"
          :key="`${item.headline}-${index}`"
          direction="bottom"
          :delay="130 + index * 60"
        >
          <article class="flex flex-col gap-2">
            <BaseText
              variant="main"
              class-name="mb-2 text-left text-[36px] leading-11 font-light text-text-dark md:text-[40px] md:leading-12 md:font-normal"
            >
              {{ item.headline }}
            </BaseText>

            <BaseText
              v-if="item.description"
              variant="section"
              class-name="text-left leading-7 font-light text-text-dark"
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
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import type { StrapiServiceBenefitItem, StrapiServiceBenefitsSection } from '@/types/strapi';

const props = defineProps<{
  sectionData: StrapiServiceBenefitsSection;
}>();

const normalizedItems = computed<StrapiServiceBenefitItem[]>(() => {
  return (props.sectionData.items || []).slice(0, 6);
});
</script>
