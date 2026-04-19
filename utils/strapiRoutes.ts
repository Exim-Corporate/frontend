export const CONTENT_LOCALES = ['en', 'de', 'fr', 'es'] as const;

export type ContentLocale = (typeof CONTENT_LOCALES)[number];

export interface StrapiRouteItem {
  slug: string;
  updatedAt?: string;
  locale?: string;
}

interface StrapiListItem {
  attributes?: {
    slug?: string;
    updatedAt?: string;
    locale?: string;
  };
  slug?: string;
  updatedAt?: string;
  locale?: string;
}

interface StrapiListResponse {
  data: StrapiListItem[];
  meta?: {
    pagination?: {
      page?: number;
      pageCount?: number;
    };
  };
}

export interface StrapiRouteFetchOptions {
  baseUrl: string;
  endpoint: string;
  token?: string;
  locales?: readonly string[];
}

export interface LocalizedPathEntry {
  loc: string;
  lastmod?: string;
}

const normalizeBaseUrl = (baseUrl: string): string => {
  return baseUrl.replace('://localhost', '://127.0.0.1').replace(/\/$/, '');
};

const normalizeRouteItem = (item: StrapiListItem): StrapiRouteItem | null => {
  const slug = item.attributes?.slug ?? item.slug;

  if (!slug) {
    return null;
  }

  return {
    slug,
    updatedAt: item.attributes?.updatedAt ?? item.updatedAt,
    locale: item.attributes?.locale ?? item.locale,
  };
};

const buildHeaders = (token?: string): HeadersInit | undefined => {
  if (!token) {
    return undefined;
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchLocalizedRouteEntries = async ({
  baseUrl,
  endpoint,
  token,
  locales = CONTENT_LOCALES,
}: StrapiRouteFetchOptions): Promise<Record<string, StrapiRouteItem[]>> => {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const headers = buildHeaders(token);
  const routeMap: Record<string, StrapiRouteItem[]> = {};

  for (const locale of locales) {
    const items: StrapiRouteItem[] = [];
    let page = 1;
    let pageCount = 1;

    while (page <= pageCount) {
      const query = new URLSearchParams();
      query.set('locale', locale);
      query.set('pagination[page]', String(page));
      query.set('pagination[pageSize]', '100');
      query.set('fields[0]', 'slug');
      query.set('fields[1]', 'updatedAt');

      const response = await fetch(`${normalizedBaseUrl}/api/${endpoint}?${query.toString()}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} routes for locale ${locale}: ${response.status}`);
      }

      const payload = (await response.json()) as StrapiListResponse;
      const normalizedItems = payload.data
        .map(normalizeRouteItem)
        .filter((item): item is StrapiRouteItem => item !== null);

      items.push(...normalizedItems);
      pageCount = payload.meta?.pagination?.pageCount ?? 1;
      page += 1;
    }

    routeMap[locale] = items;
  }

  return routeMap;
};

export const buildLocalizedPaths = (
  basePath: string,
  routeMap: Record<string, StrapiRouteItem[]>,
  locales: readonly string[] = CONTENT_LOCALES,
  defaultLocale = 'en',
): LocalizedPathEntry[] => {
  const defaultEntries = routeMap[defaultLocale] ?? [];

  return locales.flatMap(locale => {
    const localizedEntries = routeMap[locale] ?? [];
    const mergedEntries = new Map<string, StrapiRouteItem>();

    for (const entry of defaultEntries) {
      mergedEntries.set(entry.slug, entry);
    }

    for (const entry of localizedEntries) {
      mergedEntries.set(entry.slug, entry);
    }

    const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

    return Array.from(mergedEntries.values()).map(entry => ({
      loc: `${localePrefix}${basePath}/${entry.slug}`,
      lastmod: entry.updatedAt,
    }));
  });
};