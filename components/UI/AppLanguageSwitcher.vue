<template>
  <div class="relative">
    <Dropdown
      v-model="selectedLocale"
      :options="locales"
      optionLabel="name"
      optionValue="code"
      class="language-selector"
      :dt="dropdownDt"
      appendTo="self"
      @change="switchLanguage($event.value)"
    >
      <template #value="slotProps">
        <div class="flex items-center">
          <span>{{ slotProps.value?.toUpperCase() || 'EN' }}</span>
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <span>{{ slotProps.option.name }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';
import { useI18n, useSwitchLocalePath, navigateTo } from '#imports';

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const selectedLocale = ref(locale.value);

const dropdownDt = {
  option: {
    selected: {
      background: '{form-border}',
      color: '{text-dark}',
      focus: {
        background: '{form-border-hover}',
        color: '{text-dark}',
      },
    },
    focus: {
      background: '{surface-100}',
      color: '{text-dark}',
    },
  },
  checkmark: {
    color: '{text-dark}',
  },
};

function switchLanguage(newLocale: string) {
  if (newLocale !== locale.value) {
    const path = switchLocalePath(newLocale as typeof locale.value);
    if (path) {
      navigateTo(path);
    }
  }
}

const locales = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
];
</script>

<style>
.language-selector {
  background-color: transparent;
  border: transparent;
}
.language-selector .p-select {
  box-shadow: none !important;
}
.language-selector:hover {
  background-color: transparent;
}
.language-selector .p-select-dropdown {
  width: 0 !important;
  height: 0 !important;
  display: none !important;
}
.language-selector .p-dropdown-trigger {
  display: none !important;
}
</style>
