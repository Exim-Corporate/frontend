/**
 * ON-DEMAND ISR REVALIDATION ENDPOINT
 * =====================================
 *
 * HOW IT WORKS (Vercel ISR + x-prerender-revalidate):
 * When this endpoint receives a valid request, it sends GET requests to every ISR-cached
 * route with the header `x-prerender-revalidate: BYPASS_TOKEN`. Vercel intercepts those
 * requests at the edge, bypasses the cache, re-SSRs the page fresh from Strapi, and stores
 * the new response back into the ISR cache. All future visitors instantly get fresh content.
 *
 * WHY _payload.json IS NO LONGER A PROBLEM:
 * The old bug was caused by @nuxtjs/sitemap triggering prerender at build time which created
 * static _payload.json files in Vercel's output. Those static files were served forever and
 * were never touched by ISR revalidation. With `isr: N` in routeRules (not `prerender: true`),
 * no static files are generated at build time — everything is SSR'd on first request and
 * cached at the edge. ISR revalidation updates both the HTML and inline payload together.
 *
 * ─────────────────────────────────────────────────────────────────────
 * SETUP: STRAPI WEBHOOK CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────
 *
 * STEP 1 — Add environment variable to Vercel:
 *   REVALIDATE_SECRET = any_random_string_you_choose (e.g. openssl rand -hex 32)
 *   VERCEL_BYPASS_TOKEN = copy from Vercel dashboard → Project → Settings → Git → ISR Bypass Secret
 *   NUXT_PUBLIC_SITE_URL = https://www.exim.eu.com
 *
 * STEP 2 — In Strapi Admin → Settings → Webhooks → "Create new webhook":
 *   URL:     https://www.exim.eu.com/api/revalidate
 *   Headers: x-revalidate-secret: <your REVALIDATE_SECRET value>
 *   Events:  ✅ entry.create  ✅ entry.update  ✅ entry.publish  ✅ entry.unpublish
 *            (all content types that affect the frontend)
 *
 * STEP 3 — Test manually with curl:
 *   curl -X POST https://www.exim.eu.com/api/revalidate \
 *     -H "x-revalidate-secret: YOUR_SECRET" \
 *     -H "Content-Type: application/json"
 *
 * ─────────────────────────────────────────────────────────────────────
 * WHAT GETS REVALIDATED (based on Strapi model):
 * ─────────────────────────────────────────────────────────────────────
 *  article        → homepage (has blog preview) + blog index + specific article page
 *  service-page   → homepage + services/**
 *  industry-page  → homepage + industry/**
 *  hire-page      → homepage + hire/**
 *  home-page / *  → all pages (fallback)
 */

import { defineEventHandler, createError, getHeader, readBody } from 'h3';

const SECRET       = process.env.REVALIDATE_SECRET || '';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN || '';
const PROTECTION_BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';
const SITE_URL     = process.env.NUXT_PUBLIC_SITE_URL || '';

const LOCALES = ['', '/de', '/fr', '/es'] as const;

/** Expand a single path to all locale variants */
const withLocales = (path: string) =>
  LOCALES.map(prefix => (path === '/' ? `${prefix}/` || '/' : `${prefix}${path}`));

/** All ISR routes. Called when model is unknown or a full revalidation is requested. */
const ALL_ISR_PATHS = [
  ...withLocales('/'),
  ...withLocales('/blog'),
  ...withLocales('/referrals'),
  // Note: /blog/[slug], /services/[slug] etc. are NOT listed here on purpose —
  // we don't know all slugs. On full revalidation we skip article pages; they
  // will re-render on the next visitor's request (ISR background revalidation handles it).
];

/** Strapi model name → which paths to immediately revalidate */
const MODEL_PATHS: Record<string, string[]> = {
  'article':        [...withLocales('/'), ...withLocales('/blog')],
  'service-page':   [...withLocales('/'), ...withLocales('/services')],
  'industry-page':  [...withLocales('/'), ...withLocales('/industry')],
  'hire-page':      [...withLocales('/'), ...withLocales('/hire')],
  'home-page':      withLocales('/'),
  'testimonial':    withLocales('/'),
};

type StrapiWebhookBody = {
  event?: string;        // 'entry.update' | 'entry.create' | 'entry.publish' etc.
  model?: string;        // 'article' | 'service-page' etc.
  entry?: {
    slug?: string;
    localizations?: Array<{ slug?: string; locale?: string }>;
    [key: string]: unknown;
  };
};

async function revalidatePath(baseUrl: string, path: string): Promise<{ path: string; ok: boolean; status: number }> {
  const url = new URL(path === '/' ? '/' : path, baseUrl).toString();
  const headers: Record<string, string> = {
    'x-prerender-revalidate': BYPASS_TOKEN,
  };
  if (PROTECTION_BYPASS) {
    headers['x-vercel-protection-bypass'] = PROTECTION_BYPASS;
  }
  try {
    const res = await fetch(url, { method: 'GET', headers, redirect: 'manual' });
    return { path, ok: res.status < 400 || res.status === 308, status: res.status };
  } catch (err) {
    return { path, ok: false, status: 0 };
  }
}

export default defineEventHandler(async event => {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const headerSecret = getHeader(event, 'x-revalidate-secret');
  if (!SECRET || headerSecret !== SECRET) {
    throw createError({ statusCode: 401, message: 'Unauthorized: invalid x-revalidate-secret' });
  }

  if (!BYPASS_TOKEN) {
    throw createError({ statusCode: 500, message: 'VERCEL_BYPASS_TOKEN is not set on Vercel' });
  }

  const baseUrl = SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
  if (!baseUrl) {
    throw createError({ statusCode: 500, message: 'NUXT_PUBLIC_SITE_URL env var is not set' });
  }

  // ── Parse Strapi webhook body ─────────────────────────────────────────────
  let body: StrapiWebhookBody = {};
  try { body = (await readBody(event)) ?? {}; } catch { /* empty body is fine */ }

  const model = body?.model ?? '';
  const slug  = body?.entry?.slug ?? '';

  // ── Build path list ───────────────────────────────────────────────────────
  let paths: string[] = MODEL_PATHS[model] ?? ALL_ISR_PATHS;

  // If Strapi gave us a slug, also revalidate the specific content page(s)
  if (slug) {
    if (model === 'article') {
      paths = [...new Set([...paths, ...withLocales(`/blog/${slug}`)])];
    } else if (model === 'service-page') {
      paths = [...new Set([...paths, ...withLocales(`/services/${slug}`)])];
    } else if (model === 'industry-page') {
      paths = [...new Set([...paths, ...withLocales(`/industry/${slug}`)])];
    } else if (model === 'hire-page') {
      paths = [...new Set([...paths, ...withLocales(`/hire/${slug}`)])];
    }
  }

  // ── Revalidate ────────────────────────────────────────────────────────────
  // Fire all requests in parallel — no artificial delay needed.
  // Vercel ISR handles concurrent revalidation correctly.
  const results = await Promise.all(paths.map(p => revalidatePath(baseUrl, p)));

  const allOk = results.every(r => r.ok);

  return {
    ok: allOk,
    revalidated: allOk,
    model: model || 'unknown',
    slug: slug || null,
    paths,
    results,
  };
});

