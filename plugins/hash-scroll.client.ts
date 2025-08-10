// Plugin to handle hash-based scrolling after route navigation using only Nuxt router APIs.
// Simplifies logic: if a route has a hash, wait for next tick + element availability, then smooth scroll.
// Retries for late-mounted components (ISR / async data) without custom per-component code.

import { useRouter } from 'nuxt/app';
import { nextTick } from 'vue';

export default defineNuxtPlugin(() => {
  if (import.meta.server) return;
  const router = useRouter();

  router.afterEach(async to => {
    if (!to.hash) return;

    // Wait one tick for DOM updates after navigation
    await nextTick();

    const hash = to.hash;
    let attempts = 0;
    const maxAttempts = 20; // ~2s worst-case if 100ms interval

    const tryScroll = () => {
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top });
        return;
      }
      if (attempts < maxAttempts) {
        attempts += 1;
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  });
});
