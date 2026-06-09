import { useRuntimeConfig } from '#imports';
import { defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiResponse, StrapiServicePage } from '@/types/strapi';

export default defineCachedEventHandler(async event => {
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;

  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    return [] as StrapiServicePage[];
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
      status: 'published',
      sort: ['headerOrder:asc', 'title:asc'],
      pagination: {
        page: 1,
        pageSize: 50,
      },
      fields: ['title', 'description', 'slug', 'headerOrder'],
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await $fetch<StrapiResponse<StrapiServicePage[]>>(
      `${strapiUrl}/api/service-pages?${strapiQuery}`,
      { headers },
    );

    return response?.data ?? [];
  } catch (error) {
    console.error('[service-pages] Failed to fetch from Strapi', {
      locale,
      strapiUrl,
      hasToken: Boolean(token),
      error,
    });

    return [] as StrapiServicePage[];
  }
}, {
  maxAge: 60,
  swr: true,
  getKey: event => `service-pages:${String(getQuery(event).locale || 'en')}`,
});
