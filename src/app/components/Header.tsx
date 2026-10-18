import { Link, useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Icon } from '@iconify/react';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLogin, { ADMIN_SESSION_KEY } from './AdminLogin';

export function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoClicks = useRef(0);
  const logoClickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const useTransparentHomeHeader = isHomePage && !isScrolled;

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
    { path: '/', label: t('navbar.home') },
    { path: '/about', label: t('navbar.about') },
    { path: '/services', label: t('navbar.services') },
    { path: '/doctors', label: t('navbar.doctors') },
    { path: '/contact', label: t('navbar.contact') },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLanguageOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter,color] duration-300 ease-out ${isHomePage
        ? useTransparentHomeHeader
          ? 'absolute left-0 right-0 bg-transparent text-white'
          : 'fixed left-0 right-0 bg-white/95 text-foreground shadow-sm backdrop-blur-md'
        : 'sticky bg-white/95 text-foreground shadow-sm backdrop-blur-md'
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
                className={`flex h-12 w-12 shrink-0 items-center justify-center ${useTransparentHomeHeader ? "rounded-lg bg-white p-1" : "p-1"
                  }`}
              >
                <img
                  src="/logo.png"
                  alt="Radhakishan Hospital"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className={`text-xl tracking-tight ${useTransparentHomeHeader ? 'text-white' : ''}`} style={{ fontWeight: 600 }}>
                  Radhakishan Hospital
                </div>
                <div className={`hidden text-xs sm:block ${useTransparentHomeHeader ? 'text-white/70' : 'text-muted-foreground'}`}>Medical Center</div>
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
                  ? useTransparentHomeHeader ? 'text-white' : 'text-primary'
                  : useTransparentHomeHeader ? 'text-white/85' : 'text-foreground'
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
            <div ref={languageRef} className="relative">
              <button
                type="button"
                onClick={() => setLanguageOpen((prev) => !prev)}
                aria-label="Change language"
                aria-expanded={languageOpen}
                className={`
      flex items-center gap-1.5 rounded-full border px-2 py-1
      text-sm font-medium transition-all duration-200
      ${useTransparentHomeHeader
                    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                    : 'border-gray-200 bg-white text-foreground hover:bg-gray-50'
                  }
    `}
              >
                {/* Current Flag */}
                <Icon
                  icon={i18n.language === 'en' ? 'emojione:flag-for-united-kingdom' : 'emojione:flag-for-india'}
                  className="h-6 w-6"
                />

                {/* Language Name */}
                <span className="hidden sm:inline">
                  {i18n.language === 'en' ? 'English' : 'हिन्दी'}
                </span>

                {/* Mobile Short Name */}
                <span className="sm:hidden">
                  {i18n.language === 'en' ? 'EN' : 'हि'}
                </span>

                <Icon
                  icon="lucide:chevron-down"
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: 'easeOut',
                    }}
                    className="absolute right-0 top-full z-50 mt-2 w-40 origin-top-right overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 text-gray-800 shadow-xl"
                  >
                    {/* English */}
                    <button
                      type="button"
                      onClick={() => changeLanguage('en')}
                      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${i18n.language === 'en'
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                        }`}
                    >
                      <Icon
                        icon="emojione:flag-for-united-kingdom"
                        className="h-6 w-6 shrink-0"
                      />

                      <span>English</span>
                    </button>

                    {/* Hindi */}
                    <button
                      type="button"
                      onClick={() => changeLanguage('hi')}
                      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${i18n.language === 'hi'
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                        }`}
                    >
                      <Icon
                        icon="emojione:flag-for-india"
                        className="h-6 w-6 shrink-0"
                      />

                      <span>हिन्दी</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Appointment */}
            <Link to="/appointments" className="hidden md:block">
              <Button
                className={`rounded-full px-6 font-medium transition-all duration-200 ${useTransparentHomeHeader
                  ? 'bg-white/95 text-black hover:bg-white/80'
                  : 'bg-[#058080] text-white hover:bg-[#047070]'
                  }`}
              >
                {t('navbar.bookAppointment')}
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
              className={`md:hidden flex-shrink-0 rounded-lg p-2 transition-colors ${useTransparentHomeHeader
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
                  {t('navbar.bookAppointment')}
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
