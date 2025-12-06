import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, slideInFromLeft, slideInFromRight } from '../../utils/animations';

const stats = [
  { value: '50+', label: 'Dokončených projektů' },
  { value: '100%', label: 'Spokojených klientů' },
  { value: '5+', label: 'Let zkušeností' },
];

export const About = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2" />

      <Container className="relative z-10">
        <SectionHeading
          title="O nás"
          subtitle="Jsme tým kreativních profesionálů s vášní pro video produkci."
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Vaše vize, naše{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                kreativita
              </span>
            </h3>

            <div className="space-y-4 text-gray-400">
              <p>
                AsperroStudio vzniklo z lásky k pohyblivým obrazům a příběhům,
                které stojí za to vyprávět. Věříme, že každý projekt si zaslouží
                individuální přístup a maximální péči.
              </p>
              <p>
                Používáme nejmodernější technologie a postupy, abychom zajistili,
                že vaše video bude nejen krásné, ale také efektivní. Ať už potřebujete
                reklamní spot, firemní prezentaci nebo zachytit ten nejdůležitější
                den vašeho života.
              </p>
              <p>
                Spolupracujeme s klienty od prvotního nápadu až po finální produkt.
                Naším cílem je překonat vaše očekávání.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                custom={index}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
