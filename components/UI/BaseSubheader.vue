<template>
  <p
    :class="[
      'text-center align-middle m-0 text-black tracking-normal',
      'font-sans font-normal text-[16px] leading-6 md:text-[24px] md:leading-9',
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