import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FilmIcon,
  BuildingOfficeIcon,
  HeartIcon,
  VideoCameraIcon,
  CalendarIcon,
  ShareIcon,
  CheckIcon
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
  },
  {
    icon: <BuildingOfficeIcon className="w-6 h-6" />,
    title: 'Firemní videa',
    description: 'Prezentační a školicí videa pro vaši firmu. Představte svůj tým a služby profesionálně.',
  },
  {
    icon: <HeartIcon className="w-6 h-6" />,
    title: 'Svatební video',
    description: 'Zachytíme váš nejkrásnější den v životě. Vzpomínky, které vydrží navždy.',
  },
  {
    icon: <VideoCameraIcon className="w-6 h-6" />,
    title: 'Dokumenty',
    description: 'Dokumentární filmy a reportáže. Příběhy, které stojí za vyprávění.',
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: 'Eventová videa',
    description: 'Záznamy z konferencí, koncertů a firemních akcí v nejvyšší kvalitě.',
  },
  {
    icon: <ShareIcon className="w-6 h-6" />,
    title: 'Sociální sítě',
    description: 'Krátká videa optimalizovaná pro Instagram, TikTok a YouTube Shorts.',
  },
];

const features = [
  'Komplexní produkce od nápadu po střih',
  'Profesionální filmová technika',
  'Rychlé dodání projektu',
  'Neomezené revize',
  'Kreativní přístup k vašemu příběhu',
];

export const VideoPage = () => {
  return (
    <>
      <SEO
        title="Videotvorba - Profesionalni video produkce"
        description="Reklamni spoty, firemni videa, svatebni zaznamy a dokumenty. Komplexni produkce od napadu po strih."
      />
      <div className="min-h-screen bg-dark text-white">
        {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-[128px]" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <VideoCameraIcon className="w-4 h-4" />
              <span>Videotvorba</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Příběhy, které
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                zanechají dojem
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-8">
              Od reklamních spotů po svatební videa - vytváříme obsah, který osloví srdce i mysl vašeho publika.
            </p>

            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
            >
              Začít projekt
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
              Široká škála video služeb pro jakýkoliv projekt
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center mb-4 text-cyan-400 group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold font-display mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </div>
            ))}
          </motion.div>
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
              Ukázka naší práce
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
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
              <p className="text-gray-400 mb-4">
                Chcete vidět více? Navštivte náš YouTube kanál.
              </p>
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
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                  Proč spolupracovat s námi?
                </h2>
                <p className="text-gray-400">
                  Kombinujeme kreativitu s technickou dokonalostí, abychom vytvořili videa, která předčí vaše očekávání.
                </p>
              </div>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
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
              Připraveni vyprávět váš příběh?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Pojďme společně vytvořit video, které zaujme a inspiruje vaše publikum.
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
    </>
  );
};
