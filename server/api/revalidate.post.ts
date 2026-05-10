import { defineEventHandler, createError, getHeader, readBody } from 'h3';

const LOCALES = ['en', 'de', 'fr', 'es'] as const;
const SECRET = process.env.REVALIDATE_SECRET || '';
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
    return LOCALES.map(loc => loc === 'en' ? '/' : `/${loc}/`);
  }

  return [];
};

export default defineEventHandler(async event => {
  const body = await readBody<WebhookBody>(event);
  const headerSecret = getHeader(event, 'x-revalidate-secret');

  console.log('[revalidate] webhook received', { model: body.model, slug: body.entry?.slug });

  // Validate secret
  if (!SECRET || headerSecret !== SECRET) {
    console.error('[revalidate] invalid secret');
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  // Get paths to revalidate
  const slug = body.entry?.slug;
  const locale = body.entry?.locale || 'en';
  const paths = buildPaths(body.model || '', slug, locale);

  if (!paths.length) {
    console.warn('[revalidate] no paths resolved');
    return { ok: false, reason: 'no paths' };
  }

  console.log('[revalidate] revalidating paths:', paths);

  // Revalidate each path
  const results = await Promise.all(
    paths.map(async path => {
      try {
        const url = `${SITE_URL}${path}`;
        const headers: Record<string, string> = {
          'x-vercel-protection-bypass': PROTECTION_BYPASS,
        };

        const response = await fetch(url, { method: 'GET', headers });
        console.log(`[revalidate] ${path}: ${response.status}`);
        return { path, status: response.status };
      } catch (err) {
        console.error(`[revalidate] error revalidating ${path}:`, err);
        return { path, status: 0, error: String(err) };
      }
    }),
  );

  const success = results.every(r => r.status === 200);
  console.log('[revalidate] done:', { success, results });

  return {
    ok: success,
    revalidated: success,
    paths,
    results,
  };
});