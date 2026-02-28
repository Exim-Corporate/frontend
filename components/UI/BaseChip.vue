<template>
  <div
    :class="[
      'inline-flex items-center justify-center font-sans transition-colors rounded-full text-center',
      size === 'large' ? 'px-7 py-4' : 'px-5 py-4',
      variant === 'dark' ? 'bg-black text-text-light' : 'bg-background-gray text-text-dark',
      uiClass,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  size: {
    type: String as PropType<'normal' | 'large'>,
    default: 'normal',
  },
  variant: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  uiClass: {
    type: String,
    default: '',
  },
});
</script>