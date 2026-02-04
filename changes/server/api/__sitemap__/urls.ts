/**
 * API endpoint for dynamic sitemap URLs
 * Provides blog article URLs for sitemap generation
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const strapiUrl = config.public.strapiUrl;

  try {
    // Fetch all published articles from Strapi
    const response = await fetch(
      `${strapiUrl}/api/articles?pagination[pageSize]=1000&publicationState=live`,
    );

    if (!response.ok) {
      console.error('Failed to fetch articles from Strapi:', response.statusText);
      return [];
    }

    const data = await response.json();
    const articles = data.data || [];

    // Generate URLs for all articles across all locales
    const locales = ['en', 'de', 'fr', 'es'];
    const urls: Array<{
      loc: string;
      lastmod?: string;
      changefreq?: string;
      priority?: number;
    }> = [];

    articles.forEach((article: { slug: string; updatedAt?: string }) => {
      locales.forEach(locale => {
        const localePrefix = locale === 'en' ? '' : `/${locale}`;
        urls.push({
          loc: `${localePrefix}/blog/${article.slug}`,
          lastmod: article.updatedAt,
          changefreq: 'weekly',
          priority: 0.8,
        });
      });
    });

    return urls;
  } catch (error) {
    console.error('Error generating sitemap URLs:', error);
    return [];
  }
});
