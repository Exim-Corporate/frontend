<template>
  <Accordion v-model:value="activeValue" :multiple="multiple" :class="rootClass">
    <template v-if="$slots.expandicon" #expandicon>
      <slot name="expandicon" />
    </template>
    <template v-if="$slots.collapseicon" #collapseicon>
      <slot name="collapseicon" />
    </template>

    <AccordionPanel v-for="item in items" :key="item.value" :value="item.value" :class="panelClass">
      <AccordionHeader :class="headerClass">
        <slot name="header" :item="item">
          {{ item.title }}
        </slot>
      </AccordionHeader>
      <AccordionContent :class="contentClass">
        <slot name="content" :item="item">
          {{ item.content }}
        </slot>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

export interface AppAccordionItem {
  value: string;
  title?: string;
  content?: string;
  [key: string]: unknown;
}

interface AppAccordionProps {
  items: AppAccordionItem[];
  multiple?: boolean;
  modelValue?: string | string[] | null;
  initialValue?: string | string[] | null;
  rootClass?: string;
  panelClass?: string;
  headerClass?: string;
  contentClass?: string;
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[] | null): void;
}>();

const props = withDefaults(defineProps<AppAccordionProps>(), {
  multiple: false,
  modelValue: undefined,
  initialValue: undefined,
  rootClass: '',
  panelClass: '',
  headerClass: '',
  contentClass: '',
});

const getDefaultValue = (): string | string[] | null => {
  if (props.modelValue !== undefined) {
    return props.modelValue;
  }

  if (props.initialValue !== undefined) {
    return props.initialValue;
  }

  if (props.multiple) {
    return [];
  }

  return props.items[0]?.value ?? null;
};

const activeValue = ref<string | string[] | null>(getDefaultValue());

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      activeValue.value = newValue;
    }
  },
);

watch(
  () => props.initialValue,
  (newValue) => {
    if (newValue !== undefined && props.modelValue === undefined) {
      activeValue.value = newValue;
    }
  },
);

watch(
  activeValue,
  (newValue) => {
    emit('update:modelValue', newValue);
  },
);

watch(
  () => props.items,
  (newItems) => {
    if (props.multiple) {
      return;
    }

    if (typeof activeValue.value !== 'string') {
      activeValue.value = newItems[0]?.value ?? null;
      return;
    }

    const hasActive = newItems.some((item) => item.value === activeValue.value);
    if (!hasActive) {
      activeValue.value = newItems[0]?.value ?? null;
    }
  },
  { deep: true },
);
</script>
