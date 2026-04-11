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
      class-name="text-center text-[38px] font-semibold leading-[1.1] md:text-left md:text-[56px] md:font-normal"
    >
      {{ hero.title }}
    </BaseTitle>

    <div class="mt-6 flex flex-col items-center gap-6 md:mt-5 md:flex-row md:items-center md:justify-between md:gap-10">
      <BaseText
        v-if="hero.description"
        variant="section"
        class-name="text-center md:block md:max-w-[60%] md:text-left"
      >
        {{ hero.description }}
      </BaseText>
      <AppButton class="my-4 w-full shrink-0 md:mt-0 md:w-auto" scroll-to-contact>
        {{ $t('servicesProvide.button') }}
      </AppButton>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-[30%_minmax(0,1fr)] md:gap-2.5">
      <NuxtImg
        :src="primaryImageUrl"
        :alt="hero.title + ' primary image'"
        class="h-52 w-full rounded-2xl object-cover md:h-66.75"
        sizes="sm:100vw md:216px"
        format="webp"
      />
      <NuxtImg
        :src="secondaryImageUrl"
        :alt="hero.title + ' secondary image'"
        class="h-72 w-full rounded-2xl object-cover md:h-66.75"
        sizes="sm:100vw md:900px"
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
import type { StrapiServiceHero } from '@/types/strapi';

const props = defineProps<{
  hero: StrapiServiceHero;
}>();

const primaryImageUrl = computed(() => {
  const img = props.hero.imagePrimary;
  if (img) {
    const url = img.url || img.formats?.large?.url || img.formats?.medium?.url || img.formats?.small?.url;
    if (url) return normalizeImageUrl(url);
  }
  return '/images/services/sh1.png';
});

const secondaryImageUrl = computed(() => {
  const img = props.hero.imageSecondary;
  if (img) {
    const url = img.url || img.formats?.large?.url || img.formats?.medium?.url || img.formats?.small?.url;
    if (url) return normalizeImageUrl(url);
  }
  return '/images/services/sh2.png';
});

</script>
