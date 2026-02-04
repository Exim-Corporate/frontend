<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-12"
      >
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {{ $t('hire.benefits.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {{ $t('hire.benefits.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(benefit, index) in benefits"
          :key="benefit.id"
          data-aos="fade-up"
          data-aos-duration="500"
          :data-aos-delay="index * 100"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
        >
          <div class="w-14 h-14 mb-4 flex items-center justify-center rounded-lg bg-accent/10">
            <Icon
              :icon="benefit.icon || 'mdi:check-circle'"
              class="w-7 h-7 text-accent"
            />
          </div>
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {{ benefit.title }}
          </h3>
          <p
            v-if="benefit.description"
            class="text-gray-600 dark:text-gray-400 text-sm"
          >
            {{ benefit.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { StrapiBenefit } from '@/types/strapi';

defineProps<{
  benefits: StrapiBenefit[];
}>();
</script>
