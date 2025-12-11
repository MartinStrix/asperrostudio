import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Container } from '../common/Container';
import { NAV_LINKS } from '../../utils/constants';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isSubPage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark/90 backdrop-blur-lg border-b border-white/10' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <nav className="flex items-center justify-between py-4">
            {/* Back button on subpages or Logo on home */}
            <div className="flex items-center gap-4">
              {isSubPage && (
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Zpět</span>
                </Link>
              )}
              <Link to={isSubPage ? '/video' : '#hero'} className="flex items-center gap-3">
                <img src="/logo.png" alt="AsperroStudio" className="w-12 h-12 md:w-14 md:h-14" />
                <span className="text-xl md:text-2xl font-bold font-display">
                  Asperro<span className="text-cyan-400">Studio</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button Desktop */}
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105"
            >
              Kontaktujte nás
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
