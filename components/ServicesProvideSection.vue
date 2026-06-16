<template>
  <section v-if="sectionData" class="w-full bg-white container">
      <div class="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16">
        <div class="flex flex-col gap-4">
          <div class="animate-fade-up services-animate delay-100">
            <BaseTitle tag="h2" variant="main" class-name="text-center md:text-left">
              {{ sectionData.title }}
            </BaseTitle>
          </div>
          <div class="animate-fade-up services-animate delay-200">
            <BaseText variant="section" class-name="text-center md:text-left max-w-md">
              {{ sectionData.subtitle }}
            </BaseText>
          </div>
        </div>
        <div class="animate-fade-up services-animate delay-200">
          <AppButton :label="sectionData.buttonLabel" @click="openContactModal('cta-button')" />
        </div>
      </div>

      <div class="flex flex-wrap gap-6">
        <div
          v-for="(card, index) in cards"
          :key="card.slug"
          class="animate-fade-up services-animate w-full min-w-0 max-h-80 xl:max-h-full md:flex-[1_1_calc(50%-0.75rem)] xl:flex-[1_1_calc(33.333%-1rem)]"
          :class="getDelayClass(index)"
        >
          <ServiceCard
            v-if="card.backgroundImage"
            class="h-full"
            :image="card.backgroundImage"
            :title="card.title"
            :description="card.description"
            :link-to="localePath(`/services/${card.slug}`)"
            link-label="Read more"
            :eager="index === 0"
          />
          <ServiceIconCard
            v-else-if="card.icon"
            class="h-full"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :link-to="localePath(`/services/${card.slug}`)"
            link-label="Read more"
          />
          <ServiceTextCard
            v-else
            class="h-full"
            :title="card.title"
            :description="card.description"
            :link-to="localePath(`/services/${card.slug}`)"
            link-label="Read more"
          />
        </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import AppButton from '@/components/UI/AppButton.vue';
import ServiceCard from '@/components/UI/ServiceCard.vue';
import ServiceIconCard from '@/components/UI/ServiceIconCard.vue';
import ServiceTextCard from '@/components/UI/ServiceTextCard.vue';
import { useContactModal } from '@/composables/useContactModal';
import { useLocalePath } from '#imports';
import type { StrapiServicePage, StrapiServicesProvideSection } from '@/types/strapi';

const localePath = useLocalePath();
const { open: openContactModal } = useContactModal();

interface Props {
  sectionData?: StrapiServicesProvideSection | null;
  services?: StrapiServicePage[];
}

const props = defineProps<Props>();

interface ServicesProvideCard extends Omit<StrapiServicePage, 'description'> {
  description: string;
  backgroundImage?: string;
  icon?: string;
}

const BACKGROUND_IMAGE_BY_INDEX: Record<number, string> = {
  3: '/images/services/Card3bg.webp',
  4: '/images/services/Card4bg.webp',
  8: '/images/services/Card8bg.webp',
};

const ICON_BY_INDEX: Record<number, string> = {
  0: '/images/services/Card1Icon.svg',
  4: '/images/services/Card2Icon.svg',
  8: '/images/services/Card3Icon.svg',
};

const cards = computed<ServicesProvideCard[]>(() => {
  return [...(props.services ?? [])].sort((a, b) => {
    const orderA = typeof a.headerOrder === 'number' ? a.headerOrder : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b.headerOrder === 'number' ? b.headerOrder : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  }).map((service, index) => ({
      ...service,
      description: service.description ?? '',
      backgroundImage: BACKGROUND_IMAGE_BY_INDEX[index + 1],
      icon: ICON_BY_INDEX[index],
    }));
});

const getDelayClass = (index: number): string => {
  const delays = [
    'delay-100', 'delay-150', 'delay-200', 'delay-250', 'delay-300',
    'delay-350', 'delay-400', 'delay-450', 'delay-500', 'delay-550'
  ];
  return delays[index] || 'delay-100';
};
</script>
