import { defineEventHandler, createError, getHeader } from 'h3';

const SECRET = process.env.REVALIDATE_SECRET || '';
const BYPASS_TOKEN = process.env.VERCEL_BYPASS_TOKEN || '';
const PROTECTION_BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || '';

export default defineEventHandler(async event => {
  const headerSecret = getHeader(event, 'x-revalidate-secret');

  if (!SECRET || headerSecret !== SECRET) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const paths = ['/'];

  const baseUrl = SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');

  if (!baseUrl) {
    throw createError({ statusCode: 500, message: 'Cannot resolve base URL for ISR revalidation' });
  }

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
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            ...headers,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
          redirect: 'manual',
        });
        return { path, ok: response.status === 200 || response.status === 304, status: response.status };
      } catch (err) {
        return { path, ok: false, error: String(err) };
      }
    }),
  );

  const success = results.every(r => r.ok);

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
