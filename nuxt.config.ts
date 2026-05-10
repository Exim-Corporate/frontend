import Noir from './assets/theme';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildLocalizedPaths, CONTENT_LOCALES, fetchLocalizedRouteEntries } from './utils/strapiRoutes';

const contentRouteSources = [
  { endpoint: 'articles', basePath: '/blog' },
  { endpoint: 'industry-pages', basePath: '/industry' },
  { endpoint: 'service-pages', basePath: '/services' },
] as const;

const contentIsrTtl = 60 * 60 * 24 * 14;

const getBuildStrapiConfig = () => ({
  baseUrl: process.env.STRAPI_URL || 'http://127.0.0.1:1337',
  token: process.env.STRAPI_TOKEN,
});

const buildDynamicContentRoutes = async (): Promise<string[]> => {
  const { baseUrl, token } = getBuildStrapiConfig();

  const routeGroups = await Promise.all(
    contentRouteSources.map(async source => {
      const routeMap = await fetchLocalizedRouteEntries({
        baseUrl,
        endpoint: source.endpoint,
        token,
        locales: CONTENT_LOCALES,
      });

      return buildLocalizedPaths(source.basePath, routeMap).map(route => route.loc);
    }),
  );

  return routeGroups.flat();
};

const buildBlogPaginationRoutes = async (): Promise<string[]> => {
  const { baseUrl, token } = getBuildStrapiConfig();
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchPageCount = async (locale: string): Promise<number> => {
    const query = new URLSearchParams({
      locale,
      'pagination[page]': '1',
      'pagination[pageSize]': '12',
    });

    const response = await fetch(`${baseUrl}/api/articles?${query.toString()}`, {
      headers,
    });

    if (!response.ok) {
      return 0;
    }

    const data = await response.json() as {
      meta?: {
        pagination?: {
          pageCount?: number;
        };
      };
    };

    return data.meta?.pagination?.pageCount ?? 0;
  };

  const routes: string[] = [];

  for (const locale of CONTENT_LOCALES) {
    const pageCount = await fetchPageCount(locale);
    const basePath = locale === 'en' ? '/blog' : `/${locale}/blog`;

    for (let page = 2; page <= pageCount; page += 1) {
      routes.push(`${basePath}?page=${page}`);
    }
  }

  return routes;
};

