<template>
  <section class="container overflow-hidden pt-2">
    <AnimatedElement
      v-if="hero.categories && hero.categories.length"
      direction="bottom"
    >
      <div class="mb-6 flex flex-wrap justify-center gap-2 md:mb-8 md:justify-start">
        <BaseChip
          v-for="cat in hero.categories"
          :key="cat.documentId"
          variant="light"
          size="small"
        >
          {{ cat.name }}
        </BaseChip>
      </div>
    </AnimatedElement>

    <AnimatedElement direction="bottom" :delay="100">
      <BaseTitle
        tag="h1"
        variant="header56"
        class-name="text-center md:text-left"
      >
          {{ hero.title }}
      </BaseTitle>
    </AnimatedElement>

    <div class="mt-6 flex flex-col items-center gap-6 md:mt-5 md:flex-row md:items-center md:justify-between md:gap-10">
      <AnimatedElement
        v-if="hero.description"
        direction="bottom"
        :delay="150"
      >
        <BaseText
          variant="section"
          class-name="text-center md:block md:max-w-[60%] md:text-left"
        >
          {{ hero.description }}
        </BaseText>
      </AnimatedElement>
      <AnimatedElement direction="bottom">
        <AppButton class="my-4 w-full shrink-0 md:mt-0 md:w-auto" @click="openContactModal('cta-button')">
          {{ $t('servicesProvide.button') }}
        </AppButton>
      </AnimatedElement>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-[30%_minmax(0,1fr)] md:gap-2.5">
      <AnimatedElement direction="bottom" :delay="200">
        <NuxtImg
          :src="primaryImageUrl"
          :alt="hero.title + ' primary image'"
          class="h-56 w-full rounded-2xl object-cover md:h-120"
          sizes="sm:100vw md:216px"
          format="webp"
        />
      </AnimatedElement>
      <AnimatedElement direction="bottom" :delay="250">
        <NuxtImg
          :src="secondaryImageUrl"
          :alt="hero.title + ' secondary image'"
          class="h-56 w-full rounded-2xl object-cover md:h-120"
          sizes="sm:100vw md:900px"
          format="webp"
        />
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseChip from '@/components/UI/BaseChip.vue';
import AnimatedElement from '@/components/UI/AnimatedElement.vue';
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
  return '/images/services/sh1.webp';
});

const secondaryImageUrl = computed(() => {
  const img = props.hero.imageSecondary;
  if (img) {
    const url = img.url || img.formats?.large?.url || img.formats?.medium?.url || img.formats?.small?.url;
    if (url) return normalizeImageUrl(url);
  }
  return '/images/services/sh2.webp';
});

</script>
