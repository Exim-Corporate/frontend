import { useRuntimeConfig } from '#imports';
import { defineEventHandler, createError } from 'h3';
import { stringify } from 'qs';
import type { StrapiHeaderNavigation, StrapiSingleResponse } from '@/types/strapi';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const strapiUrl = String(config.public.strapiUrl || '').replace('://localhost', '://127.0.0.1');
  const token = typeof config.strapiToken === 'string' ? config.strapiToken : undefined;

  if (!strapiUrl) {
    throw createError({ statusCode: 500, message: 'Strapi URL not configured' });
  }

  const query = stringify(
    {
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

  const response = await $fetch<StrapiSingleResponse<StrapiHeaderNavigation>>(
    `${strapiUrl}/api/header-navigation?${query}`,
    { headers },
  );

  if (!response?.data) {
    throw createError({ statusCode: 404, message: 'Header navigation not found' });
  }

  return response.data;
});