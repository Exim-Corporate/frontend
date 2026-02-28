<template>
  <Button
    v-bind="$attrs"
    class="w-full md:w-auto max-md:px-0! max-md:py-[14.5px]! hover:scale-105 transition-transform duration-300"
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
      class="bg-btn-gradient bg-clip-text text-transparent font-sans font-normal text-[16px] md:text-[18px] leading-[100%] tracking-normal align-middle w-full text-center block"
    >
      <slot />
    </span>
    <span
      v-else-if="label"
      class="bg-btn-gradient bg-clip-text text-transparent font-sans font-normal text-[16px] md:text-[18px] leading-[100%] tracking-normal align-middle w-full text-center block"
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
  scrollToContact: {
    type: Boolean,
    default: false,
  },
});

const onClick = () => {
  if (props.scrollToContact) {
    document.getElementById('contact-us')?.scrollIntoView({ block: 'center' });
  }
};
</script>
