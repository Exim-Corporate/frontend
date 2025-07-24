import { defineNuxtPlugin } from 'nuxt/app';
import cookiesEn from '@/i18n/locales/coockies/cookies-en';
import cookiesEs from '@/i18n/locales/coockies/cookies-es';
import cookiesFr from '@/i18n/locales/coockies/cookies-fr';
import cookiesDe from '@/i18n/locales/coockies/cookies-de';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

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
