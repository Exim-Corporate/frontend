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
    image = '/images/logoPic.webp',
    imageAlt = 'AS Exim - Expert IT Developers & Engineers',
    url,
    type = 'website',
    siteName = 'AS Exim',
    author = 'AS Exim',
    keywords = 'IT staffing, remote developers, software development, tech talent, outsourcing, developers, engineers, QA, designers, pre-vetted talent',
    // twitterHandle = '@outsource_tech',
  } = config;

  // Получаем текущий URL, если не передан
  const route = useRoute();
  const currentUrl = url || `https://www.exim.eu.com/${route.path}`; // Замените на ваш домен

  // Устанавливаем SEO мета-теги
  useSeoMeta({
    title,
    description,

    // Open Graph теги
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: imageAlt,
    ogType: type,
    ogUrl: currentUrl,
    ogSiteName: siteName,
    ogLocale: 'en_US',

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
