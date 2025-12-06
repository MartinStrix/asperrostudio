import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { VideoEmbed } from '../common/VideoEmbed';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { portfolioItems } from '../../data/portfolio';

export const Portfolio = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="portfolio" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          title="Portfolio"
          subtitle="Podívejte se na ukázky naší práce. Každý projekt je pro nás příležitost vyprávět jedinečný příběh."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto"
        >
          {portfolioItems.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <VideoEmbed url={item.videoUrl} title={item.title} />
              {item.description && (
                <p className="text-center text-gray-400 mt-4">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={controls}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Chcete vidět více? Navštivte náš YouTube kanál.
          </p>
          <a
            href="https://youtube.com/@asperrostudio"
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
      </Container>
    </section>
  );
};
