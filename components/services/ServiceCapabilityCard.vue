<template>
  <article :class="cardClasses">
    <NuxtImg
      v-if="isWithPicture && imageUrl"
      :src="imageUrl"
      :alt="title"
      loading="lazy"
      format="webp"
      quality="80"
      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
      class="mb-6 h-28 w-full rounded-2xl object-cover md:h-32"
    />

    <BaseTitle
      tag="h3"
      variant="subheader18"
      class-name="text-left text-text-dark"
    >
      {{ title }}
    </BaseTitle>

    <BaseText
      v-if="description"
      variant="card"
      class-name="mt-14 text-left text-text-dark/80"
    >
      {{ description }}
    </BaseText>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseText from '@/components/UI/BaseText.vue';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import type { StrapiCardDisplayType } from '@/types/strapi';

const props = withDefaults(defineProps<{
  title: string;
  description?: string;
  displayType?: StrapiCardDisplayType;
  imageUrl?: string;
}>(), {
  description: '',
  displayType: 'static',
  imageUrl: '',
});

const isWithBackground = computed(() => props.displayType === 'withBackground');
const isWithPicture = computed(() => props.displayType === 'withPicture');

const cardClasses = computed(() => {
  const classes = [
    'relative flex min-h-[230px] flex-col justify-between rounded-4xl p-6 md:min-h-[266px] md:p-8',
  ];

  if (isWithBackground.value) {
    classes.push(
      "bg-card-bg bg-[url('/images/services/CardBackground.svg')] bg-center bg-no-repeat bg-[length:500px_500px]",
    );
  } else {
    classes.push('bg-card-bg');
  }

  return classes;
});
</script>
