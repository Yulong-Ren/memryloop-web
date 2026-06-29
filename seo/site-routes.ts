/**
 * Public route registry for SEO (sitemap) and Cloudflare SPA redirects.
 *
 * When adding a new marketing/legal page:
 * 1. Add an entry here with `includeInSitemap: true`
 * 2. Register the route in `src/App.tsx`
 * 3. Build emits `/<route>/index.html` shells for Cloudflare Pages (see writeSpaRouteShells)
 */
export const SITE_ORIGIN = 'https://memryloop.com';

export type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export interface SiteRoute {
  /** Path starting with `/`. Use `/` for the homepage. */
  path: string;
  /** Whether the URL should appear in sitemap.xml */
  includeInSitemap: boolean;
  changefreq?: ChangeFrequency;
  /** Value between 0.0 and 1.0 */
  priority?: number;
}

export const SITE_ROUTES: SiteRoute[] = [
  {
    path: '/',
    includeInSitemap: true,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/privacy',
    includeInSitemap: true,
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/billing',
    includeInSitemap: true,
    changefreq: 'weekly',
    priority: 0.8,
  },
  // App/checkout flow pages — keep routable, but omit from sitemap (SEO best practice).
  { path: '/checkout', includeInSitemap: false },
  { path: '/billing/success', includeInSitemap: false },
  { path: '/billing/cancel', includeInSitemap: false },
];

export function getSitemapRoutes(): SiteRoute[] {
  return SITE_ROUTES.filter((route) => route.includeInSitemap);
}

export function buildAbsoluteUrl(path: string): string {
  if (path === '/') {
    return `${SITE_ORIGIN}/`;
  }
  return `${SITE_ORIGIN}${path}`;
}
