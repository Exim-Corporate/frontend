<template>
  <section class="container w-full bg-white">
    <div class="mb-6 flex items-start justify-between gap-4 md:mb-12 md:items-center lg:mb-16">
      <AnimatedElement direction="bottom" :delay="100">
        <BaseTitle tag="h2" variant="main" class-name="max-w-[180px] text-left md:max-w-none">
          {{ $t('industryExpertise.title') }}
        </BaseTitle>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="160">
        <AppButton
          @click="scrollToContact"
        >
            {{ $t('industryExpertise.button') }}
      </AppButton>
      </AnimatedElement>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
      <AnimatedElement
        v-for="(card, index) in cards"
        :key="card.key"
        direction="bottom"
        :delay="180 + index * 50"
      >
        <ServiceCard
          :image="card.image"
          :title="$t(card.titleKey)"
          :description="$t(card.descriptionKey)"
          :tags="card.tagKeys.map((key) => $t(key))"
        />
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import ServiceCard from '@/components/UI/ServiceCard.vue';

interface IndustryExpertiseItem {
  key: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  tagKeys: string[];
}

const cards: IndustryExpertiseItem[] = [
  {
    key: 'healthcare',
    titleKey: 'industryExpertise.cards.healthcare.title',
    descriptionKey: 'industryExpertise.cards.healthcare.description',
    image: '/images/expertise/1.png',
    tagKeys: [
      'industryExpertise.tags.clinicalDecisionSupport',
      'industryExpertise.tags.patientDataAnalytics',
    ],
  },
  {
    key: 'logistics',
    titleKey: 'industryExpertise.cards.logistics.title',
    descriptionKey: 'industryExpertise.cards.logistics.description',
    image: '/images/expertise/2.png',
    tagKeys: [
      'industryExpertise.tags.aiSupplyChain',
      'industryExpertise.tags.blockchainSaas',
    ],
  },
  {
    key: 'retail',
    titleKey: 'industryExpertise.cards.retail.title',
    descriptionKey: 'industryExpertise.cards.retail.description',
    image: '/images/expertise/3.png',
    tagKeys: [
      'industryExpertise.tags.aiPricing',
      'industryExpertise.tags.retailAnalytics',
    ],
  },
  {
    key: 'finance',
    titleKey: 'industryExpertise.cards.finance.title',
    descriptionKey: 'industryExpertise.cards.finance.description',
    image: '/images/expertise/4.png',
    tagKeys: [
      'industryExpertise.tags.fraudDetection',
      'industryExpertise.tags.riskAnalytics',
    ],
  },
  {
    key: 'education',
    titleKey: 'industryExpertise.cards.education.title',
    descriptionKey: 'industryExpertise.cards.education.description',
    image: '/images/expertise/5.png',
    tagKeys: [
      'industryExpertise.tags.adaptiveLearning',
      'industryExpertise.tags.learningAnalytics',
    ],
  },
  {
    key: 'manufacturing',
    titleKey: 'industryExpertise.cards.manufacturing.title',
    descriptionKey: 'industryExpertise.cards.manufacturing.description',
    image: '/images/expertise/6.png',
    tagKeys: [
      'industryExpertise.tags.predictiveMaintenance',
      'industryExpertise.tags.qualityAnalytics',
    ],
  },
];

const scrollToContact = () => {
  document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
</script>