import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery } from 'h3';
import { stringify } from 'qs';
import type { StrapiResponse, StrapiHomePage } from '@/types/strapi';

// Cache Strapi responses in Nitro memory so Railway is not hit on every SSR/payload request.
// TTL: 60s fresh + SWR (serve stale while revalidating in background).
// Cache is cleared by /api/revalidate on Strapi webhook.
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

  const strapiQuery = stringify(
    {
      locale,
      populate: {
        ctaSection: {
          populate: {
            image: true,
          },
        },
        standApartStats: {
          populate: {
            stats: true,
          },
        },
        industryExpertiseSection: true,
        testimonialsSection: {
          populate: {
            cards: {
              sort: ['order:asc', 'name:asc'],
            },
          },
        },
        processSection: {
          populate: {
            steps: true,
          },
        },
        whyChooseUsSection: {
          populate: {
            items: true,
          },
        },
        servicesProvideSection: true,
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
}, {
  maxAge: 60,
  swr: true,
  getKey: event => `home-page:${String(getQuery(event).locale || 'en')}`,
});
