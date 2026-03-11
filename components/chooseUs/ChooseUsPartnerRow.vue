<template>
  <article
    class="rounded-xl p-6 transition-colors duration-500"
    :class="isActive ? 'bg-background-gray' : 'bg-white'"
  >
    <BaseTitle
      tag="h3"
      variant="subheader"
      class-name="text-center justify-center line-clamp-2"
    >
      {{ title }}
    </BaseTitle>

    <BaseText
      variant="section"
      class-name="mt-3 text-center mx-auto text-light line-clamp-3"
    >
      {{ description }}
    </BaseText>
  </article>
</template>

<script setup lang="ts">
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';

interface ChooseUsPartnerRowProps {
  title: string;
  description: string;
  isActive: boolean;
}

defineProps<ChooseUsPartnerRowProps>();
</script>
