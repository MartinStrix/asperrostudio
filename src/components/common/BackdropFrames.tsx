// ============================================================
//  OKÉNKA V POZADÍ – vzdálené rámečky jako na hlavní stránce
//  Čistě statické CSS prvky (žádná zátěž), používá je aurora
//  pozadí na podstránkách i úsporný režim.
// ============================================================

const FRAMES: {
  top: string;
  left: string;
  w: number;      // šířka v rem
  ratio: number;  // poměr stran (v = w * ratio)
  rot: number;    // rotace ve stupních
  tone: 'white' | 'cyan' | 'pink';
  opacity: number;
  bar?: boolean;  // horní lišta okna
  hideMobile?: boolean;
}[] = [
  { top: '6%',  left: '12%', w: 11, ratio: 0.62, rot: -6, tone: 'white', opacity: 0.55, bar: true },
  { top: '13%', left: '68%', w: 15, ratio: 0.6,  rot: 5,  tone: 'cyan',  opacity: 0.5,  bar: true },
  { top: '30%', left: '84%', w: 8,  ratio: 0.66, rot: -4, tone: 'white', opacity: 0.45, hideMobile: true },
  { top: '44%', left: '5%',  w: 13, ratio: 0.58, rot: 4,  tone: 'white', opacity: 0.5,  bar: true, hideMobile: true },
  { top: '58%', left: '74%', w: 12, ratio: 0.62, rot: -5, tone: 'pink',  opacity: 0.5,  bar: true },
  { top: '68%', left: '28%', w: 7,  ratio: 0.7,  rot: 6,  tone: 'white', opacity: 0.4,  hideMobile: true },
  { top: '80%', left: '58%', w: 10, ratio: 0.6,  rot: -3, tone: 'white', opacity: 0.45, bar: true, hideMobile: true },
  { top: '86%', left: '10%', w: 9,  ratio: 0.64, rot: 5,  tone: 'cyan',  opacity: 0.4 },
];

const TONE_BORDER = {
  white: 'border-white/[0.08]',
  cyan: 'border-cyan-400/[0.14]',
  pink: 'border-pink-400/[0.13]',
} as const;

export const BackdropFrames = () => (
  <div
    className="absolute inset-0 overflow-hidden"
    aria-hidden="true"
    style={{ perspective: '1100px' }}
  >
    {FRAMES.map((f, i) => (
      <div
        key={i}
        className={`backdrop-frame absolute rounded-lg border ${TONE_BORDER[f.tone]} ${
          f.hideMobile ? 'hidden md:block' : ''
        }`}
        style={
          {
            top: f.top,
            left: f.left,
            width: `${f.w}rem`,
            height: `${f.w * f.ratio}rem`,
            opacity: f.opacity,
            '--rot': `${f.rot}deg`,
            animationDuration: `${22 + i * 3.5}s`,
            animationDelay: `${-i * 4}s`,
          } as React.CSSProperties
        }
      >
        {f.bar && (
          <div className="absolute top-0 inset-x-0 h-4 border-b border-inherit flex items-center gap-1 px-2">
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span className="w-1 h-1 rounded-full bg-white/10" />
          </div>
        )}
      </div>
    ))}
  </div>
);
