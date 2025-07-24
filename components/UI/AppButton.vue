<template>
  <Button
    v-bind="$attrs"
    :class="[
      'transition-all duration-300 hover:scale-110 active:bg-accent active:text-inherit active:scale-x-90',
    ]"
    @click="handleClick"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

/**
 * AppButton - Reusable button component with optional scroll-to-contact and drawer close logic.
 * @module components/UI/AppButton
 */
const props = defineProps({
  scrollToContact: {
    type: Boolean,
    default: false,
  },
});

// Two-way binding for drawer visibility (if used)
const visible = defineModel<boolean>('visible');

const emit = defineEmits(['click']);

/**
 * Handles button click: emits click, optionally scrolls to contact, and closes drawer if visible.
 * @param event - Click event
 */
const handleClick = (event: Event) => {
  emit('click', event);

  if (props.scrollToContact) {
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      if (visible.value) visible.value = false; // close drawer if bound
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
};
</script>
