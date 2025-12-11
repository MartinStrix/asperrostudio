import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  to: string;
  videoSrc?: string;
  imageSrc?: string;
  icon?: React.ReactNode;
  comingSoon?: boolean;
}

export const CategoryCard = ({
  title,
  subtitle,
  to,
  videoSrc,
  imageSrc,
  icon,
  comingSoon = false,
}: CategoryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const cardContent = (
    <motion.div
      ref={cardRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Media */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-100 to-dark-200" />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        comingSoon
          ? 'bg-gradient-to-t from-gray-500/20 to-transparent'
          : 'bg-gradient-to-t from-cyan-400/20 via-pink-500/10 to-transparent'
      }`} />

      {/* Border glow */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        comingSoon
          ? 'shadow-[inset_0_0_30px_rgba(156,163,175,0.3)]'
          : 'shadow-[inset_0_0_30px_rgba(0,217,255,0.3)]'
      }`} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" style={{ transform: 'translateZ(30px)' }}>
        {icon && (
          <motion.div
            className={`w-16 h-16 mb-4 flex items-center justify-center rounded-full ${
              comingSoon
                ? 'bg-gray-500/20 text-gray-400'
                : 'bg-gradient-to-br from-cyan-400 to-pink-500 text-white'
            }`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {icon}
          </motion.div>
        )}

        <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-2">
          {title}
        </h3>

        {subtitle && (
          <p className="text-gray-400 text-sm md:text-base">
            {subtitle}
          </p>
        )}

        {comingSoon && (
          <span className="mt-3 px-4 py-1 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-400 text-sm">
            Brzy
          </span>
        )}

        {/* Arrow indicator */}
        {!comingSoon && (
          <motion.div
            className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, transparent 50%)',
        }}
        animate={{
          x: isHovered ? ['100%', '-100%'] : '-100%',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </motion.div>
  );

  if (comingSoon) {
    return <div className="block">{cardContent}</div>;
  }

  return (
    <Link to={to} className="block">
      {cardContent}
    </Link>
  );
};
