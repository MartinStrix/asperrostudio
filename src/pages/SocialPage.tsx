import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, DevicePhoneMobileIcon, CameraIcon, VideoCameraIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { Footer } from '../components/layout/Footer';

const services = [
  {
    icon: <CameraIcon className="w-8 h-8" />,
    title: 'Foto obsah',
    description: 'Profesionální fotografie pro Instagram, Facebook a další platformy.',
  },
  {
    icon: <VideoCameraIcon className="w-8 h-8" />,
    title: 'Reels & TikTok',
    description: 'Krátká videa optimalizovaná pro virální dosah na sociálních sítích.',
  },
  {
    icon: <SparklesIcon className="w-8 h-8" />,
    title: 'Stories & Highlights',
    description: 'Kreativní stories a highlights které zaujmou vaše sledující.',
  },
  {
    icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
    title: 'Content strategie',
    description: 'Komplexní plánování obsahu pro konzistentní prezentaci značky.',
  },
];

export const SocialPage = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 border-b border-white/10">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Zpět</span>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="AsperroStudio" className="w-10 h-10" />
              <span className="text-lg font-bold font-display">
                Asperro<span className="text-cyan-400">Studio</span>
              </span>
            </Link>
            <Link
              to="/kontakt"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-pink-500/25 transition-all"
            >
              Kontakt
            </Link>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-16 md:py-24">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <DevicePhoneMobileIcon className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              <span className="gradient-text">Social Media</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-8">
              Tvoříme obsah, který zaujme. Od reels a TikTok videí po profesionální
              fotografie - postaráme se o vaši prezentaci na sociálních sítích.
            </p>

            <Link
              to="/kontakt"
              className="btn-primary"
            >
              Nezávazná konzultace
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Services */}
      <section className="relative z-10 py-16">
        <Container>
          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 to-pink-500/20 flex items-center justify-center mb-4 text-cyan-400 group-hover:from-cyan-400 group-hover:to-pink-500 group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 md:py-24">
        <Container>
          <motion.div
            className="text-center max-w-2xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-pink-500/10 border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
              Připraveni růst na sociálních sítích?
            </h2>
            <p className="text-gray-400 mb-6">
              Ozvěte se nám a společně vytvoříme obsah, který přitáhne pozornost vašeho publika.
            </p>
            <Link
              to="/kontakt"
              className="btn-primary"
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
