<template>
  <button
    v-show="visible"
    type="button"
    :aria-label="$t('footer.scrollToTop')"
    class="fixed right-4 bottom-6 z-9999 flex h-13 w-13 items-center justify-center rounded-full border border-text-light/20 bg-text-dark/92 text-text-light transition-opacity duration-300 hover:scale-105 hover:border-text-light/50 hover:text-text-light sm:right-6"
    @click="scrollToTop"
  >
    <AppIcon
      icon="material-symbols:arrow-upward-alt-rounded"
      :size="22"
      class-name="text-current"
    />
  </button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import AppIcon from '@/components/UI/AppIcon.vue';

const visible = ref(false);
let ticking = false;

// Throttled scroll handler using requestAnimationFrame to avoid forced reflows
const updateVisibility = (): void => {
  if (!ticking) {
    requestAnimationFrame(() => {
      visible.value = window.scrollY > 200;
      ticking = false;
    });
    ticking = true;
  }
};

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility);
});
</script>
