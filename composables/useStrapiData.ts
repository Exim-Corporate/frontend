import { useRuntimeConfig } from 'nuxt/app';
import type { StrapiResponse, StrapiArticle } from '../types/strapi';
import { stringify } from 'qs';

interface QueryParams {
  locale?: string;
  populate?: string[] | object | string;
  sort?: string[];
  filters?: object;
  page?: number;
  pageSize?: number;
  [key: string]: unknown;
}

interface FetchOptions {
  silent404?: boolean;
  baseUrl?: string;
}

const getErrorStatus = (error: unknown): number | undefined => {
  if (typeof error !== 'object' || !error) {
    return undefined;
  }

  if ('status' in error && typeof error.status === 'number') {
    return error.status;
  }

  if ('statusCode' in error && typeof error.statusCode === 'number') {
    return error.statusCode;
  }

  return undefined;
};

const createEmptyCollectionResponse = <T>(page = 1, pageSize = 10): StrapiResponse<T[]> => ({
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

export const useStrapiData = () => {
  const config = useRuntimeConfig();
  const strapiUrl = String(config.public.strapiUrl || '');
  const strapiToken = config.public.strapiToken;

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (strapiToken) {
      headers.Authorization = `Bearer ${strapiToken}`;
    }
    return headers;
  };

  const fetchFromStrapi = async <T>(
    endpoint: string,
    params: QueryParams = {},
    fallbackValue: T,
  ): Promise<T> => {
    const query = stringify(
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
    const url = `${strapiUrl}/api/${endpoint}?${query}`;

    try {
      const response = await $fetch<T>(url, {
        headers: getHeaders(),
      });
      return response;
    } catch {
      return fallbackValue;
    }
  };

  const fetchArticles = (params: QueryParams = {}) => {
    return fetchFromStrapi<StrapiResponse<StrapiArticle[]>>(
      'articles',
      params,
      createEmptyCollectionResponse<StrapiArticle>(params.page ?? 1, params.pageSize ?? 10),
    );
  };

  const fetchCollection = async <T>(
    endpoint: string,
    params: QueryParams = {},
    options: FetchOptions = {},
  ): Promise<StrapiResponse<T[]> | null> => {
    const query = stringify(
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
    const baseUrl = options.baseUrl || strapiUrl;
    const url = `${baseUrl}/api/${endpoint}?${query}`;

    try {
      return await $fetch<StrapiResponse<T[]>>(url, {
        headers: getHeaders(),
      });
    } catch (error) {
      if (options.silent404 && getErrorStatus(error) === 404) {
        return null;
      }

      return null;
    }
  };

  const fetchSingleBySlug = async <T>(
    endpoint: string,
    slug: string,
    locale?: string,
    populate: QueryParams['populate'] = '*',
  ): Promise<T | null> => {
    const query = stringify(
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
    const url = `${strapiUrl}/api/${endpoint}?${query}`;

    try {
      const response = await $fetch<StrapiResponse<T[]>>(url, {
        headers: getHeaders(),
      });
      return response?.data?.[0] || null;
    } catch {
      return null;
    }
  };

  const fetchArticleBySlug = async (
    slug: string,
    locale?: string,
  ): Promise<StrapiArticle | null> => {
    const query = stringify(
      {
        filters: {
          slug: { $eq: slug },
        },
        populate: '*',
        locale,
      },
      {
        encodeValuesOnly: true,
      },
    );
    const url = `${strapiUrl}/api/articles?${query}`;

    try {
      const response = await $fetch<StrapiResponse<StrapiArticle[]>>(url, {
        headers: getHeaders(),
      });
      return response?.data?.[0] || null;
    } catch {
      return null;
    }
  };

  const fetchArticleById = async (
    documentId: string,
    locale?: string,
  ): Promise<StrapiArticle | null> => {
    const query = stringify(
      {
        populate: {
          categories: { fields: ['id', 'name'] },
          cover: { fields: ['url', 'alternativeText', 'caption'] },
          authors: {
            fields: ['name', 'position', 'bio'],
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
    const url = `${strapiUrl}/api/articles/${documentId}?${query}`;

    try {
      const response = await $fetch<{ data: StrapiArticle }>(url, {
        headers: getHeaders(),
      });
      return response?.data || null;
    } catch {
      return null;
    }
  };

  return {
    fetchCollection,
    fetchSingleBySlug,
    fetchArticles,
    fetchArticleBySlug,
    fetchArticleById,
  };
};

export const useHireData = () => {
  const config = useRuntimeConfig();
  const strapiUrl = String(config.public.strapiUrl || '');
  const strapiToken = config.public.strapiToken;

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (strapiToken) {
      headers.Authorization = `Bearer ${strapiToken}`;
    }
    return headers;
  };

  const fetchHirePageBySlug = async (slug: string, locale?: string) => {
    const params: QueryParams = {
      populate: '*',
      locale,
    };

    const query = stringify(params, {
      encodeValuesOnly: true,
    });

    const url = `${strapiUrl}/api/hire-pages/${slug}?${query}`;

    try {
      const response = await $fetch<{ data: unknown }>(url, {
        headers: getHeaders(),
      });
      return response?.data || null;
    } catch {
      return null;
    }
  };

  return {
    fetchHirePageBySlug,
  };
};

// Оставляем useBlog для обратной совместимости, но рекомендуем использовать useStrapiData
export default useStrapiData;
