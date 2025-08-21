<template>
  <section class="relative overflow-hidden py-20 md:py-28">
    <div
      class="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 pointer-events-none"
      aria-hidden="true"
    />
    <div class="container mx-auto px-4 relative z-10 max-w-5xl text-center">
      <h1
        data-aos="fade-up"
        class="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6"
      >
        <span class="block text-gradient">
          {{ $t('referrals.hero.title_part1') }}
          <span class="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            {{ $t('referrals.hero.title_span') }}
          </span>
          {{ $t('referrals.hero.title_part2') }}
        </span>
      </h1>
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
      >
        {{ $t('referrals.hero.subtitle') }}
      </p>
      <div
        data-aos="zoom-in"
        data-aos-delay="150"
        class="flex flex-wrap justify-center gap-4"
      >
        <AppButton
          variant="primary"
          size="large"
          @click="$emit('primary-cta')"
        >
          {{ $t('referrals.hero.primary_button') }}
        </AppButton>
        <AppButton
          variant="outline"
          size="large"
          @click="$emit('secondary-cta')"
        >
          {{ $t('referrals.hero.secondary_button') }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Hero section for the referrals page.
 */
defineEmits<{
  (e: 'primary-cta' | 'secondary-cta'): void;
}>();
</script>
