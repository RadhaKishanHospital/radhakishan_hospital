import { Helmet } from 'react-helmet-async';
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl, buildTitle } from '../seo/site';

interface SEOProps {
  /** Page title — suffixed with " | Radhakishan Hospital" on every page except the homepage */
  title: string;
  /** Meta description for search engines (~155 chars recommended) */
  description: string;
  /** Canonical path, e.g. "/about". Defaults to "/" */
  path?: string;
  /** Absolute URL or path to the OG image. Defaults to /logo.png */
  ogImage?: string;
  /** Open Graph type. Defaults to "website" */
  ogType?: string;
  /** Set to true to add noindex,nofollow (e.g. admin pages) */
  noIndex?: boolean;
  /** Optional JSON-LD structured data (one object or several) */
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Reusable SEO head component.
 * Uses react-helmet-async to manage <head> tags per route. The same tags are
 * prerendered into static HTML at build time (server/seoPrerender.ts) with
 * data-rh="true", so Helmet replaces them instead of duplicating them.
 */
export function SEO({
  title,
  description,
  path = '/',
  ogImage,
  ogType = 'website',
  noIndex = false,
  schema,
}: SEOProps) {
  const canonicalUrl = absoluteUrl(path);
  const fullTitle = buildTitle(title, path);
  const resolvedOgImage = ogImage ? absoluteUrl(ogImage) : DEFAULT_OG_IMAGE;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!noIndex && <link rel="canonical" href={canonicalUrl} />}
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
