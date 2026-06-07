<template>
  <section ref="sectionRef" class="w-full bg-white">
    <div v-if="sectionData" class="container">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <AnimatedElement direction="bottom">
          <BaseTitle tag="h2" variant="main" class-name="text-center text-text-dark">
            {{ sectionData.title }}
          </BaseTitle>
        </AnimatedElement>
        <AnimatedElement v-if="sectionData.subtitle" direction="bottom">
          <BaseText variant="section" class-name="max-w-xl text-center">
            {{ sectionData.subtitle }}
          </BaseText>
        </AnimatedElement>
      </div>

      <div class="mt-10 md:hidden">
        <AnimatedElement
          v-for="testimonial in visibleTestimonials"
          :key="`mobile-${testimonial.id}`"
          direction="bottom"
        >
          <div class="border-b border-form-border last:border-b-0">
            <TestimonialCard :testimonial="testimonial" />
          </div>
        </AnimatedElement>
      </div>

      <div class="mt-14 hidden md:block">
        <div class="mx-auto max-w-5xl">
          <AnimatedElement
            v-for="testimonial in visibleTestimonials"
            :key="`desktop-${testimonial.id}`"
            direction="bottom"
          >
            <div class="border-b border-form-border last:border-b-0">
              <TestimonialCard :testimonial="testimonial" />
            </div>
          </AnimatedElement>
        </div>
      </div>

      <AnimatedElement v-if="canToggle" direction="bottom">
        <div class="mt-10 flex justify-center md:mt-12">
          <AppButton
            variant="gray"
            class="w-auto! rounded-full test"
            :label="toggleLabel"
            @click="handleToggle"
          />
        </div>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import AppButton from '@/components/UI/AppButton.vue';
import TestimonialCard from '@/components/testimonials/TestimonialCard.vue';
import type { StrapiTestimonialCard, StrapiTestimonialsSection } from '@/types/strapi';

const INITIAL_TESTIMONIALS_COUNT = 3;
const TESTIMONIALS_STEP = 3;

interface Props {
  sectionData?: StrapiTestimonialsSection | null;
}

const props = defineProps<Props>();

const sectionRef = ref<HTMLElement | null>(null);
const visibleCount = ref(INITIAL_TESTIMONIALS_COUNT);
const { t } = useI18n();

const fallbackAvatarSrcs = [
  '/images/testimonials/marcusV.jpg',
  '/images/testimonials/elenaR.jpg',
  '/images/testimonials/sarahL.jpg',
  '/images/testimonials/thomasD.jpg',
  '/images/testimonials/chloeM.jpg',
];

const testimonials = computed(() => {
  const cards = props.sectionData?.cards ?? [];

  return cards.map((card: StrapiTestimonialCard, index: number) => ({
    id: index + 1,
    name: card.name,
    role: card.role,
    company: card.company,
    avatarSrc: fallbackAvatarSrcs[index % fallbackAvatarSrcs.length] ?? fallbackAvatarSrcs[0],
    rating: card.rating,
    comment: card.comment,
    projectType: card.projectType,
  }));
});

const visibleTestimonials = computed(() => testimonials.value.slice(0, visibleCount.value));

const canToggle = computed(() => testimonials.value.length > INITIAL_TESTIMONIALS_COUNT);

const hasMoreTestimonials = computed(() => visibleCount.value < testimonials.value.length);

const toggleLabel = computed(() =>
  hasMoreTestimonials.value ? t('testimonials.viewMore') : t('testimonials.viewLess'),
);

const scrollToSectionTop = async () => {
  await nextTick();
  sectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const handleToggle = async () => {
  if (hasMoreTestimonials.value) {
    visibleCount.value = Math.min(visibleCount.value + TESTIMONIALS_STEP, testimonials.value.length);
    return;
  }

  visibleCount.value = INITIAL_TESTIMONIALS_COUNT;
  await scrollToSectionTop();
};
</script>
