import { useRuntimeConfig } from '#imports';
import { defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { FooterStrapiEntry } from '@/types/footer';
import type { StrapiResponse } from '@/types/strapi';

interface FooterNavigationPayload {
  industry: FooterStrapiEntry[];
  services: FooterStrapiEntry[];
}

const fetchFooterEntries = async (
  baseUrl: string,
  token: string | undefined,
  endpoint: 'industry-pages' | 'service-pages',
  locale: string,
): Promise<FooterStrapiEntry[]> => {
  const query = stringify(
    {
      locale,
      filters: {
        showInFooter: {
          $eq: true,
        },
      },
      sort: ['footerOrder:asc', 'title:asc'],
      pagination: {
        page: 1,
        pageSize: 50,
      },
      populate: ['seo'],
    },
    { encodeValuesOnly: true },
  );

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await $fetch<StrapiResponse<FooterStrapiEntry[]>>(
    `${baseUrl}/api/${endpoint}?${query}`,
    { headers },
  );

  return response?.data ?? [];
};

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const locale = String(getQuery(event).locale || 'en');
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    return {
      industry: [],
      services: [],
    } satisfies FooterNavigationPayload;
  }

  try {
    let [industry, services] = await Promise.all([
      fetchFooterEntries(strapiUrl, token, 'industry-pages', locale),
      fetchFooterEntries(strapiUrl, token, 'service-pages', locale),
    ]);

    if (locale !== 'en' && industry.length === 0 && services.length === 0) {
      [industry, services] = await Promise.all([
        fetchFooterEntries(strapiUrl, token, 'industry-pages', 'en'),
        fetchFooterEntries(strapiUrl, token, 'service-pages', 'en'),
      ]);
    }

    return {
      industry,
      services,
    } satisfies FooterNavigationPayload;
  } catch {
    return {
      industry: [],
      services: [],
    } satisfies FooterNavigationPayload;
  }
});
