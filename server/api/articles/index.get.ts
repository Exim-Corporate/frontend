import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiArticle, StrapiArticleListPayload, StrapiResponse } from '@/types/strapi';

const articlePopulate = {
  cover: {
    fields: ['url', 'alternativeText', 'formats'],
  },
} as const;

const createEmptyResponse = (page: number, pageSize: number): StrapiResponse<StrapiArticle[]> => ({
  data: [],
  meta: {
    pagination: {
      page,
      pageSize,
      pageCount: 0,
      total: 0,
    },
  },
});

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;
  const page = typeof query.page === 'string' ? Number.parseInt(query.page, 10) : 1;
  const pageSize = typeof query.pageSize === 'string' ? Number.parseInt(query.pageSize, 10) : 12;

  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    throw createError({ statusCode: 500, message: 'Strapi URL not configured' });
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchArticles = async (requestedLocale?: string): Promise<StrapiResponse<StrapiArticle[]>> => {
    const articleQuery = stringify(
      {
        locale: requestedLocale,
        populate: articlePopulate,
        sort: ['publishedAt:desc'],
        pagination: {
          page,
          pageSize,
        },
      },
      { encodeValuesOnly: true },
    );

    return await $fetch<StrapiResponse<StrapiArticle[]>>(`${strapiUrl}/api/articles?${articleQuery}`, {
      headers,
    });
  };

  let response = await fetchArticles(locale);
  let resolvedLocale = locale || 'en';

  if (locale && locale !== 'en' && (response.data?.length ?? 0) === 0) {
    response = await fetchArticles('en');
    resolvedLocale = 'en';
  }

  const payload: StrapiArticleListPayload = {
    data: response.data ?? [],
    meta: response.meta ?? createEmptyResponse(page, pageSize).meta,
    resolvedLocale,
  };

  return payload;
});