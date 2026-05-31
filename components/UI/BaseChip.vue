<template>
  <div
    :class="[
      'inline-flex items-center justify-center font-sans transition-colors rounded-full text-center bg-background-gray text-black text-sm md:text-xl',
      size === 'small' ? 'px-3 py-2.5 md:px-5 md:py-2.5' : size === 'large' ? 'px-7 py-4' : 'px-5 py-4',
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
    type: String as PropType<'small' | 'normal' | 'large'>,
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