<template>
  <div
    class="lg:hidden mt-8"
    data-aos="fade-up"
    data-aos-duration="350"
  >
    <Accordion :multiple="false" :active-index="activeIndex" class="case-studies-accordion" @tab-open="onTabOpen">
      <template #expandicon>
        <Icon icon="ri:add-line" class="text-[18px]" />
      </template>
      <template #collapseicon>
        <Icon icon="ri:subtract-line" class="text-[18px]" />
      </template>

      <AccordionTab
        v-for="study in studies"
        :key="study.id"
        :header="$t(study.labelKey)"
      >
        <div class="pb-3">
          <NuxtImg
            :src="study.image"
            :alt="$t(study.titleKey)"
            width="385"
            height="240"
            class="h-60 w-full rounded-[14px] object-cover"
            sizes="100vw"
          />

          <BaseTitle tag="h3" variant="subheader" class-name="mt-4 text-left text-text-dark">
            {{ $t(study.titleKey) }}
          </BaseTitle>

          <BaseText variant="card" class-name="mt-2 text-left text-text-secondary">
            {{ $t(study.descriptionKey) }}
          </BaseText>

          <div class="mt-5">
            <BaseTitle tag="h4" variant="subheader" class-name="text-left text-text-dark">
              {{ $t('caseStudies.impactTitle') }}
            </BaseTitle>

            <div class="mt-3 grid grid-cols-2 gap-5">
              <div v-for="impact in study.impacts" :key="impact.labelKey">
                <BaseTitle tag="p" variant="subheader" class-name="text-left text-text-dark">
                  {{ impact.value }}
                </BaseTitle>
                <BaseText variant="card" class-name="mt-1 text-left text-text-secondary">
                  {{ $t(impact.labelKey) }}
                </BaseText>
              </div>
            </div>
          </div>

          <AppButton class="mt-7 max-w-42.5">
            {{ $t('caseStudies.cta') }}
          </AppButton>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import AppButton from '@/components/UI/AppButton.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import type { CaseStudyItem } from '@/types/case-studies';

defineProps<{
  studies: CaseStudyItem[];
}>();

const activeIndex = 0;

const onTabOpen = (_event: unknown) => {
  // Keep explicit handler for parity with other accordion sections and future analytics hooks.
};
</script>

<style scoped>
:deep(.case-studies-accordion .p-accordion-header-link) {
  background: transparent;
  border: none;
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid color-mix(in oklab, currentColor 14%, transparent);
}

:deep(.case-studies-accordion .p-accordion-header-text) {
  text-align: left;
}

:deep(.case-studies-accordion .p-accordion-content) {
  background: transparent;
  border: none;
  padding-left: 0;
  padding-right: 0;
}
</style>
