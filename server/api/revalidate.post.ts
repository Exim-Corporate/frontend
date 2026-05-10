import { defineEventHandler, createError, getHeader, readBody } from 'h3';

const LOCALES = ['en', 'de', 'fr', 'es'] as const;
const SECRET = process.env.REVALIDATE_SECRET || '';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN || '';
const PROTECTION_BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://outsource-nuxt-git-test-artems-projects-543846aa.vercel.app';

interface WebhookBody {
  secret?: string;
  model?: string;
  event?: string;
  entry?: {
    slug?: string;
    locale?: string;
  };
}

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
  const localePrefix = locale === 'en' ? '' : '/${locale}';

  if (normalized === 'article' && slug) {
    return [
      '${localePrefix}/',
      '${localePrefix}/blog',
      '${localePrefix}/blog/${slug}',
    ];
  }

  if (normalized === 'industry-page' && slug) {
    return [
      '${localePrefix}/',
      '${localePrefix}/industry/${slug}',
    ];
  }

  if (normalized === 'service-page' && slug) {
    return [
      '${localePrefix}/',
      '${localePrefix}/services/${slug}',
    ];
  }

  if (normalized === 'referral-page') {
    return [
      '${localePrefix}/',
      '${localePrefix}/referrals',
    ];
  }

  if (normalized === 'hire-page' && slug) {
    return [
      '${localePrefix}/',
      '${localePrefix}/hire/${slug}',
    ];
  }

  if (normalized === 'single-type') {
    return LOCALES.map(loc => loc === 'en' ? '/' : '/${loc}/');
  }

  return [];
};

export default defineEventHandler(async event => {
  const body = await readBody<WebhookBody>(event);
  const headerSecret = getHeader(event, 'x-revalidate-secret');

  console.log('[revalidate] ===== WEBHOOK START =====');
  console.log('[revalidate] webhook received', { model: body.model, slug: body.entry?.slug });
  console.log('[revalidate] ENV: BYPASS_TOKEN len=' + (BYPASS_TOKEN?.length || 0) + ', PROTECTION_BYPASS len=' + (PROTECTION_BYPASS?.length || 0));

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

  const results = await Promise.all(
    paths.map(async path => {
      const url = '${SITE_URL}' + path;
      const headers: Record<string, string> = {
        'x-prerender-revalidate': BYPASS_TOKEN || '',
      };

      if (PROTECTION_BYPASS) {
        headers['x-vercel-protection-bypass'] = PROTECTION_BYPASS;
      }

      try {
        console.log('[revalidate] -> FETCH: ' + path);
        const response = await fetch(url, {
          method: 'GET',
          headers,
          redirect: 'manual',
        });
        console.log('[revalidate] <- RESPONSE: ' + path + ' status=' + response.status);
        return { path, ok: response.status === 200, status: response.status };
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
