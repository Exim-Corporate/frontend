<template>
  <section class="pb-20 overflow-hidden section-header">
    <div class="container">
      <!-- Section Header -->
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-16"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {{ $t('chooseUs.title') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ $t('chooseUs.subtitle') }}
        </p>
      </div>

      <!-- Feature Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          v-for="(feature, index) in features"
          :key="index"
          :title="$t(feature.title)"
          :icon="feature.icon"
          :iconBgColor="getIconBgColor(index)"
          :iconTextColor="getIconTextColor(index)"
        >
          {{ $t(feature.description) }}
        </FeatureCard>
      </div>
      <ChooseUsCounter />
    </div>
  </section>
</template>

<script setup lang="ts">
import FeatureCard from '@/components/chooseUs/FeatureCard.vue';

// Feature data using translation keys
const features = [
  {
    icon: 'material-symbols:bolt',
    title: 'chooseUs.feat1_title',
    description: 'chooseUs.feat1_desc',
  },
  {
    icon: 'material-symbols:public',
    title: 'chooseUs.feat3_title',
    description: 'chooseUs.feat3_desc',
  },
  {
    icon: 'material-symbols:handyman',
    title: 'chooseUs.feat2_title',
    description: 'chooseUs.feat2_desc',
  },
  {
    icon: 'material-symbols:check-circle',
    title: 'chooseUs.feat4_title',
    description: 'chooseUs.feat4_desc',
  },
  {
    icon: 'material-symbols:chat-bubble',
    title: 'chooseUs.feat5_title',
    description: 'chooseUs.feat5_desc',
  },
  {
    icon: 'material-symbols:shield',
    title: 'chooseUs.feat6_title',
    description: 'chooseUs.feat6_desc',
  },
];

// Generate different background and text colors for variety
const colorVariants = [
  {
    bg: 'bg-accent/20 dark:bg-accent/30',
    text: 'text-accent dark:text-accent-hover',
  },
  {
    bg: 'bg-accent-mint/20 dark:bg-accent-mint/30',
    text: 'text-accent-mint dark:text-accent-mint-hover',
  },
  {
    bg: 'bg-accent-yellow/20 dark:bg-accent-yellow/30',
    text: 'text-accent-yellow dark:text-accent-yellow-hover',
  },
  {
    bg: 'bg-accent-coral/20 dark:bg-accent-coral/30',
    text: 'text-accent-coral dark:text-accent-coral-hover',
  },
  {
    bg: 'bg-accent-blue/20 dark:bg-accent-blue/40',
    text: 'text-accent-blue dark:text-text-light',
  },
  {
    bg: 'bg-violet-500/20 dark:bg-violet-300/30',
    text: 'text-violet-500 dark:violet-300/30',
  },
];

const getIconBgColor = (index: number) => {
  const variant = colorVariants[index % colorVariants.length];
  return variant.bg;
};

const getIconTextColor = (index: number) => {
  const variant = colorVariants[index % colorVariants.length];
  return variant.text;
};
</script>
