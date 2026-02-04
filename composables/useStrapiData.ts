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
      filters: {
        slug: { $eq: slug },
      },
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

    const query = stringify(params, {
      encodeValuesOnly: true,
    });

    const url = `${strapiUrl}/api/articles?${query}`;

    try {
      const response = await $fetch<StrapiResponse<StrapiArticle[]>>(url, {
        headers: getHeaders(),
      });
      // Return first match or try without locale as fallback
      if (response?.data?.[0]) {
        return response.data[0];
      }
      
      // Fallback: try without locale if not found
      if (locale) {
        const fallbackParams = { ...params };
        delete fallbackParams.locale;
        const fallbackQuery = stringify(fallbackParams, { encodeValuesOnly: true });
        const fallbackUrl = `${strapiUrl}/api/articles?${fallbackQuery}`;
        
        const fallbackResponse = await $fetch<StrapiResponse<StrapiArticle[]>>(fallbackUrl, {
          headers: getHeaders(),
        });
        return fallbackResponse?.data?.[0] || null;
      }
      
      return null;
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

export const useHireData = () => {
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
      const response = await $fetch(url, {
        headers: getHeaders(),
      });
      return response?.data || null;
    } catch (error) {
      console.error('Error fetching hire page by slug:', error);
      return null;
    }
  };

  return {
    fetchHirePageBySlug,
  };
};

// Оставляем useBlog для обратной совместимости, но рекомендуем использовать useStrapiData
export default useStrapiData;
