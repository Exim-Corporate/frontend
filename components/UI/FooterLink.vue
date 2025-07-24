<template>
  <NuxtLinkLocale
    :to="to"
    class="text-gray-300 hover:text-accent transition-colors"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
});
</script>
