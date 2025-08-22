<template>
  <section class="py-24 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
    <div class="container mx-auto px-4 relative z-10 text-center max-w-3xl">
      <h2
        data-aos="fade-up"
        class="text-3xl md:text-4xl font-bold mb-6"
      >
        <span class="text-gradient">{{ $t('referrals.cta.title') }}</span>
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
      >
        {{ $t('referrals.cta.subtitle') }}
      </p>
      <NuxtLink
        to="/#contact-us"
        data-aos="zoom-in"
        data-aos-delay="150"
        class="inline-block"
      >
        <AppButton
          size="large"
          variant="primary"
        >
          {{ $t('referrals.cta.button') }}
        </AppButton>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
/** CTA section for referrals page */
import AppButton from '../UI/AppButton.vue';
defineEmits<{ (e: 'cta'): void }>();
</script>
