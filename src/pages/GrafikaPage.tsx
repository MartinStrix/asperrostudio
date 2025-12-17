import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  PaintBrushIcon,
  SwatchIcon,
  DocumentTextIcon,
  SparklesIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { Footer } from '../components/layout/Footer';
import { SEO } from '../components/common/SEO';

const services = [
  {
    icon: <SwatchIcon className="w-6 h-6" />,
    title: 'Vizuální identita',
    description: 'Kompletní vizuální identita včetně loga, barevné palety a brand manuálu.',
  },
  {
    icon: <PaintBrushIcon className="w-6 h-6" />,
    title: 'Tvorba loga',
    description: 'Unikátní a zapamatovatelná loga, která vystihují podstatu vaší značky.',
  },
  {
    icon: <DocumentTextIcon className="w-6 h-6" />,
    title: 'Tiskové materiály',
    description: 'Vizitky, brožury, letáky a další marketingové materiály.',
  },
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    title: 'Digitální grafika',
    description: 'Webová grafika, příspěvky na sociální sítě a digitální reklamy.',
  },
];

const features = [
  'Návrhy na míru vaší značce',
  'Neomezené revize až do spokojenosti',
  'Kompletní zdrojové soubory',
  'Rychlé dodání',
  'Konzistentní aplikace značky',
];

export const GrafikaPage = () => {
  return (
    <>
      <SEO
        title="Grafika - Vizualni identita a brand design"
        description="Tvorba loga, vizualni identita, tiskove materialy a digitalni grafika. Navrhy na miru vasi znacce."
      />
      <div className="min-h-screen bg-dark text-white">
        {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-[128px]" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
              <PaintBrushIcon className="w-4 h-4" />
              <span>Grafické služby</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Design, který
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                vypráví váš příběh
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-8">
              Od vizuální identity po marketingové materiály - vytváříme vizuály, které osloví vaše publikum a pozvednou vaši značku.
            </p>

            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105"
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
              Komplexní grafická řešení pro každou potřebu
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
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-400/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400/20 to-purple-500/20 flex items-center justify-center mb-4 text-pink-400 group-hover:from-pink-400 group-hover:to-purple-500 group-hover:text-white transition-all">
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
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10"
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
                  Jsme odhodláni dodávat výjimečnou designovou práci, která předčí vaše očekávání.
                </p>
              </div>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center flex-shrink-0">
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
              Připraveni transformovat vaši značku?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Pojďme probrat váš projekt a společně vytvořit něco úžasného.
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
