<template>
  <div class="app-shell overflow-hidden">
    <Analytics mode="production" />
    <NuxtLayout>
      <NuxtPage
        :page-key="route => route.fullPath.split('?')[0]"
        :transition="{
          name: 'page',
          mode: 'out-in',
          onBeforeEnter
        }"
      />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { Analytics } from '@vercel/analytics/nuxt';

const { t, locale, finalizePendingLocaleChange } = useI18n();
const route = useRoute();

const onBeforeEnter = async () => {
  // Wait for the locale change to finish before entering new route
  finalizePendingLocaleChange();
};
onMounted(() => {
  // AOS is already initialized by the nuxt-aos module
  // This is just a placeholder in case we need custom initialization
});

// Динамический canonical URL для текущей страницы
const canonicalUrl = computed(() => {
  const baseUrl = 'https://www.exim.eu.com';
  return `${baseUrl}${route.fullPath}`;
});

// Set up dynamic meta description based on the current locale
useHead(() => ({
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
  base: {
    // href: 'https://www.exim.eu.com',
  },
  htmlAttrs: {
    lang: locale.value,
  },
}));
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  /* opacity: 0; */
  /* transform: translateX(-100%); */
  filter: blur(1rem);
}
</style>
