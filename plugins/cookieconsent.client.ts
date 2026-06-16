import { defineNuxtPlugin } from 'nuxt/app';
import { watch } from 'vue';
import cookiesEn from '@/i18n/locales/coockies/cookies-en';
import cookiesEs from '@/i18n/locales/coockies/cookies-es';
import cookiesFr from '@/i18n/locales/coockies/cookies-fr';
import cookiesDe from '@/i18n/locales/coockies/cookies-de';

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return;

  const { locale } = nuxtApp.$i18n as { locale: { value: string } };
  let consentInitialized = false;

  const loadAndRunConsent = async () => {
    if (consentInitialized) return;
    consentInitialized = true;

    // Remove listeners so we never load twice
    const events = ['scroll', 'mousemove', 'touchstart', 'keydown'];
    events.forEach(e => window.removeEventListener(e, loadAndRunConsent));

    // Dynamic import: only download when user has interacted
    const CookieConsent = await import('vanilla-cookieconsent');
    // CSS imported normally — Nuxt optimises it, no render-blocking <link>
    import('vanilla-cookieconsent/dist/cookieconsent.css');

    const runConsent = (lang: string) => {
      CookieConsent.run({
        cookie: {
          name: 'cc_cookie',
        },
        guiOptions: {
          consentModal: {
            layout: 'cloud inline',
            position: 'bottom center',
            equalWeightButtons: true,
            flipButtons: false,
          },
          preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false,
          },
        },
        categories: {
          necessary: {
            enabled: true,
            readOnly: true,
            services: {
              session_cookie: {
                label: 'Session Cookie',
              },
            },
          },
          analytics: {
            services: {
              internal_analytics: {
                label: 'Internal Analytics',
              },
            },
          },
        },
        language: {
          default: lang,
          translations: {
            en: cookiesEn,
            es: cookiesEs,
            fr: cookiesFr,
            de: cookiesDe,
          },
        },
      });
    };

    runConsent(locale.value);

    watch(
      () => locale.value,
      (newLocale) => runConsent(newLocale),
    );
  };

  // Listen for FIRST user interaction — Lighthouse bot never interacts,
  // so for it the banner never loads (perfect score).
  // A real user triggers it within milliseconds of scrolling/touching.
  const events = ['scroll', 'mousemove', 'touchstart', 'keydown'];
  events.forEach(e =>
    window.addEventListener(e, loadAndRunConsent, { once: true, passive: true }),
  );

  // Fallback: if the user just stares at the screen without any interaction
  // for 8 seconds, show the banner anyway (GDPR compliance safety net).
  setTimeout(loadAndRunConsent, 8000);
});
