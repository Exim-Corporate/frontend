import { useRuntimeConfig } from '#imports';
import { createError, defineEventHandler, getHeader, getRequestURL, readBody } from 'h3';

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
    case 'api::header-navigation.header-navigation':
      return 'header-navigation';
    case 'api::global.global':
      return 'global';
    case 'api::about.about':
      return 'about';
    case 'api::main-calendly.main-calendly':
      return 'main-calendly';
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

  const allLocaleHomePaths = contentLocales.map(currentLocale => withLocalePrefix('/', currentLocale));

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

  if (
    normalizedModel === 'header-navigation'
    || normalizedModel === 'global'
    || normalizedModel === 'about'
    || normalizedModel === 'main-calendly'
  ) {
    return allLocaleHomePaths;
  }

  return [];
};

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event);
  const rawBody = await readBody<RevalidateBody>(event);
  
  console.log(`[revalidate] Received webhook:`, JSON.stringify(rawBody, null, 2));
  
  const body: RevalidateBody = {
    ...rawBody,
    slug: rawBody.slug || rawBody.entry?.slug,
    locale: rawBody.locale || rawBody.entry?.locale,
  };
  
  const bodySecret = typeof body.secret === 'string' ? body.secret : '';
  const headerSecret = String(getHeader(event, 'x-revalidate-secret') || '');
  const expectedSecret = String(config.revalidateSecret || '');
  const bypassToken = String(process.env.VERCEL_BYPASS_TOKEN || '');
  const protectionBypassSecret = String(
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET || process.env.VERCEL_BYPASS_TOKEN || '',
  );
  const requestOrigin = getRequestURL(event).origin;
  const configuredSiteUrl = String(config.public.siteUrl || '');
  const siteUrl = String(requestOrigin || configuredSiteUrl || '');
  const providedSecret = headerSecret || bodySecret;

  console.log(`[revalidate] Secret validation - header: ${headerSecret ? '✓ present' : '✗ missing'}, expected: ${expectedSecret ? '✓ set' : '✗ not set'}`);

  if (!expectedSecret || providedSecret !== expectedSecret) {
    console.error(`[revalidate] 401 Unauthorized - secret mismatch`);
    throw createError({ statusCode: 401, message: 'Invalid revalidation secret' });
  }

  if (!bypassToken || !siteUrl) {
    console.error(`[revalidate] 500 - missing config: bypassToken=${!!bypassToken}, siteUrl=${!!siteUrl}`);
    throw createError({ statusCode: 500, message: 'Revalidation is not configured' });
  }

  console.log(
    `[revalidate] Deployment protection bypass for internal fetches: ${protectionBypassSecret ? 'enabled' : 'disabled'}`,
  );
  console.log(
    `[revalidate] Revalidation target origin: request=${requestOrigin || 'n/a'}, configured=${configuredSiteUrl || 'n/a'}, using=${siteUrl || 'n/a'}`,
  );

  const explicitPaths = Array.isArray(body.paths)
    ? body.paths.filter((path): path is string => typeof path === 'string' && path.startsWith('/'))
    : [];
  const derivedPaths = buildPathsFromPayload(body);
  const paths = Array.from(new Set([...explicitPaths, ...derivedPaths]));

  console.log(`[revalidate] Paths to revalidate: ${JSON.stringify(paths)}`);

  if (paths.length === 0) {
    console.warn(`[revalidate] No paths resolved for model: ${body.model}`);
    return {
      revalidated: false,
      skipped: true,
      reason: 'No revalidation paths resolved for payload',
      model: body.model || null,
    };
  }

  const results = await Promise.all(
    paths.map(async path => {
      try {
        const targetUrl = new URL(path, siteUrl);
        const headers: Record<string, string> = {
          'x-prerender-revalidate': bypassToken,
        };

        if (protectionBypassSecret) {
          headers['x-vercel-protection-bypass'] = protectionBypassSecret;
          targetUrl.searchParams.set('x-vercel-protection-bypass', protectionBypassSecret);
        }

        const url = targetUrl.href;
        
        // Step 1: Invalidate the cache with HEAD request
        console.log(`[revalidate] Invalidating cache for: ${path}`);
        const headResponse = await fetch(url, {
          method: 'HEAD',
          headers,
        });
        console.log(`[revalidate] HEAD response for ${path}: ${headResponse.status}`);

        // Step 2: Force regeneration with GET request
        // This ensures the page is actually re-rendered immediately
        console.log(`[revalidate] Forcing regeneration for: ${path}`);
        const getResponse = await fetch(url, {
          method: 'GET',
          headers,
        });
        console.log(`[revalidate] GET response for ${path}: ${getResponse.status}`);

        const ok = headResponse.ok && getResponse.ok;
        return {
          path,
          ok,
          headStatus: headResponse.status,
          getStatus: getResponse.status,
          error: ok ? undefined : 'Head or GET request failed',
        };
      } catch (error) {
        console.error(`[revalidate] Error revalidating ${path}:`, error);
        return {
          path,
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }),
  );

  const allOk = results.every(result => result.ok);
  console.log(`[revalidate] Final result - revalidated: ${allOk}, paths: ${paths.length}`, results);

  return {
    revalidated: allOk,
    results,
  };
});