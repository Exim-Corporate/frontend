<template>
  <section class="w-full min-h-150">
    <div class="container mx-auto">
      <AnimatedElement direction="bottom">
        <BaseTitle tag="h3" variant="main" class-name="text-center">
          {{ $t('caseStudies.title') }}
        </BaseTitle>
      </AnimatedElement>

      <CaseStudiesDesktop
        :studies="studies"
        :selected-study-id="selectedStudyId"
        @change="selectStudy"
      />

      <CaseStudiesMobile :studies="studies" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import CaseStudiesDesktop from '@/components/caseStudies/CaseStudiesDesktop.vue';
import CaseStudiesMobile from '@/components/caseStudies/CaseStudiesMobile.vue';
import type { CaseStudyItem } from '@/types/case-studies';

const studies: CaseStudyItem[] = [
  {
    id: 'industrial-ai',
    labelKey: 'caseStudies.items.industrialAi.label',
    titleKey: 'caseStudies.items.industrialAi.title',
    descriptionKey: 'caseStudies.items.industrialAi.description',
    image: '/images/caseStudies/industrial.webp',
    impacts: [
      {
        value: '27%',
        labelKey: 'caseStudies.items.industrialAi.impacts.downtime',
      },
      {
        value: '19%',
        labelKey: 'caseStudies.items.industrialAi.impacts.oee',
      },
    ],
  },
  {
    id: 'gen-ai',
    labelKey: 'caseStudies.items.genAi.label',
    titleKey: 'caseStudies.items.genAi.title',
    descriptionKey: 'caseStudies.items.genAi.description',
    image: '/images/caseStudies/gen.webp',
    impacts: [
      {
        value: '34%',
        labelKey: 'caseStudies.items.genAi.impacts.contentCycle',
      },
      {
        value: '22%',
        labelKey: 'caseStudies.items.genAi.impacts.timeToMarket',
      },
    ],
  },
  {
    id: 'neo-banking',
    labelKey: 'caseStudies.items.neoBanking.label',
    titleKey: 'caseStudies.items.neoBanking.title',
    descriptionKey: 'caseStudies.items.neoBanking.description',
    image: '/images/caseStudies/bank.webp',
    impacts: [
      {
        value: '41%',
        labelKey: 'caseStudies.items.neoBanking.impacts.fraudLoss',
      },
      {
        value: '18%',
        labelKey: 'caseStudies.items.neoBanking.impacts.approvalSpeed',
      },
    ],
  },
  {
    id: 'retail-analytics',
    labelKey: 'caseStudies.items.retailAnalytics.label',
    titleKey: 'caseStudies.items.retailAnalytics.title',
    descriptionKey: 'caseStudies.items.retailAnalytics.description',
    image: '/images/caseStudies/analytics.webp',
    impacts: [
      {
        value: '29%',
        labelKey: 'caseStudies.items.retailAnalytics.impacts.stockout',
      },
      {
        value: '16%',
        labelKey: 'caseStudies.items.retailAnalytics.impacts.margin',
      },
    ],
  },
];

const selectedStudyId = ref<string>(studies[0]?.id ?? '');

const selectStudy = (studyId: string) => {
  selectedStudyId.value = studyId;
};
</script>

