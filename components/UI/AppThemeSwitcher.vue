<template>
  <div class="theme-switcher-container">
    <label
      for="theme-toggle"
      class="sr-only"
    >
      {{ $t('header.switchTheme') }}
    </label>
    <ToggleSwitch
      v-model="darkMode"
      :class="`${className} ${size} `"
      inputId="theme-toggle"
    >
      <template #handle>
        <AppIcon
          :icon="`noto-v1:${darkMode ? 'crescent-moon' : 'sun'}`"
          :size="iconSize"
        />
      </template>
    </ToggleSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ToggleSwitch from 'primevue/toggleswitch';
import AppIcon from '@/components/UI/AppIcon.vue';

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value),
  },
  className: {
    type: String,
    default: '',
  },
});

const isDarkTheme = ref(false);

const iconSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 16;
    case 'large':
      return 24;
    default:
      return 20;
  }
});

const darkMode = computed({
  get: () => isDarkTheme.value,
  set: value => {
    isDarkTheme.value = value;
    document.documentElement.classList.toggle('dark', value);
    document.documentElement.classList.toggle('cc--darkmode', value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
  },
});

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set theme based on saved preference or system preference
  isDarkTheme.value = savedTheme === 'dark' || (!savedTheme && prefersDark);

  // Apply theme
  document.documentElement.classList.toggle('dark', isDarkTheme.value);
  document.documentElement.classList.toggle('cc--darkmode', isDarkTheme.value);
};

// Watch for system theme changes
onMounted(() => {
  initializeTheme();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      darkMode.value = e.matches;
    }
  });
});
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
