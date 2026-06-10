<template>
  <div class="app-shell flex flex-col min-h-screen">
    <Toast />
    <ContactModal />
    <AppHeader :key="locale" />
    <main class="grow">
      <slot />
    </main>
    <AppScrollToTop />
    <LazyAppFooter :key="locale" />
    <!-- <DevTools /> -->
  </div>
</template>

<script setup lang="ts">
import AppScrollToTop from '@/components/UI/AppScrollToTop.vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
// Code splitting with lazy loading for better performance
// Nuxt auto-imports components
</script>
