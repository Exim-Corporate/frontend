<template>
  <div class="flex items-center w-auto">
    <NuxtImg
      src="/images/logoPic.webp"
      alt="Logo"
      class="h-full w-15 cursor-pointer transition-all duration-300 filter-[var(--logo-filter)]"
      @click="navigateToHome"
    />
    <NuxtImg
      src="/images/logoText.webp"
      alt="Logo text"
      class="h-10 w-auto cursor-pointer transition-all duration-300 filter-[var(--logo-filter)]"
      @click="navigateToHome"
    />
  </div>
</template>
<script setup lang="ts">
import { useNavigateHome } from '@/composables/useNavigateHome';
const { navigateToHome } = useNavigateHome();
</script>
<style lang=""></style>
