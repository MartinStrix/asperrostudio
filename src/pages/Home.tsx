import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  VideoCameraIcon,
  ArrowRightIcon,
  UserGroupIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  FilmIcon,
  ScissorsIcon,
  RocketLaunchIcon,
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

// ------------------------------------------------------------
// „HAD" – proces od nápadu k finálnímu videu
// Kroky můžeš kdykoliv upravit / přidat zde:
// ------------------------------------------------------------
const PROCESS_STEPS = [
  {
    icon: LightBulbIcon,
    title: 'Nápad',
    desc: 'Přijdete s představou — klidně jen hrubou. My ji pomůžeme dotáhnout.',
    color: 'text-cyan-400',
    dot: 'from-cyan-400 to-cyan-600 shadow-cyan-500/40',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Konzultace',
    desc: 'Nezávazně probereme cíle, styl a rozpočet. Zdarma.',
    color: 'text-cyan-300',
    dot: 'from-cyan-300 to-cyan-500 shadow-cyan-400/40',
  },
  {
    icon: DocumentTextIcon,
    title: 'Scénář',
    desc: 'Připravíme scénář a plán, ať přesně víte, co vznikne.',
    color: 'text-purple-400',
    dot: 'from-purple-400 to-purple-600 shadow-purple-500/40',
  },
  {
    icon: FilmIcon,
    title: 'Natáčení',
    desc: 'Natočíme vlastní záběry, nebo pracujeme s vašimi materiály.',
    color: 'text-purple-300',
    dot: 'from-purple-300 to-purple-500 shadow-purple-400/40',
  },
  {
    icon: ScissorsIcon,
    title: 'Střih a postprodukce',
    desc: 'Střih, zvuk, barvy, titulky a grafika — tady se rodí výsledek.',
    color: 'text-pink-400',
    dot: 'from-pink-400 to-pink-600 shadow-pink-500/40',
  },
  {
    icon: RocketLaunchIcon,
    title: 'Finální video',
    desc: 'Hotové video připravené k publikování. A vy záříte.',
    color: 'text-pink-300',
    dot: 'from-pink-300 to-pink-500 shadow-pink-400/40',
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
        description="Video produkce a obsah, který vaši značku odliší od konkurence. Od nápadu po finální video. Nezávazná konzultace zdarma."
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
          <div className="absolute inset-0 bg-dark/50" />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center py-24">
            <Container>
              <div className="text-center max-w-4xl mx-auto">
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

                <motion.p
                  className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Střih, postprodukce a obsah od týmu, který ví, co diváky
                  zastaví uprostřed scrollování.
                </motion.p>

                {/* CTA */}
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

                {/* Videotvorba card */}
                <motion.div
                  className="max-w-md mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Link to="/video" className="group block">
                    <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300">
                      <div className="w-14 h-14 mb-4 mx-auto flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-lg shadow-cyan-500/25">
                        <VideoCameraIcon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold font-display mb-2">Videotvorba</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Profesionální video produkce a střih
                      </p>
                      <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Prozkoumat</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </Container>
          </section>

          {/* ====== HAD: OD NÁPADU K FINÁLNÍMU VIDEU ====== */}
          <section className="py-20 md:py-28">
            <Container>
              <motion.div
                className="text-center max-w-2xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
                  Od nápadu{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    k finálnímu videu
                  </span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Víme, co děláme — a takhle to u nás vypadá krok za krokem.
                </p>
              </motion.div>

              {/* Timeline / had */}
              <div className="relative max-w-3xl mx-auto">
                {/* Středová čára (na mobilu vlevo) */}
                <div
                  aria-hidden="true"
                  className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 opacity-60"
                />

                <ol className="space-y-12">
                  {PROCESS_STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const isLeft = index % 2 === 0;
                    return (
                      <motion.li
                        key={step.title}
                        className="relative"
                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Bod na čáře */}
                        <div
                          aria-hidden="true"
                          className={`absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${step.dot} shadow-lg ring-4 ring-dark`}
                        />

                        {/* Karta kroku – střídá strany (had) */}
                        <div
                          className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                            isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                          }`}
                        >
                          <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors">
                            <div
                              className={`flex items-center gap-3 mb-2 ${
                                isLeft ? 'md:flex-row-reverse' : ''
                              }`}
                            >
                              <Icon className={`w-6 h-6 shrink-0 ${step.color}`} />
                              <h3 className="text-lg md:text-xl font-bold font-display">
                                <span className={`${step.color} mr-2`}>{index + 1}.</span>
                                {step.title}
                              </h3>
                            </div>
                            <p className="text-gray-400 text-sm md:text-base">{step.desc}</p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>

              {/* CTA pod hadem */}
              <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-400 mb-5">
                  Krok 1 je na vás. O zbytek se postaráme my.
                </p>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Mám nápad — pojďme na to
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </motion.div>
            </Container>
          </section>

          {/* Footer */}
          <footer className="py-6">
            <Container>
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
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
