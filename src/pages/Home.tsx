import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLowPerf } from '../utils/performanceMode';
import { initFusionFlow } from '../lib/fusionFlowCore';
import { BackdropFrames } from '../components/common/BackdropFrames';
import '../styles/fusion-flow.css';

// ============================================================
//  HLAVNÍ STRÁNKA – průchod Fusion node stromem (scroll)
//  Texty aktů upravíš tady; choreografii, 3D scénu, inspektor
//  a node graf dole řídí src/lib/fusionFlowCore.js.
//  V úsporném režimu se 3D nespouští a texty jsou čitelné.
// ============================================================

export const Home = () => {
  const lowPerf = useLowPerf();

  useEffect(() => {
    if (lowPerf) return;
    const cleanup = initFusionFlow();
    return cleanup;
  }, [lowPerf]);

  return (
    <>
      <SEO
        title="AsperroStudio – videa, která prodávají váš brand"
        description="Profesionální videotvorba a postprodukce v DaVinci Resolve. Projděte si náš Fusion strom — od materiálu po finální kompozit. Konzultace zdarma, reels od 250 Kč."
      />

      {/* Podklad + 3D plátno + zrno */}
      <div className="ambient" aria-hidden="true" />
      {lowPerf && (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          {/* Statické záře navíc, ať je scéna plná i bez 3D */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(50vw 50vw at 15% 25%, rgba(34,211,238,0.10), transparent 60%), radial-gradient(45vw 45vw at 85% 70%, rgba(244,114,182,0.10), transparent 60%), radial-gradient(40vw 40vw at 55% 95%, rgba(192,132,252,0.07), transparent 60%)',
            }}
          />
          <BackdropFrames />

          {/* Statický Fusion strom po pravé straně */}
          <div className="hidden xl:flex absolute top-28 bottom-16 right-[4%] flex-col items-center justify-between opacity-60">
            {/* MediaIn1 – s náhledem */}
            <div className="w-56 lg:w-64 rounded-xl border-2 border-cyan-400/45 bg-dark-100/75 shadow-2xl shadow-cyan-500/10 rotate-[-2deg] self-end">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-[11px] tracking-widest text-gray-400 uppercase">MediaIn1</span>
                <span className="ml-auto font-mono text-[10px] text-gray-600">01/08</span>
              </div>
              <div className="h-24 m-3 rounded-md bg-gradient-to-br from-cyan-500/12 via-transparent to-pink-500/12 border border-white/5" />
            </div>
            <span className="w-0.5 flex-1 min-h-[1.25rem] bg-gradient-to-b from-cyan-400/50 via-purple-400/40 to-purple-400/50" />

            {/* ColorCor1 – parametry */}
            <div className="w-48 lg:w-56 rounded-xl border-2 border-purple-400/45 bg-dark-100/75 shadow-2xl shadow-purple-500/10 rotate-[2deg] self-start">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-[11px] tracking-widest text-gray-400 uppercase">ColorCor1</span>
              </div>
              <div className="px-3 py-2.5 space-y-2">
                <span className="block h-1 rounded-full bg-gradient-to-r from-cyan-400/50 to-transparent w-4/5" />
                <span className="block h-1 rounded-full bg-gradient-to-r from-purple-400/50 to-transparent w-3/5" />
                <span className="block h-1 rounded-full bg-gradient-to-r from-pink-400/50 to-transparent w-2/3" />
              </div>
            </div>
            <span className="w-0.5 flex-1 min-h-[1.25rem] bg-gradient-to-b from-purple-400/50 via-pink-400/40 to-pink-400/50" />

            {/* Merge1 – porty */}
            <div className="relative w-44 lg:w-52 rounded-xl border-2 border-pink-400/45 bg-dark-100/75 shadow-2xl shadow-pink-500/10 rotate-[-1.5deg] self-end">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-[11px] tracking-widest text-gray-400 uppercase">Merge1</span>
              </div>
              <span className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink-400/80 ring-4 ring-dark" />
              <span className="absolute -right-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink-400/80 ring-4 ring-dark" />
            </div>
            <span className="w-0.5 flex-1 min-h-[1.25rem] bg-gradient-to-b from-pink-400/50 to-cyan-400/50" />

            {/* MediaOut1 */}
            <div className="w-40 lg:w-48 rounded-xl border-2 border-cyan-400/45 bg-dark-100/75 shadow-2xl shadow-cyan-500/10 rotate-[1.5deg] self-start">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-[11px] tracking-widest text-gray-400 uppercase">MediaOut1</span>
                <span className="ml-auto font-mono text-[10px] text-gray-600">✓</span>
              </div>
            </div>
          </div>

          {/* Mobil: menší dvojice nodů dole */}
          <div className="sm:hidden absolute bottom-10 inset-x-6 flex items-center justify-center gap-0 opacity-80">
            <div className="w-32 rounded-lg border-2 border-cyan-400/45 bg-dark-100/75 px-2.5 py-1.5 rotate-[-2deg]">
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">MediaIn1</span>
            </div>
            <span className="h-0.5 w-8 bg-gradient-to-r from-cyan-400/50 to-pink-400/50" />
            <div className="w-32 rounded-lg border-2 border-pink-400/45 bg-dark-100/75 px-2.5 py-1.5 rotate-[2deg]">
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">MediaOut1</span>
            </div>
          </div>
        </div>
      )}
      {!lowPerf && <canvas id="stage" />}
      {!lowPerf && <div className="grain" aria-hidden="true" />}
      {!lowPerf && (
        <div className="fallback">3D vrstva se nenačetla — obsah zůstává čitelný</div>
      )}

      {/* Nápověda (mizí po prvním scrollu) */}
      {!lowPerf && (
        <div className="topbar" aria-hidden="true">
          <div />
          <div id="tip">Scroll prochází node stromem — uzly dole jde chytit a táhnout</div>
        </div>
      )}

      {/* Fusion viewer – aktuální uzel */}
      {!lowPerf && (
        <div className="viewer" aria-hidden="true">
          <s />
          <b id="vwNode">MediaIn1</b>
          <span id="vwState">RGB · 1:1</span>
        </div>
      )}

      {/* Inspektor kroku */}
      {!lowPerf && (
        <aside className="inspector" id="inspector" aria-hidden="true">
          <div className="ins-head">
            <span className="step" id="insStep">Krok 01/08</span>
            <span id="insNode">MediaIn1</span>
          </div>
          <h4 className="ins-title" id="insTitle">Příprava materiálu</h4>
          <p className="ins-desc" id="insDesc" />
          <p className="ins-fact">
            <b>Zajímavost z praxe</b>
            <span id="insFact" />
          </p>
        </aside>
      )}

      {/* Akty příběhu (jen s animacemi — v úsporném režimu je níže kompaktní verze) */}
      {!lowPerf && (
      <main className="track" id="track">
        <section className="act" data-from="-0.02" data-to="0.085">
          <div className="inner">
            <p className="eyebrow">Fusion · Compositing</p>
            <h1>
              Obraz se nestaví<br />
              <span className="grad">jedním tahem</span>
            </h1>
            <p className="lede">
              Každý záběr, který od nás odchází, prošel stromem uzlů. Tohle je
              jeden z nich — projděte si ho scrollem.
            </p>
            <p className="act-note">
              Každý projekt začíná <b>konzultací zdarma</b> — a reels už od
              250 Kč za video.
            </p>
          </div>
        </section>

        <section className="act right" data-from="0.115" data-to="0.285">
          <div className="inner">
            <p className="eyebrow purple">ColorCorrector1</p>
            <h2>
              Grade není filtr<br />přes hotové video
            </h2>
            <p className="lede">
              Barvu řešíme na začátku stromu, ne na konci. Balance, křivky
              a sytost sedí dřív, než se do kompozitu pustí cokoliv dalšího.
            </p>
            <p className="act-note">
              Střih, grading, VFX i zvuk vzniká <b>ručně</b> v DaVinci Resolve
              Studio — hollywoodském standardu postprodukce.{' '}
              <Link className="note-link" to="/o-nas">Jak pracujeme →</Link>
            </p>
          </div>
        </section>

        <section className="act" data-from="0.315" data-to="0.485">
          <div className="inner">
            <p className="eyebrow">DeltaKeyer1 · Background1</p>
            <h2>
              Klíč, který<br />drží i na vlasech
            </h2>
            <p className="lede">
              Delta Keyer, čistá matte a plát vygenerovaný pod ním. Když se
              pozadí musí změnit den před odevzdáním, měníme jeden uzel.
            </p>
            <p className="act-note">
              Materiál si natočíme sami — <b>kamera i dron</b>. Vyjedeme
              prakticky kamkoliv.
            </p>
          </div>
        </section>

        <section className="act right" data-from="0.515" data-to="0.685">
          <div className="inner">
            <p className="eyebrow pink">Merge1 · Glow1</p>
            <h2>
              Merge drží<br />celý strom
            </h2>
            <p className="lede">
              Vrstvy se skládají v jednom uzlu, glow se počítá až nad
              výsledkem. Proto jde světlo doladit, aniž bychom sahali na klíč.
            </p>
            <p className="act-note">
              Jdeme s dobou — AI nám pomáhá s rutinou a organizací.
              <b> Vaše video je ale čistě naše práce.</b>
            </p>
          </div>
        </section>

        <section className="act" data-from="0.715" data-to="0.885">
          <div className="inner">
            <p className="eyebrow purple">Text+1</p>
            <h2>
              Titulky patří<br />do kompozitu
            </h2>
            <p className="lede">
              Ne do střihu na poslední chvíli. Text sedí ve stejném prostoru
              jako záběr, takže reaguje na světlo i rozostření.
            </p>
            <p className="act-note">
              Za každým videem stojí <b>konkrétní člověk</b> se svým stylem.{' '}
              <Link className="note-link" to="/portfolio">Otevřít portfolio →</Link>
            </p>
          </div>
        </section>

        <section className="act center" data-from="0.915" data-to="1.02">
          <div className="inner">
            <p className="eyebrow">MediaOut1</p>
            <h2>
              Pojďme postavit<br />váš strom
            </h2>
            <p className="lede">
              Přineste záběry, nebo je natočíme. Odejde vám hotový kompozit,
              ne rendery k dodělání. Konzultace je zdarma a nezávazná —
              neplatíte nic.
            </p>
            <div className="cta">
              <Link className="btn primary" to="/kontakt">Nezávazná poptávka</Link>
              <Link className="btn" to="/cenik">Ceník od 250 Kč</Link>
              <Link className="btn" to="/o-nas">Jak pracujeme</Link>
            </div>
          </div>
        </section>
      </main>
      )}


      {/* Úsporný režim: obsah poskládaný kompaktně pod sebou */}
      {lowPerf && (
        <div className="relative z-10 pt-28 pb-16 px-5">
          <div className="max-w-4xl mx-auto xl:mr-[24rem] 2xl:mx-auto">
            {/* Hero */}
            <p className="font-mono text-xs tracking-[0.22em] uppercase text-cyan-400 mb-4">
              Fusion · Compositing
            </p>
            <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-5">
              Obraz se nestaví{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                jedním tahem
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mb-3">
              Každý záběr, který od nás odchází, prošel stromem uzlů —
              od materiálu přes grade a klíč až po finální kompozit.
            </p>
            <p className="text-gray-500 text-sm max-w-xl mb-7">
              Každý projekt začíná <b className="text-gray-300">konzultací zdarma</b> —
              a reels už od 250 Kč za video.
            </p>
            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                to="/kontakt"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 transition-all"
              >
                Nezávazná poptávka
              </Link>
              <Link
                to="/cenik"
                className="px-6 py-3 rounded-xl font-semibold border-2 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 transition-all"
              >
                Ceník od 250 Kč
              </Link>
              <Link
                to="/o-nas"
                className="px-6 py-3 rounded-xl font-semibold border-2 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 transition-all"
              >
                Jak pracujeme
              </Link>
            </div>

            {/* Kroky stromu jako karty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-purple-400 mb-2">ColorCorrector1</p>
                <h2 className="text-xl font-bold font-display mb-2">Grade není filtr přes hotové video</h2>
                <p className="text-gray-400 text-sm mb-3">
                  Barvu řešíme na začátku stromu, ne na konci. Balance, křivky
                  a sytost sedí dřív, než se do kompozitu pustí cokoliv dalšího.
                </p>
                <p className="text-gray-500 text-xs">
                  Střih, grading, VFX i zvuk vzniká <b className="text-gray-400">ručně</b> v DaVinci
                  Resolve Studio.{' '}
                  <Link className="text-cyan-400 hover:text-white transition-colors" to="/o-nas">Jak pracujeme →</Link>
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan-400 mb-2">DeltaKeyer1 · Background1</p>
                <h2 className="text-xl font-bold font-display mb-2">Klíč, který drží i na vlasech</h2>
                <p className="text-gray-400 text-sm mb-3">
                  Delta Keyer, čistá matte a plát vygenerovaný pod ním. Když se
                  pozadí musí změnit den před odevzdáním, měníme jeden uzel.
                </p>
                <p className="text-gray-500 text-xs">
                  Materiál si natočíme sami — <b className="text-gray-400">kamera i dron</b>.
                  Vyjedeme prakticky kamkoliv.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-pink-400 mb-2">Merge1 · Glow1</p>
                <h2 className="text-xl font-bold font-display mb-2">Merge drží celý strom</h2>
                <p className="text-gray-400 text-sm mb-3">
                  Vrstvy se skládají v jednom uzlu, glow se počítá až nad
                  výsledkem. Světlo jde doladit, aniž bychom sahali na klíč.
                </p>
                <p className="text-gray-500 text-xs">
                  Jdeme s dobou — AI pomáhá s rutinou.
                  <b className="text-gray-400"> Vaše video je ale čistě naše práce.</b>
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-purple-400 mb-2">Text+1</p>
                <h2 className="text-xl font-bold font-display mb-2">Titulky patří do kompozitu</h2>
                <p className="text-gray-400 text-sm mb-3">
                  Ne do střihu na poslední chvíli. Text sedí ve stejném prostoru
                  jako záběr, takže reaguje na světlo i rozostření.
                </p>
                <p className="text-gray-500 text-xs">
                  Za každým videem stojí <b className="text-gray-400">konkrétní člověk</b>.{' '}
                  <Link className="text-cyan-400 hover:text-white transition-colors" to="/portfolio">Otevřít portfolio →</Link>
                </p>
              </div>
            </div>

            {/* Závěr */}
            <div className="mt-12 p-7 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan-400 mb-2">MediaOut1</p>
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">Pojďme postavit váš strom</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-6">
                Přineste záběry, nebo je natočíme. Odejde vám hotový kompozit,
                ne rendery k dodělání. Konzultace je zdarma a nezávazná.
              </p>
              <Link
                to="/kontakt"
                className="inline-block px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 transition-all"
              >
                Nezávazná poptávka
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Node graf dole – scrubbing scrollu */}
      {!lowPerf && (
        <section className="strip" id="strip" aria-label="Node graph">
          <div className="strip-bar">
            <div className="now" id="nowNode">MediaIn<b>1</b></div>
            <div className="role" id="nowRole">Zdrojový plát</div>
            <div className="meta">8 nodes · Fusion comp</div>
          </div>
          <div
            className="graph"
            id="graph"
            tabIndex={0}
            role="slider"
            aria-label="Pozice ve stromu"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          >
            <div className="gwrap" id="gwrap">
              <div className="playhead" id="playhead" style={{ left: 0 }} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
