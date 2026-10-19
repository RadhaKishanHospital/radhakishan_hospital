/**
 * Build-time SEO prerender.
 *
 * The app is a client-rendered SPA, so every URL would otherwise return the
 * same index.html <head>. After `vite build` this plugin writes one static
 * HTML file per indexable route containing that route's title, description,
 * canonical, Open Graph tags, JSON-LD and a crawlable text summary + links.
 * React replaces the #root content on load; Helmet replaces the head tags
 * (they carry data-rh="true"). It also generates dist/sitemap.xml.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { getPrerenderRoutes, type PrerenderRoute } from '../src/app/seo/pages';
import { LANDING_PAGES } from '../src/app/seo/landingPages';
import { DEFAULT_OG_IMAGE, HOSPITAL, SITE_NAME, absoluteUrl } from '../src/app/seo/site';

const SEO_START = '<!-- seo:start -->';
const SEO_END = '<!-- seo:end -->';
const ROOT_EMPTY = '<div id="root"></div>';

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonLd(data: unknown) {
  // Prevent "</script>" inside JSON from closing the tag early.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function headTags(route: PrerenderRoute) {
  const url = absoluteUrl(route.path);
  const image = route.ogImage ? absoluteUrl(route.ogImage) : DEFAULT_OG_IMAGE;
  const t = esc(route.title);
  const d = esc(route.description);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" data-rh="true" />`,
    `<link rel="canonical" href="${url}" data-rh="true" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" data-rh="true" />`,
    `<meta property="og:type" content="${route.ogType}" data-rh="true" />`,
    `<meta property="og:url" content="${url}" data-rh="true" />`,
    `<meta property="og:title" content="${t}" data-rh="true" />`,
    `<meta property="og:description" content="${d}" data-rh="true" />`,
    `<meta property="og:image" content="${esc(image)}" data-rh="true" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" data-rh="true" />`,
    `<meta property="og:locale" content="en_IN" data-rh="true" />`,
    `<meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
    `<meta name="twitter:title" content="${t}" data-rh="true" />`,
    `<meta name="twitter:description" content="${d}" data-rh="true" />`,
    `<meta name="twitter:image" content="${esc(image)}" data-rh="true" />`,
    ...route.schema.map((s) => `<script type="application/ld+json" data-rh="true">${jsonLd(s)}</script>`),
  ]
    .map((tag) => `    ${tag}`)
    .join('\n');
}

const NAV_LINKS: { path: string; label: string }[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/doctors', label: 'Doctors' },
  { path: '/appointments', label: 'Book Appointment' },
  { path: '/contact', label: 'Contact' },
  ...LANDING_PAGES.map((p) => ({ path: `/${p.slug}`, label: p.linkLabel })),
];

/** Minimal, styled, crawlable fallback; React replaces it on first render. */
function rootContent(route: PrerenderRoute) {
  const links = NAV_LINKS.map((l) => `<li><a href="${l.path}">${esc(l.label)}</a></li>`).join('');
  const paragraphs = route.summary.map((p) => `<p>${esc(p)}</p>`).join('');
  return `<div id="root"><div class="seo-fallback" style="max-width:72rem;margin:0 auto;padding:2rem 1rem;font-family:Inter,system-ui,sans-serif;color:#0f172a;line-height:1.6">
<header><a href="/" style="font-weight:600;color:#0d9488;text-decoration:none">${SITE_NAME}</a></header>
<main><h1 style="font-size:2rem;line-height:1.2;margin:1.5rem 0 1rem">${esc(route.h1)}</h1>${paragraphs}
<p><strong>${esc(HOSPITAL.fullAddress)}</strong> · Emergency (24/7): <a href="${HOSPITAL.emergencyPhoneHref}">${HOSPITAL.emergencyPhone}</a> · OPD: <a href="${HOSPITAL.opdPhoneHref}">${HOSPITAL.opdPhone}</a></p></main>
<nav aria-label="Site"><ul style="display:flex;flex-wrap:wrap;gap:.5rem 1.25rem;padding:0;list-style:none">${links}</ul></nav>
</div></div>`;
}

function sitemap(routes: PrerenderRoute[]) {
  const today = new Date().toISOString().slice(0, 10);
  const priority = (p: string) =>
    p === '/' ? '1.0' : LANDING_PAGES.some((l) => `/${l.slug}` === p) ? '0.9' : p.startsWith('/doctor/') ? '0.6' : '0.8';
  const urls = routes
    .map(
      (r) =>
        `  <url>\n    <loc>${absoluteUrl(r.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(r.path)}</priority>\n  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function seoPrerenderPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'seo-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const templatePath = path.join(outDir, 'index.html');
      if (!fs.existsSync(templatePath)) return;
      const template = fs.readFileSync(templatePath, 'utf8');
      const start = template.indexOf(SEO_START);
      const end = template.indexOf(SEO_END);
      if (start === -1 || end === -1 || !template.includes(ROOT_EMPTY)) {
        throw new Error('[seo-prerender] index.html is missing seo markers or <div id="root"></div>');
      }

      const routes = getPrerenderRoutes();
      for (const route of routes) {
        const html =
          template.slice(0, start + SEO_START.length) +
          '\n' +
          headTags(route) +
          '\n    ' +
          template.slice(end).replace(ROOT_EMPTY, rootContent(route));

        if (route.path === '/') {
          fs.writeFileSync(templatePath, html);
          continue;
        }
        // Write both /about.html and /about/index.html so any static host
        // (Vercel cleanUrls, Figma, nginx, Netlify) serves it at /about.
        const base = path.join(outDir, route.path.slice(1));
        fs.mkdirSync(path.dirname(base), { recursive: true });
        fs.writeFileSync(`${base}.html`, html);
        fs.mkdirSync(base, { recursive: true });
        fs.writeFileSync(path.join(base, 'index.html'), html);
      }

      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap(routes));
      console.log(`[seo-prerender] wrote ${routes.length} pages + sitemap.xml`);
    },
  };
}
