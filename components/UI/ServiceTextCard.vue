<template>
  <div class="relative w-full aspect-square rounded-4xl bg-card-bg flex flex-col max-h-80 xl:max-h-full justify-between p-6 md:p-10">
    <BaseTitle variant="subheader" class-name="text-left line-clamp-2">
      {{ title }}
    </BaseTitle>

    <BaseText variant="card" class-name="line-clamp-5">{{ description }}</BaseText>

    <NuxtLink
      v-if="linkTo"
      :to="linkTo"
      class="absolute bottom-6 right-6 text-sm font-semibold text-text-dark underline underline-offset-4 decoration-black/30 hover:text-accent"
    >
      {{ linkLabel }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  linkTo: {
    type: String,
    default: '',
  },
  linkLabel: {
    type: String,
    default: 'Read more',
  },
});
</script>
