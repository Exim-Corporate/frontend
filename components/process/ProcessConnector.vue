<template>
  <div
    class="process-connector"
    :class="[type, colorClass]"
    :style="{ '--connector-color': getConnectorColor() }"
    :data-aos="'zoome-in'"
    :data-aos-duration="500"
  >
    <div
      v-if="type === 'horizontal'"
      class="connector-line horizontal"
    />
    <div
      v-else-if="type === 'vertical'"
      class="connector-line vertical"
    />
    <div
      v-else-if="type === 'zigzag'"
      class="zigzag-container"
    >
      <div class="zigzag-vertical" />
      <div class="zigzag-horizontal" />
      <div class="zigzag-vertical" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'vertical',
    validator: (value: string) => ['horizontal', 'vertical', 'zigzag'].includes(value),
  },
  colorClass: {
    type: String,
    default: 'connector-accent',
  },
});

const colorMap = {
  'connector-accent': '#4ca1ff',
  'connector-mint': '#32d6a0',
  'connector-yellow': '#ffd56b',
  'connector-coral': '#ff6b6b',
};

function getConnectorColor() {
  return colorMap[props.colorClass as keyof typeof colorMap] || colorMap['connector-accent'];
}
</script>

<style scoped>
.process-connector {
  position: relative;
}

.connector-line {
  position: relative;
}

/* Horizontal connector */
.horizontal {
  width: 5rem;
  height: 0.1875rem;
  background: linear-gradient(to right, var(--connector-color) 0%, transparent 95%);
}

/* Vertical connector */
.vertical {
  width: 0.1875rem;
  height: 3rem;
  margin: 0 auto;
  background: linear-gradient(to bottom, var(--connector-color) 0%, transparent 95%);
}

/* Zigzag connector */
.zigzag-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.zigzag-vertical {
  width: 0.1875rem;
  height: 2rem;
  background-color: var(--connector-color);
}

.zigzag-horizontal {
  width: 15rem;
  height: 0.1875rem;
  background: linear-gradient(to left, var(--connector-color) 0%, var(--connector-color) 100%);
}

/* Animation dots with arrow styling */
.horizontal::before,
.horizontal::after,
.vertical::before,
.vertical::after,
.zigzag-vertical::after,
.zigzag-horizontal::after {
  content: '';
  position: absolute;
  width: 0.4375rem;
  height: 0.4375rem;
  background: var(--connector-color);
  opacity: 0.8;
  clip-path: polygon(0% 0%, 75% 50%, 0% 100%);
  transform-origin: center;
}

/* Horizontal animation positioning */
.horizontal::before {
  left: 15%;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  animation: moveRightArrow 3s infinite;
}

.horizontal::after {
  left: 30%;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  animation: moveRightArrow 3s infinite 1s;
}

/* Vertical animation positioning */
.vertical::before {
  top: 30%;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  animation: moveDownArrow 3s infinite;
}

.vertical::after {
  top: 60%;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  animation: moveDownArrow 3s infinite 1s;
}

/* Zigzag animation positioning */
.zigzag-vertical:first-child::after {
  left: -0.125rem;
  top: 50%;
  transform: rotate(90deg);
  animation: moveDownArrow 3s infinite;
}

.zigzag-horizontal::after {
  top: -0.125rem;
  right: 50%;
  transform: rotate(180deg);
  animation: moveLeftArrow 3s infinite 1s;
}

.zigzag-vertical:last-child::after {
  left: -0.125rem;
  top: 50%;
  transform: rotate(90deg);
  animation: moveDownArrow 3s infinite 2s;
}

/* Arrow animations */
@keyframes moveRightArrow {
  0% {
    opacity: 0;
    transform: translate(-1.5rem, -50%) rotate(0deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(1.5rem, -50%) rotate(0deg);
  }
}

@keyframes moveDownArrow {
  0% {
    opacity: 0;
    transform: translate(-50%, -1.5rem) rotate(90deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 1.5rem) rotate(90deg);
  }
}

@keyframes moveLeftArrow {
  0% {
    opacity: 0;
    transform: translateX(1.5rem) rotate(180deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-1.5rem) rotate(180deg);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .horizontal {
    display: none !important;
  }

  .zigzag-container {
    display: none !important;
  }

  /* Ensure vertical connectors are always visible and properly sized on mobile */
  .vertical {
    display: block !important;
    height: 3rem !important;
    width: 0.1875rem !important;
    margin: 0 auto !important;
  }
}
</style>
