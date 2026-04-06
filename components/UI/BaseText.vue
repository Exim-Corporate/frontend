<template>
  <p
    :class="[
      'font-sans m-0 text-text-dark wrap-break-word text-ellipsis',
      variantClasses[variant],
      className,
    ]"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
type BaseTextVariant = 'main' | 'card' | 'card12' | 'section';

interface BaseTextProps {
  variant?: BaseTextVariant;
  className?: string;
}

withDefaults(defineProps<BaseTextProps>(), {
  variant: 'main',
  className: '',
});

const variantClasses: Record<BaseTextVariant, string> = {
  main: 'font-normal text-[16px] leading-[24px] md:text-[20px] md:leading-[28px]',
  card: 'font-light text-[14px] leading-[28px] md:text-[16px] md:leading-[28px]',
  card12: 'font-light text-[12px] leading-[20px] md:text-[14px] md:leading-[28px] md:font-normal',
  section: 'font-light text-[16px] leading-[28px] md:text-[16px] md:leading-[19px]',
};
</script>