// ============================================================
//  SCROLL TIMELINE – jemná dekorace na levém boku hlavní stránky
//  Nenápadná svislá "střihová" timeline: tenké tracky s klipy
//  a playhead. Scroll = scrubbing, timecode ubíhá dle pozice.
//  Bez panelu – volně splývá s pozadím webu, okraje se rozplývají.
//  Zobrazuje se jen na velkých obrazovkách (lg a víc).
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { useLowPerf } from '../../utils/performanceMode';

// Celková "délka projektu" na timecodu (ve vteřinách, 24 fps)
const PROJECT_SECONDS = 90;
const FPS = 24;

// Klipy na trackách: [track 0/1, začátek %, výška %, barva]
const CLIPS: { track: 0 | 1; top: number; height: number; className: string }[] = [
  { track: 0, top: 0,  height: 14, className: 'from-cyan-400/30 to-cyan-600/30' },
  { track: 0, top: 15, height: 9,  className: 'from-purple-400/30 to-purple-600/30' },
  { track: 0, top: 25, height: 17, className: 'from-pink-400/30 to-pink-600/30' },
  { track: 0, top: 43, height: 7,  className: 'from-cyan-300/30 to-cyan-500/30' },
  { track: 0, top: 51, height: 13, className: 'from-violet-400/30 to-violet-600/30' },
  { track: 0, top: 65, height: 10, className: 'from-pink-300/30 to-pink-500/30' },
  { track: 0, top: 76, height: 15, className: 'from-cyan-400/30 to-cyan-600/30' },
  { track: 0, top: 92, height: 8,  className: 'from-purple-300/30 to-purple-500/30' },
  // Track 1 = "audio" (tyrkysové bloky s vlnkou)
  { track: 1, top: 0,  height: 23, className: 'from-teal-400/25 to-teal-600/25' },
  { track: 1, top: 25, height: 17, className: 'from-teal-400/25 to-teal-600/25' },
  { track: 1, top: 43, height: 21, className: 'from-teal-400/25 to-teal-600/25' },
  { track: 1, top: 65, height: 26, className: 'from-teal-400/25 to-teal-600/25' },
  { track: 1, top: 92, height: 8,  className: 'from-teal-400/25 to-teal-600/25' },
];

// Formát timecodu HH:MM:SS:FF jako ve střižně
const formatTimecode = (progress: number): string => {
  const totalFrames = Math.round(progress * PROJECT_SECONDS * FPS);
  const frames = totalFrames % FPS;
  const totalSec = Math.floor(totalFrames / FPS);
  const seconds = totalSec % 60;
  const minutes = Math.floor(totalSec / 60) % 60;
  const hours = Math.floor(totalSec / 3600);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
};

export const ScrollTimeline = () => {
  const lowPerf = useLowPerf();
  const contentRef = useRef<HTMLDivElement>(null);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (lowPerf) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

        // Timeline je 2× vyšší než okno – posouváme ji pod playheadem
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${-progress * 50}%)`;
        }
        setTimecode(formatTimecode(progress));

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [lowPerf]);

  if (lowPerf || reducedMotion) return null;

  return (
    <div
      className="hidden lg:flex fixed left-3 xl:left-5 top-28 bottom-10 z-0 pointer-events-none flex-col w-9 opacity-70"
      aria-hidden="true"
    >
      {/* Timecode – jen jemný monospace text */}
      <span className="mb-3 font-mono text-[9px] tracking-tight text-white/30 tabular-nums text-center">
        {timecode}
      </span>

      {/* Timeline – bez panelu, okraje se rozplývají do stránky */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* Posouvaný obsah (2× výška) */}
        <div
          ref={contentRef}
          className="absolute inset-x-0 top-0 will-change-transform"
          style={{ height: '200%' }}
        >
          {/* Jemné dílky pravítka */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5 opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.4) 0 1px, transparent 1px 10px)',
            }}
          />

          {/* Tracky s klipy */}
          {CLIPS.map((clip, index) => (
            <div
              key={index}
              className={`absolute rounded-[2px] bg-gradient-to-b ${clip.className}`}
              style={{
                left: clip.track === 0 ? '30%' : '72%',
                width: clip.track === 0 ? '32%' : '18%',
                top: `${clip.top}%`,
                height: `${clip.height}%`,
                // "vlnka" u audio klipů
                backgroundImage:
                  clip.track === 1
                    ? 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0 2px, transparent 2px 6px)'
                    : undefined,
              }}
            />
          ))}
        </div>

        {/* Playhead – tenká linka pevně uprostřed */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <div className="h-px bg-red-500/50" />
        </div>
      </div>
    </div>
  );
};
