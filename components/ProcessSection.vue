<template>
  <section class="w-full">
    <div class="container mx-auto">
      <AnimatedElement direction="bottom" :delay="100">
        <BaseTitle tag="h2" variant="main" class-name="text-center ">
          {{ $t('process.title') }}
        </BaseTitle>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="200">
        <BaseText variant="section" class-name="mt-4 text-center max-w-2xl mx-auto">
          {{ $t('process.subtitle') }}
        </BaseText>
      </AnimatedElement>

      <div class="mx-auto mt-12 flex max-w-xs flex-col gap-6 md:mt-16 md:max-w-2xl md:gap-8">
        <ProcessTimelineStep
          v-for="step in steps"
          :key="step.titleKey"
          :title="$t(step.titleKey)"
          :description="$t(step.descriptionKey)"
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

interface ProcessStepItem {
  titleKey: string;
  descriptionKey: string;
}

const steps: ProcessStepItem[] = [
  {
    titleKey: 'process.steps.estimation.title',
    descriptionKey: 'process.steps.estimation.description',
  },
  {
    titleKey: 'process.steps.discovery.title',
    descriptionKey: 'process.steps.discovery.description',
  },
  {
    titleKey: 'process.steps.design.title',
    descriptionKey: 'process.steps.design.description',
  },
  {
    titleKey: 'process.steps.development.title',
    descriptionKey: 'process.steps.development.description',
  },
  {
    titleKey: 'process.steps.continuousSupport.title',
    descriptionKey: 'process.steps.continuousSupport.description',
  },
];
</script>
