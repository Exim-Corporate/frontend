<template>
  <section class="container">
    <div v-if="breadcrumbItems?.length" class="mb-6">
      <AppBreadcrumb :items="breadcrumbItems" />
    </div>

    <div class="md:hidden">
      <AnimatedElement direction="bottom">
        <div class="mt-5 flex flex-col items-center gap-5 text-center">
          <BaseTitle tag="h2" variant="main" class-name="leading-[1.1] font-semibold">
            {{ sectionData.title }}
          </BaseTitle>
          <BaseText v-if="sectionData.description" variant="section" class-name="leading-6 text-text-dark">
            {{ sectionData.description }}
          </BaseText>
        </div>
      </AnimatedElement>

      <AnimatedElement direction="bottom">
        <div class="mt-12">
          <AppAccordion
            v-model="activeValue"
            :items="accordionItems"
            :multiple="false"
            root-class="industry-description-accordion"
            panel-class="!border-b !border-form-border"
            header-class="!bg-transparent !border-none !rounded-none !px-0 !py-4"
            content-class="!bg-transparent !border-none !px-0 !pb-5"
          >


          <template #header="{ item }">
            <span class="w-full text-left font-sans text-[20px] font-normal leading-6 text-text-dark">
              {{ getAccordionFromItem(item)?.title || item.title || '' }}
            </span>
          </template>

          <template #content="{ item }">
            <div>
              <BaseText variant="section" class-name="text-left leading-7 text-text-dark">
                {{ getAccordionFromItem(item)?.description || item.content || '' }}
              </BaseText>
              <div class="mt-3">
                <ServiceCard
                  :image="getCardImage(getCardFromItem(item))"
                  :title="getCardFromItem(item)?.title || ''"
                  :description="getCardFromItem(item)?.description || ''"
                />
      
              </div>
            </div>
          </template>
          </AppAccordion>
        </div>
      </AnimatedElement>
    </div>

    <div class="hidden md:block">
      <AnimatedElement direction="bottom">
        <BaseTitle tag="h2" variant="main" class-name="mt-10 text-left">
          {{ sectionData.title }}
        </BaseTitle>
      </AnimatedElement>
      <AnimatedElement
        v-if="sectionData.description"
        direction="bottom"
      >
        <BaseText variant="section" class-name="mt-6 text-left text-[20px] leading-6 text-text-dark">
          {{ sectionData.description }}
        </BaseText>
      </AnimatedElement>

      <div class="mt-22 grid grid-cols-[minmax(0,632px)_minmax(0,640px)] justify-between gap-8">
        <AnimatedElement direction="bottom">
          <div>
            <AppAccordion
              v-model="activeValue"
              :items="accordionItems"
              :multiple="false"
              root-class="industry-description-accordion"
              panel-class="!border-b !border-form-border"
              header-class="!bg-transparent !border-none !rounded-none !px-0 !py-5"
              content-class="!bg-transparent !border-none !px-0 !pb-8"
            >
              <template #header="{ item }">
                <span class="w-full text-left font-sans text-[24px] font-normal leading-7.25 text-text-dark">
                  {{ getAccordionFromItem(item)?.title || item.title || '' }}
                </span>
              </template>

              <template #content="{ item }">
                <BaseText variant="section" class-name="max-w-137 text-left text-[18px] leading-7 text-text-dark/90">
                  {{ getAccordionFromItem(item)?.description || item.content || '' }}
                </BaseText>
              </template>
            </AppAccordion>
          </div>
        </AnimatedElement>

        <AnimatedElement direction="bottom">
          <ServiceCard
            :image="getCardImage(activeCard)"
            :title="activeCard?.title || ''"
            :description="activeCard?.description || ''"
          />
        </AnimatedElement>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';
import type { BreadcrumbItem } from '@/components/AppBreadcrumb.vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import AppAccordion from '@/components/UI/AppAccordion.vue';
import type { AppAccordionItem } from '@/components/UI/AppAccordion.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';
import type {
  StrapiIndustryDescription,
  StrapiIndustryDescriptionAccordion,
  StrapiIndustryDescriptionCard,
} from '@/types/strapi';
import ServiceCard from '@/components/UI/ServiceCard.vue';

interface IndustryDescriptionAccordionItem extends AppAccordionItem {
  raw: StrapiIndustryDescriptionAccordion;
}

const props = defineProps<{
  sectionData: StrapiIndustryDescription;
  breadcrumbItems?: BreadcrumbItem[];
}>();

const accordionItems = computed<IndustryDescriptionAccordionItem[]>(() => {
  return (props.sectionData.accordions || []).map((item, index) => ({
    value: String(index),
    title: item.title,
    content: item.description,
    raw: item,
  }));
});

const activeValue = ref<string | null>(accordionItems.value[0]?.value ?? null);

watch(
  accordionItems,
  (items) => {
    if (!items.length) {
      activeValue.value = null;
      return;
    }

    const hasCurrent = items.some((item) => item.value === activeValue.value);
    if (!hasCurrent) {
      activeValue.value = items[0].value;
    }
  },
  { deep: true },
);

const activeItem = computed<IndustryDescriptionAccordionItem | null>(() => {
  if (!accordionItems.value.length) {
    return null;
  }

  const found = accordionItems.value.find((item) => item.value === activeValue.value);
  return found || accordionItems.value[0] || null;
});

const activeCard = computed<StrapiIndustryDescriptionCard | null>(() => {
  return activeItem.value?.raw.card || null;
});

const fallbackImage = '/images/expertise/Hero.webp';

const getCardImage = (card?: StrapiIndustryDescriptionCard | null): string => {
  const image = card?.image;
  const imageUrl = image?.url
    ? normalizeImageUrl(image.url)
    : fallbackImage;
  return imageUrl;
};

const getAccordionFromItem = (item: AppAccordionItem): StrapiIndustryDescriptionAccordion | null => {
  const match = accordionItems.value.find((accordionItem) => accordionItem.value === item.value);
  return match?.raw || null;
};

const getCardFromItem = (item: AppAccordionItem): StrapiIndustryDescriptionCard | null => {
  return getAccordionFromItem(item)?.card || null;
};
</script>

<style scoped>
:deep(.industry-description-accordion .p-accordionheader) {
  border: none;
}

:deep(.industry-description-accordion .p-accordioncontent-content) {
  border: none;
  padding: 0;
}

:deep(.industry-description-accordion .p-accordionpanel) {
  background: transparent;
}
</style>
