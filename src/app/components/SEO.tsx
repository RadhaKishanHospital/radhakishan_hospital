import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://radhakishanhospital.in';
const SITE_NAME = 'Radhakishan Hospital';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

interface SEOProps {
  /** Unique page title — will be suffixed with " | Radhakishan Hospital" unless it IS the homepage title */
  title: string;
  /** Meta description for search engines (max ~155 chars recommended) */
  description: string;
  /** Canonical path, e.g. "/about". Defaults to "/" */
  path?: string;
  /** Absolute URL or path to the OG image. Defaults to /logo.png */
  ogImage?: string;
  /** Open Graph type. Defaults to "website" */
  ogType?: string;
  /** Set to true to add noindex,nofollow (e.g. admin pages) */
  noIndex?: boolean;
  /** Optional JSON-LD structured data object */
  schema?: Record<string, any>;
}

const DEFAULT_HOSPITAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  name: 'Radhakishan Hospital',
  url: 'https://radhakishanhospital.in',
  logo: 'https://radhakishanhospital.in/logo.png',
  image: 'https://radhakishanhospital.in/logo.png',
  description:
    'Radhakishan Hospital in Kurukshetra, Haryana — established in 1987. Comprehensive multi-specialty healthcare, 24/7 emergency care, pediatrics, NICU, PICU, general surgery, pathology, and cashless insurance.',
  telephone: '+91 72060 29516',
  email: 'radhakishanhospital@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jyoti Nagar, Thanesar',
    addressLocality: 'Kurukshetra',
    addressRegion: 'Haryana',
    postalCode: '136118',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.9695,
    longitude: 76.8783,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  sameAs: [
    'https://www.instagram.com/radhakishan.hospital',
    'https://www.youtube.com/watch?v=ZI8iEtAULdw',
  ],
};

/**
 * Reusable SEO head component.
 * Uses react-helmet-async to manage <head> tags per route, ensuring
 * metadata updates correctly during client-side navigation.
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
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
  const fullTitle =
  path === '/'
    ? `${title} | Kurukshetra, Haryana`
    : `${title} | ${SITE_NAME}`;
  const resolvedOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : DEFAULT_OG_IMAGE;

  const jsonLd = schema || (path === '/' ? DEFAULT_HOSPITAL_SCHEMA : null);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
