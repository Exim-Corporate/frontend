<template>
  <div
    data-aos="zoom-in"
    data-aos-duration="500"
    class="flex flex-col sm:flex-row items-center sm:space-x-4 bg-background/20 dark:bg-background/50 p-4 rounded-xl"
  >
    <div
      class="w-12 h-12 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-3 sm:mb-0"
      :class="expertise.iconBgClass"
    >
      <!-- <AppIcon
        :icon="expertise.icon"
        :className="`text-xl ${expertise.iconClass}`"
      /> -->
    </div>
    <div class="text-center sm:text-left">
      <h4 class="text-lg font-medium text-white">{{ $t(expertise.title) }}</h4>
      <p class="text-sm text-gray-300 mt-1">{{ $t(expertise.description) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// import AppIcon from '@/components/UI/AppIcon.vue';

defineProps({
  expertise: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
@media (max-width: 640px) {
  div[class*='flex'] {
    padding: 1rem;
  }
}
</style>
