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
      class="h-8 w-auto transition-transform duration-150 hover:scale-105 md:h-9"
      draggable="false"
      width="180"
      height="42"
      sizes="(max-width: 768px) 132px, 180px"
      :preload="{ fetchPriority: 'high' }" 
      quality="85"
      format="png"
      unoptimized
    />
  </NuxtLink>
</template>
<script setup lang="ts">
import { computed } from 'vue';
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
