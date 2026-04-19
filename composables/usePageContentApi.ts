import type { StrapiIndustryPage, StrapiServicePage } from '@/types/strapi';

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

  return {
    fetchIndustryPage,
    fetchServicePage,
  };
};