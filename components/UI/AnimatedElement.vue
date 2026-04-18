<template>
  <div
    :data-aos="getAosAnimation"
    :data-aos-duration="duration"
    :data-aos-delay="delay"
    :data-aos-once="true"
    class="animated-element"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  direction: {
    type: String,
    default: 'bottom',
    validator: (value: string) =>
      ['left', 'right', 'top', 'bottom', 'zoom', 'fade'].includes(value),
  },
  delay: {
    type: Number,
    default: 100,
  },
  duration: {
    type: Number,
    default: 300,
  },
});

const getAosAnimation = computed(() => {
  switch (props.direction) {
    case 'left':
      return 'fade-right';
    case 'right':
      return 'fade-left';
    case 'top':
      return 'fade-down';
    case 'bottom':
      return 'fade-up';
    case 'zoom':
      return 'zoom-in';
    case 'fade':
      return 'fade';
    default:
      return 'fade';
  }
});
</script>

<style scoped>
.animated-element {
  position: relative;
}
</style>
