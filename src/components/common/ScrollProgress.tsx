import { useEffect, useRef } from 'react';

// ============================================================
//  ČÁRA PRŮBĚHU SCROLLU – gradientová linka u horního okraje
//  (stejná jako na hlavní stránce; tam ji řeší landing sám,
//  proto se na "/" nezobrazuje – viz App.tsx)
// ============================================================

export const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = barRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 pointer-events-none"
    />
  );
};
