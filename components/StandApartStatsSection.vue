<template>
  <section class="container w-full bg-white">
    <template v-if="sectionData">
      <AnimatedElement direction="bottom">
        <BaseTitle tag="h2" variant="main" class-name="text-center lg:text-left">
          {{ sectionData.title }}
        </BaseTitle>
      </AnimatedElement>

      <div class="mt-8 md:hidden">
        <AnimatedElement
          v-for="(item, index) in sectionData.stats"
          :key="`${item.label}-${index}`"
          direction="bottom"
        >
          <div class="flex items-center lg:items-start gap-4 border-b border-black/10 py-5 last:border-b-0">
            <BaseText variant="card" className="w-1/2 text-left text-text-dark">
              {{ item.label }}
            </BaseText>
            <BaseTitle tag="p" variant="main" class-name="w-1/2 text-center text-text-dark">
              <AnimatedCounterValue :value="item.value" />
            </BaseTitle>
          </div>
        </AnimatedElement>
      </div>

      <div class="mt-12 hidden md:block">
        <AnimatedElement
          v-for="(item, index) in sectionData.stats"
          :key="`desktop-${item.label}-${index}`"
          direction="bottom"
        >
          <div class="flex lg:items-start gap-8 border-b border-black/10 py-7 lg:py-8 last:border-b-0">
            <BaseText variant="card" class-name="w-1/2 text-left text-text-dark">
              {{ item.label }}
            </BaseText>
            <BaseTitle tag="p" variant="main" class-name="w-1/2 text-left text-text-dark">
              <AnimatedCounterValue :value="item.value" />
            </BaseTitle>
          </div>
        </AnimatedElement>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import AnimatedCounterValue from '@/components/UI/AnimatedCounterValue.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import type { StrapiStandApartStatsSection } from '@/types/strapi';

interface Props {
  sectionData?: StrapiStandApartStatsSection | null;
}

defineProps<Props>();
</script>
