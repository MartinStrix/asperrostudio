import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { VideoCameraIcon, PaintBrushIcon, DevicePhoneMobileIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';

export const Home = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6">
          <Container>
            <div className="flex items-center justify-center">
              <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="AsperroStudio" className="w-12 h-12" />
                <span className="text-xl font-bold font-display">
                  Asperro<span className="text-cyan-400">Studio</span>
                </span>
              </Link>
            </div>
          </Container>
        </header>

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
                Creative Studio
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  For Your Brand
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Video production, graphic design, and social media content that makes your brand stand out.
              </motion.p>

              {/* Category Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Video Edit Card */}
                <Link to="/video" className="group">
                  <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="w-14 h-14 mb-4 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-lg shadow-cyan-500/25">
                      <VideoCameraIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold font-display mb-2">Video Edit</h3>
                    <p className="text-gray-400 text-sm mb-4">Professional video production & editing</p>
                    <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                {/* Grafika Card */}
                <Link to="/grafika" className="group">
                  <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-400/50 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="w-14 h-14 mb-4 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 text-white shadow-lg shadow-pink-500/25">
                      <PaintBrushIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold font-display mb-2">Graphic Design</h3>
                    <p className="text-gray-400 text-sm mb-4">Visual identity & brand design</p>
                    <div className="flex items-center justify-center gap-2 text-pink-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>

                {/* Social Media Card */}
                <Link to="/social" className="group">
                  <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="w-14 h-14 mb-4 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg shadow-purple-500/25">
                      <DevicePhoneMobileIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold font-display mb-2">Social Media</h3>
                    <p className="text-gray-400 text-sm mb-4">Content that engages your audience</p>
                    <div className="flex items-center justify-center gap-2 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
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
              <Link to="/kontakt" className="hover:text-white transition-colors">
                Contact
              </Link>
              <span className="hidden sm:inline text-gray-700">•</span>
              <span>&copy; {new Date().getFullYear()} AsperroStudio</span>
            </motion.div>
          </Container>
        </footer>
      </div>
    </div>
  );
};
