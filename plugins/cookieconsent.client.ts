import { defineNuxtPlugin } from 'nuxt/app';
import { watch } from 'vue';
import cookiesEn from '@/i18n/locales/coockies/cookies-en';
import cookiesEs from '@/i18n/locales/coockies/cookies-es';
import cookiesFr from '@/i18n/locales/coockies/cookies-fr';
import cookiesDe from '@/i18n/locales/coockies/cookies-de';
// ?inline tells Vite to import the CSS as a plain string instead of injecting a
// render-blocking <link> tag. We manually inject it right before the banner shows,
// so it never appears in the page <head> until the user actually needs it.
// Without this, the CSS was bundled into a separate chunk and added as a
// render-blocking <link rel="stylesheet"> — making the consent banner text the
// LCP element at ~4.5 s even with a 2-second delay.
// @ts-expect-error — Vite ?inline transform is valid at runtime; no TS declaration needed
import ccStyles from 'vanilla-cookieconsent/dist/cookieconsent.css?inline';

function injectConsentStyles() {
  if (document.getElementById('cc-styles')) return;
  const style = document.createElement('style');
  style.id = 'cc-styles';
  style.textContent = ccStyles as unknown as string;
  document.head.appendChild(style);
}

export default defineNuxtPlugin(async nuxtApp => {
  if (!import.meta.client) return;

  const { locale } = nuxtApp.$i18n as { locale: { value: string } };
  const CookieConsent = await import('vanilla-cookieconsent');

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

  // Delay cookie consent banner to avoid impacting LCP and Core Web Vitals.
  // Using requestIdleCallback + 5s delay ensures the banner loads after:
  // 1. LCP has been recorded (typically < 2.5s)
  // 2. First Input Delay / INP is not affected
  // 3. CLS is not impacted by the banner injection
  // The banner uses position:fixed so it won't cause layout shifts when it appears.
  let consentInitialized = false;

  const showConsent = () => {
    if (consentInitialized) return;
    consentInitialized = true;

    // Use requestIdleCallback if available, otherwise setTimeout
    const scheduleConsent = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        // Wait for browser idle + 5s minimum delay to ensure LCP is complete
        const startTime = Date.now();
        requestIdleCallback(
          () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 5000 - elapsed);
            setTimeout(callback, remaining);
          },
          { timeout: 10000 }, // Max wait 10s before forcing execution
        );
      } else {
        // Fallback: just use 5s delay
        setTimeout(callback, 5000);
      }
    };

    scheduleConsent(() => {
      injectConsentStyles(); // Inject CSS only now — not on page load
      runConsent(locale.value);
      // Subscribe to locale changes
      watch(
        () => locale.value,
        newLocale => {
          // Don't reset cookies, just update banner language
          runConsent(newLocale);
        },
      );
    });
  };

  if (document.readyState === 'complete') {
    showConsent();
  } else {
    window.addEventListener('load', showConsent, { once: true });
  }
});
