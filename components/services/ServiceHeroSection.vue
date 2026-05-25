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
      class-name="text-center text-[38px] font-semibold leading-[1.1] md:text-left md:text-[56px] md:font-regular"
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
      <AppButton class="my-4 w-full shrink-0 md:mt-0 md:w-auto" @click="openContactModal('cta-button')">
        {{ $t('servicesProvide.button') }}
      </AppButton>
    </div>

    <div class="mt-8 w-full md:mt-10 lg:ml-auto lg:max-w-[70%]">
      <NuxtImg
        :src="primaryImageUrl"
        :alt="hero.title + ' primary image'"
        loading="eager"
        preload
        fetchpriority="high"
        quality="85"
        class="h-56 w-full rounded-2xl object-cover sm:h-64 md:h-80 lg:h-125"
        sizes="sm:100vw md:216px"
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
import type { StrapiServiceHero } from '@/types/strapi';

const props = defineProps<{
  hero: StrapiServiceHero;
}>();

const { open: openContactModal } = useContactModal();

const primaryImageUrl = computed(() => {
  const img = props.hero.imagePrimary;
  if (img) {
    const url = img.url || img.formats?.large?.url || img.formats?.medium?.url || img.formats?.small?.url;
    if (url) return normalizeImageUrl(url);
  }
  return '/images/services/sh2.webp';
});

</script>
