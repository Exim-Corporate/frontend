<template>
  <Button
    v-bind="$attrs"
    :class="buttonClasses"
    @click="onClick"
  >
    <AppIcon
      v-if="icon && iconPosition === 'left'"
      :icon="icon"
      :size="iconSize"
      className="mr-3"
    />

    <span
      v-if="$slots.default"
      :class="labelClasses"
    >
      <slot />
    </span>
    <span
      v-else-if="label"
      :class="labelClasses"
    >
      {{ label }}
    </span>

    <AppIcon
      v-if="icon && iconPosition === 'right'"
      :icon="icon"
      :size="iconSize"
      className="ml-3"
    />
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import AppIcon from '@/components/UI/AppIcon.vue';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  iconPosition: {
    type: String as () => 'left' | 'right',
    default: 'left',
  },
  iconSize: {
    type: [Number, String],
    default: 20,
  },
  label: {
    type: String,
    default: '',
  },
  variant: {
    type: String as () => 'default' | 'gray',
    default: 'default',
  },
  scrollToContact: {
    type: Boolean,
    default: false,
  },
});

const buttonClasses = computed(() => {
  if (props.variant === 'gray') {
    return [
      '!w-auto !border-0 !bg-card-bg !px-[20px] !py-[10px]',
      'hover:!bg-background-gray transition-colors duration-300',
    ];
  }

  return [
    'w-auto md:w-auto px-[16px] lg:px-[28px] py-[13.5px] lg:py-[16px]!',
    'hover:scale-105 transition-transform duration-300',
  ];
});

const labelClasses = computed(() => {
  if (props.variant === 'gray') {
    return 'block w-full text-center align-middle font-sans text-[16px] leading-[100%] font-normal tracking-normal text-text-dark';
  }

  return 'block w-full bg-btn-gradient bg-clip-text text-center align-middle font-sans text-[16px] leading-[100%] font-normal tracking-normal text-transparent md:text-[18px]';
});

const onClick = () => {
  if (props.scrollToContact) {
    document.getElementById('contact-us')?.scrollIntoView({ block: 'center' });
  }
};
</script>
