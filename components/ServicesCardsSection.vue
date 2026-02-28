<template>
  <section class="w-full bg-white py-16 md:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedElement
          v-for="(card, index) in cards"
          :key="card.titleKey"
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
