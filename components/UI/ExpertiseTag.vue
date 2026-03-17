<template>
  <Tag
    :value="label"
    rounded
    :class="[
      'border bg-transparent px-3 py-1 font-sans text-[14px] leading-[1.1] md:text-[18px] shadow-none',
      inverted
        ? 'border-text-dark/10 text-text-dark'
        : 'border-text-light/60 text-text-light',
    ]"
  />
</template>

<script setup lang="ts">
import Tag from 'primevue/tag';

interface ExpertiseTagProps {
  label: string;
  inverted?: boolean;
}

withDefaults(defineProps<ExpertiseTagProps>(), {
  inverted: false,
});
</script>