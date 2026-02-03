<template>
  <NuxtLayout>
    <div class="flex items-center justify-center px-4 py-20 min-h-[80vh]">
      <div class="max-w-2xl w-full text-center">
        <!-- Error Code -->
        <h1
          class="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6"
        >
          {{ error.statusCode }}
        </h1>

        <!-- Error Message -->
        <h2 class="text-3xl md:text-4xl font-bold text-surface-900 dark:text-surface-0 mb-4">
          {{ errorTitle }}
        </h2>

        <p class="text-lg text-surface-600 dark:text-surface-400 mb-8 max-w-xl mx-auto">
          {{ errorDescription }}
        </p>

        <!-- Action Button -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <AppButton
            :label="t('error.goHome')"
            icon="pi pi-home"
            severity="primary"
            size="large"
            @click="handleClearError"
          />
          <AppButton
            v-if="error.statusCode === 404"
            :label="t('error.goBack')"
            icon="pi pi-arrow-left"
            severity="secondary"
            outlined
            size="large"
            @click="goBack"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app';
import AppButton from '@/components/UI/AppButton.vue';

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();
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
