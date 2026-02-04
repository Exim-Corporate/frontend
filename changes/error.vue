<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="max-w-2xl w-full text-center">
      <!-- Error Code -->
      <h1 class="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        {{ error.statusCode }}
      </h1>

      <!-- Error Message -->
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ errorTitle }}
      </h2>

      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        {{ errorDescription }}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <AppButton
          label="Go Home"
          icon="pi pi-home"
          severity="primary"
          @click="handleClearError"
        />
        <AppButton
          v-if="error.statusCode === 404"
          label="Go Back"
          icon="pi pi-arrow-left"
          severity="secondary"
          outlined
          @click="goBack"
        />
      </div>

      <!-- Additional Help -->
      <div
        v-if="error.statusCode === 404"
        class="mt-12 text-sm text-gray-500 dark:text-gray-400"
      >
        <p>{{ t('error.help') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const { t, locale } = useI18n();
const localePath = useLocalePath();

// Computed error title based on status code
const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return t('error.404.title');
    case 500:
      return t('error.500.title');
    default:
      return t('error.default.title');
  }
});

// Computed error description
const errorDescription = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return t('error.404.description');
    case 500:
      return t('error.500.description');
    default:
      return props.error.message || t('error.default.description');
  }
});

// Handle clear error and navigate to home
const handleClearError = () => {
  clearError({ redirect: localePath('/') });
};

// Handle go back
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    handleClearError();
  }
};

// SEO Meta
useHead({
  title: errorTitle.value,
  meta: [
    {
      name: 'description',
      content: errorDescription.value,
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
});
</script>
