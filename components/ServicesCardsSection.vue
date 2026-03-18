<template>
  <section class="w-full bg-white container pb-0">
      <div class="flex flex-wrap items-stretch gap-6">
        <AnimatedElement
          v-for="(card, index) in cards"
          :key="card.titleKey"
          class="w-full min-w-0 md:flex-[1_1_calc(50%-0.75rem)] lg:flex-[1_1_calc(33.333%-1rem)]"
          direction="bottom"
          :delay="100 + index * 100"
        >
          <ServiceCard
            :image="card.image"
            :title="$t(card.titleKey)"
            :description="$t(card.descriptionKey)"
          />
        </AnimatedElement>
      </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import ServiceCard from '@/components/UI/ServiceCard.vue';

const cards = [
  {
    image: '/images/hero/Card1.png',
    titleKey: 'servicesCards.aiConsulting.title',
    descriptionKey: 'servicesCards.aiConsulting.description',
  },
  {
    image: '/images/hero/Card2.png',
    titleKey: 'servicesCards.generativeAi.title',
    descriptionKey: 'servicesCards.generativeAi.description',
  },
  {
    image: '/images/hero/Card3.png',
    titleKey: 'servicesCards.bigData.title',
    descriptionKey: 'servicesCards.bigData.description',
  },
];
</script>
