<template>
  <div class="group relative w-full aspect-square rounded-4xl overflow-hidden cursor-pointer">
    <img
      :src="image"
      :alt="title"
      class="absolute inset-0 w-full h-full object-cover"
    >

    <div class="absolute inset-14.5 transition-opacity duration-300 group-hover:opacity-0">
      <BaseSubheader ui-class="text-white drop-shadow-lg !text-left">
        {{ title }}
      </BaseSubheader>
    </div>

    <div class="absolute inset-7.5 rounded-[28px] bg-card-overlay p-6 md:p-10 flex flex-col gap-4 md:gap-6 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 origin-center">
      <BaseSubheader ui-class="text-text-dark !text-left">
        {{ title }}
      </BaseSubheader>
      <p class="leading-7">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSubheader from '@/components/UI/BaseSubheader.vue';

defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
