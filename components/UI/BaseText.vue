<template>
  <p
    :class="[
      'font-sans m-0 text-text-dark',
      'font-normal text-sm leading-none md:text-xl',
      uiClass,
    ]"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
defineProps({
  uiClass: {
    type: String,
    default: '',
  },
});
</script>