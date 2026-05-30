import { useRuntimeConfig } from '#imports';
import { defineEventHandler, createError, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiHeaderNavigation, StrapiSingleResponse } from '@/types/strapi';

export default defineEventHandler(async event => {
  const queryParams = getQuery(event);
  const locale = typeof queryParams.locale === 'string' ? queryParams.locale : undefined;

  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    throw createError({ statusCode: 500, message: 'Strapi URL not configured' });
  }

  const buildQuery = (requestedLocale?: string) => stringify(
    {
      locale: requestedLocale,
      populate: {
        aiDevelopmentDropdown: {
          populate: {
            links: { fields: ['title', 'description', 'slug'] },
            extraLinks: { fields: ['title', 'description', 'slug'] },
            image: { fields: ['url', 'alternativeText', 'formats'] },
          },
        },
        expertiseDropdown: {
          populate: {
            links: { fields: ['title', 'description', 'slug'] },
            extraLinks: { fields: ['title', 'description', 'slug'] },
            image: { fields: ['url', 'alternativeText', 'formats'] },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const fetchHeader = (requestedLocale?: string) =>
      $fetch<StrapiSingleResponse<StrapiHeaderNavigation>>(
        `${strapiUrl}/api/header-navigation?${buildQuery(requestedLocale)}`,
        { headers },
      );

    let response = await fetchHeader(locale);

    if (!response?.data && locale && locale !== 'en') {
      response = await fetchHeader('en');
    }

    if (!response?.data) {
      return { id: 0 } as StrapiHeaderNavigation;
    }

    return response.data;
  } catch {
    return { id: 0 } as StrapiHeaderNavigation;
  }
});