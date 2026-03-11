<template>
  <div class="group relative w-full aspect-square rounded-4xl overflow-hidden cursor-pointer bg-card-bg">
    <img
      :src="image"
      :alt="title"
      class="absolute inset-0 w-full h-full object-cover"
    >

    <div class="absolute inset-10 transition-opacity duration-300 group-hover:opacity-0">
      <BaseTitle variant="subheader" class-name="text-white drop-shadow-lg text-left line-clamp-2">
        {{ title }}
      </BaseTitle>
    </div>

    <div class="absolute inset-5 rounded-[28px] bg-card-overlay p-6 md:p-10 flex flex-col gap-4 md:gap-6 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 origin-center overflow-hidden">
      <BaseTitle variant="subheader" class-name="text-text-dark text-left">
        {{ title }}
      </BaseTitle>
      <BaseText variant="card" class-name="text-text-dark">
        {{ description }}
      </BaseText>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';

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
