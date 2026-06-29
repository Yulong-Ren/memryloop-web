import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildAbsoluteUrl, getSitemapRoutes, SITE_ORIGIN } from './site-routes';

const SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function formatLastMod(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function generateSitemapXml(lastModified: Date = new Date()): string {
  const lastmod = formatLastMod(lastModified);
  const urls = getSitemapRoutes()
    .map((route) => {
      const loc = escapeXml(buildAbsoluteUrl(route.path));
      const changefreq = route.changefreq ? `\n    <changefreq>${route.changefreq}</changefreq>` : '';
      const priority =
        route.priority !== undefined
          ? `\n    <priority>${route.priority.toFixed(1)}</priority>`
          : '';

      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>${changefreq}${priority}\n  </url>`;
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="${SITEMAP_NAMESPACE}">`,
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

export function generateRobotsTxt(): string {
  return [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${SITE_ORIGIN}/sitemap.xml`, ''].join('\n');
}

/** Cloudflare Pages SPA: copy index.html → 404.html so /billing, /privacy keep their URL. */
export function writeSpaFallback(outDir: string): void {
  const resolvedOutDir = resolve(outDir);
  const indexPath = resolve(resolvedOutDir, 'index.html');
  copyFileSync(indexPath, resolve(resolvedOutDir, '404.html'));
}

export function writeSeoArtifacts(outDir: string, lastModified: Date = new Date()): void {
  const resolvedOutDir = resolve(outDir);
  mkdirSync(resolvedOutDir, { recursive: true });

  writeFileSync(resolve(resolvedOutDir, 'sitemap.xml'), generateSitemapXml(lastModified), 'utf8');
  writeFileSync(resolve(resolvedOutDir, 'robots.txt'), generateRobotsTxt(), 'utf8');
  writeSpaFallback(resolvedOutDir);
}

const isDirectExecution =
  process.argv[1] !== undefined &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  writeSeoArtifacts(resolve(websiteRoot, 'dist'));
  console.log('Generated dist/sitemap.xml and dist/robots.txt');
}
