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
import { useRuntimeConfig } from '#imports';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import ServiceCard from '@/components/UI/ServiceCard.vue';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';
import type { StrapiIndustryExpertiseSection, StrapiIndustryPage } from '@/types/strapi';

interface Props {
  sectionData?: StrapiIndustryExpertiseSection | null;
  industries?: StrapiIndustryPage[];
}

const props = defineProps<Props>();

const config = useRuntimeConfig();
const strapiUrl = String(config.public.strapiUrl ?? '');

interface IndustryExpertiseItem {
  key: string;
  image: string;
  linkTo: string;
  title: string;
  description: string;
  tags: string[];
}

const industryCards = computed<IndustryExpertiseItem[]>(() => {
  return (props.industries ?? []).slice(0, 6).map(page => ({
    key: page.slug,
    title: page.title,
    description: page.description ?? page.hero?.description ?? '',
    image: normalizeImageUrl(page.hero?.image?.url ?? '', strapiUrl),
    tags: page.hero?.categories?.map(category => category.name) ?? [],
    linkTo: `/industry/${page.slug}`,
  }));
});

const scrollToContact = () => {
  document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
</script>