<template>
  <component
    :is="tag"
    :class="[
      'font-serif font-semibold text-center align-middle m-0 text-black tracking-normal',
      'text-[28px] leading-[110%] md:text-[56px] md:leading-[100%]',
      uiClass,
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    default: 'h1',
  },
  uiClass: {
    type: String,
    default: '',
  },
});
</script>