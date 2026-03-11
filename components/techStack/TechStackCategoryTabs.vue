<template>
  <div class="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-[32px] leading-none">
    <button
      v-for="section in sections"
      :key="section.id"
      type="button"
      class="group relative cursor-pointer transition-opacity duration-300 pb-1"
      :class="selectedSectionId === section.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'"
      @click="$emit('change', section.id)"
    >
      <BaseText variant="main" class-name="text-center break-all leading-tight md:max-w-[180px]">{{ $t(section.sectionKey) }}</BaseText>
      <span
        class="absolute left-0 -bottom-px h-px bg-text-dark transition-all duration-300"
        :class="selectedSectionId === section.id ? 'w-full' : 'w-0'"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import BaseText from '@/components/UI/BaseText.vue';
import type { TechStackSectionItem } from '@/types/tech-stack';

defineProps<{
  sections: TechStackSectionItem[];
  selectedSectionId: string;
}>();

defineEmits<{
  change: [sectionId: string];
}>();
</script>
