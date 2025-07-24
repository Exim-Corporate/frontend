<template>
  <div class="flex flex-col items-center mt-6">
    <Button
      type="submit"
      :severity="severity"
      :size="size"
      class="px-12 transition-all cursor-pointer duration-300 py-3 text-lg w-full md:w-auto shadow-lg hover:shadow-xl active:color-inherit active:bg-accent active:scale-90 active:text-gray-100"
      :loading="loading"
      v-bind="$attrs"
    >
      <template v-if="loading">
        <span class="flex items-center gap-2">
          <span>{{ loadingLabel }}</span>
          <span
            class="border-2 ml-2 border-t-2 border-amber-50 border-t-transparent rounded-full w-5 h-5 animate-spin"
          />
        </span>
      </template>
      <template v-else>
        <slot>{{ label }}</slot>
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

defineProps({
  label: {
    type: String,
    default: 'Submit',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingLabel: {
    type: String,
    default: 'Sending...',
  },
  severity: {
    type: String,
    default: 'contrast',
  },
  size: {
    type: String,
    default: 'large',
  },
});
</script>

<style scoped>
:deep(.p-button) {
  border-radius: 0.5rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

:deep(.p-button:hover) {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.45);
  transform: scale(1.05);
  border: none;
  transition: all 0.3s ease;
}

:deep(.p-button:focus) {
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 161, 255, 0.25);
}
:deep(.p-button:active) {
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 161, 255, 0.25);
}
</style>
