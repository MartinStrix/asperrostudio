import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FilmIcon,
  BuildingOfficeIcon,
  HeartIcon,
  VideoCameraIcon,
  CalendarIcon,
  ShareIcon,
  CheckIcon,
  ArrowRightIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { Footer } from '../components/layout/Footer';
import { VideoEmbed } from '../components/common/VideoEmbed';
import { SEO } from '../components/common/SEO';

const services = [
  {
    icon: <FilmIcon className="w-6 h-6" />,
    title: 'Reklamní spoty',
    description: 'Profesionální reklamní videa pro televizní a online kampaně, která zaujmou a prodávají.',
    accent: 'cyan',
  },
  {
    icon: <BuildingOfficeIcon className="w-6 h-6" />,
    title: 'Firemní videa',
    description: 'Prezentační a školicí videa pro vaši firmu. Představte svůj tým a služby profesionálně.',
    accent: 'purple',
  },
  {
    icon: <HeartIcon className="w-6 h-6" />,
    title: 'Svatební video',
    description: 'Zachytíme váš nejkrásnější den v životě. Vzpomínky, které vydrží navždy.',
    accent: 'pink',
  },
  {
    icon: <VideoCameraIcon className="w-6 h-6" />,
    title: 'Dokumenty',
    description: 'Dokumentární filmy a reportáže. Příběhy, které stojí za vyprávění.',
    accent: 'pink',
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: 'Eventová videa',
    description: 'Záznamy z konferencí, koncertů a firemních akcí v nejvyšší kvalitě.',
    accent: 'purple',
  },
  {
    icon: <ShareIcon className="w-6 h-6" />,
    title: 'Sociální sítě',
    description: 'Krátká videa optimalizovaná pro Instagram, TikTok a YouTube Shorts.',
    accent: 'cyan',
  },
];

const accentStyles = {
  cyan: {
    border: 'hover:border-cyan-400/50',
    iconBox: 'from-cyan-400/20 to-cyan-600/20 text-cyan-400 group-hover:from-cyan-400 group-hover:to-cyan-600',
  },
  purple: {
    border: 'hover:border-purple-400/50',
    iconBox: 'from-purple-400/20 to-purple-600/20 text-purple-400 group-hover:from-purple-400 group-hover:to-purple-600',
  },
  pink: {
    border: 'hover:border-pink-400/50',
    iconBox: 'from-pink-400/20 to-pink-600/20 text-pink-400 group-hover:from-pink-400 group-hover:to-pink-600',
  },
} as const;

const features = [
  'Komplexní produkce od nápadu po střih',
  'Natáčení na place — kamera i dron',
  'Postprodukce v DaVinci Resolve Studio',
  'Rychlé dodání projektu',
  'Kreativní přístup k vašemu příběhu',
];

export const VideoPage = () => {
  return (
    <>
      <SEO
        title="Videotvorba - Profesionalni video produkce"
        description="Reklamni spoty, firemni videa, svatebni zaznamy a dokumenty. Komplexni produkce od napadu po strih. Konzultace zdarma."
      />
      <div className="min-h-screen bg-dark text-white">
        {/* Background – jemné záře ve firemních barvách */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[128px]" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-28 pb-16 md:pb-24">
          <Container>
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-cyan-400 text-sm font-medium mb-6">
                <VideoCameraIcon className="w-4 h-4" />
                <span>Videotvorba</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
                Příběhy, které
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  zanechají dojem
                </span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl mb-8">
                Od reklamních spotů po svatební videa — vytváříme obsah, který
                osloví srdce i mysl vašeho publika.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/kontakt"
                  className="w-full sm:w-72 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Nezávazná poptávka
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link
                  to="/tym"
                  className="w-full sm:w-72 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 active:scale-[0.98] transition-all"
                >
                  <UserGroupIcon className="w-5 h-5" />
                  Poznejte náš tým
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="relative z-10 py-16">
          <Container>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Naše{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  služby
                </span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Široká škála video služeb pro jakýkoliv projekt
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const accent = accentStyles[service.accent as keyof typeof accentStyles];
                return (
                  <motion.div
                    key={service.title}
                    className={`p-6 rounded-2xl bg-white/5 border border-white/10 ${accent.border} hover:bg-white/10 transition-all duration-300 group`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
                    whileHover={{ y: -6 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent.iconBox} flex items-center justify-center mb-4 group-hover:text-white transition-all`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold font-display mb-2">{service.title}</h3>
                    <p className="text-gray-300 text-sm">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Portfolio Section */}
        <section className="relative z-10 py-16">
          <Container>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Ukázka naší{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  práce
                </span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Podívejte se, jak vypadá profesionální video produkce od AsperroStudio
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <VideoEmbed
                url="https://youtu.be/yXYDx3daA_o"
                title="Ukázka naší práce"
              />

              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-gray-300 mb-4">
                  Chcete vidět více? Navštivte náš YouTube kanál nebo profily
                  našich editorů.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <a
                    href="https://www.youtube.com/@Asperro.Studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Navštívit YouTube
                  </a>
                  <Link
                    to="/tym"
                    className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors font-medium"
                  >
                    <UserGroupIcon className="w-5 h-5" />
                    Portfolia editorů
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-16">
          <Container>
            <motion.div
              className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/15 to-pink-500/15 blur-3xl pointer-events-none"
              />
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                    Proč spolupracovat s námi?
                  </h2>
                  <p className="text-gray-300">
                    Kombinujeme kreativitu s technickou dokonalostí, abychom
                    vytvořili videa, která předčí vaše očekávání. A začínáme
                    vždy konzultací zdarma.
                  </p>
                </div>
                <div className="space-y-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-16 md:py-24">
          <Container>
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                Připraveni vyprávět váš příběh?
              </h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Pojďme společně vytvořit video, které zaujme a inspiruje vaše
                publikum. Konzultace je zdarma a nezávazná.
              </p>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Chci konzultaci zdarma
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>
          </Container>
        </section>

        <Footer />
      </div>
    </>
  );
};
