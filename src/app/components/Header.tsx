import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Phone, Mail, Clock, Menu, X, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`top-0 z-50 w-full ${
        isHomePage
          ? 'absolute left-0 right-0 bg-transparent text-white'
          : 'bg-white/95 shadow-sm backdrop-blur-sm'
      }`}
    >
      {/* Top Bar */}
      

      {/* Main Navigation */}
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 min-w-0 max-w-[calc(100%-3.5rem)] sm:max-w-none">
            <motion.div
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <div className="text-white text-xl"><Plus /></div>
              </div>
              <div>
                <div className={`text-xl tracking-tight ${isHomePage ? 'text-white' : ''}`} style={{ fontWeight: 600 }}>
                  Radha Kishan Hospital
                </div>
                <div className={`hidden text-xs sm:block ${isHomePage ? 'text-white/70' : 'text-muted-foreground'}`}>Medical Center</div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors hover:text-primary ${
                  isActive(link.path)
                    ? isHomePage ? 'text-white' : 'text-primary'
                    : isHomePage ? 'text-white/85' : 'text-foreground'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/appointments" className="hidden md:block">
              <Button className={`rounded-full px-6 font-medium transition-all duration-200 ${
                isHomePage
                  ? 'bg-white/95 text-black hover:bg-white/80'
                  : 'bg-[#058080] text-white hover:bg-[#047070]'
              }`}>
                Book Appointment
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden flex-shrink-0 rounded-lg p-2 transition-colors ${
                isHomePage ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden rounded-xl border border-primary/10 bg-white p-3 text-foreground shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-secondary hover:text-primary ${
                    isActive(link.path)
                      ? 'bg-secondary text-primary'
                      : 'text-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/appointments" onClick={() => setMobileMenuOpen(false)}>
                <Button className="mt-2 w-full bg-primary hover:bg-primary/90">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
