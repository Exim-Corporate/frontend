import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery, getRouterParam } from 'h3';
import { stringify } from 'qs';
import type { StrapiArticle, StrapiArticlePagePayload, StrapiResponse } from '@/types/strapi';

const articlePopulate = {
  cover: {
    fields: ['url', 'alternativeText', 'caption', 'formats'],
  },
  author: {
    fields: ['name', 'position'],
    populate: {
      avatar: {
        fields: ['url', 'alternativeText'],
      },
    },
  },
  category: {
    fields: ['name', 'slug'],
  },
} as const;

const relatedPopulate = {
  cover: {
    fields: ['url', 'alternativeText', 'formats'],
  },
} as const;

const normalizeArticle = (article: StrapiArticle | null): StrapiArticle | null => {
  if (!article) {
    return null;
  }

  const normalizedArticle = article as StrapiArticle & {
    author?: StrapiArticle['authors'] extends Array<infer T> ? T | null : never;
    category?: StrapiArticle['categories'] extends Array<infer T> ? T | null : never;
  };

  return {
    ...normalizedArticle,
    authors: normalizedArticle.author ? [normalizedArticle.author] : [],
    categories: normalizedArticle.category ? [normalizedArticle.category] : [],
  };
};

export default defineEventHandler(async event => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Article slug is required' });
  }

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

  const fetchArticle = async (requestedLocale?: string): Promise<StrapiArticle | null> => {
    const articleQuery = stringify(
      {
        filters: {
          slug: { $eq: slug },
        },
        locale: requestedLocale,
        populate: articlePopulate,
        pagination: {
          page: 1,
          pageSize: 1,
        },
      },
      { encodeValuesOnly: true },
    );

    const response = await $fetch<StrapiResponse<StrapiArticle[]>>(
      `${strapiUrl}/api/articles?${articleQuery}`,
      { headers },
    );

    return normalizeArticle(response?.data?.[0] || null);
  };

  const fetchRelatedArticles = async (
    article: StrapiArticle,
    requestedLocale?: string,
  ): Promise<StrapiArticle[]> => {
    const primaryCategoryId = article.category?.id ?? article.categories?.[0]?.id;

    if (!primaryCategoryId) {
      return [];
    }

    const relatedQuery = stringify(
      {
        locale: requestedLocale,
        populate: relatedPopulate,
        sort: ['publishedAt:desc'],
        filters: {
          category: {
            id: {
              $eq: primaryCategoryId,
            },
          },
          id: {
            $ne: article.id,
          },
        },
        pagination: {
          page: 1,
          pageSize: 3,
        },
      },
      { encodeValuesOnly: true },
    );

    const response = await $fetch<StrapiResponse<StrapiArticle[]>>(
      `${strapiUrl}/api/articles?${relatedQuery}`,
      { headers },
    );

    return (response?.data ?? []).map(item => normalizeArticle(item)).filter(Boolean) as StrapiArticle[];
  };

  let article = await fetchArticle(locale);
  let resolvedLocale = locale || 'en';

  if (!article && locale && locale !== 'en') {
    article = await fetchArticle('en');
    resolvedLocale = 'en';
  }

  if (!article) {
    throw createError({ statusCode: 404, message: 'Article not found' });
  }

  const relatedArticles = await fetchRelatedArticles(article, resolvedLocale);

  const payload: StrapiArticlePagePayload = {
    article,
    relatedArticles,
    resolvedLocale,
  };

  return payload;
});