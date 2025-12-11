import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Container } from '../common/Container';

const NAV_ITEMS = [
  { label: 'Domů', href: '/', color: 'white', gradient: 'from-white/20 to-white/10' },
  { label: 'Videotvorba', href: '/video', color: 'cyan', gradient: 'from-cyan-400/20 to-cyan-600/10' },
  { label: 'Grafika', href: '/grafika', color: 'pink', gradient: 'from-pink-400/20 to-pink-600/10' },
  { label: 'Sociální sítě', href: '/social', color: 'purple', gradient: 'from-purple-400/20 to-purple-600/10' },
  { label: 'Kontakt', href: '/kontakt', color: 'white', gradient: 'from-white/20 to-white/10' },
];

export const PageHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Update active indicator position
  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const activeIndex = NAV_ITEMS.findIndex(item => item.href === location.pathname);
        // +1 offset because first child is the indicator div itself
        const activeLi = navRef.current.children[activeIndex + 1] as HTMLElement;
        const activeLink = activeLi?.querySelector('a');
        if (activeLink) {
          const navRect = navRef.current.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          setActiveIndicator({
            left: linkRect.left - navRect.left,
            width: linkRect.width,
          });
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;
  const activeItem = NAV_ITEMS.find(item => item.href === location.pathname);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark/95 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="AsperroStudio" className="w-10 h-10" />
              <span className="text-lg font-bold font-display">
                Asperro<span className="text-cyan-400">Studio</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul ref={navRef} className="hidden md:flex items-center gap-1 relative">
              {/* Animated sliding indicator */}
              <motion.div
                className={`absolute h-9 rounded-lg bg-gradient-to-r ${activeItem?.gradient || 'from-white/10 to-white/5'} pointer-events-none`}
                initial={false}
                animate={{
                  left: activeIndicator.left,
                  width: activeIndicator.width,
                  opacity: activeIndicator.width > 0 ? 1 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                }}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              />
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? item.color === 'cyan' ? 'text-cyan-400' :
                          item.color === 'pink' ? 'text-pink-400' :
                          item.color === 'purple' ? 'text-purple-400' :
                          'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <motion.span
                      initial={false}
                      animate={{
                        scale: isActive(item.href) ? 1.05 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
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
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-dark/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu */}
            <motion.nav
              className="absolute top-16 left-0 right-0 p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ul className="space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                        isActive(item.href)
                          ? `bg-gradient-to-r ${item.gradient} ${
                              item.color === 'cyan' ? 'text-cyan-400' :
                              item.color === 'pink' ? 'text-pink-400' :
                              item.color === 'purple' ? 'text-purple-400' :
                              'text-white'
                            }`
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};
