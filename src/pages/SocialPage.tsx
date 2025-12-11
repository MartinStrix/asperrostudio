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
import { PageHeader } from '../components/layout/PageHeader';
import { Footer } from '../components/layout/Footer';

const services = [
  {
    icon: <CameraIcon className="w-6 h-6" />,
    title: 'Photo Content',
    description: 'Professional photography optimized for Instagram, Facebook, and other platforms.',
  },
  {
    icon: <VideoCameraIcon className="w-6 h-6" />,
    title: 'Reels & TikTok',
    description: 'Short-form videos designed for viral reach on social media.',
  },
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    title: 'Stories & Highlights',
    description: 'Creative stories and highlight covers that engage your followers.',
  },
  {
    icon: <ChartBarIcon className="w-6 h-6" />,
    title: 'Content Strategy',
    description: 'Comprehensive planning for consistent brand presentation.',
  },
];

const features = [
  'Platform-optimized content',
  'Consistent posting schedule',
  'Engaging captions & hashtags',
  'Analytics & performance tracking',
  'Trend-aware content creation',
];

export const SocialPage = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <PageHeader />

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
              <span>Social Media Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Content That
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                Drives Engagement
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-8">
              From reels to stories, we create content that captures attention and grows your audience.
            </p>

            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              Get Started
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
              Our Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to dominate social media
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
                  Why Choose Us?
                </h2>
                <p className="text-gray-400">
                  We understand what makes content perform and know how to make your brand stand out.
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
              Ready to Grow Your Social Presence?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Let's create content that your audience will love.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-dark font-semibold rounded-xl transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              Contact Us
            </Link>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};
