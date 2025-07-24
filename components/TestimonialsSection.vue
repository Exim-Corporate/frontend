<template>
  <section class="py-20 overflow-hidden section-header">
    <div class="container">
      <!-- Section Header -->
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-16"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {{ $t('testimonials.title') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ $t('testimonials.subtitle') }}
        </p>
      </div>

      <!-- Testimonial Carousel -->
      <div
        data-aos="fade-in"
        data-aos-duration="500"
        class="px-0 md:px-6"
      >
        <ClientOnly>
          <TestimonialCarousel
            :testimonials="testimonials"
            :max-items-to-show="3"
          />
        </ClientOnly>
      </div>

      <!-- Optional Call-to-Action -->
      <!-- <div class="text-center mt-16">
        <AppButton
          severity="contrast"
          size="large"
          class="px-8"
        >
          Read More Success Stories
        </AppButton>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { defaultTestimonials } from '@/components/testimonials/testimonialData';
// import AppButton from '@/components/UI/AppButton.vue';

// Используем динамический импорт для ленивой загрузки
const TestimonialCarousel = defineAsyncComponent(
  () => import('@/components/testimonials/TestimonialCarousel.vue'),
);

// Use testimonials from shared data file
const testimonials = defaultTestimonials;
</script>

<style scoped>
/* Add any section-specific styling here */
</style>
