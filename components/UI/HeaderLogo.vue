<template>
  <NuxtLink
    :to="homeRoute"
    class="flex items-center w-auto select-none"
    aria-label="Homepage"
    @click="onClickHome"
  >
    <NuxtImg
      src="/images/LogoNew.png"
      alt="AS EXIM"
      class="h-10 w-auto transition-all duration-300 hover:scale-105"
      draggable="false"
      width="278"
      height="40"
      sizes="278px"
      loading="eager"
      preload
      fetchpriority="high"
      quality="85"
      densities="x1 x2"
      format="png"
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
