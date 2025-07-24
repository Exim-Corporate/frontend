<script setup lang="ts">
import { useRoute } from 'vue-router';
import { nextTick } from 'vue';

/**
 * Defines the structure for a navigation item.
 */
interface NavItem {
  to: string;
  label: string;
}

// Navigation structure
const navItems: NavItem[] = [
  // { to: '/', label: 'navigation.home' },
  { to: '#about', label: 'navigation.about' },
  { to: '#services', label: 'navigation.services' },
  { to: '#contact-us', label: 'navigation.contact' },
  { to: '/blog', label: 'navigation.blog' },
];

const route = useRoute();
const { t } = useI18n();

// Analytics tracking
const { trackNavigation } = useAnalytics();

const emit = defineEmits<{ (e: 'update:visible', value: boolean): void }>();

/**
 * Scrolls to a specific element on the page smoothly.
 * @param selector - The ID of the element to scroll to (e.g., '#about').
 */
function scrollToSection(selector: string): void {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
async function handleNavClick(to: string, event: MouseEvent): Promise<void> {
  // Get navigation item for better tracking context
  const navItem = navItems.find(item => item.to === to);
  const pageTitle = navItem ? t(navItem.label) : to;

  // Track navigation event
  trackNavigation(to, pageTitle, route.path);

  // Handle hash links for smooth scrolling
  if (to.startsWith('#')) {
    event.preventDefault();

    // If we are not on the homepage, navigate there first.
    if (route.path !== '/') {
      await navigateTo('/');
      // Wait for the next DOM update cycle to ensure the section is available.
      await nextTick();
    }

    // Now, scroll to the section.
    scrollToSection(to);
  } else {
    // For regular links, just navigate.
    navigateTo(to);
  }

  emit('update:visible', false); // Close the menu if it's open
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
      class="text-gray-300 hover:text-accent transition-colors cursor-pointer whitespace-nowrap"
      :class="{
        // 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-hover'
        // 'text-gray-700 dark:text-gray-200 hover:bg-accent/10 hover:text-accent': !isActive(item.to),
      }"
      :aria-label="$t(item.label)"
      @click="handleNavClick(item.to, $event)"
    >
      <span>{{ $t(item.label) }}</span>
    </NuxtLinkLocale>
  </nav>
</template>
