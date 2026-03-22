<template>
  <article class="flex w-full flex-col gap-5 py-8 md:gap-6 md:py-10">
    <div class="flex items-center gap-1">
      <span
        v-for="(fillWidth, starIndex) in starFillWidths"
        :key="`${testimonial.id}-${starIndex}`"
        class="relative h-4.5 w-4.5 overflow-hidden"
      >
        <AppIcon
          icon="tdesign:star-filled"
          :size="18"
          class-name="absolute left-0 top-0 text-form-border-hover"
        />
        <span
          class="absolute left-0 top-0 h-full overflow-hidden"
          :style="{ width: `${fillWidth}%` }"
        >
          <AppIcon
            icon="tdesign:star-filled"
            :size="18"
            class-name="absolute left-0 top-0 text-text-dark"
          />
        </span>
      </span>
    </div>

    <BaseText variant="main" class-name="max-w-4xl text-left text-text-dark">
      "{{ testimonial.comment }}"
    </BaseText>

    <div class="flex items-center gap-3">
      <NuxtImg
        :src="testimonial.avatarSrc"
        :alt="`${testimonial.name} avatar`"
        class="md:h-10 md:w-10 rounded-full object-contain"
        loading="lazy"
        width="40"
        height="40"
        quality="85"
        format="webp"
      />
      <div class="min-w-0">
        <BaseTitle tag="p" variant="subheader16" className="font-semibold text-left text-text-dark">
          {{ testimonial.name }}
        </BaseTitle>
        <BaseText variant="card" class-name="text-left text-text-secondary !leading-5 mt-1">
          {{ testimonial.role }} {{ $t('testimonials.at') }} {{ testimonial.company }}
        </BaseText>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppIcon from '@/components/UI/AppIcon.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import type { Testimonial } from './testimonialData';

const props = defineProps<{
  testimonial: Testimonial;
}>();

const TOTAL_STARS = 5;

const starFillWidths = computed<number[]>(() => {
  const normalizedRating = Math.max(0, Math.min(TOTAL_STARS, props.testimonial.rating));

  return Array.from({ length: TOTAL_STARS }, (_, index) => {
    const fill = Math.max(0, Math.min(1, normalizedRating - index));
    return fill * 100;
  });
});
</script>
