interface StrapiListItem {
  slug: string;
  updatedAt?: string;
}

interface StrapiListResponse {
  data: StrapiListItem[];
}

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

const locales = ['en', 'de', 'fr', 'es'];

const withLocalePrefixes = (
  basePath: string,
  items: StrapiListItem[],
  changefreq: string,
  priority: number,
): SitemapEntry[] => {
  return items.flatMap(item => {
    return locales.map(locale => {
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      return {
        loc: `${localePrefix}${basePath}/${item.slug}`,
        lastmod: item.updatedAt,
        changefreq,
        priority,
      };
    });
  });
};

const fetchCollectionItems = async (
  strapiUrl: string,
  endpoint: string,
): Promise<StrapiListItem[]> => {
  const url = `${strapiUrl}/api/${endpoint}?pagination[pageSize]=1000&publicationState=live&fields[0]=slug&fields[1]=updatedAt`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }

  const payload = (await response.json()) as StrapiListResponse;
  return payload.data || [];
};

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const strapiUrl = String(config.public.strapiUrl || '');

  try {
    const [articles, industries, services] = await Promise.all([
      fetchCollectionItems(strapiUrl, 'articles'),
      fetchCollectionItems(strapiUrl, 'industry-pages'),
      fetchCollectionItems(strapiUrl, 'service-pages'),
    ]);

    return [
      ...withLocalePrefixes('/blog', articles, 'weekly', 0.8),
      ...withLocalePrefixes('/industry', industries, 'weekly', 0.7),
      ...withLocalePrefixes('/services', services, 'weekly', 0.7),
    ];
  } catch (error) {
    console.error('Error generating sitemap URLs:', error);
    return [];
  }
});
