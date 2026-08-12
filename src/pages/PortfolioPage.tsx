import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, FilmIcon, UserIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import { SEO } from '../components/common/SEO';
import { PageBadge } from '../components/common/PageBadge';
import { teamMembers } from '../data/team';

// ============================================================
//  PORTFOLIO – přehled editorů, proklik na jejich videa
// ============================================================

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
                      <p className={`${accent.text} text-sm font-medium mb-1.5`}>
                        {member.age} let
                      </p>
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
