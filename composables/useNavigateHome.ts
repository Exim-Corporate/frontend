/**
 * Composable to navigate user to the localized home page and scroll to top.
 * Reuses current i18n locale and closes any provided reactive visibility flag (e.g. drawers).
 */
import { useI18n } from 'vue-i18n';
import { useRouter } from 'nuxt/app';

export interface NavigateHomeOptions {
  /** Optional ref<boolean> controlling a drawer / modal visibility to auto-close */
  visibleRef?: { value: boolean };
  /** Smooth scroll (default true) */
  smooth?: boolean;
}

export function useNavigateHome(options: NavigateHomeOptions = {}) {
  const { locale } = useI18n();
  const router = useRouter();

  function navigateToHome() {
    if (options.visibleRef && options.visibleRef.value) options.visibleRef.value = false;
    const route = locale.value === 'en' ? '/' : `/${locale.value}`;
    router.push(route);
    scrollToTop();
  }

  function scrollToTop() {
    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: options.smooth === false ? 'auto' : 'smooth' });
    }
  }

  return { navigateToHome, scrollToTop };
}

export default useNavigateHome;
