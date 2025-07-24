<template>
  <div class="relative">
    <Dropdown
      v-model="selectedLocale"
      :options="locales"
      optionLabel="name"
      optionValue="code"
      class="language-selector"
      @change="switchLanguage($event.value)"
    >
      <template #value="slotProps">
        <div class="flex items-center gap-2">
          <AppIcon
            :icon="`emojione:flag-for-${getFlagIconName(slotProps.value || 'en')}`"
            :size="16"
          />
          <span>{{ slotProps.value?.toUpperCase() || 'EN' }}</span>
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex items-center gap-2">
          <AppIcon
            :icon="`emojione:flag-for-${getFlagIconName(slotProps.option.code)}`"
            :size="16"
          />
          <span>{{ slotProps.option.name }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import AppIcon from '@/components/UI/AppIcon.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const selectedLocale = ref(locale.value);

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

function getFlagIconName(code: string): string {
  const flagMap: Record<string, string> = {
    en: 'united-kingdom',
    de: 'germany',
    fr: 'france',
    es: 'spain',
  };
  return flagMap[code] || 'united-kingdom';
}
</script>

<style scoped>
.language-selector {
  min-width: 100px;
  background-color: transparent;
}
.language-selector:hover {
  background-color: transparent;
}
.language-selector:hover .dark {
  background-color: transparent;
}
</style>
