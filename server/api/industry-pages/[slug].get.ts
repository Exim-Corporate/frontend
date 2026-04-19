import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery, getRouterParam } from 'h3';
import { stringify } from 'qs';
import type { StrapiIndustryPage, StrapiResponse } from '@/types/strapi';

export default defineEventHandler(async event => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Industry slug is required' });
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

  const strapiQuery = stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
      locale,
      pagination: {
        page: 1,
        pageSize: 1,
      },
      populate: {
        seo: true,
        hero: { populate: { image: true, categories: true } },
        industryDescription: {
          populate: {
            accordions: {
              populate: {
                card: {
                  populate: { image: true },
                },
              },
            },
          },
        },
        industryStats: {
          populate: {
            accordions: true,
          },
        },
        ctaSection: {
          populate: {
            image: true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  console.info(`[api] Fetching industry page from Strapi: slug=${slug} locale=${locale || 'default'}`);

  const response = await $fetch<StrapiResponse<StrapiIndustryPage[]>>(
    `${strapiUrl}/api/industry-pages?${strapiQuery}`,
    { headers },
  );

  const page = response?.data?.[0] || null;

  if (!page) {
    throw createError({ statusCode: 404, message: 'Industry page not found' });
  }

  return page;
});