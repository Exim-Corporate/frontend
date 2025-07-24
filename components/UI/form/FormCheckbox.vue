<template>
  <div class="w-full mb-2 flex flex-col items-start">
    <label class="flex items-center w-full cursor-pointer select-none">
      <Checkbox
        v-model="checkValue"
        :binary="binary"
        v-bind="$attrs"
        :invalid="isInvalid"
        :aria-invalid="isInvalid"
      />
      <span
        class="ml-2 text-sm"
        :class="isInvalid ? 'form-label-error text-red-400' : ''"
      >
        <slot>{{ label }}</slot>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
/**
 * Checkbox form field with label and error display, styled for PrimeVue + Tailwind.
 * @module UI/form/FormCheckbox
 */
import { computed } from 'vue';
import Checkbox from 'primevue/checkbox';

const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  binary: { type: Boolean, default: true },
  isInvalid: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
  required: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);
const checkValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>

<!-- No local styles; use Tailwind and global .form-label-error class -->
