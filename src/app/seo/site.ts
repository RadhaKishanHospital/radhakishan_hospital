/**
 * Single source of truth for hospital facts and SEO helpers.
 * Plain data only (no React imports) so the build-time prerender plugin in
 * server/seoPrerender.ts can import it too.
 */

export const SITE_URL = 'https://radhakishanhospital.in';
export const SITE_NAME = 'Radhakishan Hospital';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export const HOSPITAL = {
  name: 'Radhakishan Hospital',
  alternateNames: [
    'Radha Kishan Hospital',
    'Radhakishan Children Hospital',
    'Radha Kishan Children Hospital',
    'Radhakishan Hospital Kurukshetra',
  ],
  founded: '1987',
  streetAddress: 'Jyoti Nagar, Thanesar',
  locality: 'Kurukshetra',
  region: 'Haryana',
  postalCode: '136118',
  country: 'IN',
  fullAddress: 'Jyoti Nagar, Thanesar, Kurukshetra, Haryana 136118',
  opdPhone: '+91 72060 29516',
  opdPhoneHref: 'tel:+917206029516',
  emergencyPhone: '+91 1744 270516',
  emergencyPhoneHref: 'tel:+911744270516',
  email: 'radhakishanhospital@gmail.com',
  mapUrl: 'https://maps.app.goo.gl/i88UBqcifNZ4Cow8A',
  geo: { latitude: 29.9695, longitude: 76.8783 },
  opdHours: ['Mon–Sat: 10:00 AM – 2:00 PM', 'Mon–Sat: 5:00 PM – 7:00 PM', 'Sunday: OPD closed'],
  sameAs: [
    'https://www.instagram.com/radhakishan.hospital',
    'https://www.youtube.com/watch?v=ZI8iEtAULdw',
  ],
} as const;

export function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl === '/' ? '' : pathOrUrl}`;
}

/** The homepage title is used verbatim; every other page gets the brand suffix. */
export function buildTitle(title: string, path: string) {
  return path === '/' ? title : `${title} | ${SITE_NAME}`;
}

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const OPD_DAYS = ALL_DAYS.slice(0, 6);

export const HOSPITAL_ID = `${SITE_URL}/#hospital`;

export const hospitalSchema = {
  '@context': 'https://schema.org',
  '@type': ['Hospital', 'MedicalClinic'],
  '@id': HOSPITAL_ID,
  name: HOSPITAL.name,
  alternateName: HOSPITAL.alternateNames,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description:
    'Radhakishan Hospital (Radha Kishan Hospital) is a children’s and multi-specialty hospital in Kurukshetra, Haryana, established in 1987 — with a NICU for newborns, a PICU for critically ill children, 24-hour pediatric emergency care, general medicine, general surgery, pathology lab and cashless insurance.',
  foundingDate: HOSPITAL.founded,
  telephone: HOSPITAL.opdPhone,
  email: HOSPITAL.email,
  currenciesAccepted: 'INR',
  hasMap: HOSPITAL.mapUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: HOSPITAL.streetAddress,
    addressLocality: HOSPITAL.locality,
    addressRegion: HOSPITAL.region,
    postalCode: HOSPITAL.postalCode,
    addressCountry: HOSPITAL.country,
  },
  geo: { '@type': 'GeoCoordinates', ...HOSPITAL.geo },
  areaServed: [
    { '@type': 'City', name: 'Kurukshetra' },
    { '@type': 'City', name: 'Thanesar' },
    { '@type': 'City', name: 'Pehowa' },
    { '@type': 'City', name: 'Shahabad' },
    { '@type': 'City', name: 'Ladwa' },
    { '@type': 'City', name: 'Pipli' },
    { '@type': 'State', name: 'Haryana' },
  ],
  medicalSpecialty: ['Pediatric', 'Emergency', 'Pathology', 'Surgical', 'Anesthesia'],
  availableService: [
    { '@type': 'MedicalTherapy', name: 'Neonatal Intensive Care Unit (NICU)' },
    { '@type': 'MedicalTherapy', name: 'Pediatric Intensive Care Unit (PICU)' },
    { '@type': 'MedicalTherapy', name: '24 Hour Pediatric Emergency' },
    { '@type': 'MedicalTherapy', name: 'Premature and Low Birth Weight Baby Care' },
    { '@type': 'MedicalTherapy', name: 'Newborn Jaundice Treatment (Phototherapy)' },
    { '@type': 'MedicalTherapy', name: 'Pediatric Seizure Treatment' },
    { '@type': 'MedicalTherapy', name: 'Pediatric Asthma Treatment' },
    { '@type': 'MedicalTherapy', name: 'Child Infection Treatment' },
    { '@type': 'MedicalTest', name: 'Clinical Laboratory (Biochemistry, Haematology, Microbiology, Clinical Pathology)' },
    { '@type': 'MedicalTest', name: 'Ultrasound and X-Ray' },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: HOSPITAL.emergencyPhone,
      contactType: 'emergency',
      availableLanguage: ['en', 'hi'],
      hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ALL_DAYS, opens: '00:00', closes: '23:59' },
    },
    { '@type': 'ContactPoint', telephone: HOSPITAL.opdPhone, contactType: 'customer service', availableLanguage: ['en', 'hi'] },
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ALL_DAYS, opens: '00:00', closes: '23:59', description: 'Emergency, NICU and PICU — open 24 hours' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: OPD_DAYS, opens: '10:00', closes: '14:00', description: 'OPD (morning)' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: OPD_DAYS, opens: '17:00', closes: '19:00', description: 'OPD (evening)' },
  ],
  isAcceptingNewPatients: true,
  sameAs: HOSPITAL.sameAs,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: HOSPITAL.alternateNames,
  inLanguage: ['en-IN', 'hi-IN'],
  publisher: { '@id': HOSPITAL_ID },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
