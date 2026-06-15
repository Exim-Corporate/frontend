<template>
  <section id="faq" class="w-full">
    <div class="container">
      <AnimatedElement v-if="faqSection?.title" direction="bottom" :delay="100">
        <div class="mb-10 md:mb-12">
          <BaseTitle tag="h2" variant="main" class-name="text-left lg:text-[56px]">
            {{ faqSection?.title }}
          </BaseTitle>

          <BaseText
            v-if="faqSection?.description"
            variant="main"
            className="mt-3 max-w-md text-left font-medium text-text-secondary"
          >
            {{ faqSection?.description }}
          </BaseText>
        </div>
      </AnimatedElement>

      <AnimatedElement v-if="faqItems.length" direction="bottom" :delay="180">
        <AppAccordion
          :items="faqItems"
          :multiple="false"
          :initial-value="initialValue"
          root-class="faq-accordion"
          panel-class="border-b border-black/10"
          header-class="!bg-transparent !border-none !px-0 !py-5 md:!py-6"
          content-class="!bg-transparent !border-none !px-0 !pb-5 !pt-0 md:!pb-6"
        >
          <template #expandicon>
            <Icon icon="ri:add-line" class="text-[24px] text-text-dark" />
          </template>
          <template #collapseicon>
            <Icon icon="ri:subtract-line" class="text-[24px] text-text-dark" />
          </template>

          <template #header="{ item }">
            <div class="flex w-full items-start gap-4 md:gap-6">
              <BaseTitle tag="span" variant="subheader18" class-name="w-5 shrink-0 text-left md:w-7">
                {{ getFaqItem(item).index }}
              </BaseTitle>
              <BaseTitle tag="h3" variant="subheader" class-name="text-left !leading-[120%]">
                {{ getFaqItem(item).question }}
              </BaseTitle>
            </div>
          </template>

          <template #content="{ item }">
            <div class="pl-9 md:pl-13">
              <BaseText variant="main" class-name="max-w-[920px] text-left text-text-secondary">
                {{ getFaqItem(item).answer }}
              </BaseText>
            </div>
          </template>
        </AppAccordion>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import AppAccordion from '@/components/UI/AppAccordion.vue';
import type { AppAccordionItem } from '@/components/UI/AppAccordion.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import { useI18n } from 'vue-i18n';
import { useAsyncData } from '#imports';
import { useResolvedLocale } from '@/composables/useResolvedLocale';
import type { StrapiFaqSection } from '@/types/strapi';

interface FaqAccordionItem extends AppAccordionItem {
  index: number;
  question: string;
  answer: string;
}

const { locale } = useI18n();
const resolvedLocale = useResolvedLocale();

const { data: faqSection } = await useAsyncData<StrapiFaqSection | null>(
  `faq-section-${resolvedLocale.value}`,
  async () => {
    const response = await $fetch<StrapiFaqSection | null>('/api/faq-section', {
      query: { locale: resolvedLocale.value },
    });

    return response;
  },
  { default: () => null, getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] || nuxtApp.static.data[key] }
);

const faqItems = computed<FaqAccordionItem[]>(() =>
  (faqSection.value?.accordions ?? []).map((item, i) => ({
    value: String(i),
    index: i + 1,
    question: item.title,
    answer: item.description || '',
  }))
);

const initialValue = computed<string | null>(() => faqItems.value[0]?.value ?? null);

const getFaqItem = (item: AppAccordionItem): FaqAccordionItem => item as FaqAccordionItem;
</script>

<style scoped>
:deep(.faq-accordion .p-accordionpanel:last-child) {
  border-bottom: 1px solid rgb(0 0 0 / 10%);
}
</style>
