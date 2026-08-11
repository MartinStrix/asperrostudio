// ============================================================
//  SCROLL TIMELINE – dekorace na boku hlavní stránky
//  Svislá "střihová" timeline ve stylu NLE (DaVinci):
//  pravítko s timecodem, barevné klipy na trackách a playhead.
//  Scrollování funguje jako scrubbing – timeline se posouvá
//  pod playheadem a timecode ubíhá podle pozice na stránce.
//  Zobrazuje se jen na velkých obrazovkách (lg a víc).
// ============================================================
import { useEffect, useRef, useState } from 'react';

// Celková "délka projektu" zobrazená na timecodu (ve vteřinách, 24 fps)
const PROJECT_SECONDS = 90;
const FPS = 24;

// Klipy na trackách: [track 0/1, začátek %, výška %, barva]
const CLIPS: { track: 0 | 1; top: number; height: number; className: string }[] = [
  { track: 0, top: 0,  height: 14, className: 'from-cyan-400/80 to-cyan-600/80' },
  { track: 0, top: 15, height: 9,  className: 'from-purple-400/80 to-purple-600/80' },
  { track: 0, top: 25, height: 17, className: 'from-pink-400/80 to-pink-600/80' },
  { track: 0, top: 43, height: 7,  className: 'from-cyan-300/80 to-cyan-500/80' },
  { track: 0, top: 51, height: 13, className: 'from-violet-400/80 to-violet-600/80' },
  { track: 0, top: 65, height: 10, className: 'from-pink-300/80 to-pink-500/80' },
  { track: 0, top: 76, height: 15, className: 'from-cyan-400/80 to-cyan-600/80' },
  { track: 0, top: 92, height: 8,  className: 'from-purple-300/80 to-purple-500/80' },
  // Track 1 = "audio" (tyrkysové bloky s vlnkou)
  { track: 1, top: 0,  height: 23, className: 'from-teal-400/70 to-teal-600/70' },
  { track: 1, top: 25, height: 17, className: 'from-teal-400/70 to-teal-600/70' },
  { track: 1, top: 43, height: 21, className: 'from-teal-400/70 to-teal-600/70' },
  { track: 1, top: 65, height: 26, className: 'from-teal-400/70 to-teal-600/70' },
  { track: 1, top: 92, height: 8,  className: 'from-teal-400/70 to-teal-600/70' },
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
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
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      className="hidden lg:flex fixed right-4 xl:right-6 top-24 bottom-8 z-20 pointer-events-none flex-col items-stretch w-20"
      aria-hidden="true"
    >
      {/* Timecode displej */}
      <div className="mb-2 rounded-lg bg-dark-100/90 border border-white/15 px-1.5 py-1 text-center">
        <span className="font-mono text-[10px] tracking-tight text-cyan-300 tabular-nums">
          {timecode}
        </span>
      </div>

      {/* Okno timeline */}
      <div className="relative flex-1 rounded-xl bg-dark-100/70 backdrop-blur-sm border border-white/10 overflow-hidden">
        {/* Posouvaný obsah (2× výška okna) */}
        <div
          ref={contentRef}
          className="absolute inset-x-0 top-0 will-change-transform"
          style={{ height: '200%' }}
        >
          {/* Pravítko s dílky */}
          <div
            className="absolute left-0 top-0 bottom-0 w-4 opacity-70"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.35) 0 1px, transparent 1px 8px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.7) 0 1px, transparent 1px 40px)',
            }}
          />

          {/* Tracky s klipy */}
          {CLIPS.map((clip, index) => (
            <div
              key={index}
              className={`absolute rounded-[3px] bg-gradient-to-b ${clip.className} border border-white/20`}
              style={{
                left: clip.track === 0 ? '38%' : '72%',
                width: clip.track === 0 ? '28%' : '20%',
                top: `${clip.top}%`,
                height: `${clip.height}%`,
                // "vlnka" u audio klipů
                backgroundImage:
                  clip.track === 1
                    ? 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.35) 0 2px, transparent 2px 5px)'
                    : undefined,
              }}
            />
          ))}
        </div>

        {/* Playhead – pevně uprostřed, timeline jede pod ním */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <div className="h-px bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
          <div
            className="absolute -top-[5px] left-0 w-0 h-0"
            style={{
              borderTop: '5px solid rgb(239,68,68)',
              borderRight: '6px solid transparent',
            }}
          />
        </div>
      </div>
    </div>
  );
};
