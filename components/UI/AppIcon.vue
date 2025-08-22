<template>
  <Icon
    :icon="icon"
    :class="[
      'hover:scale-110',
      'transition-all',
      'duration-300',
      'cursor-pointer',
      ...mergedClasses,
    ]"
    :width="size"
    :height="size"
  />
  <!-- :color="color === 'currentColor' && !colorClass ? 'currentColor' : color" -->
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, useAttrs } from 'vue';

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

// Merge classes from prop and attrs so parent size/color classes are forwarded
const mergedClasses = computed(() => {
  const attrs = useAttrs();
  const list: string[] = [];
  if (props.className) list.push(...String(props.className).split(/\s+/));
  const attrClass = attrs.class;
  if (attrClass) {
    if (Array.isArray(attrClass)) list.push(...attrClass.map(String));
    else list.push(...String(attrClass).split(/\s+/));
  }
  return list.filter(Boolean);
});
</script>
