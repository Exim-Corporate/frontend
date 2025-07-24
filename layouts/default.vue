<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppScrollToTop />
    <LazyAppFooter />
    <!-- <DevTools /> -->
  </div>
</template>

<script setup lang="ts">
import AppScrollToTop from '@/components/UI/AppScrollToTop.vue';
// Code splitting with lazy loading for better performance
// Nuxt auto-imports components
</script>
