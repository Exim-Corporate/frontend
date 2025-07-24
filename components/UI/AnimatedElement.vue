<template>
  <!-- Основной контейнер с атрибутами AOS -->
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

// Props для конфигурации анимации
const props = defineProps({
  direction: {
    type: String,
    default: 'left',
    validator: (value: string) =>
      ['left', 'right', 'top', 'bottom', 'zoom', 'fade'].includes(value),
  },
  delay: {
    type: Number,
    default: 100,
  },
  duration: {
    type: Number,
    default: 1000,
  },
});

// Определяем подходящую анимацию AOS в зависимости от направления
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
