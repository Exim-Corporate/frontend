<template>
  <section id="faq" class="w-full py-16 md:py-24">
    <div class="container">
      <AnimatedElement direction="bottom" :delay="100">
        <div class="mb-10 flex flex-row items-start justify-between gap-8 md:mb-12">
          <BaseTitle tag="h2" variant="main" class-name="text-left">
            {{ $t('faq.title_span') }}
          </BaseTitle>
          <BaseText variant="main" class-name="max-w-[640px] text-left md:text-right">
            {{ $t('faq.subtitle') }}
          </BaseText>
        </div>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="180">
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
                {{ $t(getFaqItem(item).questionKey) }}
              </BaseTitle>
            </div>
          </template>

          <template #content="{ item }">
            <div class="pl-9 md:pl-13">
              <BaseText variant="main" class-name="max-w-[920px] text-left text-text-secondary">
                {{ $t(getFaqItem(item).answerKey) }}
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

const FAQ_COUNT = 5;

interface FaqAccordionItem extends AppAccordionItem {
  index: number;
  questionKey: string;
  answerKey: string;
}

const faqItems = computed<FaqAccordionItem[]>(() =>
  Array.from({ length: FAQ_COUNT }, (_, i) => ({
    value: String(i),
    index: i + 1,
    questionKey: `faq.items.${i}.question`,
    answerKey: `faq.items.${i}.answer`,
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
