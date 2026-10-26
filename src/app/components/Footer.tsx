import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Facebook, Youtube, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Icon } from '@iconify/react';

const FOOTER_SERVICE_LINKS = [
  { slug: 'childrens-hospital-kurukshetra', key: 'footer.services.pediatrics' },
  { slug: 'nicu-kurukshetra', key: 'footer.services.nicu' },
  { slug: 'picu-kurukshetra', key: 'footer.services.picu' },
  { slug: 'pediatric-emergency-kurukshetra', key: 'footer.services.emergency' },
  { slug: 'pediatrician-in-kurukshetra', key: 'footer.services.pediatrician' },
  { slug: 'newborn-jaundice-treatment-kurukshetra', key: 'footer.services.jaundice' },
  { slug: 'pediatric-seizure-treatment-kurukshetra', key: 'footer.services.seizure' },
  { slug: 'pediatric-asthma-treatment-kurukshetra', key: 'footer.services.asthma' },
  { slug: 'child-infection-treatment-kurukshetra', key: 'footer.services.infection' },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#f8fafa] border-t">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Radhakishan Hospital"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-lg tracking-tight" style={{ fontWeight: 600 }}>
                  Radhakishan Hospital
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/radhakishan.hospital?stkn=MWsxNjB6dzJkdm1idQ%3D%3D&utm_source=qr" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/watch?v=ZI8iEtAULdw" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="mailto:radhakishanhospital@gmail.com"
                aria-label="Email Radhakishan Hospital"
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-foreground">{t('footer.services.title')}</h3>

            <ul className="space-y-2">
              {FOOTER_SERVICE_LINKS.map(({ slug, key }) => (
                <li key={slug}>
                  <Link to={`/${slug}`} className="text-muted-foreground transition-colors hover:text-primary">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-foreground">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.quickLinks.services')}
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.quickLinks.doctors')}
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.quickLinks.appointment')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.quickLinks.contact')}
                </Link>
              </li>
            </ul>
          </div>



          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-foreground">{t('footer.contact.title')}</h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="https://maps.app.goo.gl/i88UBqcifNZ4Cow8A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon
                    icon="solar:map-point-linear"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                  />
                  <span>Jyoti Nagar, Thanesar, Kurukshetra, Haryana 136118</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+917206029516"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon
                    icon="solar:phone-calling-linear"
                    className="h-5 w-5 flex-shrink-0 text-primary"
                  />
                  <span>+91 72060 29516</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:radhakishanhospital@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon
                    icon="solar:letter-opened-linear"
                    className="h-5 w-5 flex-shrink-0 text-primary"
                  />
                  <span>radhakishanhospital@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
         <p>
  &copy; {new Date().getFullYear()} Radhakishan Hospital.{' '}
  {t('footer.copyright')}
</p>
        </div>
      </div>
    </footer>
  );
}
