import { motion } from 'motion/react';
import {
  Heart,
  Stethoscope,
  Activity,
  Users,
  Baby,
  Bone,
  Eye,
  Brain,
  Pill,
  Microscope,
  Siren,
  Scan,
  Check,
} from 'lucide-react';
import { Icon } from "@iconify/react";
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function Services() {
  const { t } = useTranslation();
  const services = [
    {
      icon: Baby,
      title: t('services.items.pediatrics.title'),
      description: t('services.items.pediatrics.description'),
    },
    {
      icon: Activity,
      title: t('services.items.picu.title'),
      description: t('services.items.picu.description'),
    },
    {
      icon: Baby,
      title: t('services.items.nicu.title'),
      description: t('services.items.nicu.description'),
    },
    {
      icon: Stethoscope,
      title: t('services.items.anaesthesiology.title'),
      description: t('services.items.anaesthesiology.description'),
    },
    {
      icon: Microscope,
      title: t('services.items.laboratory.title'),
      description: t('services.items.laboratory.description'),
      features: [
        t('services.items.laboratory.features.bioChemistry'),
        t('services.items.laboratory.features.haematology'),
        t('services.items.laboratory.features.microbiology'),
        t('services.items.laboratory.features.clinicalPathology'),
      ],
    },
    {
      icon: Activity,
      title: t('services.items.dietetics.title'),
      description: t('services.items.dietetics.description'),
    },
    {
      icon: Pill,
      title: t('services.items.pharmacy.title'),
      description: t('services.items.pharmacy.description'),
    },
    {
      icon: Scan,
      title: t('services.items.ultrasound.title'),
      description: t('services.items.ultrasound.description'),
    },
  ];

  const whyChoose = [
    {
      icon: "solar:heart-pulse-linear",
      title: t('services.whyChoose.patientCare.title'),
      description: t('services.whyChoose.patientCare.description'),
    },
    {
      icon: "solar:stethoscope-linear",
      title: t('services.whyChoose.specializedServices.title'),
      description: t('services.whyChoose.specializedServices.description'),
    },
    {
      icon: "solar:shield-check-linear",
      title: t('services.whyChoose.comprehensiveSupport.title'),
      description: t('services.whyChoose.comprehensiveSupport.description'),
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Children's Hospital in Kurukshetra"
        description="Looking for a children's hospital in Kurukshetra? Radhakishan Hospital offers paediatric care and medical services for children in Haryana."
        path="/services"
        ogImage="/logo.png"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f0fafa] to-white pb-5 pt-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl mb-6" style={{ fontWeight: 700 }}>
              {t('services.hero.title')} <span className="text-primary">{t('services.hero.highlight')}</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              {t('services.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="px-6 lg:px-4 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
            {services.map(({ icon: Icon, title, description, features }) => (
              <div
                key={title}
                className={`group relative rounded-[24px] bg-card p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_6px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.06),0_16px_40px_-8px_rgba(0,0,0,0.1)] ${title === t('services.items.laboratory.title')
                  ? 'lg:row-span-2'
                  : ''
                  }`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary">
                  <Icon className="h-6 w-6 text-primary transition-colors duration-200 group-hover:text-primary-foreground" />
                </div>

                <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>

                {features && (
                  <div className="mt-6 border-t border-border/60 pt-6">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      {t('services.availableTests')}
                    </p>

                    <ul className="flex flex-col divide-y divide-border/50">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 py-3 text-sm text-foreground first:pt-0 last:pb-0"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* Features Section */}
      <section className="px-6 lg:px-4 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
              {t('services.whyChoose.title')}
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              {t('services.whyChoose.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {whyChoose.map(({ icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon icon={icon} className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#047070]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontWeight: 700 }}>
              {t('services.cta.title')}
            </h2>

            <p className="text-white/90 text-lg mb-8">
              {t('services.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/appointments">
                <Button size="lg" className="bg-white text-[#058080] rounded-full px-6 font-medium shadow-[0_2px_8px_-2px_hsl(180_94%_26%/0.4)] transition-all duration-200 hover:bg-[#e6f2f2] hover:shadow-[0_4px_16px_-2px_hsl(180_94%_26%/0.5)]">
                  {t('services.cta.button')}
                </Button>
              </Link>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
