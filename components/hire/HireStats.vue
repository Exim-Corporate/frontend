<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container">
      <h2
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
      >
        {{ $t('hire.stats.title') }}
      </h2>

      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="100"
        class="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
        >
          <div
            class="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent/10"
          >
            <Icon
              :icon="stat.icon"
              class="w-6 h-6 text-accent"
            />
          </div>
          <p class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ stat.value }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ stat.label }}
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
</script>
