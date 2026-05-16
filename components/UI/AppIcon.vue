<template>
  <Icon
    :icon="resolvedIcon"
    :class="[
      'hover:scale-110',
      'transition-all',
      'duration-300',
      'cursor-pointer',
      ...mergedClasses,
    ]"
    :width="size"
    :height="size"
    :style="{ color }"
  />
</template>

<script setup lang="ts">
import { Icon, loadIcon } from '@iconify/vue';
import { computed, ref, useAttrs, watch } from 'vue';

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
  fallbackIcon: {
    type: String,
    default: 'nrk:media-404-notfound',
  },
});

const resolvedIcon = ref(props.icon);
let requestId = 0;

watch(
  () => [props.icon, props.fallbackIcon],
  async ([iconName, fallbackIcon]) => {
    const currentRequestId = ++requestId;
    const icon = String(iconName || '').trim();
    const fallback = String(fallbackIcon || '').trim() || 'nrk:media-404-notfound';

    if (!icon) {
      resolvedIcon.value = fallback;
      return;
    }

    try {
      await loadIcon(icon);
      if (currentRequestId === requestId) {
        resolvedIcon.value = icon;
      }
    } catch {
      if (currentRequestId === requestId) {
        resolvedIcon.value = fallback;
      }
    }
  },
  { immediate: true },
);

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
