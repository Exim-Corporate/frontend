<template>
  <div
    data-aos="zoom-in"
    data-aos-duration="500"
    class="feature-card group shadow-2xl dark:bg-navy-blue shadow-background/30 dark:shadow-accent relative flex flex-col items-center md:items-baseline p-8 rounded-2xl overflow-hidden"
    :class="[orientation === 'vertical' ? 'h-full' : '', shadowColor]"
  >
    <!-- Geometric background shapes -->
    <div
      class="absolute -z-10 -bottom-6 -right-6 w-40 h-40 rounded-full bg-blue-400 dark:bg-tech-gradient opacity-10 group-hover:w-full group-hover:h-full group-hover:scale-200 dark:opacity-100 transition-all duration-500"
    />

    <!-- Icon -->
    <div
      class="mb-6 p-4 rounded-xl w-fit transition-all duration-300 group-hover:shadow-md"
      :class="[iconBgColor, iconTextColor]"
    >
      <AppIcon
        :icon="icon"
        :size="iconSize"
      />
    </div>

    <!-- Content -->
    <h3 class="text-xl font-bold mb-3">{{ title }}</h3>
    <p class="text-text-dark dark:text-text-light">
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/UI/AppIcon.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  orientation: {
    type: String,
    default: 'vertical',
    validator: (value: string) => ['vertical', 'horizontal'].includes(value),
  },
  iconSize: {
    type: Number,
    default: 32,
  },
  iconBgColor: {
    type: String,
    default: 'bg-accent/10 dark:bg-navy-blue/30',
  },
  iconTextColor: {
    type: String,
    default: 'text-accent dark:text-accent',
  },
  shadowColor: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.feature-card {
  transition: transform 0.3s ease-in-out;
}

.feature-card:hover {
  transform: scale(1.05);
}
</style>
