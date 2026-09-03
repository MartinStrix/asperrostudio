import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  FilmIcon,
  UserIcon,
  BuildingOfficeIcon,
  HeartIcon,
  VideoCameraIcon,
  CalendarIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import { SEO } from '../components/common/SEO';
import { PageBadge } from '../components/common/PageBadge';
import { teamMembers } from '../data/team';

// ============================================================
//  PORTFOLIO – přehled editorů, proklik na jejich videa
// ============================================================

const services = [
  {
    icon: <FilmIcon className="w-6 h-6" />,
    title: 'Reklamní spoty',
    description: 'Profesionální reklamní videa pro televizní a online kampaně, která zaujmou a prodávají.',
    accent: 'cyan',
  },
  {
    icon: <BuildingOfficeIcon className="w-6 h-6" />,
    title: 'Firemní videa',
    description: 'Prezentační a školicí videa pro vaši firmu. Představte svůj tým a služby profesionálně.',
    accent: 'purple',
  },
  {
    icon: <HeartIcon className="w-6 h-6" />,
    title: 'Svatební video',
    description: 'Zachytíme váš nejkrásnější den v životě. Vzpomínky, které vydrží navždy.',
    accent: 'pink',
  },
  {
    icon: <VideoCameraIcon className="w-6 h-6" />,
    title: 'Dokumenty',
    description: 'Dokumentární filmy a reportáže. Příběhy, které stojí za vyprávění.',
    accent: 'pink',
  },
  {
    icon: <CalendarIcon className="w-6 h-6" />,
    title: 'Eventová videa',
    description: 'Záznamy z konferencí, koncertů a firemních akcí v nejvyšší kvalitě.',
    accent: 'purple',
  },
  {
    icon: <ShareIcon className="w-6 h-6" />,
    title: 'Sociální sítě',
    description: 'Krátká videa optimalizovaná pro Instagram, TikTok a YouTube Shorts.',
    accent: 'cyan',
  },
];

// Styl "nodů" jako ve Fusion page DaVinci Resolve
const nodeStyles = {
  cyan: {
    node: 'border-cyan-400/60 hover:border-cyan-300 shadow-cyan-500/15 hover:shadow-cyan-500/30',
    iconBox: 'from-cyan-400 to-cyan-600',
    port: 'bg-cyan-400',
  },
  purple: {
    node: 'border-purple-400/60 hover:border-purple-300 shadow-purple-500/15 hover:shadow-purple-500/30',
    iconBox: 'from-purple-400 to-purple-600',
    port: 'bg-purple-400',
  },
  pink: {
    node: 'border-pink-400/60 hover:border-pink-300 shadow-pink-500/15 hover:shadow-pink-500/30',
    iconBox: 'from-pink-400 to-pink-600',
    port: 'bg-pink-400',
  },
} as const;

// Vodicí prvky "node grafu"
const NodeWire = ({ vertical = false }: { vertical?: boolean }) => (
  <div aria-hidden="true" className="flex items-center justify-center shrink-0">
    <span
      className={`rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-60 ${
        vertical ? 'w-0.5 h-7' : 'w-0.5 h-7 md:w-9 md:h-0.5'
      }`}
    />
  </div>
);

