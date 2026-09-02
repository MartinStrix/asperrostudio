import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy, useEffect, useRef } from 'react';
import { PageHeader } from './components/layout/PageHeader';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SkipLink } from './components/common/SkipLink';
import { ScrollToTop } from './components/common/ScrollToTop';
import { CookieBanner } from './components/common/CookieBanner';
import { PromoPopup } from './components/common/PromoPopup';
import { Footer } from './components/layout/Footer';
import { PerformanceToggle } from './components/common/PerformanceToggle';
import { MotionConfig } from 'framer-motion';
import { useLowPerf } from './utils/performanceMode';
import { ScrollTimeline } from './components/common/ScrollTimeline';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const VideoPage = lazy(() => import('./pages/VideoPage').then(m => ({ default: m.VideoPage })));
const KontaktPage = lazy(() => import('./pages/KontaktPage').then(m => ({ default: m.KontaktPage })));
const EditorPortfolioPage = lazy(() => import('./pages/EditorPortfolioPage').then(m => ({ default: m.EditorPortfolioPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const TeamMemberPage = lazy(() => import('./pages/TeamMemberPage').then(m => ({ default: m.TeamMemberPage })));
const CenikPage = lazy(() => import('./pages/CenikPage').then(m => ({ default: m.CenikPage })));
const CookiesPage = lazy(() => import('./pages/CookiesPage').then(m => ({ default: m.CookiesPage })));
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
              <Route path="/portfolio" element={<PageWrapper><PortfolioPage /></PageWrapper>} />
              <Route path="/portfolio/:memberId" element={<PageWrapper><EditorPortfolioPage /></PageWrapper>} />
              <Route path="/o-nas" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/tym" element={<Navigate to="/o-nas" replace />} />
              <Route path="/tym/:memberId" element={<PageWrapper><TeamMemberPage /></PageWrapper>} />
              <Route path="/cenik" element={<PageWrapper><CenikPage /></PageWrapper>} />
              <Route path="/kontakt" element={<PageWrapper><KontaktPage /></PageWrapper>} />
              <Route path="/cookies" element={<PageWrapper><CookiesPage /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
        <SideTimeline />
        <CookieBanner />
        <PromoPopup />
        <PerformanceToggle />
      </main>
    </>
  );
};

// Boční timeline nemá být na hlavní stránce – ta má vlastní
// plnohodnotnou Resolve timeline dole (součást 3D hero sekce)
const SideTimeline = () => {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return <ScrollTimeline />;
};

function App() {
  const lowPerf = useLowPerf();
  return (
    <ErrorBoundary>
      <Router>
      <MotionConfig reducedMotion={lowPerf ? 'always' : 'user'}>
      <ScrollToTop />
        <AnimatedRoutes />
        </MotionConfig>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
