<template>
  <div
    data-aos="zoom-in"
    data-aos-duration="500"
    class="testimonial-card bg-white dark:bg-navy-blue/90 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-700 shadow-inner shadow-gray-200 dark:shadow-accent/10 h-auto"
  >
    <!-- Company info -->
    <div class="flex items-center mb-4">
      <div
        class="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mr-3 sm:mr-4 border-2 flex-shrink-0"
        :class="borderColorClass"
      >
        <img
          :src="testimonial.avatarSrc"
          :alt="`${testimonial.name} avatar`"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="min-w-0">
        <h3 class="text-base sm:text-lg font-bold text-gray-800 dark:text-white truncate">
          {{ testimonial.name }}
        </h3>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
          {{ testimonial.role }} at {{ testimonial.company }}
        </p>
      </div>
    </div>

    <!-- Rating -->
    <div class="mb-3">
      <ClientOnly>
        <StarRating
          :rating="testimonial.rating"
          :readOnly="true"
          :activeBorder="'gray'"
          :showRating="true"
          :starSize="30"
          :increment="0.1"
          :padding="0"
        />
      </ClientOnly>
    </div>

    <!-- Quote icon -->
    <div class="mb-2 text-accent dark:text-accent-hover">
      <AppIcon
        icon="material-symbols:format-quote"
        :size="20"
        class-name="sm:text-xl md:text-2xl"
      />
    </div>

    <!-- Testimonial text - auto expanding -->
    <div class="flex-1">
      <p class="text-sm sm:text-base text-gray-700 dark:text-gray-200 break-words">
        {{ testimonial.comment }}
      </p>
    </div>

    <!-- Project type -->
    <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <span class="font-medium">Project: </span>{{ testimonial.projectType }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppIcon from '@/components/UI/AppIcon.vue';
import StarRating from 'vue-star-rating';
import type { Testimonial } from './testimonialData';

const props = defineProps<{
  testimonial: Testimonial;
  index: number;
}>();

// Generate different border colors for variety based on index or provided accent color
const borderColorClass = computed(() => {
  if (props.testimonial.accentColor) {
    return `border-${props.testimonial.accentColor}`;
  }

  const colorClasses = [
    'border-accent',
    'border-accent-mint',
    'border-accent-coral',
    'border-accent-yellow',
  ];

  return colorClasses[props.index % colorClasses.length];
});
</script>

<style scoped>
.testimonial-card {
  /* backdrop-filter: blur(8px); */
}
</style>
