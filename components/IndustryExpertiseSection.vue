<template>
  <section v-if="sectionData" class="container w-full bg-white">
    <div class="mb-6 flex items-start justify-between gap-4 md:mb-12 md:items-center lg:mb-16">
      <AnimatedElement direction="bottom" :delay="100">
        <BaseTitle tag="h2" variant="main" class-name="max-w-[180px] text-left md:max-w-none">
          {{ sectionData.title }}
        </BaseTitle>
      </AnimatedElement>

      <AnimatedElement direction="bottom" :delay="160">
        <AppButton
          @click="scrollToContact"
        >
          {{ sectionData.buttonLabel }}
        </AppButton>
      </AnimatedElement>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      <AnimatedElement
        v-for="(card, index) in industryCards"
        :key="card.key"
        class="min-w-0"
        direction="bottom"
        :delay="180 + index * 50"
      >
        <ServiceCard
          :image="card.image"
          :title="card.title"
          :description="card.description"
          :tags="card.tags"
          :link-to="card.linkTo"
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
import ServiceCard from '@/components/UI/ServiceCard.vue';
import type { StrapiIndustryExpertiseSection, StrapiIndustryPage } from '@/types/strapi';

interface Props {
  sectionData?: StrapiIndustryExpertiseSection | null;
  industries?: StrapiIndustryPage[];
}

const props = defineProps<Props>();

const LEGACY_EXPERTISE_IMAGE_BY_SLUG: Record<string, string> = {
  healthcare: '/images/expertise/1.webp',
  logistics: '/images/expertise/2.webp',
  retail: '/images/expertise/3.webp',
  'finance-fintech': '/images/expertise/4.webp',
  'education-edtech': '/images/expertise/5.webp',
  manufacturing: '/images/expertise/6.webp',
};

const LEGACY_EXPERTISE_IMAGES = Object.values(LEGACY_EXPERTISE_IMAGE_BY_SLUG);

interface IndustryExpertiseItem {
  key: string;
  image: string;
  linkTo: string;
  title: string;
  description: string;
  tags: string[];
}

const industryCards = computed<IndustryExpertiseItem[]>(() => {
  return (props.industries ?? []).slice(0, 6).map((page, index) => ({
    key: page.slug,
    title: page.title,
    description: page.description ?? page.hero?.description ?? '',
    image:
      LEGACY_EXPERTISE_IMAGE_BY_SLUG[page.slug] ??
      LEGACY_EXPERTISE_IMAGES[index % LEGACY_EXPERTISE_IMAGES.length] ??
      LEGACY_EXPERTISE_IMAGES[0],
    tags: page.hero?.categories?.map(category => category.name) ?? [],
    linkTo: `/industry/${page.slug}`,
  }));
});

const scrollToContact = () => {
  document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
</script>