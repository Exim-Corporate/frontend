<template>
  <section class="w-full bg-white container">
      <div class="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-6 mb-12 md:mb-16">
        <div class="flex flex-col gap-4">
          <AnimatedElement direction="bottom" :delay="100">
            <BaseTitle tag="h2" variant="main" class-name="text-center md:text-left">
              {{ $t('servicesProvide.title') }}
            </BaseTitle>
          </AnimatedElement>
          <AnimatedElement direction="bottom" :delay="200">
            <BaseText variant="section" class-name="text-center md:text-left max-w-md">
              {{ $t('servicesProvide.subtitle') }}
            </BaseText>
          </AnimatedElement>
        </div>
        <AnimatedElement direction="bottom" :delay="200">
          <AppButton :label="$t('servicesProvide.button')" @click="openContactModal('cta-button')" />
        </AnimatedElement>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatedElement
          v-for="(card, index) in cards"
          :key="card.titleKey"
          direction="bottom"
          :delay="100 + index * 50"
        >
          <ServiceCard
            v-if="card.type === 'image'"
            :image="card.image!"
            :title="$t(card.titleKey)"
            :description="$t(card.descriptionKey)"
            :link-to="card.linkTo"
            link-label="Read more"
          />
          <!-- <ServiceIconCard
            v-else-if="card.type === 'icon'"
            :title="$t(card.titleKey)"
            :description="$t(card.descriptionKey)"
            :icon="card.icon!"
          /> -->
          <ServiceTextCard
            v-else
            :title="$t(card.titleKey)"
            :description="$t(card.descriptionKey)"
            :link-to="card.linkTo"
            link-label="Read more"
          />
        </AnimatedElement>
      </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import AppButton from '@/components/UI/AppButton.vue';
import ServiceCard from '@/components/UI/ServiceCard.vue';
import ServiceTextCard from '@/components/UI/ServiceTextCard.vue';
import { useContactModal } from '@/composables/useContactModal';

const { open: openContactModal } = useContactModal();

interface CardConfig {
  type: 'image' | 'icon' | 'text';
  titleKey: string;
  descriptionKey: string;
  linkTo?: string;
  image?: string;
  icon?: string;
}

const cards: CardConfig[] = [
  {
    type: 'icon',
    titleKey: 'servicesProvide.cards.ai.title',
    descriptionKey: 'servicesProvide.cards.ai.description',
    // linkTo: '/services/artificial-intelligence',
    icon: '/images/services/Card1Icon.svg',
  },
  {
    type: 'text',
    titleKey: 'servicesProvide.cards.customSoftware.title',
    descriptionKey: 'servicesProvide.cards.customSoftware.description',
    // linkTo: '/services/custom-software-development',
  },
  {
    type: 'image',
    titleKey: 'servicesProvide.cards.webApp.title',
    descriptionKey: 'servicesProvide.cards.webApp.description',
    linkTo: '/services/web-application-development',
    image: '/images/services/Card3bg.webp',
  },
  {
    type: 'image',
    titleKey: 'servicesProvide.cards.mobile.title',
    descriptionKey: 'servicesProvide.cards.mobile.description',
    linkTo: '/services/mobile-development',
    image: '/images/services/Card4bg.webp',
  },
  {
    type: 'icon',
    titleKey: 'servicesProvide.cards.chatbots.title',
    descriptionKey: 'servicesProvide.cards.chatbots.description',
    // linkTo: '/services/ai-chatbots',
    icon: '/images/services/Card2Icon.svg',
  },
  {
    type: 'text',
    titleKey: 'servicesProvide.cards.dataEngineering.title',
    descriptionKey: 'servicesProvide.cards.dataEngineering.description',
    // linkTo: '/services/data-engineering',
  },
  {
    type: 'text',
    titleKey: 'servicesProvide.cards.cloud.title',
    descriptionKey: 'servicesProvide.cards.cloud.description',
    // linkTo: '/services/cloud-services',
  },
  {
    type: 'image',
    titleKey: 'servicesProvide.cards.vcto.title',
    descriptionKey: 'servicesProvide.cards.vcto.description',
    linkTo: '/services/virtual-cto',
    image: '/images/services/Card8bg.webp',
  },
  {
    type: 'icon',
    titleKey: 'servicesProvide.cards.enterpriseSearch.title',
    descriptionKey: 'servicesProvide.cards.enterpriseSearch.description',
    // linkTo: '/services/enterprise-search',
    icon: '/images/services/Card3Icon.svg',
  },
];
</script>
