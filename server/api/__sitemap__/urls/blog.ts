import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';

// Minimal types matching our Strapi types
interface ArticleItem {
  id: number;
  attributes?: {
    slug: string;
    updatedAt?: string;
    locale?: string;
  };
  // Some deployments may flatten attributes
  slug?: string;
  updatedAt?: string;
  locale?: string;
}
interface StrapiListResponse<T> {
  data: T[];
  meta?: { pagination?: { page: number; pageCount: number } };
}

export default defineEventHandler(async _event => {
  const config = useRuntimeConfig();
  const base = config.public.strapiUrl as string;
  const token = config.public.strapiToken as string | undefined;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const locales = ['en', 'de', 'fr', 'es'];

  const urls: { loc: string; lastmod?: string; _i18nTransform?: boolean }[] = [];

  // Fetch articles for each locale (paginate if needed)
  for (const loc of locales) {
    let page = 1;
    const pageSize = 100;
    while (true) {
      const query = new URLSearchParams();
      query.set('locale', loc);
      query.set('pagination[page]', String(page));
      query.set('pagination[pageSize]', String(pageSize));
      query.set('fields[0]', 'slug');
      query.set('fields[1]', 'updatedAt');
      const url = `${base}/api/articles?${query.toString()}`;
      const res = await $fetch<StrapiListResponse<ArticleItem>>(url, { headers });
      const items = res?.data || [];

      for (const item of items) {
        const slug = item.attributes?.slug ?? item.slug;
        const lastmod = item.attributes?.updatedAt ?? item.updatedAt;
        // Use prefixed locale except default 'en' (matching strategy prefix_except_default)
        const path = loc === 'en' ? `/blog/${slug}` : `/${loc}/blog/${slug}`;
        urls.push({ loc: path, lastmod });
      }

      const pageCount = res?.meta?.pagination?.pageCount ?? 1;
      if (page >= pageCount) break;
      page += 1;
    }
  }

  return urls;
});
