import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { VideoEmbed } from '../components/common/VideoEmbed';
import { teamMembers, TeamMember } from '../data/team';
import { SOCIAL_LINKS } from '../utils/constants';

// Barevné varianty karet (ladí s barvami kategorií na webu)
const accentStyles = {
  cyan: {
    ring: 'border-cyan-400/40',
    glow: 'shadow-cyan-500/20',
    text: 'text-cyan-400',
    avatar: 'from-cyan-400 to-cyan-600',
  },
  pink: {
    ring: 'border-pink-400/40',
    glow: 'shadow-pink-500/20',
    text: 'text-pink-400',
    avatar: 'from-pink-400 to-pink-600',
  },
  purple: {
    ring: 'border-purple-400/40',
    glow: 'shadow-purple-500/20',
    text: 'text-purple-400',
    avatar: 'from-purple-400 to-purple-600',
  },
} as const;

// Iniciály pro editory bez fotky
const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const socialLabels: Record<string, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
};

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const accent = accentStyles[member.accent];

  return (
    <motion.article
      id={member.id}
      className={`rounded-3xl bg-white/5 border border-white/10 hover:${accent.ring} transition-colors duration-300 p-6 md:p-10 scroll-mt-28`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
    >
      {/* Hlavička profilu */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        {member.photo ? (
          <img
            src={member.photo}
            alt={`Fotka – ${member.name}`}
            loading="lazy"
            className={`w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border border-white/10 shadow-lg ${accent.glow}`}
          />
        ) : (
          <div
            aria-hidden="true"
            className={`w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-3xl font-bold font-display text-white bg-gradient-to-br ${accent.avatar} shadow-lg ${accent.glow}`}
          >
            {getInitials(member.name)}
          </div>
        )}

        <div className="text-center sm:text-left">
          <h2 className="text-2xl md:text-3xl font-bold font-display">{member.name}</h2>
          <p className={`${accent.text} font-medium mt-1`}>{member.role}</p>
          <p className="text-gray-400 mt-3 max-w-xl">{member.bio}</p>

          {member.socials && (
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              {Object.entries(member.socials).map(([key, url]) =>
                url ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1.5 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/40 transition-colors"
                  >
                    {socialLabels[key] ?? key}
                  </a>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>

      {/* Portfolio – vložená YouTube videa */}
      {member.videos.length > 0 && (
        <div>
          <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            Ukázky práce
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {member.videos.map((video) => (
              <div key={video.url}>
                <VideoEmbed url={video.url} title={video.title} />
                <p className="text-gray-400 text-sm mt-2">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
};

export const TeamPage = () => {
  return (
    <>
      <SEO
        title="Náš tým"
        description="Poznejte editory AsperroStudio – jejich styl, specializace a ukázky práce. Video střih, motion design a obsah pro sociální sítě."
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-20">
        <Container>
          {/* Úvod stránky */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Náš{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                tým
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Za každým videem stojí konkrétní člověk. Poznejte editory, kteří
              vaší značce dají tvář — a prohlédněte si, co umí.
            </p>
          </motion.div>

          {/* Profily editorů */}
          <div className="flex flex-col gap-10 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>

          {/* CTA na konci stránky */}
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
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-lg hover:shadow-pink-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Nezávazná poptávka
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <p className="text-gray-600 text-sm mt-4">
              Nebo nás sledujte na{' '}
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">
                Instagramu
              </a>
              .
            </p>
          </motion.div>
        </Container>
      </div>
    </>
  );
};
