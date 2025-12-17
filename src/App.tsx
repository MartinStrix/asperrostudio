import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy, useEffect, useRef } from 'react';
import { PageHeader } from './components/layout/PageHeader';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SkipLink } from './components/common/SkipLink';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const VideoPage = lazy(() => import('./pages/VideoPage').then(m => ({ default: m.VideoPage })));
const GrafikaPage = lazy(() => import('./pages/GrafikaPage').then(m => ({ default: m.GrafikaPage })));
const SocialPage = lazy(() => import('./pages/SocialPage').then(m => ({ default: m.SocialPage })));
const KontaktPage = lazy(() => import('./pages/KontaktPage').then(m => ({ default: m.KontaktPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin mx-auto mb-4" />
      <p className="text-gray-400">Nacitani...</p>
    </div>
  </div>
);

// Check for reduced motion preference
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pageVariants = prefersReducedMotion
  ? {
      initial: {},
      animate: {},
      exit: {},
    }
  : {
      initial: {
        opacity: 0,
        y: 20,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        y: -10,
        transition: {
          duration: 0.2,
          ease: 'easeIn',
        },
      },
    };

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);

  // Focus management on route change for accessibility
  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      // Focus main content after route transition
      const timer = setTimeout(() => {
        mainRef.current?.focus();
      }, 100);

      previousPath.current = location.pathname;
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      <SkipLink />
      <PageHeader />
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/video" element={<PageWrapper><VideoPage /></PageWrapper>} />
              <Route path="/grafika" element={<PageWrapper><GrafikaPage /></PageWrapper>} />
              <Route path="/social" element={<PageWrapper><SocialPage /></PageWrapper>} />
              <Route path="/kontakt" element={<PageWrapper><KontaktPage /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AnimatedRoutes />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
