import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useRef, useState } from 'react';
import AdminLogin, { ADMIN_SESSION_KEY } from './AdminLogin';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const logoClicks = useRef(0);
  const logoClickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    logoClicks.current += 1;

    if (logoClickTimeout.current) clearTimeout(logoClickTimeout.current);
    logoClickTimeout.current = setTimeout(() => {
      logoClicks.current = 0;
    }, 1500);

    if (logoClicks.current === 7) {
      event.preventDefault();
      logoClicks.current = 0;
      setAdminLoginOpen(true);
    }
  };

  const handleAdminSuccess = () => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    setAdminLoginOpen(false);
    navigate('/admin');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/contact', label: 'Contact' },
  ];

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setLanguageOpen(false);

    // Later connect this to i18next:
    // i18n.changeLanguage(lang);
  };

  return (
    <header
      className={`top-0 z-50 w-full ${isHomePage
        ? 'absolute left-0 right-0 bg-transparent text-white'
        : 'bg-white/95 shadow-sm backdrop-blur-sm'
        }`}
    >
      {/* Top Bar */}


      {/* Main Navigation */}
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 min-w-0 max-w-[calc(100%-3.5rem)] sm:max-w-none">
            <motion.div
              className="flex items-center gap-2"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center ${isHomePage ? "rounded-lg bg-white p-1" : "p-1"
                  }`}
              >
                <img
                  src="/logo.png"
                  alt="Radhakishan Hospital"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className={`text-xl tracking-tight ${isHomePage ? 'text-white' : ''}`} style={{ fontWeight: 600 }}>
                  Radhakishan Hospital
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
                className={`relative transition-colors hover:text-primary ${isActive(link.path)
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

          <div className="flex items-center gap-3">

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen(!languageOpen)}
                aria-label="Change language"
                aria-expanded={languageOpen}
                className={`
        flex items-center gap-1.5 rounded-full px-3 py-2
        text-sm font-medium transition-all duration-200
        border
        ${isHomePage
                    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                    : 'border-gray-200 bg-white text-foreground hover:bg-gray-50'
                  }
      `}
              >
                <Globe className="h-4 w-4" />

                <span className="hidden sm:inline">
                  {language === 'en' ? 'English' : 'हिन्दी'}
                </span>

                <span className="sm:hidden">
                  {language === 'en' ? 'EN' : 'हि'}
                </span>

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {/* Language Dropdown */}
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 text-gray-800 shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${language === 'en'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-50'
                      }`}
                  >
                    <span>English</span>

                    {language === 'en' && (
                      <span className="text-primary">✓</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLanguage('hi')}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${language === 'hi'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-50'
                      }`}
                  >
                    <span>हिन्दी</span>

                    {language === 'hi' && (
                      <span className="text-primary">✓</span>
                    )}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Book Appointment */}
            <Link to="/appointments" className="hidden md:block">
              <Button
                className={`rounded-full px-6 font-medium transition-all duration-200 ${isHomePage
                  ? 'bg-white/95 text-black hover:bg-white/80'
                  : 'bg-[#058080] text-white hover:bg-[#047070]'
                  }`}
              >
                Book Appointment
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              className={`md:hidden flex-shrink-0 rounded-lg p-2 transition-colors ${isHomePage
                ? 'text-white hover:bg-white/10'
                : 'text-foreground hover:bg-muted'
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
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-secondary hover:text-primary ${isActive(link.path)
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
      <AdminLogin open={adminLoginOpen} onClose={() => setAdminLoginOpen(false)} onSuccess={handleAdminSuccess} />
    </header >
  );
}
