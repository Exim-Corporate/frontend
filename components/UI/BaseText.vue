<template>
  <p
    :class="mergedClasses"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';

type BaseTextVariant = 'main' | 'card' | 'card12' | 'section';

interface BaseTextProps {
  variant?: BaseTextVariant;
  className?: string;
}

const props = withDefaults(defineProps<BaseTextProps>(), {
  variant: 'main',
  className: '',
});

const variantClasses: Record<BaseTextVariant, string> = {
  main: 'font-normal text-[16px] leading-[24px] md:text-[20px] md:leading-[28px]',
  card: 'font-light text-[14px] leading-[28px] md:text-[16px] md:leading-[28px]',
  card12: 'font-light text-[12px] leading-[20px] md:text-[14px] md:leading-[28px] md:font-normal',
  section: 'font-light text-[16px] leading-[28px] md:text-[16px] md:leading-[19px]',
};

const mergedClasses = computed(() => {
  return twMerge(
    'font-sans m-0 text-text-dark wrap-break-word text-ellipsis',
    variantClasses[props.variant],
    props.className,
  );
});
</script>