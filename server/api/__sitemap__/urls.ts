import { buildLocalizedPaths, CONTENT_LOCALES, fetchLocalizedRouteEntries } from '@/utils/strapiRoutes';

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

const contentRouteSources = [
  { endpoint: 'articles', basePath: '/blog', changefreq: 'weekly', priority: 0.8 },
  { endpoint: 'industry-pages', basePath: '/industry', changefreq: 'weekly', priority: 0.7 },
  { endpoint: 'service-pages', basePath: '/services', changefreq: 'weekly', priority: 0.7 },
] as const;

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  try {
    const routeGroups = await Promise.all(
      contentRouteSources.map(async source => {
        const routeMap = await fetchLocalizedRouteEntries({
          baseUrl: strapiUrl,
          endpoint: source.endpoint,
          token,
          locales: CONTENT_LOCALES,
        });

        return buildLocalizedPaths(source.basePath, routeMap).map(route => ({
          ...route,
          changefreq: source.changefreq,
          priority: source.priority,
        } satisfies SitemapEntry));
      }),
    );

    return routeGroups.flat();
  } catch (error) {
    console.error('Error generating sitemap URLs:', error);
    return [];
  }
});
