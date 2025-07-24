<template>
  <FormField
    :id="id"
    :label="label"
    :required="required"
    :optional="optional"
    :error-message="errorMessage"
  >
    <Textarea
      :id="id"
      v-model="textareaValue"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxlength"
      class="w-full input-field"
      :class="{ 'p-invalid': isInvalid }"
      v-bind="$attrs"
      @input="$emit('char-count', textareaValue.length)"
    />
    <div class="flex justify-between mt-1 relative">
      <small
        v-if="showCharCount"
        class="text-gray-500 dark:text-gray-300 text-xs ml-auto absolute right-1"
      >
        {{ charCount }}/{{ maxlength }}
      </small>
    </div>
  </FormField>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FormField from '@/components/UI/form/FormField.vue';
// import Textarea from 'primevue/textarea';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 5,
  },
  maxlength: {
    type: Number,
    default: 500,
  },
  charCount: {
    type: Number,
    default: 0,
  },
  showCharCount: {
    type: Boolean,
    default: true,
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

const emit = defineEmits(['update:modelValue', 'char-count']);

const textareaValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>

<style scoped>
/* :deep(.input-field) {
  background-color: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: #1e293b;
  width: 100%;
  resize: vertical;
}

:deep(.input-field:focus) {
  box-shadow: 0 4px 12px rgba(76, 161, 255, 0.15);
  border-color: #4ca1ff;
  transform: translateY(-1px);
}

:deep(.dark .input-field) {
  background-color: #1e293b;
  border: 1px solid #334155;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color: #f8fafc;
}

:deep(.dark .input-field:focus) {
  box-shadow: 0 4px 12px rgba(175, 85, 255, 0.2);
  border-color: #af55ff;
}

:deep(.input-field:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}

@keyframes focusAnimation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

:deep(.input-field:focus) {
  animation: focusAnimation 1s ease forwards;
  background-size: 200% 100%;
} */
</style>
