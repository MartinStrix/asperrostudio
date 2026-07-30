// ============================================================
// AURORA – animované pozadí, které reaguje na scrollování
// - záře samy pomalu plují (CSS animace)
// - při scrollu se navíc rozestupují, otáčejí a mění odstín,
//   takže má stránka při posouvání hloubku (parallax efekt)
// Chceš-li vrátit původní video s dýmem, řekni si o zálohu :)
// ============================================================
import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const hueLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respektujeme uživatele s vypnutými animacemi
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        // Každá záře se hýbe jinou rychlostí a směrem → hloubka
        if (layer1.current) {
          layer1.current.style.transform =
            `translateY(${y * 0.18}px) rotate(${y * 0.02}deg)`;
        }
        if (layer2.current) {
          layer2.current.style.transform =
            `translateY(${y * -0.12}px) rotate(${y * -0.015}deg)`;
        }
        if (layer3.current) {
          layer3.current.style.transform =
            `translateY(${y * 0.08}px) scale(${1 + Math.min(y / 4000, 0.25)})`;
        }
        // Celé pozadí při scrollu jemně mění odstín barev
        if (hueLayer.current) {
          hueLayer.current.style.filter = `hue-rotate(${(y * 0.03) % 360}deg)`;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none bg-dark"
      aria-hidden="true"
      role="presentation"
    >
      <div ref={hueLayer} className="absolute inset-0 will-change-[filter]">
        {/* Vrstvy s parallaxem – uvnitř každé pluje záře sama od sebe */}
        <div ref={layer1} className="absolute inset-0 will-change-transform">
          <div className="aurora-blob aurora-1 w-[55vw] h-[55vw] top-[-15%] left-[-10%] bg-cyan-500/60" />
        </div>
        <div ref={layer2} className="absolute inset-0 will-change-transform">
          <div className="aurora-blob aurora-2 w-[50vw] h-[50vw] bottom-[-20%] right-[-10%] bg-pink-500/50" />
        </div>
        <div ref={layer3} className="absolute inset-0 will-change-transform">
          <div className="aurora-blob aurora-3 w-[45vw] h-[45vw] top-[30%] left-[35%] bg-purple-600/45" />
        </div>
      </div>

      {/* Jemné ztmavení pro čitelnost textu */}
      <div className="absolute inset-0 bg-dark/55" />

      {/* Vinětace – ztmavené okraje pro filmový dojem */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(10,10,10,0.75) 100%)',
        }}
      />
    </div>
  );
};
