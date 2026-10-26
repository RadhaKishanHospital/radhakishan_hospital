/**
 * Per-route SEO metadata for the core pages plus the route list consumed by
 * the build-time prerender plugin (server/seoPrerender.ts).
 */
import { DOCTORS, doctorSchema, doctorSeo } from '../data/doctors';
import { LANDING_PAGES, imageUrl, type LandingPage } from './landingPages';
import {
  HOSPITAL_ID,
  SITE_URL,
  absoluteUrl,
  breadcrumbSchema,
  buildTitle,
  faqSchema,
  hospitalSchema,
  websiteSchema,
} from './site';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Static-HTML heading + summary shown to crawlers before JS runs */
  h1: string;
  summary: string;
}

export const PAGE_META = {
  home: {
    path: '/',
    title: 'Radhakishan Hospital Kurukshetra | Children’s Hospital, NICU & PICU',
    description:
      'Radhakishan Hospital, Kurukshetra — since 1987. Children’s hospital with NICU, PICU, child specialist, 24-hour emergency, surgery, lab and cashless insurance.',
    h1: 'Radhakishan Hospital, Kurukshetra — Children’s Hospital, NICU & PICU',
    summary:
      'Radhakishan Hospital (Radha Kishan Hospital, Radhakishan Children Hospital) in Jyoti Nagar, Thanesar, Kurukshetra has served families since 1987 with a child specialist, NICU, PICU, 24-hour pediatric emergency, general medicine, general surgery, pathology lab, ultrasound and X-ray.',
  },
  about: {
    path: '/about',
    title: 'About Radhakishan Hospital Kurukshetra — Serving Since 1987',
    description:
      'Radhakishan Hospital (Radha Kishan Hospital) has served Kurukshetra, Haryana since 1987. Learn about our story, mission, values and children’s and family healthcare.',
    h1: 'About Radhakishan Hospital, Kurukshetra',
    summary:
      'Established in 1987, Radhakishan Hospital serves patients and families across Kurukshetra and Haryana with compassionate, evidence-based care for children and adults.',
  },
  services: {
    path: '/services',
    title: 'Hospital Services in Kurukshetra — Pediatrics, NICU, PICU, Lab & X-Ray',
    description:
      'Services at Radhakishan Hospital, Kurukshetra: paediatrics, NICU, PICU, 24-hour emergency, anaesthesiology, clinical laboratory, pharmacy, dietetics, ultrasound and X-ray.',
    h1: 'Children’s Healthcare & Medical Services in Kurukshetra',
    summary:
      'Paediatrics and child healthcare, Neonatal Intensive Care Unit (NICU), Pediatric Intensive Care Unit (PICU), anaesthesiology, clinical laboratory, dietetics, pharmacy, ultrasound and X-ray at Radhakishan Hospital, Kurukshetra.',
  },
  doctors: {
    path: '/doctors',
    title: 'Doctors in Kurukshetra — Pediatrician, Physician, Surgeon & Pathologist',
    description:
      'Meet the doctors at Radhakishan Hospital, Kurukshetra: child specialist (MD Pediatrics), general physician (MD Medicine), general surgeon (MS) and pathologist (MD).',
    h1: 'Our Doctors at Radhakishan Hospital, Kurukshetra',
    summary:
      'Dr. Lokender Goyal (MD Pediatrics), Dr. Akanksha Tyagi (MD General Medicine), Dr. Shashank Singhal (MS General Surgery) and Dr. Monika Dixit (MD Pathology).',
  },
  appointments: {
    path: '/appointments',
    title: 'Book a Doctor Appointment in Kurukshetra',
    description:
      'Book an OPD appointment at Radhakishan Hospital, Kurukshetra with our pediatrician, physician or surgeon. Call +91 72060 29516. OPD is open every day with seasonal timings.',
    h1: 'Book an Appointment at Radhakishan Hospital',
    summary:
      'Book an OPD appointment online or call +91 72060 29516. OPD is open every day. Winter: 10:00 AM–2:00 PM and 4:00 PM–6:00 PM. Summer: 9:00 AM–1:00 PM and 5:00 PM–7:00 PM.',
  },
  contact: {
    path: '/contact',
    title: 'Contact, Location & OPD Timings — Jyoti Nagar, Kurukshetra',
    description:
      'Radhakishan Hospital, Jyoti Nagar, Thanesar, Kurukshetra 136118. Emergency (24/7): +91 1744 270516. OPD: +91 72060 29516. Directions, timings and FAQs.',
    h1: 'Contact Radhakishan Hospital, Kurukshetra',
    summary:
      'Address: Jyoti Nagar, Thanesar, Kurukshetra, Haryana 136118. Emergency (24/7): +91 1744 270516. OPD: +91 72060 29516. OPD is open every day with seasonal timings. Email: radhakishanhospital@gmail.com.',
  },
} satisfies Record<string, PageMeta>;

export function landingPath(slug: string) {
  return `/${slug}`;
}

export function landingSchema(page: LandingPage): Record<string, unknown>[] {
  const path = landingPath(page.slug);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      '@id': `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: buildTitle(page.title, path),
      description: page.description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@type': 'MedicalTherapy', name: page.serviceName },
      audience: { '@type': 'PeopleAudience', audienceType: 'Parents of newborns and children' },
      provider: { '@id': HOSPITAL_ID },
      primaryImageOfPage: imageUrl(page.images.hero.id, 1200, 630),
    },
    hospitalSchema,
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: page.linkLabel, path },
    ]),
    faqSchema(page.faqs),
  ];
}

/** Schema each core page passes to <SEO>; shared so static HTML and Helmet agree. */
export function corePageSchema(path: string): Record<string, unknown>[] {
  if (path === '/') return [hospitalSchema, websiteSchema];
  if (path === '/about' || path === '/contact') return [hospitalSchema];
  return [];
}

export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
  ogType: string;
  ogImage?: string;
  schema: Record<string, unknown>[];
  h1: string;
  summary: string[];
}

/** Every indexable URL, used for static HTML generation and sitemap.xml. */
export function getPrerenderRoutes(): PrerenderRoute[] {
  const core: PrerenderRoute[] = Object.values(PAGE_META).map((m) => ({
    path: m.path,
    title: buildTitle(m.title, m.path),
    description: m.description,
    ogType: 'website',
    schema: corePageSchema(m.path),
    h1: m.h1,
    summary: [m.summary],
  }));

  const landing: PrerenderRoute[] = LANDING_PAGES.map((p) => {
    const path = landingPath(p.slug);
    return {
      path,
      title: buildTitle(p.title, path),
      description: p.description,
      ogType: 'website',
      ogImage: imageUrl(p.images.hero.id, 1200, 630),
      schema: landingSchema(p),
      h1: `${p.h1} ${p.h1Highlight}`,
      summary: p.intro,
    };
  });

  const doctors: PrerenderRoute[] = Object.values(DOCTORS).map((d) => {
    const seo = doctorSeo(d);
    return {
      path: seo.path,
      title: buildTitle(seo.title, seo.path),
      description: seo.description,
      ogType: 'profile',
      ogImage: d.image,
      schema: [doctorSchema(d)],
      h1: `${d.name} — ${d.specialtyLabel}`,
      summary: [seo.description],
    };
  });

  return [...core, ...landing, ...doctors];
}
