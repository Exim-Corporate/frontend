import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler } from 'h3';
import type { StrapiMainCalendly, StrapiSingleResponse } from '@/types/strapi';

export default defineEventHandler(async event => {
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

  const response = await $fetch<StrapiSingleResponse<StrapiMainCalendly>>(
    `${strapiUrl}/api/main-calendly`,
    { headers },
  );

  if (!response?.data) {
    throw createError({ statusCode: 404, message: 'Main Calendly not found' });
  }

  return response.data;
});