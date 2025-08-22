<template>
  <section
    class="relative min-h-screen w-full overflow-hidden flex items-top md:items-start justify-center"
  >
    <!-- Background image (same path and settings as HeroSection) -->
    <NuxtImg
      :src="'/images/referral/hero.webp'"
      alt="Hero background"
      format="webp"
      quality="80"
      class="absolute inset-0 w-full h-full object-cover z-0"
      preload
    />

    <!-- Overlay matching project gradient -->
    <div class="absolute inset-0 z-10 bg-tech-gradient mix-blend-hard-light opacity-80" />

    <!-- Content: centered on mobile, slightly above center on md+ -->
    <div class="relative z-20 px-6 sm:px-10 max-w-3xl text-center pt-[25vh]">
      <h1 class="text-5xl lg:text-6xl font-extrabold mb-4 text-text-dark dark:text-text-light">
        <div>{{ $t('referrals.hero.title_part1') }}</div>
        <div>
          <span class="text-gradient">{{ $t('referrals.hero.title_span') }}</span>
        </div>
      </h1>

      <p class="text-base md:text-lg text-gray-100 mb-6">
        {{ $t('referrals.hero.subtitle') }}
      </p>

      <div class="flex justify-center">
        <AppButton
          severity="contrast"
          size="large"
          icon-position="right"
          icon="mingcute:arrow-right-fill"
          @click="onPrimaryCta"
        >
          {{ $t('referrals.hero.primary_button') }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import AppButton from '@/components/UI/AppButton.vue';

const emits = defineEmits<{
  (e: 'primary-cta'): void;
}>();

function onPrimaryCta() {
  emits('primary-cta');
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #4ca1ff 0%, #ca8dff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
</style>
