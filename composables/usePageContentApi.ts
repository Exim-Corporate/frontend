import type {
  StrapiArticleListPayload,
  StrapiArticlePagePayload,
  StrapiIndustryPage,
  StrapiReferralPage,
  StrapiServicePage,
} from '@/types/strapi';

export const usePageContentApi = () => {
  const fetchIndustryPage = (slug: string, locale?: string) => {
    return $fetch<StrapiIndustryPage>(`/api/industry-pages/${encodeURIComponent(slug)}`, {
      query: locale ? { locale } : undefined,
    });
  };

  const fetchServicePage = (slug: string, locale?: string) => {
    return $fetch<StrapiServicePage>(`/api/service-pages/${encodeURIComponent(slug)}`, {
      query: locale ? { locale } : undefined,
    });
  };

  const fetchArticlePage = (slug: string, locale?: string) => {
    return $fetch<StrapiArticlePagePayload>(`/api/articles/${encodeURIComponent(slug)}`, {
      query: locale ? { locale } : undefined,
    });
  };

  const fetchArticleList = (params?: { locale?: string; page?: number; pageSize?: number }) => {
    return $fetch<StrapiArticleListPayload>('/api/articles', {
      query: params,
    });
  };

  const fetchReferralPage = (slug: string, locale?: string) => {
    return $fetch<StrapiReferralPage>(`/api/referral-pages/${encodeURIComponent(slug)}`, {
      query: locale ? { locale } : undefined,
    });
  };

  const fetchHirePage = <T>(slug: string, locale?: string) => {
    return $fetch<T>(`/api/hire-pages/${encodeURIComponent(slug)}`, {
      query: locale ? { locale } : undefined,
    });
  };

  return {
    fetchArticleList,
    fetchArticlePage,
    fetchHirePage,
    fetchIndustryPage,
    fetchReferralPage,
    fetchServicePage,
  };
};