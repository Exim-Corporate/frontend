<template>
  <button
    v-show="visible"
    aria-label="Scroll to top"
    class="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-10 h-10 rounded-lg bg-white/30 dark:bg-navy-blue/40 border border-navy-blue/20 dark:border-white/10 backdrop-blur-md shadow-[0_0_24px_4px_theme('colors.accent')] dark:shadow-[0_0_24px_4px_theme('colors.accent')] drop-shadow-[0_0_16px_theme('colors.accent')] cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110 hover:ring-4 hover:ring-accent/40 focus:outline-none"
    @click="scrollToTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-6 h-6 text-accent drop-shadow-[0_0_8px_theme('colors.accent')]"
    >
      <polyline points="6 15 12 9 18 15" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(false);

const onScroll = () => {
  visible.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
/* Glass effect and shadow handled by Tailwind classes */
</style>
