import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLowPerf } from '../utils/performanceMode';
import { initHeroRig } from '../lib/heroRigCore';
import '../styles/hero-rig.css';

// ============================================================
//  HLAVNÍ STRÁNKA – 3D hero řízené scrollem
//  Texty aktů upravíš přímo tady; choreografii řídí
//  src/lib/heroRigCore.js. V úsporném režimu se 3D vrstva
//  vůbec nespouští a texty zůstávají čitelné pod sebou.
// ============================================================

export const Home = () => {
  const lowPerf = useLowPerf();

  useEffect(() => {
    if (lowPerf) return;
    const cleanup = initHeroRig();
    return cleanup;
  }, [lowPerf]);

  return (
    <>
      <SEO
        title="AsperroStudio – videa, která prodávají váš brand"
        description="Profesionální videotvorba: střih, postprodukce a obsah pro sociální sítě, firmy i svatby. Konzultace zdarma, reels už od 250 Kč."
      />

      {/* Podklad + zrno + 3D plátno */}
      <div className="ambient" aria-hidden="true" />
      {!lowPerf && <canvas id="stage" />}
      {!lowPerf && <div className="grain" aria-hidden="true" />}
      {!lowPerf && (
        <div className="fallback">3D vrstva se nenačetla — obsah zůstává čitelný</div>
      )}

      {/* Nápověda ke scrollu (mizí po prvním posunu) */}
      {!lowPerf && (
        <div className="topbar" aria-hidden="true">
          <div />
          <div id="tip">Scroll posouvá playhead — timeline dole jde i táhnout</div>
        </div>
      )}

      {/* Popisky promítané z 3D scény */}
      {!lowPerf && (
        <div className="callouts" id="callouts" aria-hidden="true">
          <div className="callout" data-anchor="hood"><b>Sluneční clona</b></div>
          <div className="callout" data-anchor="focus"><b>Ostřicí kroužek</b></div>
          <div className="callout" data-anchor="glass"><b>Přední čočka</b></div>
        </div>
      )}

      {/* Akty příběhu – jedou přes celý scroll */}
      <main className="track" id="track">
        <section className="act" data-from="0" data-to="0.17">
          <div className="inner">
            <p className="eyebrow">Profesionální videotvorba</p>
            <h1>
              Videa, která<br />
              <span className="grad">prodávají váš brand</span>
            </h1>
            <p className="lede">
              Střih, postprodukce a obsah od týmu, který ví, co diváky zastaví
              uprostřed scrollování.
            </p>
          </div>
        </section>

        <section className="act right" data-from="0.19" data-to="0.39">
          <div className="inner">
            <p className="eyebrow purple">01 — Kompozice</p>
            <h2>
              Každý záběr<br />má důvod
            </h2>
            <p className="lede">
              Rámování, pohyb kamery a rytmus střihu neřešíme až v postprodukci.
              Plánujeme je od scénáře, aby výsledek držel pozornost celou stopáž.
            </p>
          </div>
        </section>

        <section className="act" data-from="0.43" data-to="0.60">
          <div className="inner">
            <p className="eyebrow">02 — Optika</p>
            <h2>
              Barva jako<br />součást sdělení
            </h2>
            <p className="lede">
              Color grading v DaVinci Resolve, konzistentní paleta napříč
              kampaní a formáty připravené pro každý kanál zvlášť.
            </p>
          </div>
        </section>

        <section className="act right" data-from="0.63" data-to="0.85">
          <div className="inner">
            <p className="eyebrow pink">03 — Rozklad</p>
            <h2>
              Rozložíme to<br />na jednotlivé díly
            </h2>
            <p className="lede">
              Natáčení, střih, zvuk, grafika i distribuce. Můžete si vzít celý
              proces, nebo jen tu část, která vám doma chybí.
            </p>
          </div>
        </section>

        <section className="act center" data-from="0.88" data-to="1">
          <div className="inner">
            <p className="eyebrow">Konzultace zdarma</p>
            <h2>
              Pojďme natočit<br />něco vašeho
            </h2>
            <p className="lede">
              Řekněte nám záměr — my dodáme scénář, natáčení i finální grade.
            </p>
            <div className="cta">
              <Link className="btn primary" to="/kontakt">Nezávazná poptávka</Link>
              <Link className="btn" to="/cenik">Ceník od 250 Kč</Link>
              <Link className="btn" to="/o-nas">Poznat nás</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Epilog – AsperroStudio v kostce (překrývá 3D plátno) */}
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
              Prohlédněte si ukázky editorů.
              <br />
              <Link className="note-link" to="/portfolio">Otevřít portfolio →</Link>
            </dd>
          </div>
        </dl>
      </section>

      {/* Resolve timeline dole – scrubbing scrollu */}
      {!lowPerf && (
        <section className="timeline" id="timeline" aria-label="Timeline hero animace">
          <div className="tl-bar">
            <div className="tl-tc" id="tc">00:00:00:<b>00</b></div>
            <div className="tl-clipname" id="clipname">01 — Intro</div>
            <div className="tl-dur">00:00:12:00 · 25 fps</div>
          </div>
          <div
            className="tl-lanes"
            id="lanes"
            tabIndex={0}
            role="slider"
            aria-label="Playhead"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          >
            <div className="tl-track" id="tlTrack">
              <div className="tl-ruler" id="ruler" />
              <div className="lane" id="laneV1" />
              <div className="playhead" id="playhead" style={{ left: 0 }} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
