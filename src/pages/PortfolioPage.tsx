import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, FilmIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
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
        {/* Background – jemné záře ve firemních barvách */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[128px]" />
        </div>

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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.2) }}
                >
                  <Link
                    to={`/tym/${member.id}`}
                    className={`group flex items-center gap-5 md:gap-7 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 ${accent.border} hover:bg-white/10 transition-all duration-300`}
                  >
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={`Fotka – ${member.name}`}
                        loading="lazy"
                        className="w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-2xl object-cover border border-white/15 shadow-lg transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold font-display text-white bg-gradient-to-br ${accent.avatar} border border-white/15 shadow-lg transition-transform duration-300 group-hover:scale-105`}
                      >
                        {getInitials(member.name)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
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

                    <div className="shrink-0 hidden sm:flex flex-col items-center gap-1 text-gray-500 group-hover:text-white transition-colors">
                      <span className="text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        Zobrazit videa
                      </span>
                      <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
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
