<template>
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-12"
      >
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {{ $t('hire.services.title') }}
        </h2>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="100"
        class="max-w-4xl mx-auto"
      >
        <Tabs :value="0">
          <TabList>
            <Tab
              v-for="(service, index) in services"
              :key="service.id"
              :value="index"
            >
              {{ service.title }}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              v-for="(service, index) in services"
              :key="service.id"
              :value="index"
            >
              <div class="p-6">
                <p class="text-gray-600 dark:text-gray-300 mb-6">
                  {{ service.description }}
                </p>
                <NuxtLink
                  v-if="service.link"
                  :to="service.link"
                  class="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium"
                >
                  {{ $t('hire.services.learnMore') }}
                  <Icon
                    icon="mdi:arrow-right"
                    class="w-5 h-5"
                  />
                </NuxtLink>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import type { StrapiServiceTab } from '@/types/strapi';

defineProps<{
  services: StrapiServiceTab[];
}>();
</script>

<style scoped>
:deep(.p-tabs-nav) {
  justify-content: center;
  border: none;
  gap: 0.5rem;
}

:deep(.p-tab) {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(.p-tabpanels) {
  background: transparent;
  padding: 0;
}

:deep(.p-tabpanel) {
  background: var(--surface-card);
  border-radius: 1rem;
  margin-top: 1.5rem;
}
</style>
