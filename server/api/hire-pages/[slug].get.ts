import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getQuery, getRouterParam } from 'h3';
import { stringify } from 'qs';

export default defineEventHandler(async event => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  const query = getQuery(event);
  const locale = typeof query.locale === 'string' ? query.locale : undefined;

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Hire slug is required' });
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

  const fetchPage = async (requestedLocale?: string) => {
    const params = stringify(
      {
        populate: '*',
        locale: requestedLocale,
      },
      {
        encodeValuesOnly: true,
      },
    );

    const response = await $fetch<{ data: unknown }>(`${strapiUrl}/api/hire-pages/${slug}?${params}`, {
      headers,
    });

    return response?.data || null;
  };

  let page = await fetchPage(locale);

  if (!page && locale && locale !== 'en') {
    page = await fetchPage('en');
  }

  if (!page) {
    throw createError({ statusCode: 404, message: 'Hire page not found' });
  }

  return page;
});