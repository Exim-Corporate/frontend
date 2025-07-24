<template>
  <FormField
    :id="id"
    :label="label"
    :required="required"
    :optional="optional"
    :error-message="errorMessage"
  >
    <AutoComplete
      :id="id"
      v-model="autocompleteValue"
      :placeholder="placeholder"
      :invalid="isInvalid"
      class="w-full"
      :suggestions="suggestions"
      :delay="delay"
      :class="{ 'p-invalid': isInvalid }"
      fluid
      dropdown
      dropdownMode="current"
      v-bind="$attrs"
      @complete="$emit('complete', $event)"
    >
      <template #dropdown="{ toggleCallback }">
        <button
          type="button"
          class="p-autocomplete-dropdown"
          :aria-label="`Open ${label} dropdown`"
          aria-haspopup="listbox"
          @click="toggleCallback"
        >
          <i
            class="pi pi-chevron-down"
            aria-hidden="true"
          />
        </button>
      </template>
    </AutoComplete>
  </FormField>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// import AutoComplete from 'primevue/autocomplete';
import FormField from '@/components/UI/form/FormField.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Object, null],
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  delay: {
    type: Number,
    default: 0,
  },
  suggestions: {
    type: Array,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
  optional: {
    type: Boolean,
    default: false,
  },
  isInvalid: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'complete']);

const autocompleteValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>

<style scoped>
:deep(.p-autocomplete-input) {
  /* background-color: white; */
  /* border: 1px solid #e5e7eb; */
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); */
  border-radius: 0.5rem 0 0 0.5rem;
  transition: all 0.3s ease;
  /* color: #1e293b; */
  width: 100%;
}
:deep(.p-autocomplete-dropdown) {
  background-color: var(--p-autocomplete-background);
  color: var(--p-multiselect-dropdown-color);
}
/* :deep(.p-autocomplete) {
  width: 100%;
}
:deep(.p-autocomplete-chip-icon) {
  color: red;
}



:deep(.p-autocomplete-input:focus) {
  box-shadow: 0 4px 12px rgba(76, 161, 255, 0.15);
  border-color: #4ca1ff;
  transform: translateY(-1px);
}

:deep(.dark .p-autocomplete-input) {
  background-color: #1e293b;
  border: 1px solid #334155;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color: #f8fafc;
}

:deep(.dark .p-autocomplete-input:focus) {
  box-shadow: 0 4px 12px rgba(175, 85, 255, 0.2);
  border-color: #af55ff;
}

:deep(.p-autocomplete-item) {
  padding: 0.75rem 1rem;
  transition: background-color 0.2s ease;
}

:deep(.p-autocomplete-item:hover) {
  background-color: #f3f4f6;
}

:deep(.dark .p-autocomplete-item) {
  color: #f8fafc;
}

:deep(.dark .p-autocomplete-item:hover) {
  background-color: #334155;
}

:deep(.p-invalid) {
  border-color: #ff6b6b !important;
} */
</style>
