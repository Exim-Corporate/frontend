import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiBlogPage, StrapiSingleResponse } from '../../types/strapi';

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;

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

  const fetchPage = async (requestedLocale?: string) =>
    await $fetch<StrapiSingleResponse<StrapiBlogPage>>(
      `${strapiUrl}/api/blog-page?${stringify(
        {
          locale: requestedLocale,
          populate: {
            ctaSection: {
              populate: {
                image: true,
              },
            },
          },
        },
        { encodeValuesOnly: true },
      )}`,
      { headers },
    );

  try {
    let response = await fetchPage(locale);

    if (!response?.data && locale && locale !== 'en') {
      response = await fetchPage('en');
    }

    return response?.data ?? null;
  } catch (error) {
    console.error('[blog-page] Failed to fetch page content from Strapi', {
      locale,
      strapiUrl,
      hasToken: Boolean(token),
      error,
    });

    return null;
  }
});
