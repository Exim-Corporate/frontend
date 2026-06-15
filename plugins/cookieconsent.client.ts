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

  // Показываем баннер только через 2 секунды после загрузки страницы (только при первой инициализации)
  let consentInitialized = false;
  const showConsent = () => {
    if (consentInitialized) return;
    consentInitialized = true;
    setTimeout(() => {
      injectConsentStyles(); // Inject CSS only now — not on page load
      runConsent(locale.value);
      // Подписка на смену языка
      watch(
        () => locale.value,
        newLocale => {
          // Не сбрасываем куки, просто обновляем язык баннера
          runConsent(newLocale);
        },
      );
    }, 2000);
  };

  if (document.readyState === 'complete') {
    showConsent();
  } else {
    window.addEventListener('load', showConsent, { once: true });
  }
});
