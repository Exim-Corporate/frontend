<template>
  <section ref="sectionRef" class="w-full bg-white">
    <div class="container">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <AnimatedElement direction="bottom" :delay="100">
          <BaseTitle tag="h2" variant="main" class-name="text-center text-text-dark">
            {{ $t('testimonials.title') }}
          </BaseTitle>
        </AnimatedElement>
        <AnimatedElement direction="bottom" :delay="180">
          <BaseText variant="section" class-name="max-w-xl text-center">
            {{ $t('testimonials.subtitle') }}
          </BaseText>
        </AnimatedElement>
      </div>

      <div class="mt-10 md:hidden">
        <AnimatedElement
          v-for="(testimonial, index) in visibleTestimonials"
          :key="`mobile-${testimonial.id}`"
          direction="bottom"
          :delay="140 + index * 60"
        >
          <div class="border-b border-form-border last:border-b-0">
            <TestimonialCard :testimonial="testimonial" />
          </div>
        </AnimatedElement>
      </div>

      <div class="mt-14 hidden md:block">
        <div class="mx-auto max-w-5xl">
          <AnimatedElement
            v-for="(testimonial, index) in visibleTestimonials"
            :key="`desktop-${testimonial.id}`"
            direction="bottom"
            :delay="220 + index * 70"
          >
            <div class="border-b border-form-border last:border-b-0">
              <TestimonialCard :testimonial="testimonial" />
            </div>
          </AnimatedElement>
        </div>
      </div>

      <AnimatedElement v-if="canToggle" direction="bottom" :delay="260">
        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton
            variant="gray"
            class="w-auto! rounded-full test"
            :label="$t(toggleLabelKey)"
            @click="handleToggle"
          />
        </div>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import AppButton from '@/components/UI/AppButton.vue';
import TestimonialCard from '@/components/testimonials/TestimonialCard.vue';
import { defaultTestimonials } from '@/components/testimonials/testimonialData.ts';

const INITIAL_TESTIMONIALS_COUNT = 3;
const TESTIMONIALS_STEP = 3; 

const sectionRef = ref<HTMLElement | null>(null);
const visibleCount = ref(INITIAL_TESTIMONIALS_COUNT);

const testimonials = defaultTestimonials;

const visibleTestimonials = computed(() => testimonials.slice(0, visibleCount.value));

const canToggle = computed(() => testimonials.length > INITIAL_TESTIMONIALS_COUNT);

const hasMoreTestimonials = computed(() => visibleCount.value < testimonials.length);

const toggleLabelKey = computed(() => {
  return hasMoreTestimonials.value ? 'testimonials.viewMore' : 'testimonials.viewLess';
});

const scrollToSectionTop = async () => {
  await nextTick();
  sectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const handleToggle = async () => {
  if (hasMoreTestimonials.value) {
    visibleCount.value = Math.min(visibleCount.value + TESTIMONIALS_STEP, testimonials.length);
    return;
  }

  visibleCount.value = INITIAL_TESTIMONIALS_COUNT;
  await scrollToSectionTop();
};
</script>