const MiniNode = ({ label, accent }: { label: string; accent: 'cyan' | 'pink' }) => (
  <div
    aria-hidden="true"
    className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-lg bg-dark-100/80 backdrop-blur border-2 ${
      accent === 'cyan' ? 'border-cyan-400/60 shadow-cyan-500/20' : 'border-pink-400/60 shadow-pink-500/20'
    } shadow-lg`}
  >
    <span className="flex gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
      <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
    </span>
    <span className="font-mono text-sm text-gray-200">{label}</span>
  </div>
);

const accentStyles = {
  cyan: {
    border: 'hover:border-cyan-400/60',
    text: 'text-cyan-400',
    avatar: 'from-cyan-400 to-cyan-600 shadow-cyan-500/25',
  },
  pink: {
    border: 'hover:border-pink-400/60',
    text: 'text-pink-400',
    avatar: 'from-pink-400 to-pink-600 shadow-pink-500/25',
  },
  purple: {
    border: 'hover:border-purple-400/60',
    text: 'text-purple-400',
    avatar: 'from-purple-400 to-purple-600 shadow-purple-500/25',
  },
} as const;

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const PortfolioPage = () => {
  return (
    <>
      <SEO
        title="Portfolio"
        description="Portfolia editorů AsperroStudio – vyberte si editora a prohlédněte si jeho videa a styl práce."
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-20">
        <AnimatedBackground />

        <Container className="relative z-10">
          {/* Záhlaví */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageBadge icon={<FilmIcon className="w-4 h-4" />} label="Portfolio" />
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Naše{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                práce
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Vyberte si editora a prohlédněte si jeho videa. Každý má svůj
              styl — společně tvoříme obsah, který má drive.
            </p>
          </motion.div>

          {/* Karty editorů pod sebou */}
          <div className="max-w-3xl mx-auto space-y-5">
            {teamMembers.map((member, index) => {
              const accent = accentStyles[member.accent];
              return (
                <motion.div
                  key={member.id}
                  className={`md:w-[86%] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className={`flex flex-col sm:flex-row items-center gap-5 md:gap-6 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 ${accent.border} hover:bg-white/[0.07] transition-all duration-300`}
                  >
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={`Fotka – ${member.name}`}
                        loading="lazy"
                        className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-2xl object-cover border border-white/15 shadow-lg"
                      />
                    ) : (
                      <div
                        className={`w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold font-display text-white bg-gradient-to-br ${accent.avatar} border border-white/15 shadow-lg`}
                      >
                        {getInitials(member.name)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h2 className="text-lg md:text-2xl font-bold font-display">
                        {member.name}
                      </h2>
                      <p className={`${accent.text} text-sm font-medium`}>
                        {member.role}
                      </p>
                      <p className="text-gray-500 text-xs mb-1.5">{member.age} let</p>
                      <p className="text-gray-400 text-sm md:text-base line-clamp-2">
                        {member.bio}
                      </p>
                    </div>

                    {/* Dvě tlačítka: profil + portfolio */}
                    <div className="shrink-0 flex flex-row sm:flex-col gap-2.5 w-full sm:w-44">
                      <Link
                        to={`/tym/${member.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 active:scale-[0.98] transition-all"
                      >
                        <UserIcon className="w-4 h-4" />
                        Profil
                      </Link>
                      <Link
                        to={`/portfolio/${member.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 hover:shadow-lg hover:shadow-pink-500/25 active:scale-[0.98] transition-all"
                      >
                        <FilmIcon className="w-4 h-4" />
                        Portfolio
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        {/* Services Grid – jako nody ve Fusion */}
        <section className="relative z-10 py-16">
          <Container>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Naše{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  služby
                </span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Co všechno umíme natočit a zpracovat — propojené jako nody ve Fusion.
              </p>
            </motion.div>

            <div className="flex flex-col items-center">
              {/* MediaIn */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <MiniNode label="MediaIn" accent="cyan" />
              </motion.div>
              <NodeWire vertical />

              {/* Dvě řady nodů */}
              {[services.slice(0, 3), services.slice(3, 6)].map((row, rowIndex) => (
                <div key={rowIndex} className="contents">
                  <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center w-full">
                    {row.map((service, index) => {
                      const accent = nodeStyles[service.accent as keyof typeof nodeStyles];
                      return (
                        <div key={service.title} className="contents">
                          {index > 0 && <NodeWire />}
                          <motion.div
                            className={`relative w-full max-w-sm md:w-72 rounded-xl bg-dark-100/80 backdrop-blur border-2 ${accent.node} p-5 shadow-lg transition-all duration-300`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.25) }}
                            whileHover={{ y: -4 }}
                          >
                            {/* Kontrolky nodu */}
                            <div className="flex gap-1.5 mb-3" aria-hidden="true">
                              <span className="w-2 h-2 rounded-full bg-red-400/80" />
                              <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                              <span className="w-2 h-2 rounded-full bg-green-400/80" />
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className={`w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br ${accent.iconBox} flex items-center justify-center text-white`}
                              >
                                {service.icon}
                              </div>
                              <h3 className="font-bold font-display">{service.title}</h3>
                            </div>
                            <p className="text-gray-400 text-sm">{service.description}</p>

                            {/* Porty nodu */}
                            <span
                              aria-hidden="true"
                              className={`hidden md:block absolute -left-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${accent.port} ring-4 ring-dark`}
                            />
                            <span
                              aria-hidden="true"
                              className={`hidden md:block absolute -right-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${accent.port} ring-4 ring-dark`}
                            />
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                  <NodeWire vertical />
                </div>
              ))}

              {/* MediaOut */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <MiniNode label="MediaOut" accent="pink" />
              </motion.div>
            </div>
          </Container>
        </section>


          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 mb-5">
              Líbí se vám naše práce? Pojďme natočit něco pro vás.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/kontakt"
                className="w-full sm:w-72 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Chci konzultaci zdarma
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/cenik"
                className="w-full sm:w-72 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 active:scale-[0.98] transition-all"
              >
                Spočítat cenu videa
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
};
