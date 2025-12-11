import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DevicePhoneMobileIcon,
  CameraIcon,
  VideoCameraIcon,
  SparklesIcon,
  ChartBarIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { Footer } from '../components/layout/Footer';

const services = [
  {
    icon: <CameraIcon className="w-6 h-6" />,
    title: 'Foto obsah',
    description: 'Profesionální fotografie optimalizované pro Instagram, Facebook a další platformy.',
  },
  {
    icon: <VideoCameraIcon className="w-6 h-6" />,
    title: 'Reels a TikTok',
    description: 'Krátká videa navržená pro virální dosah na sociálních sítích.',
  },
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    title: 'Stories a Highlights',
    description: 'Kreativní stories a highlight covery, které zaujmou vaše sledující.',
  },
  {
    icon: <ChartBarIcon className="w-6 h-6" />,
    title: 'Content strategie',
    description: 'Komplexní plánování obsahu pro konzistentní prezentaci značky.',
  },
];

const features = [
  'Obsah optimalizovaný pro platformy',
  'Konzistentní harmonogram příspěvků',
  'Poutavé popisky a hashtagy',
  'Analytika a sledování výkonu',
  'Tvorba obsahu v souladu s trendy',
];

export const SocialPage = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <DevicePhoneMobileIcon className="w-4 h-4" />
              <span>Služby pro sociální sítě</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Obsah, který
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                zvyšuje engagement
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-8">
              Od reels po stories - vytváříme obsah, který přitahuje pozornost a rozšiřuje vaše publikum.
            </p>

            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              Začít spolupráci
            </Link>
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
              Naše služby
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Vše, co potřebujete k ovládnutí sociálních sítí
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-cyan-500/20 flex items-center justify-center mb-4 text-purple-400 group-hover:from-purple-400 group-hover:to-cyan-500 group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold font-display mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                  Proč si vybrat nás?
                </h2>
                <p className="text-gray-400">
                  Rozumíme tomu, co dělá obsah úspěšným a víme, jak vaši značku odlišit od ostatních.
                </p>
              </div>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
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
              Připraveni růst na sociálních sítích?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Pojďme vytvořit obsah, který vaše publikum bude milovat.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark font-semibold rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              Kontaktujte nás
            </Link>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};
