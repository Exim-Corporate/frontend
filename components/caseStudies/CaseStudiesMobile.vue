<template>
  <div
    class="lg:hidden mt-8"
    data-aos="fade-up"
    data-aos-duration="350"
  >
    <AppAccordion
      :items="accordionItems"
      :multiple="false"
      :initial-value="activeValue"
      root-class="case-studies-accordion"
      header-class="!bg-transparent !border-none !rounded-none !px-0"
      content-class="!bg-transparent !border-none !px-0"
    >
      <template #expandicon>
        <Icon icon="ri:add-line" class="text-[18px]" />
      </template>
      <template #collapseicon>
        <Icon icon="ri:subtract-line" class="text-[18px]" />
      </template>

      <template #header="{ item }">
        <span class="w-full text-left font-sans text-[20px] text-text-dark">{{ $t(item.study.labelKey) }}</span>
      </template>

      <template #content="{ item }">
        <div class="pb-3">
          <div class="relative h-60 w-full overflow-hidden rounded-[14px]">
            <NuxtImg
              :src="item.study.image"
              :alt="$t(item.study.titleKey)"
              width="385"
              height="240"
              class="absolute inset-0 h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 385px"
              loading="lazy"
              quality="85"
              format="webp"
            />
          </div>

          <BaseTitle tag="h3" variant="subheader" class-name="mt-4 text-left text-text-dark">
            {{ $t(item.study.titleKey) }}
          </BaseTitle>

          <BaseText variant="card" class-name="mt-2 text-left text-text-secondary">
            {{ $t(item.study.descriptionKey) }}
          </BaseText>

          <div class="mt-5">
            <BaseTitle tag="h4" variant="subheader" class-name="text-left text-text-dark">
              {{ $t('caseStudies.impactTitle') }}
            </BaseTitle>

            <div class="mt-3 grid grid-cols-2 gap-5">
              <div v-for="impact in item.study.impacts" :key="impact.labelKey">
                <BaseTitle tag="p" variant="subheader" class-name="text-left text-text-dark">
                  {{ impact.value }}
                </BaseTitle>
                <BaseText variant="card" class-name="mt-1 text-left text-text-secondary">
                  {{ $t(impact.labelKey) }}
                </BaseText>
              </div>
            </div>
          </div>

          <AppButton class="mt-7 whitespace-nowrap min-w-fit!" @click="openStudy(item.study.linkTo)">
            {{ $t('caseStudies.cta') }}
          </AppButton>
        </div>
      </template>
    </AppAccordion>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useLocalePath } from '#imports';
import { computed } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import AppAccordion from '@/components/UI/AppAccordion.vue';
import type { AppAccordionItem } from '@/components/UI/AppAccordion.vue';
import AppButton from '@/components/UI/AppButton.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import type { CaseStudyItem } from '@/types/case-studies';

const props = defineProps<{
  studies: CaseStudyItem[];
}>();

interface CaseStudiesAccordionItem extends AppAccordionItem {
  study: CaseStudyItem;
}

const accordionItems = computed<CaseStudiesAccordionItem[]>(() => {
  return props.studies.map((study, index) => ({
    value: String(study.id ?? index),
    study,
  }));
});

const activeValue = computed<string | null>(() => accordionItems.value[0]?.value ?? null);

const localePath = useLocalePath();

const openStudy = (to: string) => {
  navigateTo(localePath(to));
};
</script>

<style scoped>
:deep(.case-studies-accordion .p-accordionpanel) {
  border-bottom: 1px solid color-mix(in oklab, currentColor 14%, transparent);
}

:deep(.case-studies-accordion .p-accordionpanel:last-child) {
  border-bottom: 0;
}
</style>
