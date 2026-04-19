<template>
  <NuxtLayout>
    <main class="min-h-screen bg-white">
      <section class="container flex min-h-screen flex-col justify-center">
        <div class="mx-auto flex w-fit max-w-full flex-col items-stretch">
          <AnimatedElement>
            <BaseTitle
              tag="h1"
              variant="main"
              class-name="text-center text-[56px] leading-[0.9] md:text-[96px] lg:text-[124px]"
            >
              {{ errorTitle }}
            </BaseTitle>
          </AnimatedElement>

          <AnimatedElement :delay="90">
            <div class="mt-8 flex w-full flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-10">
              <AppButton
                class="error-home-button rounded-full! border-0! bg-text-dark! px-5! py-3! hover:bg-text-dark/95!"
                @click="handleClearError"
              >
                {{ t('error.goHome') }}
              </AppButton>

              <BaseText
                variant="section"
                class-name="max-w-md text-left text-text-secondary md:ml-auto md:text-right"
              >
                {{ errorDescription }}
              </BaseText>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { clearError, useHead } from '#app';
import type { NuxtError } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '#i18n';
import AppButton from '@/components/UI/AppButton.vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import { useSEO } from '@/composables/useSEO';

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();
const localePath = useLocalePath();

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

const handleClearError = () => {
  clearError({ redirect: localePath('/') });
};

useSEO({
  title: errorTitle.value,
  description: errorDescription.value,
  type: 'website',
});

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

<style scoped>
.error-home-button :deep(.p-button-label) {
  background: none;
  color: white;
  -webkit-text-fill-color: white;
}
</style>
