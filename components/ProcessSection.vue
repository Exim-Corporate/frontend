<template>
  <section class="w-full">
    <div v-if="sectionData" class="container mx-auto">
      <AnimatedElement direction="bottom" :delay="100">
        <BaseTitle tag="h2" variant="main" class-name="text-center ">
          {{ sectionData.title }}
        </BaseTitle>
      </AnimatedElement>

      <AnimatedElement v-if="sectionData.subtitle" direction="bottom" :delay="200">
        <BaseText variant="section" class-name="mt-4 text-center max-w-2xl mx-auto">
          {{ sectionData.subtitle }}
        </BaseText>
      </AnimatedElement>

      <div class="mx-auto mt-12 flex max-w-xs flex-col gap-6 md:mt-16 md:max-w-2xl md:gap-8">
        <ProcessTimelineStep
          v-for="step in sectionData.steps"
          :key="step.title"
          :title="step.title"
          :description="step.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import ProcessTimelineStep from '@/components/process/ProcessTimelineStep.vue';
import type { StrapiProcessSection } from '@/types/strapi';

interface Props {
  sectionData?: StrapiProcessSection | null;
}

defineProps<Props>();
</script>
