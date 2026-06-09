<template>
  <div
    class="group relative w-full aspect-square rounded-4xl overflow-hidden bg-card-bg max-h-80 xl:max-h-full"
    @click.stop="handleCardClick"
    :class="{ 'cursor-pointer': linkTo && isMobileOrTablet }"
  >
    <NuxtImg
      :src="image"
      :alt="title"
      loading="lazy"
      format="webp"
      quality="80"
      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="absolute inset-10 transition-opacity duration-300 lg:group-hover:opacity-0">
      <BaseTitle variant="subheader" class-name="text-white drop-shadow-lg text-left line-clamp-2">
        {{ title }}
      </BaseTitle>
    </div>

    <div
      v-if="tags.length"
      class="absolute inset-x-6 bottom-6 flex flex-col items-start gap-2 transition-opacity duration-100 lg:group-hover:opacity-0"
    >
      <ExpertiseTag
        v-for="tag in tags"
        :key="tag"
        :label="tag"
      />
    </div>

    <div
      v-if="linkTo"
      class="absolute inset-5 rounded-[28px] bg-card-overlay p-6 md:p-10 flex flex-col gap-4 md:gap-6 overflow-hidden"
      :class="'hidden lg:flex scale-0 opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 transition-all duration-300 origin-center'"
    >
      <BaseTitle variant="subheader" class-name="text-text-dark text-left shrink-0">
        {{ title }}
      </BaseTitle>
      <div class="flex-1 min-h-0 overflow-hidden">
        <BaseText variant="card" className="text-text-dark line-clamp-7">
          {{ description }}
        </BaseText>
      </div>
      <NuxtLink
        v-if="linkTo"
        :to="linkTo"
        class="absolute bottom-6 right-6 text-sm font-semibold text-text-dark underline underline-offset-4 decoration-black/30 hover:text-accent"
      >
        {{ linkLabel }}
        <span class="sr-only"> {{ title }}</span>
      </NuxtLink>
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';
import ExpertiseTag from '@/components/UI/ExpertiseTag.vue';

const router = useRouter();

const props = withDefaults(defineProps<{
  image: string;
  title: string;
  description: string;
  tags?: string[];
  linkTo?: string;
  linkLabel?: string;
}>(), {
  tags: () => [],
  linkTo: '',
  linkLabel: 'Read more',
});

const isMobileOrTablet = computed(() => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 1024;
});

const handleCardClick = () => {
  if (props.linkTo && isMobileOrTablet.value) {
    router.push(props.linkTo);
  }
};
</script>
