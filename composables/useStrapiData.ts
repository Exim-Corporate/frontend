import { useRuntimeConfig } from 'nuxt/app';
import type { StrapiResponse, StrapiArticle } from '../types/strapi';
import { stringify } from 'qs';

// Определяем интерфейс для параметров запроса
interface QueryParams {
  locale?: string;
  populate?: string[] | object | string;
  sort?: string[];
  filters?: object;
  page?: number;
  pageSize?: number;
  [key: string]: unknown; // Для других возможных параметров
}

export const useStrapiData = () => {
  const config = useRuntimeConfig();
  const strapiUrl = config.public.strapiUrl;
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

  const fetchFromStrapi = async <T>(endpoint: string, params: QueryParams = {}): Promise<T> => {
    // Устанавливаем значения по умолчанию для populate, sort, page и pageSize
    const defaultParams = {
      populate: params.populate || '*',
      sort: params.sort || ['publishedAt:desc'],
      pagination: {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 10,
        ...params,
      },
    };

    const query = stringify(defaultParams, {
      encodeValuesOnly: true, // encode only values in string
    });
    const url = `${strapiUrl}/api/${endpoint}?${query}`;

    console.log(`Fetching from URL: ${url}`);

    try {
      const response = await $fetch<{ data: T }>(url, {
        headers: getHeaders(),
      });
      return response as T;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      return null as T;
    }
  };

  const fetchArticles = (params: QueryParams = {}) => {
    return fetchFromStrapi<StrapiResponse<StrapiArticle[]>>('articles', params);
  };

  const fetchArticleBySlug = async (
    slug: string,
    locale?: string,
  ): Promise<StrapiArticle | null> => {
    const params: QueryParams = {
      // populate: '*',
      populate: {
        categories: {
          slug: { $eq: slug },
          fields: ['id', 'name'],
        },
        cover: {
          fields: ['url', 'alternativeText', 'caption'],
        },
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
    };

    const query = stringify(params, {
      encodeValuesOnly: true,
    });

    const url = `${strapiUrl}/api/articles/${slug}?${query}`;

    try {
      const response = await $fetch<StrapiResponse<StrapiArticle>>(url, {
        headers: getHeaders(),
      });
      return response?.data || null;
    } catch (error) {
      console.error('Error fetching article by slug:', error);
      return null;
    }
  };

  const fetchArticleById = async (
    documentId: string,
    locale?: string,
  ): Promise<StrapiArticle | null> => {
    const params: QueryParams = {
      populate: {
        categories: {
          fields: ['id', 'name'],
        },
        cover: {
          fields: ['url', 'alternativeText', 'caption'],
        },
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
    };

    const query = stringify(params, { encodeValuesOnly: true });

    const url = `${strapiUrl}/api/articles/${documentId}?${query}`;
    console.log('fetchArticleById URL:', url);

    try {
      const response = await $fetch<{ data: StrapiArticle }>(url, {
        headers: getHeaders(),
      });
      console.log('fetchArticleById response:', response);
      return response?.data || null;
    } catch (error) {
      console.error('Error fetching article by id:', error);
      return null;
    }
  };

  return {
    fetchArticles,
    fetchArticleBySlug,
    fetchArticleById,
  };
};

// Оставляем useBlog для обратной совместимости, но рекомендуем использовать useStrapiData
export default useStrapiData;
