<template>
  <div class="app-shell flex flex-col min-h-screen">
    <Toast />
    <ContactModal />
    <AppHeader />
    <main class="grow">
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
