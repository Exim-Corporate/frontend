import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getHeader, readBody } from 'h3';

const contentLocales = ['en', 'de', 'fr', 'es'] as const;

interface RevalidateBody {
  secret?: string;
  paths?: string[];
  model?: string;
  slug?: string;
  locale?: string;
  entry?: {
    slug?: string;
    locale?: string;
  };
}

const normalizeModel = (model?: string): string => {
  switch (model) {
    case 'api::article.article':
      return 'article';
    case 'api::industry-page.industry-page':
      return 'industry-page';
    case 'api::service-page.service-page':
      return 'service-page';
    case 'api::referral-page.referral-page':
      return 'referral-page';
    case 'api::hire-page.hire-page':
      return 'hire-page';
    default:
      return model || '';
  }
};

const withLocalePrefix = (path: string, locale?: string): string => {
  if (!locale || locale === 'en') {
    return path;
  }

  return `/${locale}${path}`;
};

const buildPathsFromPayload = ({ model, slug, locale }: RevalidateBody): string[] => {
  const normalizedModel = normalizeModel(model);
  const normalizedLocale = contentLocales.includes((locale || 'en') as (typeof contentLocales)[number])
    ? locale || 'en'
    : 'en';

  if (normalizedModel === 'article' && slug) {
    return [
      withLocalePrefix('/', normalizedLocale),
      withLocalePrefix('/blog', normalizedLocale),
      withLocalePrefix(`/blog/${slug}`, normalizedLocale),
    ];
  }

  if (normalizedModel === 'industry-page' && slug) {
    return [withLocalePrefix('/', normalizedLocale), withLocalePrefix(`/industry/${slug}`, normalizedLocale)];
  }

  if (normalizedModel === 'service-page' && slug) {
    return [withLocalePrefix('/', normalizedLocale), withLocalePrefix(`/services/${slug}`, normalizedLocale)];
  }

  if (normalizedModel === 'referral-page') {
    return [withLocalePrefix('/', normalizedLocale), withLocalePrefix('/referrals', normalizedLocale)];
  }

  if (normalizedModel === 'hire-page' && slug) {
    return [withLocalePrefix('/', normalizedLocale), withLocalePrefix(`/hire/${slug}`, normalizedLocale)];
  }

  return [];
};

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const rawBody = await readBody<RevalidateBody>(event);
  const body: RevalidateBody = {
    ...rawBody,
    slug: rawBody.slug || rawBody.entry?.slug,
    locale: rawBody.locale || rawBody.entry?.locale,
  };
  const bodySecret = typeof body.secret === 'string' ? body.secret : '';
  const headerSecret = String(getHeader(event, 'x-revalidate-secret') || '');
  const expectedSecret = String(config.revalidateSecret || '');
  const bypassToken = String(process.env.VERCEL_BYPASS_TOKEN || '');
  const siteUrl = String(config.public.siteUrl || '');
  const providedSecret = headerSecret || bodySecret;

  if (!expectedSecret || providedSecret !== expectedSecret) {
    throw createError({ statusCode: 401, message: 'Invalid revalidation secret' });
  }

  if (!bypassToken || !siteUrl) {
    throw createError({ statusCode: 500, message: 'Revalidation is not configured' });
  }

  const explicitPaths = Array.isArray(body.paths)
    ? body.paths.filter((path): path is string => typeof path === 'string' && path.startsWith('/'))
    : [];
  const derivedPaths = buildPathsFromPayload(body);
  const paths = Array.from(new Set([...explicitPaths, ...derivedPaths]));

  if (paths.length === 0) {
    return {
      revalidated: false,
      skipped: true,
      reason: 'No revalidation paths resolved for payload',
      model: body.model || null,
    };
  }

  const results = await Promise.all(
    paths.map(async path => {
      const response = await fetch(new URL(path, siteUrl).href, {
        method: 'HEAD',
        headers: {
          'x-prerender-revalidate': bypassToken,
        },
      });

      return {
        path,
        ok: response.ok,
        status: response.status,
      };
    }),
  );

  return {
    revalidated: results.every(result => result.ok),
    results,
  };
});