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
          <BackdropFrames />
          {/* Jeden node uprostřed vpravo, ať stránka nepůsobí prázdně */}
          <div className="hidden sm:block absolute top-[34%] right-[8%] lg:right-[14%] opacity-80">
            <div className="w-64 rounded-xl border-2 border-cyan-400/40 bg-dark-100/70 shadow-2xl shadow-cyan-500/10 rotate-[-3deg]">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                <span className="ml-2 font-mono text-[11px] tracking-widest text-gray-400 uppercase">MediaIn1</span>
              </div>
              <div className="h-28 m-3 rounded-md bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10 border border-white/5" />
            </div>
            <div className="mx-auto w-0.5 h-8 bg-gradient-to-b from-cyan-400/60 to-transparent" />
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

      {/* Akty příběhu */}
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
