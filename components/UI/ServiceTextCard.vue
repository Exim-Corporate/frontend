<template>
  <div class="w-full aspect-square rounded-4xl bg-card-bg flex flex-col justify-between p-6 md:p-10">
    <BaseSubheader ui-class="!text-left">
      {{ title }}
    </BaseSubheader>

    <p class="">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import BaseSubheader from '@/components/UI/BaseSubheader.vue';

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
