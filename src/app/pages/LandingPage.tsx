import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SEO } from '../components/SEO';
import {
  getLandingPage,
  imageUrl,
  type LandingImage,
  type LandingPage as LandingPageData,
} from '../seo/landingPages';
import { landingPath, landingSchema } from '../seo/pages';
import { HOSPITAL } from '../seo/site';
import { DOCTORS } from '../data/doctors';

const pediatrician = DOCTORS[1];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

const VISIT_STEPS = [
  {
    icon: 'solar:phone-calling-linear',
    title: 'Call or walk in',
    text: `Call ${HOSPITAL.opdPhone} for OPD, or come straight to the 24-hour emergency.`,
  },
  {
    icon: 'solar:stethoscope-linear',
    title: 'Assessment by our team',
    text: 'Your child is examined by the paediatric team, with lab tests and imaging on site if needed.',
  },
  {
    icon: 'solar:heart-angle-linear',
    title: 'Treatment & follow-up',
    text: 'Clear explanation, treatment in OPD, ward, NICU or PICU, and a follow-up plan for home.',
  },
];

/** Responsive Unsplash image; crops to the container via object-cover. */
function Photo({
  image,
  sizes,
  className = '',
  priority = false,
}: {
  image: LandingImage;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <ImageWithFallback
      src={imageUrl(image.id, 1200)}
      srcSet={[480, 800, 1200, 1600].map((w) => `${imageUrl(image.id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm leading-relaxed text-foreground"
        >
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ eyebrow, title, center = false }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : ''}>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function Hero({ page }: { page: LandingPageData }) {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-background to-background">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:px-4 lg:pb-24 lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center lg:col-span-6"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">{t('landing.home')}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/services">{t('landing.services')}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{page.linkLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Badge variant="secondary" className="mt-6 gap-1.5 rounded-full bg-accent px-3 py-1 text-accent-foreground">
            <Icon icon={page.icon} className="size-3.5" />
            {page.eyebrow}
          </Badge>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {page.h1} <span className="text-primary">{page.h1Highlight}</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{page.intro[0]}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
              <a href={HOSPITAL.emergencyPhoneHref}>
                <Icon icon="solar:phone-calling-bold" className="size-5" />
                {t('landing.call')} {HOSPITAL.emergencyPhone}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-6 text-base">
              <Link to="/appointments">
                <Icon icon="solar:calendar-add-linear" className="size-5" />
                {t('landing.bookAppointment')}
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 divide-x divide-border rounded-2xl border bg-card/80 py-4 backdrop-blur-sm">
            {[
              { k: '1987', v: t('landing.servingSince') },
              { k: '24/7', v: t('landing.emergency') },
              { k: 'NICU·PICU', v: t('landing.onSite') },
            ].map((s) => (
              <div key={s.v} className="px-3 text-center">
                <dt className="sr-only">{s.v}</dt>
                <dd className="font-display text-lg font-bold text-foreground sm:text-xl">{s.k}</dd>
                <dd className="mt-0.5 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative lg:col-span-6"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-primary/10 sm:aspect-[16/11] lg:aspect-[4/5]">
            <Photo image={page.images.hero} sizes="(min-width: 1024px) 50vw, 100vw" priority />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
          </div>

          <Card className="absolute -bottom-6 left-4 right-4 flex-row items-center gap-4 rounded-2xl border-0 p-4 shadow-xl sm:left-auto sm:right-6 sm:w-80">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <Icon icon="solar:siren-rounded-bold" className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Emergency · open 24/7</p>
              <a href={HOSPITAL.emergencyPhoneHref} className="font-display text-lg font-semibold text-foreground hover:text-primary">
                {HOSPITAL.emergencyPhone}
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Overview({ page }: { page: LandingPageData }) {
  const { t } = useTranslation();
  const [first, ...rest] = page.images.gallery;
  const lead = page.sections[0];
  return (
    <section className="px-4 pb-16 pt-14 sm:px-6 lg:px-4 lg:pb-24 lg:pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div {...reveal} className="grid grid-cols-2 gap-3 sm:gap-4">
          <figure className="relative row-span-2 overflow-hidden rounded-3xl">
            <div className="absolute inset-0">
              <Photo image={first} sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
            {first.caption && <Caption text={first.caption} />}
          </figure>
          {rest.map((img) => (
            <figure key={img.id} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Photo image={img} sizes="(min-width: 1024px) 25vw, 50vw" />
              {img.caption && <Caption text={img.caption} />}
            </figure>
          ))}
        </motion.div>

        <motion.article {...reveal}>
          <SectionHeading eyebrow={t('landing.aboutService')} title={lead.heading} />
          {page.intro.slice(1).map((p) => (
            <p key={p.slice(0, 40)} className="mt-5 leading-relaxed text-muted-foreground">{p}</p>
          ))}
          {lead.body.map((b) => (
            <p key={b.slice(0, 40)} className="mt-5 leading-relaxed text-muted-foreground">{b}</p>
          ))}
          {lead.bullets && <CheckList items={lead.bullets} />}
        </motion.article>
      </div>
    </section>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-3 pt-10 text-xs font-medium text-primary-foreground sm:p-4 sm:text-sm">
      {text}
    </figcaption>
  );
}

function Highlights({ page }: { page: LandingPageData }) {
  const { t } = useTranslation();
  return (
    <section className="bg-muted/50 px-4 py-16 sm:px-6 lg:px-4 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading center eyebrow={t('landing.atAGlance')} title={t('landing.facilitiesTitle')} />
        <div className={`mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-6 ${page.highlights.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
          {page.highlights.map((h, i) => (
            <motion.div key={h.title} {...reveal} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="group h-full flex-row items-start gap-4 rounded-2xl border-0 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:flex-col sm:p-7">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon icon={h.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{h.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitSteps() {
  const { t } = useTranslation();
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-4 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading center eyebrow={t('landing.yourVisit')} title={t('landing.whatToExpect')} />
        <ol className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {VISIT_STEPS.map((step, i) => (
            <motion.li key={step.title} {...reveal} transition={{ duration: 0.4, delay: i * 0.08 }} className="relative rounded-2xl border bg-card p-6 sm:p-7">
              <span className="absolute right-6 top-5 font-display text-5xl font-bold text-primary/10">0{i + 1}</span>
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon icon={step.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{t(`landing.visitSteps.${i}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`landing.visitSteps.${i}.text`, { phone: HOSPITAL.opdPhone })}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function VisitCard() {
  const { t } = useTranslation();
  const rows = [
    { icon: 'solar:map-point-linear', label: t('landing.address'), value: HOSPITAL.fullAddress, href: HOSPITAL.mapUrl, external: true },
    { icon: 'solar:siren-rounded-linear', label: t('landing.emergency247'), value: HOSPITAL.emergencyPhone, href: HOSPITAL.emergencyPhoneHref },
    { icon: 'solar:phone-calling-linear', label: t('landing.opdAppointments'), value: HOSPITAL.opdPhone, href: HOSPITAL.opdPhoneHref },
  ];
  return (
    <Card className="gap-0 overflow-hidden rounded-3xl border-0 shadow-lg lg:sticky lg:top-28">
      <div className="bg-primary px-6 py-5 text-primary-foreground">
        <p className="text-xs font-medium uppercase tracking-widest opacity-80">{t('landing.visitUs')}</p>
        <p className="mt-1 font-display text-xl font-semibold">{HOSPITAL.name}</p>
      </div>
      <dl className="space-y-5 p-6 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex gap-3">
            <Icon icon={r.icon} className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <dt className="font-medium text-foreground">{r.label}</dt>
              <dd className="mt-0.5">
                <a
                  href={r.href}
                  {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-muted-foreground hover:text-primary"
                >
                  {r.value}
                </a>
              </dd>
            </div>
          </div>
        ))}
        <div className="flex gap-3">
          <Icon icon="solar:clock-circle-linear" className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <dt className="font-medium text-foreground">{t('landing.opdTimings')}</dt>
            {HOSPITAL.opdHours.map((h) => (
              <dd key={h} className="mt-0.5 text-muted-foreground">{h}</dd>
            ))}
          </div>
        </div>
      </dl>
      <div className="px-6 pb-6">
        <Button asChild variant="outline" className="h-11 w-full rounded-full">
          <a href={HOSPITAL.mapUrl} target="_blank" rel="noopener noreferrer">
            <Icon icon="solar:routing-2-linear" className="size-4" />
            {t('landing.getDirections')}
          </a>
        </Button>
      </div>
    </Card>
  );
}

function PediatricianCard() {
  const { t } = useTranslation();
  return (
    <Card className="gap-0 overflow-hidden rounded-3xl border-0 shadow-lg sm:flex-row">
      <div className="relative aspect-[4/3] bg-accent sm:aspect-auto sm:w-56 sm:shrink-0">
        <ImageWithFallback
          src={pediatrician.image}
          alt={`${pediatrician.name}, pediatrician at Radhakishan Hospital Kurukshetra`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
        <Badge variant="secondary" className="rounded-full bg-accent text-accent-foreground">{t('landing.childDoctor')}</Badge>
        <h2 className="mt-3 font-display text-2xl font-bold text-foreground">{pediatrician.name}</h2>
        <p className="mt-1 text-sm font-medium text-primary">{pediatrician.qualification}</p>
        <p className="mt-1 text-sm text-muted-foreground">{pediatrician.specialtyLabel}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          {pediatrician.registrationAuthority} · Reg. No. {pediatrician.registrationNo}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full">
            <Link to="/appointments">{t('landing.bookWith')} {pediatrician.name.replace('Dr. ', 'Dr ')}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to={`/doctor/${pediatrician.id}`}>{t('landing.viewProfile')}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function UrgentCallout({ urgent }: { urgent: NonNullable<LandingPageData['urgent']> }) {
  const { t } = useTranslation();
  return (
    <motion.div {...reveal}>
      <Card className="gap-0 rounded-3xl border-destructive/20 bg-destructive/5 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive text-white">
            <Icon icon="solar:danger-triangle-bold" className="size-5" />
          </span>
          <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{urgent.heading}</h2>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {urgent.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
              <Icon icon="solar:danger-circle-linear" className="mt-0.5 size-4 shrink-0 text-destructive" />
              {b}
            </li>
          ))}
        </ul>
        <Button asChild variant="destructive" size="lg" className="mt-7 h-12 w-full rounded-full sm:w-auto">
          <a href={HOSPITAL.emergencyPhoneHref}>
            <Icon icon="solar:phone-calling-bold" className="size-5" />
            {t('landing.callEmergency')}: {HOSPITAL.emergencyPhone}
          </a>
        </Button>
      </Card>
    </motion.div>
  );
}

function Related({ pages }: { pages: LandingPageData[] }) {
  const { t } = useTranslation();
  if (pages.length === 0) return null;
  return (
    <section className="bg-muted/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        <SectionHeading eyebrow={t('landing.exploreMore')} title={t('landing.relatedServices')} />
      </div>
      {/* Swipeable row on mobile, grid on desktop */}
      <div className="mx-auto mt-10 flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-4 lg:pb-0">
        {pages.map((r) => (
          <Link
            key={r.slug}
            to={landingPath(r.slug)}
            className="group relative block aspect-[4/5] shrink-0 basis-3/4 snap-start overflow-hidden rounded-3xl sm:basis-2/5 lg:basis-auto"
          >
            <Photo image={r.images.hero} sizes="(min-width: 1024px) 25vw, 75vw" className="transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15 backdrop-blur-sm">
                <Icon icon={r.icon} className="size-5" />
              </span>
              <p className="mt-3 font-display text-lg font-semibold leading-snug">{r.linkLabel}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm opacity-80 group-hover:opacity-100">
                {t('landing.learnMore')} <Icon icon="solar:arrow-right-linear" className="size-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LandingContent({ page }: { page: LandingPageData }) {
  const { t, i18n } = useTranslation();
  const path = landingPath(page.slug);
  const related = page.related.map((slug) => getLandingPage(slug, i18n.language)).filter(Boolean);
  const moreSections = page.sections.slice(1);
  const ctaImage = page.images.gallery[page.images.gallery.length - 1];

  return (
    <div className="relative min-h-screen">
      <SEO
        title={page.title}
        description={page.description}
        path={path}
        ogImage={imageUrl(page.images.hero.id, 1200, 630)}
        schema={landingSchema(page)}
      />

      <Hero page={page} />
      <Overview page={page} />
      <Highlights page={page} />

      {/* Details + sticky visit card */}
      <section className="px-4 py-16 sm:px-6 lg:px-4 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div className="min-w-0 space-y-14 lg:space-y-16">
            {moreSections.map((s) => (
              <motion.article key={s.heading} {...reveal}>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{s.heading}</h2>
                {s.body.map((b) => (
                  <p key={b.slice(0, 40)} className="mt-4 leading-relaxed text-muted-foreground">{b}</p>
                ))}
                {s.bullets && <CheckList items={s.bullets} />}
              </motion.article>
            ))}

            {page.urgent && <UrgentCallout urgent={page.urgent} />}
            {page.showPediatrician && <PediatricianCard />}

            <article>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t('landing.faqs')}
              </h2>
              <Accordion type="single" collapsible className="mt-6 space-y-3">
                {page.faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${i}`}
                    className="group rounded-2xl border bg-card px-5 shadow-sm transition-shadow data-[state=open]:shadow-md sm:px-6"
                  >
                    <AccordionTrigger className="text-left text-base text-foreground hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    {/* forceMount keeps answers in the DOM for search engines; hide visually when closed */}
                    <AccordionContent forceMount className="leading-relaxed text-muted-foreground group-data-[state=closed]:hidden">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </article>
          </div>

          <VisitCard />
        </div>
      </section>

      <VisitSteps />
      <Related pages={related} />

      {/* CTA with photo background */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Photo image={ctaImage} sizes="100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/95 to-brand-900/90" />
        <motion.div {...reveal} className="mx-auto max-w-3xl px-4 py-20 text-center text-primary-foreground sm:py-24">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t('landing.ctaTitle')}</h2>
          <p className="mt-5 text-lg opacity-90">
            {t('landing.ctaDescription')}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full bg-background px-7 text-base text-primary hover:bg-accent">
              <Link to="/appointments">{t('landing.bookAppointment')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-primary-foreground/40 bg-transparent px-7 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={HOSPITAL.opdPhoneHref}>Call {HOSPITAL.opdPhone}</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Mobile quick-action bar — sticks to the viewport bottom until the footer */}
      <div className="sticky bottom-0 z-40 border-t bg-background/95 p-3 shadow-lg backdrop-blur-md md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <Button asChild variant="destructive" className="h-11 rounded-full">
            <a href={HOSPITAL.emergencyPhoneHref}>
              <Icon icon="solar:phone-calling-bold" className="size-4" />
              {t('landing.emergency')}
            </a>
          </Button>
          <Button asChild className="h-11 rounded-full">
            <Link to="/appointments">
              <Icon icon="solar:calendar-add-linear" className="size-4" />
              {t('landing.bookVisit')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function LandingPage({ slug }: { slug: string }) {
  const { i18n } = useTranslation();
  return <LandingContent page={getLandingPage(slug, i18n.language)} />;
}
