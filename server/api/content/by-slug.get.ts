import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiResponse } from '@/types/strapi';

const parseJsonQuery = <T>(value: unknown, fallback: T): T => {
  if (typeof value !== 'string' || !value.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const endpoint = typeof query.endpoint === 'string' ? query.endpoint.trim() : '';
  const slug = typeof query.slug === 'string' ? query.slug.trim() : '';
  const locale = typeof query.locale === 'string' ? query.locale : undefined;
  const populate = parseJsonQuery<string[] | object | string>(query.populate, '*');

  if (!endpoint || !slug) {
    throw createError({ statusCode: 400, message: 'Content endpoint and slug are required' });
  }

  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    throw createError({ statusCode: 500, message: 'Strapi URL not configured' });
  }

  const strapiQuery = stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
      populate,
      locale,
      pagination: {
        page: 1,
        pageSize: 1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await $fetch<StrapiResponse<unknown[]>>(`${strapiUrl}/api/${endpoint}?${strapiQuery}`, {
    headers,
  });

  return response?.data?.[0] ?? null;
});