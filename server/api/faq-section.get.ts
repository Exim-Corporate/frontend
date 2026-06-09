import { useRuntimeConfig } from '#imports';
import { createError, getQuery } from 'h3';
import { defineCachedEventHandler } from 'nitropack/runtime';
import type { StrapiFaqSection, StrapiSingleResponse } from '@/types/strapi';

export default defineCachedEventHandler(async event => {
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

  const fetchFaqSection = async (requestedLocale?: string) => {
    return await $fetch<StrapiSingleResponse<StrapiFaqSection>>(
      `${strapiUrl}/api/faq-section`,
      {
        headers,
        query: {
          locale: requestedLocale,
          populate: '*',
        },
      },
    );
  };

  try {
    let response = await fetchFaqSection(locale);

    if (!response?.data && locale && locale !== 'en') {
      response = await fetchFaqSection('en');
    }

    return response?.data ?? null;
  } catch (error) {
    console.error('[faq-section] Failed to fetch FAQ section from Strapi', {
      locale,
      strapiUrl,
      hasToken: Boolean(token),
      error,
    });

    return null;
  }
}, {
  maxAge: 300, // FAQ rarely changes — 5 min TTL
  swr: true,
  getKey: event => `faq-section:${String(getQuery(event).locale || 'en')}`,
});