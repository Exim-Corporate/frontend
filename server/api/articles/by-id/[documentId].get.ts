import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery, getRouterParam } from 'h3';
import { stringify } from 'qs';
import type { StrapiArticle } from '@/types/strapi';

const normalizeArticle = (article: StrapiArticle | null): StrapiArticle | null => {
  if (!article) {
    return null;
  }

  const normalizedArticle = article as StrapiArticle & {
    author?: StrapiArticle['authors'] extends Array<infer T> ? T | null : never;
  };

  return {
    ...normalizedArticle,
    authors: normalizedArticle.author ? [normalizedArticle.author] : [],
    categories: normalizedArticle.categories || [],
  };
};

export default defineEventHandler(async event => {
  const documentId = String(getRouterParam(event, 'documentId') || '').trim();
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;

  if (!documentId) {
    throw createError({ statusCode: 400, message: 'Article documentId is required' });
  }

  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    throw createError({ statusCode: 500, message: 'Strapi URL not configured' });
  }

  const articleQuery = stringify(
    {
      populate: {
        categories: { fields: ['name', 'slug'] },
        cover: { fields: ['url', 'alternativeText', 'caption'] },
        author: {
          fields: ['name', 'position'],
          populate: {
            avatar: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
      },
      locale,
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

  const response = await $fetch<{ data: StrapiArticle }>(`${strapiUrl}/api/articles/${documentId}?${articleQuery}`, {
    headers,
  });

  return normalizeArticle(response?.data ?? null);
});