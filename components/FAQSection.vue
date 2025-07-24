<template>
  <section class="py-20 overflow-hidden section-header">
    <div class="container">
      <!-- Section Header -->
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        class="text-center mb-16"
      >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {{ $t('faq.title_part1') }}<span class="text-gradient">{{ $t('faq.title_span') }}</span
          >{{ $t('faq.title_part2') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ $t('faq.subtitle') }}
        </p>
      </div>

      <!-- FAQ Content - Centered Accordion -->
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="200"
        class="max-w-4xl mx-auto"
      >
        <Accordion
          :multiple="false"
          expandIcon="pi pi-plus"
          collapseIcon="pi pi-minus"
          class="faq-accordion"
        >
          <template #collapseicon>
            <Icon icon="ri:arrow-down-s-line" />
          </template>
          <template #expandicon>
            <Icon icon="ri:arrow-up-s-line" />
          </template>
          <AccordionTab
            v-for="index in faqItems"
            :key="index"
            :header="$t(`faq.items[${index}].question`)"
          >
            <p class="text-gray-600 dark:text-gray-300">{{ $t(`faq.items[${index}].answer`) }}</p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

// Вместо хардкода текстов, используем только количество элементов FAQ
// для динамического получения из переводов
const faqItems = Array.from({ length: 5 }, (_, i) => i);
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #4ca1ff 0%, #af55ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* Custom styling for Accordion */
:deep(.faq-accordion) {
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

:deep(.p-accordion-header) {
  border: none;
}

:deep(.p-accordion-header-link) {
  padding: 1.25rem;
  border-radius: 0;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Hide default toggle icon */
:deep(.p-accordion-toggle-icon) {
  display: none;
}

/* Custom toggle icon */
:deep(.p-accordion-header-link::after) {
  content: '▼';
  font-size: 0.8rem;
  margin-left: auto;
  transition: transform 0.3s ease;
  order: 2;
}

/* Rotate arrow when tab is not active */
:deep(.p-accordion-header:not(.p-highlight) .p-accordion-header-link::after) {
  transform: rotate(-90deg);
}

:deep(.p-accordion-content) {
  padding: 1rem 1.25rem 1.5rem;
  line-height: 1.6;
}

:deep(.p-accordion-tab) {
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

:deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link) {
  background: rgba(76, 161, 255, 0.1);
  border-color: rgba(76, 161, 255, 0.2);
}

.dark
  :deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link) {
  background: rgba(76, 161, 255, 0.2);
  border-color: rgba(76, 161, 255, 0.3);
}
</style>
