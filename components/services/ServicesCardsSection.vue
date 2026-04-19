<template>
  <section
    v-if="isServiceMode"
    class="w-full bg-white"
  >
    <div class="container">
      <div class="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-[minmax(0,840px)_auto] md:items-start md:justify-between md:justify-items-stretch">
        <div>
          <!-- <div class="flex items-center justify-center gap-1 text-sm leading-4.25 text-text-dark/70 md:justify-start">
            <span>{{ eyebrowPrefix }}</span>
            <span>/</span>
            <span class="font-medium text-text-dark">{{ pageTitle }}</span>
          </div> -->

          <BaseTitle
            tag="h2"
            variant="main"
            class-name="mt-8 max-w-170 text-center md:text-left"
          >
            {{ sectionData?.title || '' }}
          </BaseTitle>

          <div class="mt-5 max-w-170 space-y-5">
            <BaseText
              v-if="sectionData?.description"
              variant="section"
              class-name="text-center text-text-dark/85 md:text-left"
            >
              {{ sectionData.description }}
            </BaseText>
          </div>
        </div>

        <div class="md:pt-26">
          <AppButton 
                      class="mt-10 w-full md:w-auto"
          @click="openContactModal('cta-button')"
          >
            {{ buttonLabel }}
          </AppButton>
        </div>
      </div>

      <div class="mt-9 grid grid-cols-1 gap-1.5 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <AnimatedElement
          v-for="(card, index) in resolvedCards"
          :key="`${card.title}-${index}`"
          direction="bottom"
          :delay="120 + index * 70"
        >
          <ServiceCard
            v-if="card.displayType === 'withPicture'"
            :image="card.imageUrl || fallbackServiceCardImage"
            :title="card.title"
            :description="card.description"
          />
          <ServiceCapabilityCard
            v-else
            :title="card.title"
            :description="card.description"
            :display-type="card.displayType"
            :image-url="card.imageUrl"
          />
        </AnimatedElement>
      </div>
    </div>
  </section>

  <section v-else class="w-full bg-white container pt-15">
    <div class="flex flex-wrap items-stretch gap-6">
      <AnimatedElement
        v-for="(card, index) in resolvedCards"
        :key="`${card.title}-${index}`"
        class="w-full min-w-0 md:flex-[1_1_calc(50%-0.75rem)] lg:flex-[1_1_calc(33.333%-1rem)]"
        direction="bottom"
        :delay="100 + index * 100"
      >
        <ServiceCard
          :image="card.imageUrl || fallbackServiceCardImage"
          :title="card.title"
          :description="card.description"
        />
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import AppButton from '@/components/UI/AppButton.vue';
import ServiceCard from '@/components/UI/ServiceCard.vue';
import ServiceCapabilityCard from '@/components/services/ServiceCapabilityCard.vue';
import { useContactModal } from '@/composables/useContactModal';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';
import type { StrapiCardDisplayType, StrapiServiceCardsSection } from '@/types/strapi';

interface HomeCardConfig {
  image: string;
  titleKey: string;
  descriptionKey: string;
}

interface ResolvedCard {
  title: string;
  description: string;
  displayType: StrapiCardDisplayType;
  imageUrl?: string;
}

const props = withDefaults(defineProps<{
  mode?: 'home' | 'service';
  pageTitle?: string;
  sectionData?: StrapiServiceCardsSection | null;
}>(), {
  mode: 'home',
  pageTitle: '',
  sectionData: null,
});

const { t } = useI18n();
const { open: openContactModal } = useContactModal();

const homeCards: HomeCardConfig[] = [
  {
    image: '/images/hero/Card1.webp',
    titleKey: 'servicesCards.aiConsulting.title',
    descriptionKey: 'servicesCards.aiConsulting.description',
  },
  {
    image: '/images/hero/Card2.webp',
    titleKey: 'servicesCards.generativeAi.title',
    descriptionKey: 'servicesCards.generativeAi.description',
  },
  {
    image: '/images/hero/Card3.webp',
    titleKey: 'servicesCards.bigData.title',
    descriptionKey: 'servicesCards.bigData.description',
  },
];

const fallbackServiceCardImage = '/images/hero/Card1.webp';

const isServiceMode = computed(() => props.mode === 'service' || Boolean(props.sectionData));

const translateOrFallback = (key: string, fallback: string): string => {
  const translated = t(key);
  return translated === key ? fallback : translated;
};

// const eyebrowPrefix = computed(() => translateOrFallback('servicesPage.cards.eyebrowPrefix', 'Service'));

const buttonLabel = computed(() => {
  const configuredLabel = props.sectionData?.buttonLabel?.trim();
  if (configuredLabel) {
    return configuredLabel;
  }

  return translateOrFallback('servicesProvide.button', 'Request Proposal');
});

const resolvedCards = computed<ResolvedCard[]>(() => {
  if (isServiceMode.value) {
    return (props.sectionData?.cards || []).map((card) => ({
      title: card.title,
      description: card.description || '',
      displayType: card.displayType || 'static',
      imageUrl: card.image?.url
        ? normalizeImageUrl(card.image.url)
        : '',
    }));
  }

  return homeCards.map((card) => ({
    title: t(card.titleKey),
    description: t(card.descriptionKey),
    displayType: 'withPicture',
    imageUrl: card.image,
  }));
});
</script>
