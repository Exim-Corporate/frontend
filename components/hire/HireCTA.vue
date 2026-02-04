<template>
  <section class="cta-banner relative overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
      <NuxtImg
        src="/images/bg.webp"
        alt="CTA background"
        format="webp"
        quality="80"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-navy-blue/90 to-background/80 z-0" />

    <div class="container relative z-10 mx-auto py-16 md:py-20 px-4">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center max-w-4xl mx-auto"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text-light">
          {{ $t('hire.cta.title') }}
          <span class="text-gradient">{{ $t('hire.cta.titleSpan') }}</span>
        </h2>

        <p class="text-base md:text-lg text-text-light mb-8 md:mb-10 max-w-3xl mx-auto">
          {{ $t('hire.cta.subtitle') }}
        </p>

        <AppButton
          severity="contrast"
          size="large"
          scrollToContact
          class="transition-transform duration-300 hover:scale-105"
        >
          {{ $t('hire.cta.button') }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from '@/components/UI/AppButton.vue';
</script>

<style scoped>
.cta-banner {
  min-height: 50vh;
  display: flex;
  align-items: center;
  position: relative;
  isolation: isolate;
}
</style>
