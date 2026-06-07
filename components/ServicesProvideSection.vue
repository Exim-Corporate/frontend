<template>
  <section v-if="sectionData" class="w-full bg-white container">
      <div class="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16">
        <div class="flex flex-col gap-4">
          <AnimatedElement direction="bottom" :delay="100">
            <BaseTitle tag="h2" variant="main" class-name="text-center md:text-left">
              {{ sectionData.title }}
            </BaseTitle>
          </AnimatedElement>
          <AnimatedElement direction="bottom" :delay="200">
            <BaseText variant="section" class-name="text-center md:text-left max-w-md">
              {{ sectionData.subtitle }}
            </BaseText>
          </AnimatedElement>
        </div>
        <AnimatedElement direction="bottom" :delay="200">
          <AppButton :label="sectionData.buttonLabel" @click="openContactModal('cta-button')" />
        </AnimatedElement>
      </div>

      <div class="flex flex-wrap gap-6">
        <AnimatedElement
          v-for="(card, index) in cards"
          :key="card.slug"
          class="w-full min-w-0 max-h-80 xl:max-h-full md:flex-[1_1_calc(50%-0.75rem)] xl:flex-[1_1_calc(33.333%-1rem)]"
          direction="bottom"
          :delay="100 + index * 50"
        >
          <ServiceCard
            v-if="card.backgroundImage"
            class="h-full"
            :image="card.backgroundImage"
            :title="card.title"
            :description="card.description"
            :link-to="`/services/${card.slug}`"
            link-label="Read more"
          />
          <ServiceTextCard
            v-else
            class="h-full"
            :title="card.title"
            :description="card.description"
            :link-to="`/services/${card.slug}`"
            link-label="Read more"
          />
        </AnimatedElement>
      </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import AppButton from '@/components/UI/AppButton.vue';
import ServiceCard from '@/components/UI/ServiceCard.vue';
import ServiceTextCard from '@/components/UI/ServiceTextCard.vue';
import { useContactModal } from '@/composables/useContactModal';
import type { StrapiServicePage, StrapiServicesProvideSection } from '@/types/strapi';

const { open: openContactModal } = useContactModal();

interface Props {
  sectionData?: StrapiServicesProvideSection | null;
  services?: StrapiServicePage[];
}

const props = defineProps<Props>();

interface ServicesProvideCard extends Omit<StrapiServicePage, 'description'> {
  description: string;
  backgroundImage?: string;
}

const BACKGROUND_IMAGE_BY_SLUG: Record<string, string> = {
  'web-application-development': '/images/services/Card3bg.webp',
  'mobile-development': '/images/services/Card4bg.webp',
  'virtual-cto': '/images/services/Card8bg.webp',
};

const cards = computed<ServicesProvideCard[]>(() => {
  return [...(props.services ?? [])].sort((a, b) => {
    const orderA = typeof a.headerOrder === 'number' ? a.headerOrder : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b.headerOrder === 'number' ? b.headerOrder : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  }).map(service => ({
    ...service,
    description: service.description ?? '',
    backgroundImage: BACKGROUND_IMAGE_BY_SLUG[service.slug],
  }));
});
</script>
