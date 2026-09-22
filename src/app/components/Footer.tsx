import { Link } from 'react-router';
import { Facebook, Youtube, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Icon } from '@iconify/react';

export function Footer() {
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
              Providing exceptional healthcare services with compassion and excellence since 1983.
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
            <h3 className="mb-4 text-foreground">Our Services</h3>

            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">
                Pediatrics
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Pediatric Intensive Care Unit
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Neonatal Intensive Care Unit
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Anaesthesiology Unit (On call)
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Clinical Laboratory Services
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Dietetics & Nutrition
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Pharmacy
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                Ultrasound & X-Ray
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>



          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-foreground">Contact Info</h3>

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
          <p>&copy; {new Date().getFullYear()} Radhakishan Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
