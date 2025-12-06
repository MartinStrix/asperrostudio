import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { services, Service } from '../../data/services';

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon;

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Videotvorba = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="videotvorba" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          title="Videotvorba"
          subtitle="Nabízíme širokou škálu video služeb pro jakýkoliv projekt. Od kreativního nápadu až po finální střih."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
