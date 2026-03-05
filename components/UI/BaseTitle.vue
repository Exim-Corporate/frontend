<template>
  <component
    :is="tag"
    :class="[
      'm-0 text-text-dark tracking-normal',
      variantClasses[variant],
      className,
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type BaseTitleVariant = 'main' | 'subheader' | 'subheader18';

interface BaseTitleProps {
  tag?: string;
  variant?: BaseTitleVariant;
  className?: string;
}

withDefaults(defineProps<BaseTitleProps>(), {
  tag: 'h1',
  variant: 'main',
  className: '',
});

const variantClasses: Record<BaseTitleVariant, string> = {
  main: 'font-serif font-semibold text-[24px] leading-[100%] md:text-[40px] md:leading-[100%]',
  subheader: 'font-sans font-normal text-[20px] leading-[normal] md:text-[24px] md:leading-[normal] flex items-center',
  subheader18: 'font-sans font-normal text-[18px] leading-[normal] md:text-[24px] md:leading-[normal]',
};
</script>