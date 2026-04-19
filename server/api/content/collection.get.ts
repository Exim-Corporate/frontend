import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiResponse } from '@/types/strapi';

interface QueryParams {
  locale?: string;
  populate?: string[] | object | string;
  sort?: string[];
  filters?: object;
  page?: number;
  pageSize?: number;
  [key: string]: unknown;
}

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
  const params = parseJsonQuery<QueryParams>(query.params, {});

  if (!endpoint) {
    throw createError({ statusCode: 400, message: 'Content endpoint is required' });
  }

  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    throw createError({ statusCode: 500, message: 'Strapi URL not configured' });
  }

  const strapiQuery = stringify(
    {
      populate: params.populate || '*',
      sort: params.sort || ['publishedAt:desc'],
      locale: params.locale,
      filters: params.filters,
      pagination: {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 10,
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

  return await $fetch<StrapiResponse<unknown[]>>(`${strapiUrl}/api/${endpoint}?${strapiQuery}`, {
    headers,
  });
});