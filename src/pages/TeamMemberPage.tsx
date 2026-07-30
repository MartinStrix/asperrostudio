import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { VideoEmbed } from '../components/common/VideoEmbed';
import { teamMembers } from '../data/team';

const accentStyles = {
  cyan: {
    text: 'text-cyan-400',
    avatar: 'from-cyan-400 to-cyan-600',
    glow: 'shadow-cyan-500/25',
    button: 'hover:border-cyan-400 hover:text-cyan-400',
  },
  pink: {
    text: 'text-pink-400',
    avatar: 'from-pink-400 to-pink-600',
    glow: 'shadow-pink-500/25',
    button: 'hover:border-pink-400 hover:text-pink-400',
  },
  purple: {
    text: 'text-purple-400',
    avatar: 'from-purple-400 to-purple-600',
    glow: 'shadow-purple-500/25',
    button: 'hover:border-purple-400 hover:text-purple-400',
  },
} as const;

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.81s-.01 3.55-.07 4.81c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.6-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.55 2.2 15.17 2.2 12s0-3.55.07-4.81c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52 0-4.76.07-1.08.05-1.66.23-2.05.38-.51.2-.88.44-1.26.83-.39.38-.63.75-.83 1.26-.15.39-.33.97-.38 2.05C2.65 9.83 2.65 10.2 2.65 12s0 2.17.07 3.41c.05 1.08.23 1.66.38 2.05.2.51.44.88.83 1.26.38.39.75.63 1.26.83.39.15.97.33 2.05.38 1.24.07 1.61.07 4.76.07s3.52 0 4.76-.07c1.08-.05 1.66-.23 2.05-.38.51-.2.88-.44 1.26-.83.39-.38.63-.75.83-1.26.15-.39.33-.97.38-2.05.07-1.24.07-1.61.07-3.41s0-2.17-.07-3.41c-.05-1.08-.23-1.66-.38-2.05-.2-.51-.44-.88-.83-1.26a3.4 3.4 0 0 0-1.26-.83c-.39-.15-.97-.33-2.05-.38C15.52 4 15.15 4 12 4Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.15-3.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
  </svg>
);

export const TeamMemberPage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const member = teamMembers.find((m) => m.id === memberId);

  // Neexistující editor → zpět na přehled týmu
  if (!member) {
    return <Navigate to="/tym" replace />;
  }

  const accent = accentStyles[member.accent];

  return (
    <>
      <SEO
        title={`${member.name} | Náš tým`}
        description={member.bio}
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-20">
        <Container>
          {/* Zpět na tým */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/tym"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Zpět na tým
            </Link>
          </motion.div>

          {/* Profil */}
          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8 max-w-3xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {member.photo ? (
              <img
                src={member.photo}
                alt={`Fotka – ${member.name}`}
                className={`w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-2 border-white/15 shadow-xl ${accent.glow} shrink-0`}
              />
            ) : (
              <div
                aria-hidden="true"
                className={`w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center text-4xl font-bold font-display text-white bg-gradient-to-br ${accent.avatar} border-2 border-white/15 shadow-xl ${accent.glow} shrink-0`}
              >
                {getInitials(member.name)}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold font-display">
                {member.name}
              </h1>
              <p className={`${accent.text} font-medium mt-1`}>{member.age} let</p>
              <p className="text-gray-400 mt-4 leading-relaxed">{member.bio}</p>

              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full border-2 border-white/20 text-white ${accent.button} transition-colors`}
              >
                <InstagramIcon />
                Instagram
              </a>
            </div>
          </motion.div>

          {/* Portfolio */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-5">
              Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {member.videos.map((video) => (
                <div key={video.url}>
                  <VideoEmbed url={video.url} title={video.title} />
                  <p className="text-gray-400 text-sm mt-2">{video.title}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 mb-5">
              Líbí se vám tenhle styl? Pojďme vytvořit něco pro vás.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-lg hover:shadow-pink-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Nezávazná poptávka
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </Container>
      </div>
    </>
  );
};
