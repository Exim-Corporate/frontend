import type { StrapiResponse, StrapiArticle } from '../types/strapi';

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

const serializeParam = (value: unknown): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return JSON.stringify(value);
};

export const useStrapiData = () => {

  const fetchArticles = (params: QueryParams = {}) => {
    return $fetch<StrapiResponse<StrapiArticle[]>>('/api/articles', {
      query: {
        locale: params.locale,
        page: params.page,
        pageSize: params.pageSize,
      },
    }).catch(() => createEmptyCollectionResponse<StrapiArticle>(params.page ?? 1, params.pageSize ?? 10));
  };

  const fetchCollection = async <T>(
    endpoint: string,
    params: QueryParams = {},
    options: FetchOptions = {},
  ): Promise<StrapiResponse<T[]> | null> => {
    try {
      return await $fetch<StrapiResponse<T[]>>('/api/content/collection', {
        query: {
          endpoint,
          params: serializeParam(params),
        },
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
    try {
      return await $fetch<T | null>('/api/content/by-slug', {
        query: {
          endpoint,
          slug,
          locale,
          populate: serializeParam(populate),
        },
      });
    } catch {
      return null;
    }
  };

  const fetchArticleBySlug = async (
    slug: string,
    locale?: string,
  ): Promise<StrapiArticle | null> => {
    try {
      const response = await $fetch<{ article: StrapiArticle }>(`/api/articles/${encodeURIComponent(slug)}`, {
        query: locale ? { locale } : undefined,
      });

      return response.article ?? null;
    } catch {
      return null;
    }
  };

  const fetchArticleById = async (
    documentId: string,
    locale?: string,
  ): Promise<StrapiArticle | null> => {
    try {
      return await $fetch<StrapiArticle | null>(`/api/articles/by-id/${encodeURIComponent(documentId)}`, {
        query: locale ? { locale } : undefined,
      });
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
  const fetchHirePageBySlug = async (slug: string, locale?: string) => {
    try {
      return await $fetch<unknown | null>(`/api/hire-pages/${encodeURIComponent(slug)}`, {
        query: locale ? { locale } : undefined,
      });
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
