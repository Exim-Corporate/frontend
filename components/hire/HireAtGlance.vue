<template>
  <section class="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-12 md:mb-16"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {{ $t('hire.atGlance.title') }}
          <span class="text-gradient">{{ $t('hire.atGlance.titleSpan') }}</span>
        </h2>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="100"
        class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
      >
        <div
          v-for="(stat, index) in stats"
          :key="stat.id || index"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 flex items-center justify-center rounded-full"
            :class="getIconBgColor(0)"
          >
            <Icon
              :icon="stat.icon || 'mdi:information-outline'"
              class="w-6 h-6 md:w-7 md:h-7"
              :class="getIconTextColor(4)"
            />
          </div>
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">
            {{ stat.label }}
          </p>
          <p class="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            {{ stat.value }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { StrapiStatItem } from '@/types/strapi';

defineProps<{
  stats: StrapiStatItem[];
}>();

const colorVariants = [
  { bg: 'bg-accent/20 dark:bg-accent/30', text: 'text-accent dark:text-accent-hover' },
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
  { bg: 'bg-accent-blue/20 dark:bg-accent-blue/40', text: 'text-accent-blue dark:text-text-light' },
  { bg: 'bg-violet-500/20 dark:bg-violet-300/30', text: 'text-violet-500 dark:text-violet-300' },
  {
    bg: 'bg-emerald-500/20 dark:bg-emerald-300/30',
    text: 'text-emerald-500 dark:text-emerald-300',
  },
  { bg: 'bg-rose-500/20 dark:bg-rose-300/30', text: 'text-rose-500 dark:text-rose-300' },
];

const getIconBgColor = (index: number) => colorVariants[index % colorVariants.length].bg;
const getIconTextColor = (index: number) => colorVariants[index % colorVariants.length].text;
</script>
