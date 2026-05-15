import Noir from './assets/theme';
import tailwindcss from '@tailwindcss/vite';
const HOME_ISR_TTL = 60 * 60 * 24 * 7;

export default {
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // SSR by default; only homepage uses ISR.
  ssr: true,

  vite: {
    build: {
      sourcemap: false,
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'primevue/badge',
        'primevue/accordion',
        'primevue/accordiontab',
        'primevue/button',
        'primevue/toast',
        'primevue/drawer',
        'primevue/megamenu',
        'primevue/panelmenu',
        'primevue/dropdown',
        'primevue/toggleswitch',
        'primevue/checkbox',
        'primevue/textarea',
        'primevue/multiselect',
        'primevue/inputtext',
        'primevue/autocomplete',
        'primevue/paginator',
        'primevue/usetoast',
        '@iconify/vue',
        '@vuelidate/core',
        '@vuelidate/validators',
        'vue3-carousel-3d',
        'vue-star-rating',
        'qs',
      ],
    },
  },

  // Vercel runtime: SSR by default + homepage ISR only.
  nitro: {
    preset: process.env.NODE_ENV === 'development' ? 'node-server' : 'vercel',
    vercel: {
      config: {
        bypassToken: process.env.VERCEL_BYPASS_TOKEN,
      },
    },
    routeRules: {
      '/': { isr: HOME_ISR_TTL },
      '/api/**': {
        cors: true,
        headers: { 'cache-control': 's-maxage=1, stale-while-revalidate=31536000' },
      },
      '/preview/**': {
        prerender: false,
        index: false,
      },
    },
  },

  // router: {
  //   options: {
  //     scrollBehavior(to, from, savedPosition) {
  //       if (savedPosition) {
  //         return savedPosition;
  //       }
  //       if (to.hash) {
  //         return new Promise(resolve => {
  //           setTimeout(() => {
  //             resolve({
  //               el: to.hash,
  //               top: 100, // Смещение сверху, если у вас фиксированный хедер
  //               behavior: 'smooth',
  //             });
  //           }, 500); // Небольшая задержка для рендера DOM
  //         });
  //       }
  //       return { top: 0, behavior: 'smooth' };
  //     },
  //   },
  // },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    'nuxt-aos',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  eslint: {
    checker: {
      lintOnStart: false,
    },
  },

  // Google Analytics/Tag Manager configuration
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: process.env.NUXT_PUBLIC_GTAG_ID || 'G-3MTS6NR81E',
    config: {
      page_title: 'AS Exim - Expert IT Staffing & Remote Developers',
      send_page_view: true, // Enhanced measurement должен быть включен в GA4
    },
  },
  // Оптимизация изображений для production
  image: {
    dir: 'public',
    format: ['webp', 'jpeg', 'png'],
    quality: 85,
    // Использовать встроенный provider для SSG
    provider: 'ipx',
  },

  fonts: {
    defaults: {
      subsets: ['latin'],
      styles: ['normal'],
      fallbacks: {
        'sans-serif': ['Arial', 'Helvetica Neue', 'sans-serif'],
        serif: ['Times New Roman', 'Times', 'serif'],
      },
    },
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: ['300', '400', '500', '600', '700'],
        preload: true,
      },
      {
        name: 'Shippori Mincho',
        provider: 'google',
        weights: ['400', '500', '600', '700'],
        preload: true,
      },
    ],
  },

  runtimeConfig: {
    strapiToken: process.env.STRAPI_TOKEN, // Server-only for write operations if any
    gmail: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
      to: process.env.GMAIL_TO,
    },
    revalidateSecret: process.env.REVALIDATE_SECRET,
    public: {
      // Public site URL for constructing absolute OG links (used by useSEO)
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.exim.eu.com',
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
      privacyEmail: process.env.NUXT_PUBLIC_PRIVACY_EMAIL,
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL,
      supportEmail: process.env.NUXT_PUBLIC_SUPPORT_EMAIL,
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID,
    },
  },

  sitemap: {
    // Автоматическая генерация для всех языков
    autoI18n: true,
    // Dynamic URLs from Strapi
    sources: ['/api/__sitemap__/urls'],
  },

  experimental: {
    scanPageMeta: true,
  },

  aos: {
    duration: 850,
    easing: 'ease-in-out',
    offset: 60,
    anchorPlacement: 'top-bottom',
    mirror: true,
  },

  i18n: {
    baseUrl: 'https://www.exim.eu.com',
    langDir: 'locales',
    defaultLocale: 'en',
    skipSettingLocaleOnNavigate: true,
    lazy: true,
    bundle: {
      optimizeTranslationDirective: true,
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        files: ['en.ts', 'en/team.ts', 'en/testimonials.ts', 'en/heroBlog.ts', 'en/faq.ts', 'en/referrals.ts', 'sections/case-studies-en.ts'],
        name: 'English',
      },
      {
        code: 'de',
        iso: 'de-DE',
        files: ['de.ts', 'de/team.ts', 'de/testimonials.ts', 'de/heroBlog.ts', 'de/faq.ts', 'de/referrals.ts', 'sections/case-studies-de.ts'],
        name: 'Deutsch',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        files: ['fr.ts', 'fr/team.ts', 'fr/testimonials.ts', 'fr/heroBlog.ts', 'fr/faq.ts', 'fr/referrals.ts', 'sections/case-studies-fr.ts'],
        name: 'Français',
      },
      {
        code: 'es',
        iso: 'es-ES',
        files: ['es.ts', 'es/team.ts', 'es/testimonials.ts', 'es/heroBlog.ts', 'es/faq.ts', 'es/referrals.ts', 'sections/case-studies-es.ts'],
        name: 'Español',
      },
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
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
      // blog: {
      //   en: '/blog',
      //   fr: '/blog',
      //   de: '/blog',
      //   es: '/blog',
      // },
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
    dirs: [
      { path: '~/components', extensions: ['vue'] },
      { path: '~/components/UI', extensions: ['vue'] },
    ],
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
        {
          name: 'google-site-verification',
          content: 'Oq2vobaqC1HvDwUzo_GiWlx1xSTm_FqREO0lXFYf0AY',
        },
      ],
      link: [
        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logoPic.webp' },
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
};
