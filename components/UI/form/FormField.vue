<template>
  <div class="form-field">
    <label
      :for="id"
      class="block text-sm font-medium text-text-dark dark:text-text-light mb-1 p-component"
    >
      {{ label }}
      <span v-if="optional"> ({{ $t('contact.labels.optional') }})</span>
      <span
        v-else-if="required"
        class="p-required-field"
      >
        *</span
      >
    </label>
    <div class="p-field-content">
      <slot />
    </div>
    <small
      v-if="errorMessage"
      class="p-error"
    >
      {{ errorMessage }}
    </small>
    <slot name="hint" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  optional: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.form-field {
  position: relative;
  margin-bottom: 1rem;
}

.p-field-content {
  width: 100%;
}

.p-required-field {
  color: var(--red-500, #ff6b6b);
}

.p-error {
  color: var(--red-500, #ff6b6b);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

/* Общие стили для всех элементов формы */
:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-multiselect),
:deep(.p-textarea),
:deep(.p-autocomplete) {
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

:deep(.p-dropdown-panel),
:deep(.p-multiselect-panel),
:deep(.p-autocomplete-panel) {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

:deep(.p-dropdown-items-wrapper),
:deep(.p-multiselect-items-wrapper),
:deep(.p-autocomplete-items-wrapper) {
  max-height: 250px;
}

:deep(.p-dropdown-label),
:deep(.p-multiselect-label),
:deep(.p-autocomplete-input) {
  height: 100%;
  display: flex;
  align-items: center;
}

:deep(.p-invalid) {
  border-color: var(--red-500, #ff6b6b) !important;
}

/* Темная тема для общих элементов */
/* :deep(.dark .p-dropdown-panel),
:deep(.dark .p-multiselect-panel),
:deep(.dark .p-autocomplete-panel) {
  background-color: #1e293b;
  color: #f8fafc;
  border: 1px solid #334155;
}

:deep(.dark .p-dropdown-label),
:deep(.dark .p-multiselect-label) {
  color: #f8fafc;
} */
</style>
