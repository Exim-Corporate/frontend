<template>
  <section class="container overflow-hidden ">

    <!-- Category tags -->
    <div
      v-if="hero.categories && hero.categories.length"
      class="mb-6 flex flex-wrap justify-center gap-2 md:mb-8 md:justify-start"
    >
      <BaseChip
        v-for="cat in hero.categories"
        :key="cat.documentId"
        variant="light"
        size="small"
      >
        {{ cat.name }}
      </BaseChip>
    </div>

    <!-- Title -->
    <BaseTitle
      tag="h1"
      variant="main"
      class-name="text-center leading-[1.1] md:text-left font-semibold md:font-normal text-[48px] md:text-[56px]"
    >
      {{ hero.title }}
    </BaseTitle>

    <!-- Description + CTA row -->
    <div class="mt-6 flex flex-col items-center gap-6 md:mt-5 md:flex-row md:items-center md:justify-between md:gap-10">
      <BaseText
        v-if="hero.description"
        variant="section"
        class-name="text-center md:text-left md:max-w-[60%]"
      >
        {{ hero.description }}
      </BaseText>
      <AppButton class="w-full md:w-auto shrink-0" @click="openContactModal('cta-button')">
        {{ $t('servicesProvide.button') }}
      </AppButton>
    </div>

    <!-- Full-width banner image -->
    <div class="mt-8 md:mt-10">
      <NuxtImg
        :src="imageUrl"
        :alt="hero.title"
        loading="eager"
        preload
        fetchpriority="high"
        quality="85"
        class="h-auto w-full rounded-2xl object-cover aspect-square md:aspect-9/3"
        sizes="sm:100vw md:100vw lg:1200px"
        format="webp"
      />
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseChip from '@/components/UI/BaseChip.vue';
import AppButton from '@/components/UI/AppButton.vue';
import { useContactModal } from '@/composables/useContactModal';
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';
import type { StrapiIndustryHero } from '@/types/strapi';
import { useRuntimeConfig } from '#app';

const props = defineProps<{
  hero: StrapiIndustryHero;
}>();

const config = useRuntimeConfig();
const { open: openContactModal } = useContactModal();

const imageUrl = computed(() => {
  const img = props.hero.image;
  if (img) {
    const url = img.url || img.formats?.large?.url || img.formats?.medium?.url || img.formats?.small?.url;
    if (url) return normalizeImageUrl(url, config?.public?.strapiUrl);
  }
  return '/images/expertise/Hero.webp';
});

</script>
