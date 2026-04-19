<template>
  <section class="container overflow-hidden">
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

    <BaseTitle
      tag="h1"
      variant="main"
      class-name="text-center text-[48px] leading-[1.1] font-semibold md:text-left md:text-[56px] md:font-normal"
    >
      {{ hero.title }}
    </BaseTitle>

    <div class="mt-6 flex flex-col items-center gap-6 md:mt-5 md:flex-row md:items-center md:justify-between md:gap-10">
      <BaseText
        v-if="hero.description"
        variant="section"
        class-name="text-center md:max-w-[60%] md:text-left"
      >
        {{ hero.description }}
      </BaseText>

      <AppButton
        class="w-full shrink-0 md:w-auto"
        scrollToContact
        scroll-target-id="calendly-booking"
      >
        {{ hero.buttonLabel || 'Become Referral Partner' }}
      </AppButton>
    </div>

    <div class="mt-8 md:mt-10">
      <NuxtImg
        :src="imageUrl"
        :alt="hero.title"
        loading="eager"
        preload
        fetchpriority="high"
        quality="85"
        class="aspect-square h-auto w-full rounded-2xl object-cover md:aspect-9/3"
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
import { normalizeImageUrl } from '@/utils/normalizeImageUrl';
import type { StrapiReferralHero } from '@/types/strapi';

const props = defineProps<{
  hero: StrapiReferralHero;
}>();

const imageUrl = computed(() => {
  const img = props.hero.image;
  if (img) {
    const url = img.url || img.formats?.large?.url || img.formats?.medium?.url || img.formats?.small?.url;
    if (url) {
      return normalizeImageUrl(url);
    }
  }
  return '/images/referral/hero1.webp';
});
</script>
