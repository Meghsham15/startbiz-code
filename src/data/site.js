/** Canonical site origin used for SEO, sitemap and social previews. */
export const SITE_URL = 'https://startbiz.in';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-workspace.webp`;

export function absoluteUrl(path = '/') {
  if (!path) return `${SITE_URL}/`;
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function absoluteAsset(path) {
  if (!path) return DEFAULT_OG_IMAGE;
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
