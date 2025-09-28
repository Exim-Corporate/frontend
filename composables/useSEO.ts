/**
 * Composable для управления SEO мета-тегами
 * Предоставляет унифицированный способ настройки Open Graph, Twitter Cards и других мета-тегов
 */

interface SEOConfig {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
  author?: string;
  keywords?: string;
  twitterHandle?: string;
}

export const useSEO = (config: SEOConfig = {}) => {
  const {
    title = 'AS Exim - Expert IT Staffing & Remote Developers',
    description = 'Your trusted partner for custom software development solutions. Connect with top-tier tech talent - pre-vetted developers, designers, and QA engineers ready for your projects.',
    image = '/logo.png',
    imageAlt = 'AS Exim - Expert IT Developers & Engineers',
    url,
    type = 'website',
    siteName = 'AS Exim',
    author = 'AS Exim',
    keywords = 'IT staffing, remote developers, software development, tech talent, outsourcing, developers, engineers, QA, designers, pre-vetted talent',
    // twitterHandle = '@outsource_tech',
  } = config;

  // Получаем текущий URL и сайт базовый URL из runtimeConfig
  const route = useRoute();
  const runtime = useRuntimeConfig();
  const { locale } = useI18n();
  const siteBase = runtime.public.siteUrl || runtime.public.strapiUrl || 'https://www.exim.eu.com';
  const currentUrl = url || new URL(String(route.path || '/'), String(siteBase)).href;
  const localeMap: Record<string, string> = {
    en: 'en_US',
    de: 'de_DE',
    fr: 'fr_FR',
    es: 'es_ES',
  };

  // Resolve image to absolute URL
  const resolvedImage =
    image && image.startsWith('http') ? image : new URL(String(image), String(siteBase)).href;

  // Устанавливаем SEO мета-теги
  useSeoMeta({
    title,
    description,

    // Open Graph теги
    ogTitle: title,
    ogDescription: description,
    ogImage: resolvedImage,
    ogImageAlt: imageAlt,
    ogType: type,
    ogUrl: currentUrl,
    ogSiteName: siteName,
    ogLocale: localeMap[locale.value] || 'en_US',

    // Twitter Card теги
    // twitterCard: 'summary_large_image',
    // twitterTitle: title,
    // twitterDescription: description,
    // twitterImage: image,
    // twitterSite: twitterHandle,
    // twitterCreator: twitterHandle,

    // Дополнительные мета-теги
    author,
    keywords,
    robots: 'index, follow',
    themeColor: '#2563eb',
  });

  return {
    title,
    description,
    image,
    url: currentUrl,
  };
};
