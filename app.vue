<template>
  <div class="overflow-x-hidden">
    <Analytics />
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in',
          onBeforeEnter,
        }"
      />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { Analytics } from '@vercel/analytics/nuxt';

const { t, locale, finalizePendingLocaleChange } = useI18n();

const onBeforeEnter = async () => {
  // finalizePendingLocaleChange больше не нужен в Nuxt 3 + @nuxtjs/i18n
  finalizePendingLocaleChange();
};

// Initialize AOS on client-side only
onMounted(() => {
  // AOS is already initialized by the nuxt-aos module
  // This is just a placeholder in case we need custom initialization
});

// Set up dynamic meta description based on the current locale
useHead(() => ({
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
  ],
  base: {
    url: 'https://www.exim.eu.com',
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
