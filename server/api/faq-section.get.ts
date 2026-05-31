import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery } from 'h3';
import type { StrapiFaqSection, StrapiSingleResponse } from '@/types/strapi';

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

  try {
    const response = await $fetch<StrapiSingleResponse<StrapiFaqSection>>(
      `${strapiUrl}/api/faq-section`,
      {
        headers,
        query: {
          locale,
          populate: '*',
        },
      },
    );

    return response?.data ?? null;
  } catch {
    return null;
  }
});