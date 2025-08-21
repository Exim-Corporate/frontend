<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'nuxt/app';
import { useLocalePath } from '#imports';
import { useAnalytics } from '@/composables/useAnalytics';

interface NavItem {
  path: string;
  hash?: string;
  label: string;
}

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { trackNavigation } = useAnalytics();
const emit = defineEmits<{ (e: 'update:visible', value: boolean): void }>();

const navItems = computed<NavItem[]>(() => [
  { path: localePath('/'), hash: '#about', label: 'navigation.about' },
  { path: localePath('/'), hash: '#services', label: 'navigation.services' },
  { path: localePath('/'), hash: '#faq', label: 'navigation.faq' },
  { path: localePath('/referrals'), label: 'navigation.referrals' },
  { path: localePath('/blog'), label: 'navigation.blog' },
]);

async function onNav(item: NavItem) {
  emit('update:visible', false);
  const target = item.path + (item.hash || '');
  trackNavigation(target, t(item.label), route.fullPath);

  // Same page + hash: push only hash to update route (Nuxt won't reload component) and let plugin scroll
  if (item.hash && route.path === item.path) {
    const hash = item.hash;
    const el = document.querySelector(hash) as HTMLElement | null;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.history.replaceState({}, '', hash); // update URL without navigation cycle
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      // fallback: defer until mounted element appears briefly
      let tries = 0;
      const max = 15;
      const attempt = () => {
        const late = document.querySelector(hash) as HTMLElement | null;
        if (late) {
          const t = late.getBoundingClientRect().top + window.scrollY;
          window.history.replaceState({}, '', hash);
          window.scrollTo({ top: t, behavior: 'smooth' });
          return;
        }
        if (tries++ < max) requestAnimationFrame(attempt);
      };
      attempt();
    }
    return;
  }
  await router.push({ path: item.path, hash: item.hash });
}
</script>

<template>
  <nav
    class="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 flex-wrap justify-start md:justify-center"
  >
    <!-- Use NuxtLink for normal navigation (ensures proper route resolution and a real anchor),
         keep button behavior for same-page hash scrolling -->
    <template
      v-for="item in navItems"
      :key="item.path + (item.hash || '')"
    >
      <NuxtLink
        v-if="!item.hash"
        :to="item.path"
        class="dark:text-gray-300 text-dark hover:text-accent transition-colors cursor-pointer whitespace-nowrap bg-transparent border-0 p-0"
        :aria-label="$t(item.label)"
        :data-active="route.path === item.path ? 'true' : 'false'"
        @click="() => onNav(item)"
      >
        <span>{{ $t(item.label) }}</span>
      </NuxtLink>

      <button
        v-else
        type="button"
        class="dark:text-gray-300 text-dark hover:text-accent transition-colors cursor-pointer whitespace-nowrap bg-transparent border-0 p-0"
        :aria-label="$t(item.label)"
        :data-active="route.path === item.path ? 'true' : 'false'"
        @click="() => onNav(item)"
      >
        <span>{{ $t(item.label) }}</span>
      </button>
    </template>
  </nav>
</template>
