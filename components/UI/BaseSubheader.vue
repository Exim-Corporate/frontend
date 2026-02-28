<template>
  <p
    :class="[
      'text-center align-middle m-0 text-black tracking-normal',
      'font-sans font-normal text-[16px] leading-[24px] md:text-[24px] md:leading-[36px]',
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