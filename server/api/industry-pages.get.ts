import { useRuntimeConfig } from '#imports';
import { defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiIndustryPage, StrapiResponse } from '@/types/strapi';

export default defineCachedEventHandler(async event => {
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;

  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    return [] as StrapiIndustryPage[];
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const strapiQuery = stringify(
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
      populate: {
        hero: {
          populate: {
            image: true,
            categories: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await $fetch<StrapiResponse<StrapiIndustryPage[]>>(
      `${strapiUrl}/api/industry-pages?${strapiQuery}`,
      { headers },
    );

    return response?.data ?? [];
  } catch (error) {
    console.error('[industry-pages] Failed to fetch from Strapi', {
      locale,
      strapiUrl,
      hasToken: Boolean(token),
      error,
    });

    return [] as StrapiIndustryPage[];
  }
}, {
  maxAge: 60,
  swr: true,
  getKey: event => `industry-pages:${String(getQuery(event).locale || 'en')}`,
});