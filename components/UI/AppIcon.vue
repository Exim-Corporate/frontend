<template>
  <Icon
    :icon="icon"
    :class="['hover:scale-110 transition-all duration-300 cursor-pointer', className, colorClass]"
    :width="size"
    :height="size"
    :color="color === 'currentColor' && !colorClass ? 'currentColor' : color"
  />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  className: {
    type: String,
    default: '',
  },
});

// Extract color classes from className to apply separately
const colorClass = computed(() => {
  // Check if className contains Tailwind color utilities
  const colorUtilities = ['text-', 'bg-', 'fill-', 'stroke-'];
  const classNames = props.className.split(' ');

  // Filter out color-related classes
  return classNames
    .filter(cls => colorUtilities.some(utility => cls.startsWith(utility)))
    .join(' ');
});
</script>
