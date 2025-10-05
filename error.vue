<template>
  <NuxtLayout>
    <div
      class="flex min-h-screen flex-col items-center justify-center bg-background-light px-4 text-center dark:bg-background-dark"
    >
      <h1 class="text-8xl font-bold mb-4">{{ error.statusCode }}</h1>
      <p class="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-aut">
        {{ errorMessage }}
      </p>
      <NuxtLink
        to="/"
        class="rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-primary-dark"
      >
        {{ t('errors.go_home') }}
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { NuxtError } from 'nuxt/app';
const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();

const errorMessage = computed(() => {
  if (props.error.statusCode === 404) {
    return t('errors.not_found', 'Sorry, the page you are looking for could not be found.');
  }
  return t('errors.generic', 'An unexpected error occurred.');
});

useSEO({
  title: `${props.error.statusCode} - ${errorMessage.value}`,
  description: 'Error page',
});
</script>
