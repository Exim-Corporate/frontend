<template>
  <component
    :is="props.tag"
    :class="mergedClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';

type BaseTitleVariant = 'main' | 'subheader' | 'subheader18' | 'subheader16' | 'serifSubheader';

interface BaseTitleProps {
  tag?: string;
  variant?: BaseTitleVariant;
  className?: string;
}

const props = withDefaults(defineProps<BaseTitleProps>(), {
  tag: 'h1',
  variant: 'main',
  className: '',
});

const variantClasses: Record<BaseTitleVariant, string> = {
  main: 'font-serif font-semibold text-[24px] leading-[100%] md:text-[40px] md:leading-[100%]',
  subheader: 'font-sans font-normal text-[20px] leading-[normal] md:text-[24px] md:leading-[normal] flex items-center',
  subheader18: 'font-sans font-normal text-[18px] leading-[normal] md:text-[24px] md:leading-[normal]',
  subheader16: 'font-sans font-normal text-[16px] leading-[normal] md:text-[22px] md:leading-[normal] font-semibold',
  serifSubheader:
    'font-serif font-semibold text-[26px] leading-[normal] md:text-[32px] md:leading-[normal] flex items-center',
};

const mergedClasses = computed(() => {
  return twMerge('m-0 text-text-dark tracking-normal', variantClasses[props.variant], props.className);
});
</script>