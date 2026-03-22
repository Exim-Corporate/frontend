<template>
  <article ref="stepRef" class="flex flex-col items-center">
    <div class="relative mb-6 flex h-31.5 w-7.5 justify-center">
      <span
        class="pointer-events-none absolute left-1/2 top-3.75 h-24 w-px -translate-x-1/2 bg-[#404040] transition-opacity duration-300"
        :class="isInView ? 'opacity-100' : 'opacity-0'"
      />

      <span
        class="process-step-dot pointer-events-none absolute left-1/2 top-3.75 size-7.5  -translate-y-1/3 rounded-full bg-text-dark transition-opacity duration-300"
        :class="isInView ? 'opacity-100 process-step-dot-enter' : 'opacity-0'"
      />
    </div>

    <BaseTitle
      tag="h3"
      variant="serifSubheader"
      :class-name="[
        'text-center justify-center font-semibold transition-all duration-500 ease-out',
        isInView ? 'translate-y-0 opacity-100 text-text-dark' : 'translate-y-4 opacity-0',
      ].join(' ')"
    >
      {{ title }}
    </BaseTitle>

    <BaseText
      variant="section"
      :class-name="[
        'mt-3 max-w-md mx-auto text-center transition-all duration-500 delay-100 ease-out',
        isInView ? 'translate-y-0 opacity-100 text-text-dark' : 'translate-y-4 opacity-0 text-light',
      ].join(' ')"
    >
      {{ description }}
    </BaseText>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useInView } from 'motion-v';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';

interface ProcessTimelineStepProps {
  title: string;
  description: string;
}

defineProps<ProcessTimelineStepProps>();

const stepRef = ref<HTMLElement | null>(null);
const isInView = useInView(stepRef, { amount: 0.95, once: true, initial: false });
</script>

<style scoped>
.process-step-dot-enter {
  animation: process-step-dot-drop 0.8s ease-out forwards;
}

@keyframes process-step-dot-drop {
  0% {
    transform: translate(-50%, -50%) translateY(0);
  }
  100% {
    transform: translate(-50%, -50%) translateY(96px);
  }
}
</style>
