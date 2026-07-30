import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { teamMembers, TeamMember } from '../data/team';

const accentStyles = {
  cyan: {
    ring: 'group-hover:border-cyan-400/70',
    glow: 'shadow-cyan-500/25',
    text: 'text-cyan-400',
    avatar: 'from-cyan-400 to-cyan-600',
  },
  pink: {
    ring: 'group-hover:border-pink-400/70',
    glow: 'shadow-pink-500/25',
    text: 'text-pink-400',
    avatar: 'from-pink-400 to-pink-600',
  },
  purple: {
    ring: 'group-hover:border-purple-400/70',
    glow: 'shadow-purple-500/25',
    text: 'text-purple-400',
    avatar: 'from-purple-400 to-purple-600',
  },
} as const;

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

// Ikonka Instagramu (SVG, ať nemusíme přidávat další knihovnu)
const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.81s-.01 3.55-.07 4.81c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.6-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.55 2.2 15.17 2.2 12s0-3.55.07-4.81c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52 0-4.76.07-1.08.05-1.66.23-2.05.38-.51.2-.88.44-1.26.83-.39.38-.63.75-.83 1.26-.15.39-.33.97-.38 2.05C2.65 9.83 2.65 10.2 2.65 12s0 2.17.07 3.41c.05 1.08.23 1.66.38 2.05.2.51.44.88.83 1.26.38.39.75.63 1.26.83.39.15.97.33 2.05.38 1.24.07 1.61.07 4.76.07s3.52 0 4.76-.07c1.08-.05 1.66-.23 2.05-.38.51-.2.88-.44 1.26-.83.39-.38.63-.75.83-1.26.15-.39.33-.97.38-2.05.07-1.24.07-1.61.07-3.41s0-2.17-.07-3.41c-.05-1.08-.23-1.66-.38-2.05-.2-.51-.44-.88-.83-1.26a3.4 3.4 0 0 0-1.26-.83c-.39-.15-.97-.33-2.05-.38C15.52 4 15.15 4 12 4Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.15-3.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
  </svg>
);

const MemberCircle = ({ member, index }: { member: TeamMember; index: number }) => {
  const accent = accentStyles[member.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <Link to={`/tym/${member.id}`} className="group block text-center">
        {/* Kruhová fotka / iniciály */}
        {member.photo ? (
          <img
            src={member.photo}
            alt={`Fotka – ${member.name}`}
            loading="lazy"
            className={`w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full object-cover border-2 border-white/15 ${accent.ring} shadow-xl ${accent.glow} transition-all duration-300 group-hover:scale-105`}
          />
        ) : (
          <div
            className={`w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full flex items-center justify-center text-4xl font-bold font-display text-white bg-gradient-to-br ${accent.avatar} border-2 border-white/15 ${accent.ring} shadow-xl ${accent.glow} transition-all duration-300 group-hover:scale-105`}
          >
            {getInitials(member.name)}
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-bold font-display mt-5">{member.name}</h2>
        <p className="text-gray-500 text-sm mt-1">{member.age} let</p>

        <span
          className={`inline-flex items-center gap-1.5 mt-3 text-sm ${accent.text}`}
        >
          <InstagramIcon />
          Instagram
        </span>

        <div className="flex items-center justify-center gap-1.5 mt-3 text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Zobrazit profil</span>
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
};

export const TeamPage = () => {
  return (
    <>
      <SEO
        title="Náš tým"
        description="Poznejte editory AsperroStudio – klikněte na profil a prohlédněte si jejich styl a ukázky práce."
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-20">
        <Container>
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
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
              Za každým videem stojí konkrétní člověk. Vyberte si editora a
              prohlédněte si jeho profil a ukázky práce.
            </p>
          </motion.div>

          {/* 3 kolečka editorů */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <MemberCircle key={member.id} member={member} index={index} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};
