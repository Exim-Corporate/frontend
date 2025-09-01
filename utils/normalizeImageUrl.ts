/**
 * Normalize an image URL coming from Strapi or external sources.
 * - trims whitespace
 * - encodes URI components (spaces)
 * - returns absolute URL for absolute inputs
 * - prefixes `baseUrl` for relative inputs
 */
export function normalizeImageUrl(raw: unknown, baseUrl = ''): string {
  const s = raw ? String(raw).trim() : '';
  if (!s) return '';
  // absolute (http/https) or protocol-relative
  if (/^https?:\/\//i.test(s) || s.startsWith('//')) {
    return encodeURI(s);
  }
  const path = s.startsWith('/') ? s : `/${s}`;
  // if no baseUrl provided, return path as-is (encoded)
  return baseUrl ? encodeURI(`${baseUrl}${path}`) : encodeURI(path);
}
