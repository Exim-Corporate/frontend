<template>
  <div class="group relative w-full aspect-square rounded-4xl overflow-hidden cursor-pointer bg-card-bg max-h-80 lg:max-h-full">
    <img
      :src="image"
      :alt="title"
      class="absolute inset-0 w-full h-full object-cover"
    >

    <div class="absolute inset-10 transition-opacity duration-300 group-hover:opacity-0">
      <BaseTitle variant="subheader" class-name="text-white drop-shadow-lg text-left line-clamp-2">
        {{ title }}
      </BaseTitle>
    </div>

    <div
      v-if="tags.length"
      class="absolute inset-x-6 bottom-6 flex flex-col items-start gap-2 transition-opacity duration-100 group-hover:opacity-0"
    >
      <ExpertiseTag
        v-for="tag in tags"
        :key="tag"
        :label="tag"
      />
    </div>

    <div class="absolute inset-5 rounded-[28px] bg-card-overlay p-6 md:p-10 flex flex-col gap-4 md:gap-6 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 origin-center overflow-hidden">
      <BaseTitle variant="subheader" class-name="text-text-dark text-left shrink-0">
        {{ title }}
      </BaseTitle>
      <div class="flex-1 min-h-0 overflow-hidden">
        <BaseText variant="card" className="text-text-dark line-clamp-7">
          {{ description }}
        </BaseText>
      </div>
<!-- 
      <div v-if="tags.length" class="mt-auto flex flex-wrap gap-2">
        <ExpertiseTag
          v-for="tag in tags"
          :key="`${tag}-overlay`"
          :label="tag"
          inverted
        />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import ExpertiseTag from '@/components/UI/ExpertiseTag.vue';

withDefaults(defineProps<{
  image: string;
  title: string;
  description: string;
  tags?: string[];
}>(), {
  tags: () => [],
});
</script>
