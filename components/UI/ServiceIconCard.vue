<template>
  <div
    class="group relative w-full aspect-square rounded-4xl overflow-hidden bg-card-bg"
    @click.stop="handleCardClick"
    :class="{ 'cursor-pointer': linkTo && isMobileOrTablet }"
  >
    <!-- Static content (shown by default, hidden on hover for desktop) -->
    <div class="relative flex flex-col justify-between h-full p-6 md:p-10 transition-opacity duration-300 lg:group-hover:opacity-0">
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

    <!-- Hover overlay (desktop) / always visible (mobile/tablet) -->
    <div
      v-if="linkTo"
      class="hidden lg:flex absolute inset-5 rounded-[28px] bg-card-overlay p-6 md:p-10 flex-col gap-4 md:gap-6 scale-0 opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 transition-all duration-300 origin-center"
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
        :to="linkTo"
        class="absolute bottom-6 right-6 text-sm font-semibold text-text-dark underline underline-offset-4 decoration-black/30 hover:text-accent"
      >
        {{ linkLabel }}
        <span class="sr-only"> {{ title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseTitle from '@/components/UI/BaseTitle.vue';
import BaseText from '@/components/UI/BaseText.vue';

const router = useRouter();

const props = defineProps({
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
  linkTo: {
    type: String,
    default: '',
  },
  linkLabel: {
    type: String,
    default: 'Read more',
  },
});

const isMobileOrTablet = computed(() => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 1024; // md breakpoint
});

const handleCardClick = () => {
  if (props.linkTo && isMobileOrTablet.value) {
    router.push(props.linkTo);
  }
};
</script>
