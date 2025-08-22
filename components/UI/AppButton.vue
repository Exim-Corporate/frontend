<template>
  <Button
    v-bind="$attrs"
    :class="[
      'transition-all duration-300 border-0 px-5 bg-gradient hover:scale-105 active:bg-accent active:text-inherit active:scale-x-90',
    ]"
    @click="handleClick"
  >
    <!-- Icon left -->
    <AppIcon
      v-if="icon && iconPosition === 'left'"
      :icon="icon"
      :size="iconSize"
      className="mr-3"
    />

    <!-- Content: prefer slot, fallback to label prop -->
    <span v-if="$slots.default">
      <slot />
    </span>
    <span v-else-if="label">{{ label }}</span>

    <!-- Icon right -->
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

/**
 * AppButton - Reusable button component with optional icon/label and scroll-to-contact logic.
 */
const props = defineProps({
  scrollToContact: {
    type: Boolean,
    default: false,
  },
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
});

// Two-way binding for drawer visibility (if used)
const visible = defineModel<boolean>('visible');

const emit = defineEmits(['click']);

/**
 * Handles button click: emits click, optionally scrolls to contact, and closes drawer if visible.
 */
const handleClick = (event: Event) => {
  emit('click', event);

  if (props.scrollToContact) {
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      if (visible.value) visible.value = false; // close drawer if bound
      contactSection.scrollIntoView({
        block: 'center',
      });
    }
  }
};
</script>
