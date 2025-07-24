<template>
  <FormField
    :id="id"
    :label="label"
    :required="required"
    :optional="optional"
    :error-message="errorMessage"
  >
    <MultiSelect
      :id="id"
      v-model="selectValue"
      :options="options"
      :placeholder="placeholder"
      :optionLabel
      class="w-full input-field"
      :class="{ 'p-invalid': isInvalid }"
      v-bind="$attrs"
      @change="$emit('change', $event)"
    />
  </FormField>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FormField from '@/components/UI/form/FormField.vue';
// import MultiSelect from 'primevue/multiselect';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: 'name',
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

const emit = defineEmits(['update:modelValue', 'change']);

const selectValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>

<style scoped>
/* :deep(.p-multiselect) {
  width: 100%;
  background-color: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: #1e293b;
}

:deep(.p-multiselect:focus) {
  box-shadow: 0 4px 12px rgba(76, 161, 255, 0.15);
  border-color: #4ca1ff;
  transform: translateY(-1px);
}

:deep(.dark .p-multiselect) {
  background-color: #1e293b;
  border: 1px solid #334155;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

:deep(.dark .p-multiselect:focus) {
  box-shadow: 0 4px 12px rgba(175, 85, 255, 0.2);
  border-color: #af55ff;
}

:deep(.p-multiselect-token) {
  color: #4361ee;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  margin: 0.1rem;
}

:deep(.dark .p-multiselect-token) {
  background-color: #334155;
  color: #a5b4fc;
} */
</style>
