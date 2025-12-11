import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';

export const GrafikaPage = () => {
  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6">
        <Container>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Zpět</span>
          </Link>
        </Container>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <motion.div
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <PaintBrushIcon className="w-12 h-12 text-purple-400" />
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Grafika
              </span>
            </h1>

            {/* Coming Soon Badge */}
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="px-6 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-medium">
                Připravujeme
              </span>
            </motion.div>

            {/* Description */}
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Pracujeme na přípravě našeho grafického portfolia. Brzy zde najdete
              ukázky naší práce v oblasti vizuální identity, log a grafického designu.
            </p>

            {/* Services preview */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {['Loga', 'Vizuální identita', 'Tiskoviny', 'Social media'].map((service) => (
                <div
                  key={service}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <span className="text-gray-300 text-sm">{service}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                Máte zájem? Kontaktujte nás
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8">
        <Container>
          <div className="text-center text-sm text-gray-500">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              &copy; {new Date().getFullYear()} AsperroStudio
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
};
