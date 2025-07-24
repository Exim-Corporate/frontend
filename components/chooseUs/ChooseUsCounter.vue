<template>
  <div class="container py-20">
    <h2 class="text-center">{{ $t('chooseUs.counter') }}</h2>
    <div
      ref="counterSection"
      data-aos="fade-up"
      data-aos-duration="500"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
    >
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="flex flex-col items-center justify-center"
      >
        <div class="flex text-4xl font-bold transition-all duration-200 ease-out">
          {{ animatedValues[index] }}
          <span
            v-if="stat.suffix"
            class="text-2xl m-auto"
            >{{ stat.suffix ?? '' }}</span
          >
        </div>
        <p class="mt-2 text-xl font-bold">
          {{ $t(stat.label) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { animateValue } from '@/utils/animate';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const stats: Stat[] = [
  { label: 'chooseUs.counter_desc1', value: 200, suffix: '+' },
  { label: 'chooseUs.counter_desc2', value: 48 },
  { label: 'chooseUs.counter_desc3', value: 120, suffix: '+' },
  { label: 'chooseUs.counter_desc4', value: 100, suffix: '%' },
];

const animatedValues = ref(stats.map(() => 0));
const hasAnimated = ref(false);
const counterSection = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const startCounters = () => {
  if (hasAnimated.value) return; // Prevent running animation multiple times

  hasAnimated.value = true;
  stats.forEach((stat, i) => {
    setTimeout(() => {
      animateValue(stat.value, v => {
        animatedValues.value[i] = v;
      });
    }, i * 100); // Small staggered delay between counters for better visual effect
  });
};

onMounted(() => {
  // Create intersection observer to detect when counter section is visible
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.value) {
          startCounters();
        }
      });
    },
    { threshold: 0.1 },
  ); // Start animation when at least 10% of the element is visible

  // Start observing the counter section
  if (counterSection.value) {
    observer.observe(counterSection.value);
  }
});

onBeforeUnmount(() => {
  // Clean up observer when component is unmounted
  if (observer && counterSection.value) {
    observer.unobserve(counterSection.value);
    observer.disconnect();
  }
});
</script>

<style scoped>
/* Optional: smooth transition look */
</style>
