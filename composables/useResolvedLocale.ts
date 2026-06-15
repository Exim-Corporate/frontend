/**
 * Returns the locale derived from the current route URL path.
 *
 * When `skipSettingLocaleOnNavigate: true` is set in the i18n config,
 * `locale` from `useI18n()` remains stale during the new component's
 * `<script setup>` execution (before `finalizePendingLocaleChange` fires
 * in `onBeforeEnter`). This composable extracts the actual locale from
 * the URL prefix instead, which is always correct.
 *
 * Strategy: `prefix_except_default` —
 *   `/de/...` → 'de',  `/fr/...` → 'fr',  `/es/...` → 'es',  `/` → 'en'
 */
import { computed, type ComputedRef } from 'vue';
import { useRoute } from '#imports';

const LOCALE_PREFIXES = ['de', 'fr', 'es'] as const;

export type ResolvedLocale = typeof LOCALE_PREFIXES[number] | 'en';

export const useResolvedLocale = (): ComputedRef<ResolvedLocale> => {
  const route = useRoute();

  return computed((): ResolvedLocale => {
    const firstSegment = route.path.split('/').filter(Boolean)[0];
    if (firstSegment && (LOCALE_PREFIXES as readonly string[]).includes(firstSegment)) {
      return firstSegment as ResolvedLocale;
    }
    return 'en';
  });
};
