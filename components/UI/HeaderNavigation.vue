<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAnalytics } from '@/composables/useAnalytics';

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/#about', label: 'navigation.about' },
  { to: '/#services', label: 'navigation.services' },
  { to: '/#contact-us', label: 'navigation.contact' },
  { to: '/blog', label: 'navigation.blog' },
];

const { t } = useI18n();
const { trackNavigation } = useAnalytics();
const emit = defineEmits<{ (e: 'update:visible', value: boolean): void }>();

function onNavClick(to: string) {
  const navItem = navItems.find(item => item.to === to);
  trackNavigation(to, navItem ? t(navItem.label) : to, window.location.pathname);
  emit('update:visible', false); // Close the menu
}
</script>

<template>
  <nav
    class="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 flex-wrap justify-start md:justify-center"
  >
    <NuxtLinkLocale
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="dark:text-gray-300 text-dark hover:text-accent transition-colors cursor-pointer whitespace-nowrap"
      :aria-label="$t(item.label)"
      @click="() => onNavClick(item.to)"
    >
      <span>{{ $t(item.label) }}</span>
    </NuxtLinkLocale>
  </nav>
</template>
