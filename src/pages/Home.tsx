import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  VideoCameraIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { useState, useEffect } from 'react';

// Check if we should load the video based on screen size and connection
const shouldLoadVideo = () => {
  if (typeof window === 'undefined') return false;
  const isLargeScreen = window.innerWidth > 768;
  const connection = (navigator as any).connection;
  const isFastConnection = !connection || !['slow-2g', '2g'].includes(connection.effectiveType);
  return isLargeScreen && isFastConnection;
};

const CATEGORIES = [
  {
    to: '/video',
    icon: VideoCameraIcon,
    title: 'Videotvorba',
    desc: 'Profesionální video produkce a střih',
    accent: 'cyan',
    iconBg: 'from-cyan-400 to-cyan-600 shadow-cyan-500/25',
    hover: 'hover:border-cyan-400/50',
    linkColor: 'text-cyan-400',
  },
  {
    to: '/grafika',
    icon: PaintBrushIcon,
    title: 'Grafika',
    desc: 'Vizuální identita a brand design',
    accent: 'pink',
    iconBg: 'from-pink-400 to-pink-600 shadow-pink-500/25',
    hover: 'hover:border-pink-400/50',
    linkColor: 'text-pink-400',
  },
  {
    to: '/social',
    icon: DevicePhoneMobileIcon,
    title: 'Sociální sítě',
    desc: 'Obsah, který zaujme vaše publikum',
    accent: 'purple',
    iconBg: 'from-purple-400 to-purple-600 shadow-purple-500/25',
    hover: 'hover:border-purple-400/50',
    linkColor: 'text-purple-400',
  },
];

export const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(shouldLoadVideo());
  }, []);

  return (
    <>
      <SEO
        title="Kreativní studio pro váš brand"
        description="Video produkce, grafický design a obsah pro sociální sítě, který vaši značku odliší od konkurence. Nezávazná konzultace zdarma."
      />
      <div className="min-h-screen bg-dark text-white">
        {/* Fullscreen Background Video - optimized loading */}
        <div
          className="fixed inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
          role="presentation"
        >
          {showVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              onLoadedData={() => setVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src="/videos/ink-abstract-hq.webm" type="video/webm" />
              <source src="/videos/ink-abstract-hq.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-dark via-gray-900 to-dark" />
          )}
          <div className="absolute inset-0 bg-dark/40" />
        </div>

        {/* Main content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero Section */}
          <section className="flex-1 flex items-center justify-center py-8 md:py-16">
            <Container>
              <div className="text-center max-w-4xl mx-auto">
                {/* Main headline */}
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Videa, která
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    prodávají váš brand
                  </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Střih, grafika a obsah pro sociální sítě od týmu, který ví,
                  co diváky zastaví uprostřed scrollování.
                </motion.p>

                {/* Primary + secondary CTA */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Link
                    to="/kontakt"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    Nezávazná poptávka
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/tym"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 active:scale-[0.98] transition-all"
                  >
                    <UserGroupIcon className="w-5 h-5" />
                    Poznejte náš tým
                  </Link>
                </motion.div>

                {/* Category Cards */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {CATEGORIES.map(({ to, icon: Icon, title, desc, iconBg, hover, linkColor }) => (
                    <Link key={to} to={to} className="group">
                      <div
                        className={`relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 ${hover} hover:bg-white/10 transition-all duration-300 h-full`}
                      >
                        <div
                          className={`w-14 h-14 mb-4 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br ${iconBg} text-white shadow-lg`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold font-display mb-2">{title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{desc}</p>
                        <div
                          className={`flex items-center justify-center gap-2 ${linkColor} text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity`}
                        >
                          <span>Prozkoumat</span>
                          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </Container>
          </section>

          {/* Footer */}
          <footer className="py-6">
            <Container>
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/tym" className="hover:text-white transition-colors">
                  Náš tým
                </Link>
                <span className="hidden sm:inline text-gray-700">•</span>
                <Link to="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
                <span className="hidden sm:inline text-gray-700">•</span>
                <span>&copy; {new Date().getFullYear()} AsperroStudio</span>
              </motion.div>
            </Container>
          </footer>
        </div>
      </div>
    </>
  );
};
