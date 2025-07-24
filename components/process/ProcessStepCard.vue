<template>
  <div class="step-card-container">
    <div
      class="step-card"
      :class="gradientClass"
      :data-aos="isLeftArrow ? 'fade-left' : 'fade-right'"
      data-aos-duration="500"
    >
      <!-- Step Number -->
      <div
        class="step-number"
        :class="colorClass"
      >
        {{ step.number }}
      </div>

      <!-- Step Content -->
      <div class="step-content">
        <!-- Icon -->
        <div
          class="icon-container"
          :class="iconBgClass"
        >
          <AppIcon
            :icon="step.icon"
            :size="36"
            :class-name="iconColorClass"
          />
        </div>

        <!-- Title and Description -->
        <h3 class="step-title">{{ $t(step.title) }}</h3>
        <p class="step-description">
          {{ $t(step.description) }}
        </p>
      </div>

      <!-- Arrow indicator for direction -->
      <div
        class="arrow-container"
        :class="{ 'left-arrow': isLeftArrow }"
      >
        <div
          class="arrow"
          :class="colorClass"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/UI/AppIcon.vue';

interface StepData {
  number: number;
  title: string;
  description: string;
  icon: string;
}

defineProps<{
  step: StepData;
  colorClass: string;
  gradientClass: string;
  iconBgClass: string;
  iconColorClass: string;
  connectorClass: string;
  isLeftArrow?: boolean;
}>();
</script>

<style scoped>
.step-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.step-card {
  position: relative;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(0.5rem);
  transition: all 0.4s ease;
  z-index: 5;
}

.step-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 0.9375rem 2.1875rem rgba(0, 0, 0, 0.15);
}

.dark .step-card:hover {
  box-shadow: 0 0.9375rem 2.1875rem rgba(0, 0, 0, 0.35);
}

.step-number {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: transform 0.3s ease;
}

.step-card:hover .step-number {
  transform: scale(1.3);
}

.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 2;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  transform: rotate(45deg);
  box-shadow: 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.05);
}

.icon-container :deep(svg) {
  transform: rotate(-45deg);
}

.step-card:hover .icon-container {
  transform: rotate(0deg);
}

.step-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.step-description {
  color: var(--text-muted, #6b7280);
}

.dark .step-description {
  color: rgba(255, 255, 255, 0.7);
}

/* Arrow styling */
.arrow-container {
  position: absolute;
  right: -0.9375rem;
  top: calc(50% - 0.9375rem);
  width: 1.875rem;
  height: 1.875rem;
  overflow: hidden;
  z-index: 6;
}

.left-arrow {
  right: auto;
  left: -0.9375rem;
}

.arrow {
  width: 100%;
  height: 100%;
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}

.left-arrow .arrow {
  clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
}
</style>
