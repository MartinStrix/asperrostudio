import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Container } from '../common/Container';
import { GradientText } from '../common/GradientText';
import { Button } from '../common/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="text-center"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="text-cyan-400 font-medium mb-4 tracking-wider uppercase text-sm"
            >
              Video produkce
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight"
            >
              Tvoříme videa,{' '}
              <br className="hidden sm:block" />
              která <GradientText>zaujmou</GradientText>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Profesionální video produkce pro vaše projekty.
              Od reklamních spotů po svatební videa -
              přinášíme vaše vize k životu.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button href="#portfolio">Naše práce</Button>
              <Button href="#contact" variant="secondary">
                Kontaktujte nás
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#videotvorba" aria-label="Scroll down">
          <ChevronDownIcon className="w-8 h-8 text-gray-400" />
        </a>
      </motion.div>
    </section>
  );
};