export default {
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Включаем SSR для генерации статических страниц
  ssr: true,

  hooks: {
    async 'prerender:routes'(ctx: { routes: Set<string> }) {
      try {
        const [routes, paginationRoutes] = await Promise.all([
          buildDynamicContentRoutes(),
          buildBlogPaginationRoutes(),
        ]);

        for (const route of routes) {
          ctx.routes.add(route);
        }

        for (const route of paginationRoutes) {
          ctx.routes.add(route);
        }
      }
      catch (error) {
        console.error('Failed to collect dynamic prerender routes from Strapi:', error);
      }
    },

    // Documented approach:
    // 1. Nuxt hook `nitro:init` — https://nuxt.com/docs/api/advanced/hooks#nuxt-hooks-build-time
    //    "Called after Nitro is initialized, allows registering Nitro hooks"
    // 2. Nitro hook `compiled` — fires after ALL output files are written (including config.json)
    // 3. Vercel Build Output API `has` on routes — https://vercel.com/docs/build-output-api/v3/configuration#routes
    //    "Conditions of the HTTP request that must exist to apply the route"
    //
    // ПРОБЛЕМА: Nitro размещает ISR-роуты ПОСЛЕ { handle: "filesystem" }.
    // Filesystem handler отдаёт статику до ISR-функции, поэтому x-prerender-revalidate
    // никогда не достигает ISR-функции (x-matched-path=-).
    //
    // РЕШЕНИЕ: вставить bypass-варианты ISR-роутов ПЕРЕД filesystem handler.
    // Эти роуты срабатывают ТОЛЬКО при наличии заголовка x-prerender-revalidate.
    // Обычные запросы — через filesystem → статика (быстро).
    // Запросы с x-prerender-revalidate — через bypass → ISR-функция → ревалидация.
    'nitro:init'(nitro: { hooks: { hook: (event: string, cb: (n: { options: { output: { dir: string }; preset: string } }) => Promise<void>) => void } }) {
      nitro.hooks.hook('compiled', async (nitro: { options: { output: { dir: string }; preset: string } }) => {
        if (nitro.options.preset !== 'vercel') return;

        const configPath = resolve(nitro.options.output.dir, 'config.json');
        let config: { routes?: Array<Record<string, unknown>> };

        try {
          config = JSON.parse(readFileSync(configPath, 'utf-8'));
        }
        catch {
          return;
        }

        const routes = config.routes;
        if (!Array.isArray(routes)) return;

        const fsIndex = routes.findIndex(r => r.handle === 'filesystem');
        if (fsIndex === -1) return;

        // ISR-роуты — после filesystem handler, содержат '-isr' в dest
        const isrRoutes = routes
          .slice(fsIndex + 1)
          .filter(r => typeof r.dest === 'string' && (r.dest as string).includes('-isr') && !r.has);

        if (isrRoutes.length === 0) return;

        // ПРОБЛЕМА: Patch с `has: x-prerender-revalidate` обновляет ISR-кеш,
        // но пользователи всё равно получают старый контент — filesystem handler
        // отдаёт статический файл из .output/public/, а не из ISR-кеша.
        //
        // РЕШЕНИЕ: Переносим ВСЕ ISR-роуты ПЕРЕД filesystem handler (без условия `has`).
        // Тогда:
        //   - Обычные запросы → ISR функция → ISR edge cache (Vercel CDN) → MISS/HIT
        //   - Revalidation → ISR функция регенерирует → ISR edge cache обновляется
        //   - Следующие запросы → ISR edge cache → HIT (свежий контент) ✅
        //
        // Статические файлы в .output/public/ остаются как fallback (не используются
        // для ISR-страниц, т.к. ISR-роуты теперь идут первыми).
        //
        // Документация: https://vercel.com/docs/build-output-api/v3/configuration#routes

        // Удаляем ISR-роуты из их текущей позиции (после filesystem)
        const isrRouteSet = new Set(isrRoutes.map(r => JSON.stringify(r)));
        const cleanedRoutes = routes.filter(r => !isrRouteSet.has(JSON.stringify(r)));

        // Вставляем ISR-роуты ПЕРЕД filesystem handler
        const newFsIndex = cleanedRoutes.findIndex(r => r.handle === 'filesystem');
        cleanedRoutes.splice(newFsIndex, 0, ...isrRoutes);

        config.routes = cleanedRoutes;
        writeFileSync(configPath, JSON.stringify(config, null, 2));

        console.log(`\n✅ [isr-patch] Patched Vercel config.json: moved ${isrRoutes.length} ISR routes before filesystem handler (all requests use ISR edge cache)`);
      });
    },
  },

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

  // Конфигурация для Vercel SSG
  nitro: {
    preset: process.env.NODE_ENV === 'development' ? 'node-server' : 'vercel',
    vercel: {
      config: {
        bypassToken: process.env.VERCEL_BYPASS_TOKEN,
      },
    },
    routeRules: {
      '/': { isr: 600 },
      '/privacy': { isr: 600 },
      '/terms': { isr: 600 },
      '/cookie-policy': { isr: 600 },
      '/impressum': { isr: 600 },
      '/blog': { isr: contentIsrTtl },
      '/referrals': { isr: contentIsrTtl },
      '/blog/**': { isr: contentIsrTtl },
      '/industry/**': { isr: contentIsrTtl },
      '/services/**': { isr: contentIsrTtl },
      '/hire/**': { isr: contentIsrTtl },
      '/de/blog': { isr: contentIsrTtl },
      '/de/referrals': { isr: contentIsrTtl },
      '/de/blog/**': { isr: contentIsrTtl },
      '/de/industry/**': { isr: contentIsrTtl },
      '/de/services/**': { isr: contentIsrTtl },
      '/de/hire/**': { isr: contentIsrTtl },
      '/fr/blog': { isr: contentIsrTtl },
      '/fr/referrals': { isr: contentIsrTtl },
      '/fr/blog/**': { isr: contentIsrTtl },
      '/fr/industry/**': { isr: contentIsrTtl },
      '/fr/services/**': { isr: contentIsrTtl },
      '/fr/hire/**': { isr: contentIsrTtl },
      '/es/blog': { isr: contentIsrTtl },
      '/es/referrals': { isr: contentIsrTtl },
      '/es/blog/**': { isr: contentIsrTtl },
      '/es/industry/**': { isr: contentIsrTtl },
      '/es/services/**': { isr: contentIsrTtl },
      '/es/hire/**': { isr: contentIsrTtl },
      '/de': { isr: 600 },
      '/de/**': { isr: 600 },
      '/fr': { isr: 600 },
      '/fr/**': { isr: 600 },
      '/es': { isr: 600 },
      '/es/**': { isr: 600 },
      '/api/**': {
        cors: true,
        headers: { 'cache-control': 's-maxage=1, stale-while-revalidate=31536000' },
      },
      '/preview/**': {
        prerender: false,
        index: false,
      },
    },

    prerender: {
      // crawlLinks: false — не даём Nitro автоматически обходить ссылки.
      // Маршруты добавляются явно через prerender:routes hook выше.
      // ВАЖНО: ISR revalidation для этих страниц требует post-build патча
      // Vercel config.json (см. scripts/patch-vercel-isr.mjs).
      // Патч вставляет ISR bypass-роуты ПЕРЕД { handle: filesystem }, чтобы
      // запросы с x-prerender-revalidate доходили до ISR-функции.
      crawlLinks: false,
      routes: ['/sitemap.xml'],
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
