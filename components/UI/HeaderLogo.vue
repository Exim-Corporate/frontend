<template>
  <NuxtLink
    :to="homeRoute"
    class="flex items-center w-auto select-none"
    aria-label="Homepage"
    @click="onClickHome"
  >
    <NuxtImg
      src="/images/logoPic.webp"
      alt="Logo"
      class="h-full w-15 transition-all duration-300 filter-[var(--logo-filter)]"
      draggable="false"
    />
    <NuxtImg
      src="/images/logoText.webp"
      alt="Logo text"
      class="h-10 w-auto transition-all duration-300 filter-[var(--logo-filter)]"
      draggable="false"
    />
  </NuxtLink>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'nuxt/app';
const { locale } = useI18n();
const router = useRouter();
const homeRoute = computed(() => (locale.value === 'en' ? '/' : `/${locale.value}`));
function onClickHome(e: Event) {
  e.preventDefault();
  router.push(homeRoute.value).then(() => {
    if (import.meta.client) {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  });
}
</script>
