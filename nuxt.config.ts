import { defineNuxtConfig } from 'nuxt/config';
import Noir from './assets/theme';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Включаем SSR для генерации статических страниц
  ssr: true,

  vite: {
    plugins: [tsconfigPaths(), tailwindcss()],
  },

  // Конфигурация для Vercel SSG
  nitro: {
    preset: 'vercel',

    // Настройки маршрутов для SSG + API
    routeRules: {
      // Статические страницы (SSG) - оставляем как есть или меняем на isr
      '/': { isr: true }, // Пример: главная страница с ISR
      '/about': { isr: true }, // Пример: страница "О нас" с ISR
      '/services': { isr: true }, // Пример: страница "Услуги" с ISR
      '/contact': { isr: true }, // Пример: страница "Контакты" с ISR
      '/privacy': { isr: true }, // Пример: страница "Политика конфиденциальности" с ISR
      '/terms': { isr: true }, // Пример: страница "Условия использования" с ISR
      '/impressum': { isr: true }, // Пример: страница "Impressum" с ISR
      '/cookie-policy': { isr: true }, // Пример: страница "Политика Cookie" с ISR

      // Языковые версии - также можно настроить ISR
      '/de': { isr: true },
      '/de/**': { isr: true }, // Все страницы в /de/ с ISR
      '/fr': { isr: true },
      '/fr/**': { isr: true }, // Все страницы в /fr/ с ISR
      '/es': { isr: true },
      '/es/**': { isr: true }, // Все страницы в /es/ с ISR

      // API маршруты для серверных функций
      '/api/**': {
        cors: true,
        // Для API маршрутов ISR не применяется напрямую, но кеширование важно
        // Устанавливаем stale-while-revalidate для API, если это необходимо.
        // Vercel автоматически обрабатывает Cache-Control заголовки для Serverless Functions.
        // s-maxage определяет время кеширования на CDN, stale-while-revalidate позволяет показывать старый кеш во время обновления.
        headers: { 'cache-control': 's-maxage=1, stale-while-revalidate=31536000' }, // Пример: кеш на 1 секунду, ревалидация в течение года
      },

      // Preview страницы (только для разработки)
      // '/preview/**': {
      //   prerender: false, // Оставляем false, т.к. это для разработки
      //   index: false,
      //   robots: false,
      // },
    },

    // Настройки prerender для SSG
    // prerender больше не нужен в таком виде, если мы используем isr для всех страниц.
    // Vercel будет автоматически генерировать страницы при первом запросе, если они не предрендерены.
    // Если какие-то страницы должны быть строго предрендерены при сборке, их можно оставить здесь.
    // Но для ISR основной механизм - это routeRules.
    prerender: {
      crawlLinks: true, // Можно оставить, если есть страницы, которые должны быть предрендерены
      routes: [
        // Список можно сократить или убрать, если все страницы покрыты isr: true в routeRules
        // Например, если '/' : { isr: true }, то '/' здесь не обязателен.
        // Оставляем только те, что критично важно иметь при сборке.
        // Для максимальной ISR-оптимизации, этот список может быть пустым,
        // полагаясь на isr: true и crawlLinks для обнаружения остальных страниц.
      ],
    },
  },

  modules: ['@nuxt/eslint', '@nuxt/image', '@primevue/nuxt-module', '@nuxtjs/i18n', 'nuxt-aos'],

  // Оптимизация изображений для production
  image: {
    dir: 'public',
    format: ['webp', 'jpeg', 'png'],
    quality: 85,
    // Использовать встроенный provider для SSG
    provider: process.env.NODE_ENV === 'production' ? 'ipx' : 'ipx',
  },

  runtimeConfig: {
    gmail: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
      to: process.env.GMAIL_TO,
    },
    public: {
      privacyEmail: process.env.NUXT_PUBLIC_PRIVACY_EMAIL,
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL,
      supportEmail: process.env.NUXT_PUBLIC_SUPPORT_EMAIL,
    },
  },

  experimental: {
    scanPageMeta: true,
    // Отключаем payload extraction для лучшей производительности SSG
    payloadExtraction: false,
  },

  aos: {
    duration: 1000,
    easing: 'ease-in-out',
    offset: 60,
    anchorPlacement: 'top-bottom',
    mirror: true,
  },

  i18n: {
    langDir: 'locales',
    defaultLocale: 'en',
    skipSettingLocaleOnNavigate: true,
    lazy: true,
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.ts', name: 'English' },
      { code: 'de', iso: 'de-DE', file: 'de.ts', name: 'Deutsch' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.ts', name: 'Français' },
      { code: 'es', iso: 'es-ES', file: 'es.ts', name: 'Español' },
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    pages: {
      'cookie-policy': {
        en: '/cookie-policy',
        fr: '/cookie-policy',
        de: '/cookie-policy',
        es: '/cookie-policy',
      },
      impressum: {
        en: '/impressum',
        fr: '/impressum',
        de: '/impressum',
        es: '/impressum',
      },
      privacy: {
        en: '/privacy',
        fr: '/privacy',
        de: '/privacy',
        es: '/privacy',
      },
      terms: {
        en: '/terms',
        fr: '/terms',
        de: '/terms',
        es: '/terms',
      },
    },
  },

  primevue: {
    options: {
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primevue',
            order: 'theme, base, primevue',
          },
        },
      },
    },
    components: {
      exclude: ['Form', 'FormField', 'Editor', 'Chart'],
    },
  },

  css: ['~/assets/css/main.css'],

  components: {
    dirs: ['~/components', '~/components/UI'],
  },
  app: {
    head: {
      title: 'AS Exim - Expert IT Staffing & Remote Developers',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        {
          name: 'description',
          content:
            'Your trusted partner for custom software development solutions. Connect with top-tier tech talent - pre-vetted developers, designers, and QA engineers ready for your projects.',
        },
        // Open Graph базовые теги
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'AS Exim' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        // Theme and app info
        { name: 'theme-color', content: '#2563eb' },
        { name: 'msapplication-TileColor', content: '#2563eb' },
        { name: 'application-name', content: 'AS Exim' },
        // Business info
        { name: 'author', content: 'AS Exim' },
        {
          name: 'keywords',
          content:
            'IT staffing, remote developers, software development, tech talent, outsourcing, developers, engineers, QA, designers',
        },
      ],
      link: [
        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logoPic.webp' },
        // Canonical URL
        { rel: 'canonical', href: 'https://www.exim.eu.com' }, // Замените на ваш домен
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
});
