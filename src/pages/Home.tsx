import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLowPerf } from '../utils/performanceMode';
import { initFusionFlow } from '../lib/fusionFlowCore';
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
              ne rendery k dodělání.
            </p>
            <div className="cta">
              <Link className="btn primary" to="/kontakt">Nezávazná poptávka</Link>
              <Link className="btn" to="/cenik">Ceník od 250 Kč</Link>
              <Link className="btn" to="/o-nas">Jak pracujeme</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Epilog – AsperroStudio v kostce */}
      <section className="epilogue" id="studio">
        <h3>AsperroStudio v kostce</h3>
        <p>
          Tvůrčí studio tří lidí, které natáčí, stříhá a dodává videa
          připravená prodávat. Profesionální přístup, poctivé řemeslo
          a ceny, které dávají smysl.
        </p>
        <dl className="notes">
          <div className="note">
            <dt>Konzultace zdarma</dt>
            <dd>
              Každý projekt začíná <b>nezávaznou konzultací</b> — probereme
              záměr, možnosti i cenu. Neplatíte nic.
              <br />
              <Link className="note-link" to="/kontakt">Chci konzultaci →</Link>
            </dd>
          </div>
          <div className="note">
            <dt>Ceník od 250 Kč</dt>
            <dd>
              Orientační cenu si naklikáte <b>za minutu</b> v kalkulačce.
              Reels už od 250 Kč za video.
              <br />
              <Link className="note-link" to="/cenik">Spočítat cenu →</Link>
            </dd>
          </div>
          <div className="note">
            <dt>Kamera &amp; dron</dt>
            <dd>
              Vyjedeme prakticky kamkoliv — <b>stabilní záběry</b> z ruky
              i <b>letecké průlety</b> dronem, které videu dodají velkolepost.
            </dd>
          </div>
          <div className="note">
            <dt>DaVinci Resolve</dt>
            <dd>
              Střih, color grading, VFX i zvuk vzniká <b>ručně</b> v DaVinci
              Resolve Studio — hollywoodském standardu postprodukce.
              <br />
              <Link className="note-link" to="/o-nas">Jak pracujeme →</Link>
            </dd>
          </div>
          <div className="note">
            <dt>AI s rozumem</dt>
            <dd>
              Jdeme s dobou — AI nám pomáhá s rutinou a organizací.
              <b> Vaše video je ale čistě naše práce.</b> Je to naše vizitka.
            </dd>
          </div>
          <div className="note">
            <dt>Tým &amp; portfolio</dt>
            <dd>
              Za každým videem stojí konkrétní člověk se svým stylem.
              Prohlédněte si služby i ukázky editorů.
              <br />
              <Link className="note-link" to="/portfolio">Otevřít portfolio →</Link>
            </dd>
          </div>
        </dl>
      </section>

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
