<template>
  <section class="container pt-20 md:pt-24">
    <AnimatedElement direction="bottom" :delay="100">
      <div class="mx-auto flex max-w-2xl flex-col items-center text-center">
        <BaseTitle
          tag="h2"
          variant="main"
          class-name="text-[40px] leading-[1.12] font-normal md:text-[52px]"
        >
          {{ sectionData.title }}
        </BaseTitle>

        <BaseText
          v-if="sectionData.description"
          variant="section"
          class-name="mt-4 max-w-132 text-center text-text-secondary"
        >
          {{ sectionData.description }}
        </BaseText>
      </div>
    </AnimatedElement>

    <div class="mt-10 flex flex-col gap-5 md:mt-12 md:flex-row md:flex-wrap md:gap-6">
      <AnimatedElement
        v-for="(card, index) in normalizedCards"
        :key="`${card.title}-${index}`"
        direction="bottom"
        :delay="140 + index * 70"
        class="w-full md:flex-[1_1_calc(50%-0.75rem)]"
      >
        <article
          class="h-full rounded-4xl border border-text-dark/8 p-6 md:p-8"
          :class="card.styleVariant === 'pattern' ? 'bg-text-light/92' : 'bg-text-light/84'"
        >
          <BaseTitle
            tag="h3"
            variant="subheader"
            class-name="text-left text-text-dark"
          >
            {{ card.title }}
          </BaseTitle>

          <BaseText
            v-if="card.description"
            variant="section"
            class-name="mt-4 text-left text-text-secondary"
          >
            {{ card.description }}
          </BaseText>

          <div v-if="card.points.length" class="mt-6 flex flex-col gap-3">
            <div
              v-for="(point, pointIndex) in card.points"
              :key="`${card.title}-point-${pointIndex}`"
              class="flex items-start gap-2.5"
            >
              <AppIcon
                icon="mdi:check-circle-outline"
                class-name="mt-0.5 h-5 w-5 shrink-0 text-text-dark"
              />

              <BaseText
                variant="section"
                class-name="text-left text-text-dark"
              >
                {{ point.text }}
              </BaseText>
            </div>
          </div>

          <div
            v-if="card.exampleText"
            class="mt-6 rounded-3xl border border-text-dark/10 bg-text-light px-5 py-4"
          >
            <BaseText
              variant="section"
              class-name="text-left font-semibold uppercase tracking-widest text-text-dark"
            >
              {{ card.exampleLabel || 'EXAMPLE' }}
            </BaseText>

            <BaseText
              variant="section"
              class-name="mt-2 text-left text-text-secondary"
            >
              {{ card.exampleText }}
            </BaseText>
          </div>
        </article>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import AppIcon from '@/components/UI/AppIcon.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import type { StrapiReferralProgramCard, StrapiReferralProgramSection } from '@/types/strapi';

const props = defineProps<{
  sectionData: StrapiReferralProgramSection;
}>();

const normalizedCards = computed<StrapiReferralProgramCard[]>(() => {
  return (props.sectionData.cards || []).map(card => ({
    ...card,
    points: card.points || [],
  }));
});
</script>
