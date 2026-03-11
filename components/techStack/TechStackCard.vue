<template>
  <div
    class="group w-full max-w-45 h-40 md:max-w-62.5 md:h-50 rounded-3xl bg-background-gray p-4 md:p-6 flex flex-col border border-transparent justify-center transition-all duration-300 hover:border-text-dark/15 hover:border"
  >
    <div class="flex items-center justify-center h-16">
      <Icon :icon="technology.icon" class="text-[42px] md:text-[56px] text-text-dark grayscale transition-transform duration-300 group-hover:scale-115" />
    </div>
    <BaseText variant="card" class-name="text-center mt-3 md:mt-6 line-clamp-2">{{ technology.name }}</BaseText>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import BaseText from '@/components/UI/BaseText.vue';
import type { TechStackTechnology } from '@/types/tech-stack';

defineProps<{
  technology: TechStackTechnology;
}>();
</script>
