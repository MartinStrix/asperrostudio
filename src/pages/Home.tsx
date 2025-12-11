import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { VideoCameraIcon, PaintBrushIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { CategoryCard } from '../components/common/CategoryCard';

const categories = [
  {
    title: 'Video Edit',
    subtitle: 'Profesionální videa a střih',
    to: '/video',
    icon: <VideoCameraIcon className="w-8 h-8" />,
    imageSrc: '/category-video.jpg',
  },
  {
    title: 'Grafika',
    subtitle: 'Vizuální identita a design',
    to: '/grafika',
    icon: <PaintBrushIcon className="w-8 h-8" />,
    comingSoon: true,
  },
  {
    title: 'Social Media',
    subtitle: 'Obsah pro sociální sítě',
    to: '/social',
    icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
    imageSrc: '/category-social.jpg',
  },
];

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-500/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export const Home = () => {
  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Background gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-8">
        <Container>
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="AsperroStudio" className="w-16 h-16 md:w-20 md:h-20" />
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-center">
              Asperro<span className="text-cyan-400">Studio</span>
            </h1>
            <p className="text-gray-400 mt-2 text-center">
              Kreativní studio pro váš brand
            </p>
          </motion.div>
        </Container>
      </header>

      {/* Main Content - Categories */}
      <main className="relative z-10 flex-1 flex items-center py-12">
        <Container>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.to}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8">
        <Container>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/kontakt" className="hover:text-cyan-400 transition-colors">
              Kontakt
            </Link>
            <span className="hidden md:inline">|</span>
            <span>&copy; {new Date().getFullYear()} AsperroStudio</span>
          </motion.div>
        </Container>
      </footer>
    </div>
  );
};
