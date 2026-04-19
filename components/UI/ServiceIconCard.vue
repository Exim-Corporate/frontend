<template>
  <div class="group relative w-full aspect-square rounded-4xl overflow-hidden bg-card-bg">
    <NuxtImg
      src="/images/services/CardBg.svg"
      alt=""
      loading="lazy"
      class="absolute inset-0 w-full h-full object-cover opacity-50 scale-150 transition-transform duration-5000 group-hover:scale-[1.6]"
    />

    <div class="relative flex flex-col justify-between h-full p-6 md:p-10">
      <BaseTitle variant="subheader" class-name="text-left">
        {{ title }}
      </BaseTitle>

      <div class="flex items-end justify-between gap-4">
        <BaseText variant="card">
          {{ description }}
        </BaseText>
        <NuxtImg
          :src="icon"
          :alt="title"
          loading="lazy"
          class="w-10 h-10 md:w-12 md:h-12 shrink-0"
        />
      </div>
    </div>
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
  icon: {
    type: String,
    required: true,
  },
});
</script>
