<template>
  <div class="w-full aspect-square rounded-4xl bg-card-bg flex flex-col justify-between p-6 md:p-10">
    <BaseTitle variant="subheader" class-name="text-left line-clamp-2">
      {{ title }}
    </BaseTitle>

    <BaseText variant="card" class-name="line-clamp-5">{{ description }}</BaseText>
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
});
</script>
