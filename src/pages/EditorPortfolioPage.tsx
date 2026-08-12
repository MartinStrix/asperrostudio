import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DevicePhoneMobileIcon,
  FilmIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { PageBadge } from '../components/common/PageBadge';
import { VideoEmbed } from '../components/common/VideoEmbed';
import { teamMembers, VideoCategory } from '../data/team';

// ============================================================
//  PORTFOLIO EDITORA – videa rozdělená do 3 kategorií
// ============================================================

const CATEGORIES: {
  id: VideoCategory;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'short',
    name: 'Krátké formáty',
    desc: 'Reels, TikTok, Shorts',
    icon: DevicePhoneMobileIcon,
  },
  {
    id: 'long',
    name: 'Dlouhé formáty',
    desc: 'YouTube, spoty, filmy',
    icon: FilmIcon,
  },
  {
    id: 'motion',
    name: 'Motion grafika',
    desc: 'Animace a efekty',
    icon: SparklesIcon,
  },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const EditorPortfolioPage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const member = teamMembers.find((m) => m.id === memberId);
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('short');

  if (!member) {
    return <Navigate to="/portfolio" replace />;
  }

  const videos = member.videos.filter((v) => v.category === activeCategory);

  return (
    <>
      <SEO
        title={`Portfolio – ${member.name}`}
        description={`Videa editora ${member.name} z AsperroStudio – krátké formáty, dlouhé formáty a motion grafika.`}
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-20">
        {/* Background – jemné záře ve firemních barvách */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[128px]" />
        </div>

        <Container className="relative z-10">
          {/* Zpět */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Zpět na portfolio
            </Link>
          </motion.div>

          {/* Záhlaví s editorem */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageBadge icon={<FilmIcon className="w-4 h-4" />} label="Portfolio" />
            <div className="flex items-center justify-center gap-4 mb-3">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={`Fotka – ${member.name}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/15"
                />
              ) : (
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold font-display text-white bg-gradient-to-br from-cyan-400 to-pink-500 border-2 border-white/15">
                  {getInitials(member.name)}
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold font-display text-left">
                {member.name}
              </h1>
            </div>
            <p className="text-gray-400">
              Vyberte kategorii a prohlédněte si ukázky práce.{' '}
              <Link to={`/tym/${member.id}`} className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                Profil editora
              </Link>
            </p>
          </motion.div>

          {/* 3 kategorie */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {CATEGORIES.map((cat, index) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = member.videos.filter((v) => v.category === cat.id).length;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-5 rounded-2xl border text-center transition-all duration-300 ${
                    isActive
                      ? 'bg-white/10 border-cyan-400/60'
                      : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div
                    className={`w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-cyan-400 to-pink-500 text-white'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="block font-bold font-display">{cat.name}</span>
                  <span className="block text-gray-500 text-xs mt-0.5">
                    {cat.desc} · {count} {count === 1 ? 'video' : count < 5 ? 'videa' : 'videí'}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Videa vybrané kategorie */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.map((video) => (
                    <div key={`${video.url}-${video.title}`}>
                      <VideoEmbed url={video.url} title={video.title} />
                      <p className="text-gray-400 text-sm mt-2">{video.title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-10">
                  Ukázky v této kategorii brzy doplníme.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

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
              Chci konzultaci zdarma
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </Container>
      </div>
    </>
  );
};
