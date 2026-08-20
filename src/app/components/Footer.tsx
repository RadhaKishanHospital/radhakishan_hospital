import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Icon } from '@iconify/react';

export function Footer() {
  return (
    <footer className="bg-[#f8fafa] border-t">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <div className="text-white text-xl">+</div>
              </div>
              <div>
                <div className="text-lg tracking-tight" style={{ fontWeight: 600 }}>
                  Radha Kishan Hospital
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Providing exceptional healthcare services with compassion and excellence since 1995.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
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

          {/* Services */}
          <div>
            <h3 className="mb-4 text-foreground">Our Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Emergency Care</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Cardiology</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Pediatrics</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Orthopedics</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Laboratory</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-foreground">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Icon icon="solar:map-point-linear" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>123 Medical Center Drive, Healthcare City, HC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Icon icon="solar:phone-calling-linear" className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Icon icon="solar:letter-opened-linear" className="w-5 h-5 text-primary flex-shrink-0" />
                <span>info@radhakishanhospital.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Radha Kishan Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
