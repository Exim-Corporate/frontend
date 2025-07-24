<template>
  <div class="process-step relative">
    <!-- Step number -->
    <div
      class="step-number flex items-center justify-center rounded-full text-text-light font-bold w-12 h-12 text-xl mb-4 mx-auto"
      :class="bgColorClass"
    >
      {{ stepNumber }}
    </div>

    <!-- Step title -->
    <h3 class="text-xl font-bold mb-2 text-center">{{ title }}</h3>

    <!-- Step icon -->
    <div class="icon-wrapper flex justify-center mb-3">
      <AppIcon
        :icon="icon"
        :size="32"
      />
    </div>

    <!-- Step description -->
    <p class="text-gray-600 dark:text-gray-300 text-center text-sm">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/UI/AppIcon.vue';

defineProps<{
  title: string;
  description: string;
  icon: string;
  stepNumber: number;
  bgColorClass: string;
}>();
</script>

<style scoped>
.process-step {
  transition: all 0.3s ease;
}

.process-step:hover {
  transform: translateY(-5px);
}

.step-number {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
</style>
