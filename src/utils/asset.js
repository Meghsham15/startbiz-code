/** Prefix public assets for GitHub Pages project URLs (homepage base path). */
export function asset(path) {
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Strip the GitHub Pages base so a public asset can be turned into a canonical URL. */
export function sitePath(src = '') {
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  if (base && src.startsWith(base)) return src.slice(base.length) || '/';
  return src;
}
