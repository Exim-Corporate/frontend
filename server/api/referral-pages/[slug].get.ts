import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery, getRouterParam } from 'h3';
import { stringify } from 'qs';
import type { StrapiReferralPage, StrapiResponse } from '@/types/strapi';

const referralPopulate = {
  seo: true,
  hero: { populate: { image: true, categories: true } },
  referralProgramSection: {
    populate: {
      cards: {
        populate: {
          points: true,
        },
      },
    },
  },
  ctaSection: { populate: { image: true } },
} as const;

export default defineEventHandler(async event => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Referral slug is required' });
  }

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

  const fetchPage = async (requestedLocale?: string): Promise<StrapiReferralPage | null> => {
    const referralQuery = stringify(
      {
        filters: {
          slug: { $eq: slug },
        },
        locale: requestedLocale,
        pagination: {
          page: 1,
          pageSize: 1,
        },
        populate: referralPopulate,
      },
      { encodeValuesOnly: true },
    );

    const response = await $fetch<StrapiResponse<StrapiReferralPage[]>>(
      `${strapiUrl}/api/referral-pages?${referralQuery}`,
      { headers },
    );

    return response?.data?.[0] || null;
  };

  let page = await fetchPage(locale);

  if (!page && locale && locale !== 'en') {
    page = await fetchPage('en');
  }

  if (!page) {
    throw createError({ statusCode: 404, message: 'Referral page not found' });
  }

  return page;
});