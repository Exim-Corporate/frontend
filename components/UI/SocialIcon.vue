<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="bg-gray-700 hover:bg-accent p-2 rounded-full transition-colors"
    :aria-label="name"
  >
    <AppIcon
      :icon="icon"
      :size="24"
      className="text-white"
    />
  </a>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>
