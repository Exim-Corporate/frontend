import { defineEventHandler, createError, getHeader, readBody } from 'h3';

const LOCALES = ['en', 'de', 'fr', 'es'] as const;
const SECRET = process.env.REVALIDATE_SECRET || '';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN || '';
const PROTECTION_BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';
const DEBUG_REVALIDATE_TOKENS = process.env.DEBUG_REVALIDATE_TOKENS === 'true';
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || '';

interface WebhookBody {
  secret?: string;
  model?: string;
  event?: string;
  entry?: {
    slug?: string;
    locale?: string;
  };
}

const maskToken = (token: string): string => {
  if (!token) {
    return '<empty>';
  }
  if (token.length <= 8) {
    return `${token[0]}***${token[token.length - 1]}`;
  }
  return `${token.slice(0, 4)}...${token.slice(-4)}`;
};

const normalizeModel = (model: string): string => {
  const map: Record<string, string> = {
    'api::article.article': 'article',
    'api::industry-page.industry-page': 'industry-page',
    'api::service-page.service-page': 'service-page',
    'api::referral-page.referral-page': 'referral-page',
    'api::hire-page.hire-page': 'hire-page',
    'api::header-navigation.header-navigation': 'single-type',
    'api::global.global': 'single-type',
    'api::about.about': 'single-type',
    'api::main-calendly.main-calendly': 'single-type',
  };
  return map[model] || '';
};

const buildPaths = (model: string, slug?: string, locale: string = 'en'): string[] => {
  const normalized = normalizeModel(model);
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  if (normalized === 'article' && slug) {
    return [
      `${localePrefix}/`,
      `${localePrefix}/blog`,
      `${localePrefix}/blog/${slug}`,
    ];
  }

  if (normalized === 'industry-page' && slug) {
    return [
      `${localePrefix}/`,
      `${localePrefix}/industry/${slug}`,
    ];
  }

  if (normalized === 'service-page' && slug) {
    return [
      `${localePrefix}/`,
      `${localePrefix}/services/${slug}`,
    ];
  }

  if (normalized === 'referral-page') {
    return [
      `${localePrefix}/`,
      `${localePrefix}/referrals`,
    ];
  }

  if (normalized === 'hire-page' && slug) {
    return [
      `${localePrefix}/`,
      `${localePrefix}/hire/${slug}`,
    ];
  }

  if (normalized === 'single-type') {
    return LOCALES.map(loc => (loc === 'en' ? '/' : `/${loc}/`));
  }

  return [];
};

export default defineEventHandler(async event => {
  const body = await readBody<WebhookBody>(event);
  const headerSecret = getHeader(event, 'x-revalidate-secret');

  console.log('[revalidate] ===== WEBHOOK START =====');
  console.log('[revalidate] webhook received', { model: body.model, slug: body.entry?.slug });
  console.log('[revalidate] ENV: BYPASS_TOKEN len=' + (BYPASS_TOKEN?.length || 0) + ', PROTECTION_BYPASS len=' + (PROTECTION_BYPASS?.length || 0));
  console.log('[revalidate] TOKEN CHECK: BYPASS=' + maskToken(BYPASS_TOKEN) + ', PROTECTION=' + maskToken(PROTECTION_BYPASS));
  console.log('[revalidate] DEPLOY INFO: VERCEL_URL=' + (process.env.VERCEL_URL || '-') + ', SITE_URL=' + (SITE_URL || '-'));

  if (DEBUG_REVALIDATE_TOKENS) {
    console.log('[revalidate] DEBUG TOKEN BYPASS(full)=', BYPASS_TOKEN);
    console.log('[revalidate] DEBUG TOKEN PROTECTION(full)=', PROTECTION_BYPASS);
  }

  // Validate secret
  if (!SECRET || headerSecret !== SECRET) {
    console.error('[revalidate] INVALID SECRET');
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  // Get paths to revalidate
  const slug = body.entry?.slug;
  const locale = body.entry?.locale || 'en';
  const paths = buildPaths(body.model || '', slug, locale);

  if (!paths.length) {
    console.warn('[revalidate] NO PATHS RESOLVED for model=' + body.model);
    return { ok: false, reason: 'no paths', model: body.model };
  }

  console.log('[revalidate] PATHS TO REVALIDATE: ' + JSON.stringify(paths));

  const forwardedHost = getHeader(event, 'x-forwarded-host');
  const host = getHeader(event, 'host');
  const proto = getHeader(event, 'x-forwarded-proto') || 'https';
  const currentHost = forwardedHost || host || process.env.VERCEL_URL || '';
  const baseUrl = currentHost
    ? `${proto}://${currentHost}`
    : SITE_URL;

  if (!baseUrl) {
    throw createError({ statusCode: 500, message: 'Cannot resolve base URL for ISR revalidation' });
  }

  console.log('[revalidate] TARGET BASE URL: ' + baseUrl);

  // Strapi sends webhook BEFORE transaction completes, causing Race Condition
  console.log('[revalidate] WAITING 3s for Strapi DB commit...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  const results = await Promise.all(
    paths.map(async path => {
      const url = new URL(path, baseUrl).toString();
      const headers: Record<string, string> = {
        'x-prerender-revalidate': BYPASS_TOKEN || '',
      };

      if (PROTECTION_BYPASS) {
        headers['x-vercel-protection-bypass'] = PROTECTION_BYPASS;
        headers['x-vercel-set-bypass-cookie'] = PROTECTION_BYPASS;
      }

      try {
        console.log('[revalidate] -> FETCH: ' + path + ' url=' + url);
        console.log(
          '[revalidate] -> HEADERS: x-prerender-revalidate(len=' +
            (headers['x-prerender-revalidate']?.length || 0) +
            ', value=' +
            maskToken(headers['x-prerender-revalidate'] || '') +
            '), x-vercel-protection-bypass(len=' +
            (headers['x-vercel-protection-bypass']?.length || 0) +
            ', value=' +
            maskToken(headers['x-vercel-protection-bypass'] || '') +
            ')'
        );
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            ...headers,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
          redirect: 'manual',
        });
        console.log('[revalidate] <- RESPONSE: ' + path + ' status=' + response.status);
        console.log(
          '[revalidate] <- RESPONSE HEADERS: x-vercel-cache=' +
            (response.headers.get('x-vercel-cache') || '-') +
            ', x-vercel-id=' +
            (response.headers.get('x-vercel-id') || '-') +
            ', x-matched-path=' +
            (response.headers.get('x-matched-path') || '-') +
            ', cache-control=' +
            (response.headers.get('cache-control') || '-')
        );
        return { path, ok: response.status === 200 || response.status === 304, status: response.status };
      } catch (err) {
        console.error('[revalidate] ERROR: ' + path + ' - ' + (err instanceof Error ? err.message : String(err)));
        return { path, ok: false, error: String(err) };
      }
    }),
  );

  const success = results.every(r => r.ok);
  console.log('[revalidate] ===== DONE ===== success=' + success + ' results=' + JSON.stringify(results));

  return {
    ok: success,
    revalidated: success,
    paths,
    results,
    tokenInfo: {
      bypassToken: !!BYPASS_TOKEN,
      protectionBypass: !!PROTECTION_BYPASS,
    },
  };
});
