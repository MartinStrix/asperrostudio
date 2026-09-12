// ============================================================
//  POZADÍ PODSTRÁNEK – plovoucí "klipy" v prostoru
//  Inspirováno tunelem hlavní stránky, ale samostatně animované
//  (pomalé plutí, žádná vazba na scroll). Čisté CSS.
// ============================================================

const CLIPS: {
  top: string;
  left: string;
  w: number;       // šířka v rem
  rot: number;     // natočení
  tone: 'teal' | 'wine' | 'dark';
  label: string;
  rec?: boolean;   // červená kontrolka nahrávání
  opacity: number;
  hideMobile?: boolean;
}[] = [
  { top: '8%',  left: '6%',  w: 15, rot: -5, tone: 'wine', label: 'REEL 9:16 · SOCIAL',  opacity: 0.85, hideMobile: false },
  { top: '20%', left: '38%', w: 8,  rot: 4,  tone: 'teal', label: 'B-ROLL · 60 FPS',     opacity: 0.7,  hideMobile: true },
  { top: '13%', left: '72%', w: 12, rot: -3, tone: 'dark', label: 'AERIAL · DRON', rec: true, opacity: 0.8 },
  { top: '42%', left: '20%', w: 10, rot: 3,  tone: 'wine', label: 'TITULKY · CZ/EN',     opacity: 0.6,  hideMobile: true },
  { top: '52%', left: '55%', w: 7,  rot: -4, tone: 'dark', label: 'MAKRO · DETAIL',      opacity: 0.55, hideMobile: true },
  { top: '48%', left: '78%', w: 13, rot: 2,  tone: 'teal', label: 'TIMELAPSE · 2 s',     opacity: 0.75 },
  { top: '72%', left: '10%', w: 12, rot: 4,  tone: 'teal', label: 'SOUND MIX · −14 LUFS', opacity: 0.8 },
  { top: '80%', left: '62%', w: 9,  rot: -3, tone: 'wine', label: 'GRADE · REC.709',     opacity: 0.6,  hideMobile: true },
  { top: '86%', left: '84%', w: 14, rot: -6, tone: 'dark', label: 'PRODUKT · MACRO',     opacity: 0.75, hideMobile: true },
];

const TONE_BG = {
  teal: 'linear-gradient(135deg, rgba(13,58,64,0.85), rgba(6,20,24,0.9))',
  wine: 'linear-gradient(135deg, rgba(58,22,44,0.85), rgba(22,8,18,0.9))',
  dark: 'linear-gradient(135deg, rgba(24,26,32,0.9), rgba(10,10,12,0.92))',
} as const;

export const BackdropFrames = () => (
  <div
    className="absolute inset-0 overflow-hidden"
    aria-hidden="true"
    style={{ perspective: '1100px' }}
  >
    {/* Podlahová mřížka v perspektivě */}
    <div
      className="absolute inset-x-[-20%] bottom-0 h-[42%] opacity-[0.16]"
      style={{
        background:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 120px), repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0 1px, transparent 1px 64px)',
        transform: 'rotateX(62deg)',
        transformOrigin: 'bottom center',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent 85%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent 85%)',
      }}
    />

    {CLIPS.map((c, i) => (
      <div
        key={i}
        className={`backdrop-frame absolute rounded-lg border border-white/[0.07] shadow-2xl shadow-black/50 ${
          c.hideMobile ? 'hidden md:block' : ''
        }`}
        style={
          {
            top: c.top,
            left: c.left,
            width: `${c.w}rem`,
            height: `${c.w * 0.58}rem`,
            opacity: c.opacity,
            background: TONE_BG[c.tone],
            '--rot': `${c.rot}deg`,
            animationDuration: `${24 + i * 3.5}s`,
            animationDelay: `${-i * 4}s`,
          } as React.CSSProperties
        }
      >
        {/* jemné řádkování obrazovky */}
        <div
          className="absolute inset-0 rounded-lg opacity-40"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px)',
          }}
        />
        {c.rec && (
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500/90" />
        )}
        <span className="absolute bottom-1.5 left-2 font-mono text-[9px] tracking-[0.14em] text-white/45 whitespace-nowrap">
          {c.label}
        </span>
      </div>
    ))}
  </div>
);
