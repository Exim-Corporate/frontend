import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiResponse, StrapiHomePage } from '@/types/strapi';

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

  const strapiQuery = stringify(
    {
      locale,
      populate: {
        ctaSection: {
          populate: {
            image: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  try {
    const response = await $fetch<StrapiResponse<StrapiHomePage>>(
      `${strapiUrl}/api/home-page?${strapiQuery}`,
      { headers },
    );

    return response?.data ?? null;
  } catch (error) {
    console.error('[home-page] Failed to fetch from Strapi', {
      locale,
      strapiUrl,
      hasToken: Boolean(token),
      error,
    });

    return null;
  }
});
