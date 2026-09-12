import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLowPerf } from '../utils/performanceMode';
import { initLanding } from '../lib/landingCore';
import '../styles/landing.css';

// ============================================================
//  HLAVNÍ STRÁNKA – prodejní landing s 3D tunelem
//  Texty upravíš přímo tady; choreografii hero sekce, odhalování
//  bloků a FAQ řídí src/lib/landingCore.js (bez závislostí).
//  V úsporném režimu se skript nespouští a stránka se poskládá
//  staticky (řeší landing.css).
// ============================================================

export const Home = () => {
  const lowPerf = useLowPerf();

  useEffect(() => {
    if (lowPerf) return;
    const cleanup = initLanding();
    return cleanup;
  }, [lowPerf]);

  return (
    <>
      <SEO
        title="AsperroStudio – videa, která prodávají"
        description="Videoprodukce, která prodává. Firemní a reklamní videa, reels, svatby i letecké záběry z dronu — vše pod jednou střechou. Konzultace zdarma, reels od 250 Kč."
      />
      <div className="landing">

<div className="grain" aria-hidden="true"></div>
<div className="progress" id="prog" aria-hidden="true"></div>

<svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true"><defs>
  <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="#22d3ee"/><stop offset="52%" stopColor="#c084fc"/><stop offset="100%" stopColor="#f472b6"/>
  </linearGradient>
  <linearGradient id="gh" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0%" stopColor="#22d3ee"/><stop offset="55%" stopColor="#c084fc"/><stop offset="100%" stopColor="#f472b6"/>
  </linearGradient>
  <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="16" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" result="g"/><feBlend in="SourceGraphic" in2="g"/></filter>
</defs></svg>


<main id="top">
<section className="hero" id="hero">
  <div className="hero-sticky">
    <div className="scene" aria-hidden="true">
      <div className="glow-a"></div><div className="glow-b"></div>
      <div className="tunnel" id="tunnel">
                <figure className="frm f-cyan" data-z="-300" data-x="-58" data-y="-26" data-ry="16"><i className="bars"></i><i className="rec"></i><b className="tc">A001_C012 · 4K 50p</b></figure>
        <figure className="frm f-dark" data-z="-750" data-x="62" data-y="20" data-ry="-18"><i className="bars"></i><b className="tc">DRONE_0042 · 24p</b></figure>
        <figure className="frm f-pink" data-z="-1200" data-x="-70" data-y="24" data-ry="14"><i className="bars"></i><b className="tc">GRADE v3 · REC.709</b></figure>
        <figure className="frm f-dark" data-z="-1650" data-x="66" data-y="-30" data-ry="-13"><i className="bars"></i><i className="rec"></i><b className="tc">B002_C004 · 120 fps</b></figure>
        <figure className="frm f-cyan" data-z="-2100" data-x="-48" data-y="-8" data-ry="12"><i className="bars"></i><b className="tc">INTERVIEW · 50 mm</b></figure>
        <figure className="frm f-dark" data-z="-2550" data-x="56" data-y="26" data-ry="-15"><i className="bars"></i><b className="tc">PRODUKT · MACRO</b></figure>
        <figure className="frm f-pink" data-z="-3000" data-x="-64" data-y="-22" data-ry="15"><i className="bars"></i><b className="tc">REEL 9:16 · SOCIAL</b></figure>
        <figure className="frm f-dark" data-z="-3450" data-x="52" data-y="6" data-ry="-12"><i className="bars"></i><b className="tc">TIMELAPSE · 2 s</b></figure>
        <figure className="frm f-cyan" data-z="-3900" data-x="-40" data-y="28" data-ry="10"><i className="bars"></i><b className="tc">SOUND MIX · -14 LUFS</b></figure>
        <figure className="frm f-dark" data-z="-4350" data-x="46" data-y="-26" data-ry="-10"><i className="bars"></i><i className="rec"></i><b className="tc">B-ROLL · GIMBAL</b></figure>
        <figure className="frm f-pink" data-z="-4800" data-x="-52" data-y="10" data-ry="13"><i className="bars"></i><b className="tc">TITULKY · CZ/EN</b></figure>
        <figure className="frm f-dark" data-z="-5250" data-x="38" data-y="24" data-ry="-9"><i className="bars"></i><b className="tc">KOREKCE · NODE 04</b></figure>
        <figure className="frm f-cyan" data-z="-5700" data-x="-34" data-y="-16" data-ry="8"><i className="bars"></i><b className="tc">EXPORT · 3840×2160</b></figure>
        <figure className="frm f-dark" data-z="-6150" data-x="30" data-y="14" data-ry="-8"><i className="bars"></i><b className="tc">MASTER · H.265</b></figure>
</div>
      <div className="floor" id="floor"></div>
      <div className="vig"></div>
    </div>

    <div className="acts">
      <div className="act act-1" id="act1">
        <span className="eyebrow slate"><i className="dot"></i> Videoprodukce &nbsp;·&nbsp; <b>Praha a celá ČR</b></span>
        <h1>Videa, která<br /><span className="grad-text">prodávají.</span></h1>
        <p>Natočíme, sestříháme a odevzdáme video, po kterém se vám ozve zákazník. Ne jen hezké záběry do šuplíku.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" to="/kontakt">Chci nezávaznou kalkulaci
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>
          <a className="btn btn-ghost" href="#prace">Podívat se na práci</a>
        </div>
      </div>

      <div className="act act-2" id="act2">
        <span className="eyebrow slate">Jeden tým &nbsp;·&nbsp; <b>od nápadu po master</b></span>
        <h2>Kamera, dron, střih,<br />barvy i zvuk.</h2>
        <p>Nepředáváme vás mezi třemi dodavateli. Všechno vzniká u nás — takže termín drží a výsledek má jednotný rukopis.</p>
      </div>

      <div className="act act-3" id="act3">
        <span className="eyebrow slate">Další krok &nbsp;·&nbsp; <b>15 minut hovoru</b></span>
        <h2>Konzultace je zdarma<br />a nezávazná.</h2>
        <p>Řekneme vám rovnou, jestli vám video pomůže — a kolik bude stát. Bez zbytečných schůzek.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" to="/kontakt">Napsat nám</Link>
          <a className="btn btn-ghost" href="#cenik">Prohlédnout ceník</a>
        </div>
      </div>
    </div>

    <div className="scroll-hint slate" id="hint" aria-hidden="true"><i className="mouse"></i> Scrollujte</div>

    <div className="tl" aria-hidden="true">
      <div className="tl-in">
        <div className="tl-head"><span className="slate">Timeline &nbsp;·&nbsp; <b id="tcNow">00:00:00:00</b></span><span className="slate">V1 &nbsp;·&nbsp; 10 klipů</span></div>
        <div className="tl-track" id="tlTrack">
          <div className="tl-clip"><span>brief</span></div>
          <div className="tl-clip"><span>scénář</span></div>
          <div className="tl-clip"><span>kamera</span></div>
          <div className="tl-clip"><span>dron</span></div>
          <div className="tl-clip"><span>střih</span></div>
          <div className="tl-clip"><span>grade</span></div>
          <div className="tl-clip"><span>zvuk</span></div>
          <div className="tl-clip"><span>titulky</span></div>
          <div className="tl-clip"><span>export</span></div>
          <div className="tl-clip"><span>hotovo</span></div>
          <div className="tl-play" id="tlPlay"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="strip" aria-label="Klíčové informace">
  <div className="strip-in">
    <div className="strip-item"><b>od 250 Kč</b><small>za jeden reel</small></div>
    <div className="strip-item"><b>Zdarma</b><small>první konzultace</small></div>
    <div className="strip-item"><b>Kamera + dron</b><small>vlastní technika</small></div>
    <div className="strip-item"><b>DaVinci Resolve</b><small>studio postprodukce</small></div>
  </div>
</section>
<section className="section" id="proc-blem">
  <div className="wrap">
    <div className="head rv">
      <span className="slate">01 &nbsp;·&nbsp; <b>Proč to většinou nefunguje</b></span>
      <h2>Hezké video ještě nic neprodá.</h2>
      <p className="lede">Většina firemních videí selže dřív, než se dostane ke kameře. Tady jsou tři místa, kde se to láme — a jak to řešíme.</p>
    </div>
    <div className="why rv">
      <article className="why-card">
        <div className="why-viz"><svg viewBox="0 0 260 150" role="img" aria-label="Diagram: video bez cíle míjí zákazníka">
          <circle cx="186" cy="75" r="46" fill="none" stroke="rgba(255,255,255,.09)"/>
          <circle cx="186" cy="75" r="30" fill="none" stroke="rgba(255,255,255,.12)"/>
          <circle cx="186" cy="75" r="14" fill="none" stroke="rgba(255,255,255,.16)"/>
          <circle cx="186" cy="75" r="4" fill="#6b7280"/>
          <path d="M18 118 C70 108 110 96 150 48" fill="none" stroke="#3b4250" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round"/>
          <path d="M150 48 l-13 2 m13 -2 l-3 12" fill="none" stroke="#3b4250" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 118 C78 116 128 104 168 82" fill="none" stroke="url(#gh)" strokeWidth="2.6" strokeLinecap="round"/>
          <circle cx="186" cy="75" r="6.5" fill="url(#gh)"/>
          <text x="18" y="138" fill="#6b7280" font-family="ui-monospace,monospace" font-size="9" letter-spacing="1.6">VIDEO</text>
          <text x="152" y="138" fill="#6b7280" font-family="ui-monospace,monospace" font-size="9" letter-spacing="1.6">ZÁKAZNÍK</text>
        </svg></div>
        <div className="why-body">
          <div className="why-bad"><i><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></i><p><b style={{ color: 'var(--fg-dim)', fontWeight: '600' } as React.CSSProperties}>„Natočte nám něco o firmě.“</b><br />Video bez cíle. Nikdo neví, co má divák udělat — tak neudělá nic.</p></div>
          <div className="why-sep"></div>
          <div className="why-good"><i><svg viewBox="0 0 24 24"><path d="M5 12.5l5 5L19 6.5"/></svg></i><div><h3>Začínáme u toho, co má video způsobit</h3><p>Poptávka, prodej, nábor. Podle cíle stavíme scénář, délku i závěrečnou výzvu.</p></div></div>
        </div>
      </article>
      <article className="why-card">
        <div className="why-viz"><svg viewBox="0 0 260 150" role="img" aria-label="Graf udržení diváka v čase">
          <g stroke="rgba(255,255,255,.07)" strokeWidth="1">
            <line x1="26" y1="24" x2="248" y2="24"/><line x1="26" y1="62" x2="248" y2="62"/>
            <line x1="26" y1="100" x2="248" y2="100"/><line x1="26" y1="126" x2="248" y2="126"/>
          </g>
          <line x1="70" y1="14" x2="70" y2="126" stroke="rgba(244,114,182,.55)" strokeWidth="1" strokeDasharray="3 4"/>
          <text x="74" y="22" fill="#f472b6" font-family="ui-monospace,monospace" font-size="9" letter-spacing="1.2">0:03</text>
          <path d="M26 26 C52 28 62 34 70 44 C84 64 96 112 130 120 C170 126 210 126 248 126" fill="none" stroke="#3b4250" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M26 26 C52 27 60 30 70 32 C110 38 150 50 190 62 C214 69 232 76 248 82" fill="none" stroke="url(#gh)" strokeWidth="2.8" strokeLinecap="round"/>
          <circle cx="248" cy="82" r="4.5" fill="#f472b6"/>
          <circle cx="248" cy="126" r="3.5" fill="#3b4250"/>
          <text x="26" y="140" fill="#6b7280" font-family="ui-monospace,monospace" font-size="9" letter-spacing="1.6">POZORNOST V ČASE</text>
        </svg></div>
        <div className="why-body">
          <div className="why-bad"><i><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></i><p><b style={{ color: 'var(--fg-dim)', fontWeight: '600' } as React.CSSProperties}>Tři minuty dronu nad budovou</b><br />Divák odchází ve třetí vteřině. Krásné záběry, nulový dopad.</p></div>
          <div className="why-sep"></div>
          <div className="why-good"><i><svg viewBox="0 0 24 24"><path d="M5 12.5l5 5L19 6.5"/></svg></i><div><h3>První tři vteřiny stavíme jako první</h3><p>Otvírák řešíme dřív než zbytek. Pak už jen držíme pozornost, kterou jsme získali.</p></div></div>
        </div>
      </article>
      <article className="why-card">
        <div className="why-viz"><svg viewBox="0 0 260 150" role="img" aria-label="Porovnání širokého a vertikálního formátu">
          <rect x="14" y="42" width="108" height="61" rx="6" fill="none" stroke="rgba(255,255,255,.14)"/>
          <rect x="52" y="42" width="32" height="61" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeDasharray="4 4"/>
          <rect x="24" y="86" width="88" height="7" rx="3" fill="#3b4250"/>
          <text x="14" y="120" fill="#6b7280" font-family="ui-monospace,monospace" font-size="9" letter-spacing="1.4">16:9 OŘÍZLÉ</text>
          <path d="M134 72 h16 m0 0 l-5 -5 m5 5 l-5 5" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round"/>
          <rect x="166" y="22" width="60" height="100" rx="7" fill="none" stroke="url(#gh)" strokeWidth="1.6"/>
          <rect x="172" y="28" width="48" height="88" rx="4" fill="rgba(34,211,238,.05)"/>
          <rect x="176" y="96" width="40" height="6" rx="3" fill="url(#gh)"/>
          <rect x="176" y="106" width="26" height="6" rx="3" fill="rgba(244,114,182,.6)"/>
          <text x="166" y="138" fill="#6b7280" font-family="ui-monospace,monospace" font-size="9" letter-spacing="1.4">9:16 NA MÍRU</text>
        </svg></div>
        <div className="why-body">
          <div className="why-bad"><i><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></i><p><b style={{ color: 'var(--fg-dim)', fontWeight: '600' } as React.CSSProperties}>Jedna verze pro všechno</b><br />Šestnáct ku devíti na web i na Instagram. Na mobilu pak titulky mimo obraz.</p></div>
          <div className="why-sep"></div>
          <div className="why-good"><i><svg viewBox="0 0 24 24"><path d="M5 12.5l5 5L19 6.5"/></svg></i><div><h3>Vertikální i široká verze v ceně</h3><p>Jeden natáčecí den, sada formátů. Web, Reels, TikTok i YouTube dostanou svoji verzi.</p></div></div>
        </div>
      </article>
    </div>
  </div>
</section>

<section className="section" id="sluzby">
  <div className="wrap">
    <div className="head rv">
      <span className="slate">02 &nbsp;·&nbsp; <b>Co pro vás natočíme</b></span>
      <h2>Čtyři věci, které umíme<br />opravdu dobře.</h2>
      <p className="lede">Nemusíte kombinovat víc dodavatelů. Ať potřebujete jedno video, nebo celou sérii, vzniká všechno na jednom místě.</p>
    </div>
    <div className="svc rv">
      <article className="card">
        <div className="ico"><svg viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="13" height="11" rx="2.5"/><path d="M15.5 11l6-3.2v8.4l-6-3.2z"/></svg></div>
        <h3>Firemní &amp; reklamní video</h3>
        <p>Video na web, do kampaně nebo na veletrh. Postavené tak, aby vedlo k poptávce — ne jen k pochvale od kolegů.</p>
        <div className="tags"><span className="tag">scénář</span><span className="tag">režie</span><span className="tag">grading</span><span className="tag">hudba</span></div>
        <div className="price"><b>Cena na míru</b> podle rozsahu</div>
      </article>
      <article className="card">
        <div className="ico"><svg viewBox="0 0 24 24"><rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 9.5l4.5 2.5-4.5 2.5z"/></svg></div>
        <h3>Reels &amp; social videa</h3>
        <p>Krátká vertikální videa v sérii. Titulky, rytmus, hook v prvních vteřinách. Ideální, když potřebujete obsah pravidelně.</p>
        <div className="tags"><span className="tag">9:16</span><span className="tag">titulky</span><span className="tag">série</span><span className="tag">hook</span></div>
        <div className="price"><b>od 250 Kč</b> za video</div>
      </article>
      <article className="card">
        <div className="ico"><svg viewBox="0 0 24 24"><path d="M4 8.5h16v11H4z"/><path d="M4 8.5l4-5h8l4 5"/><circle cx="12" cy="14" r="3"/></svg></div>
        <h3>Svatební video</h3>
        <p>Den, který se neopakuje, natočený nenápadně. Sestřih, který si pustíte i za deset let — a delší záznam k němu.</p>
        <div className="tags"><span className="tag">celý den</span><span className="tag">dron</span><span className="tag">zvuk z obřadu</span></div>
        <div className="price"><b>Cena na míru</b> podle termínu</div>
      </article>
      <article className="card">
        <div className="ico"><svg viewBox="0 0 24 24"><path d="M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/><path d="M9.8 9.8L5.5 5.5M14.2 9.8l4.3-4.3M9.8 14.2l-4.3 4.3M14.2 14.2l4.3 4.3"/></svg></div>
        <h3>Dron &amp; letecké záběry</h3>
        <p>Nemovitosti, areály, akce, krajina. Vyjedeme prakticky kamkoliv — samostatně i jako doplněk k pozemnímu natáčení.</p>
        <div className="tags"><span className="tag">4K</span><span className="tag">areály i akce</span><span className="tag">výjezd po ČR</span></div>
        <div className="price"><b>Cena na míru</b> podle lokace</div>
      </article>
    </div>
  </div>
</section>

<section className="section" id="proces">
  <div className="wrap">
    <div className="head rv">
      <span className="slate">03 &nbsp;·&nbsp; <b>Jak to probíhá</b></span>
      <h2>Čtyři kroky od prvního<br />hovoru k hotovému videu.</h2>
      <p className="lede">Nemusíte umět nic z videa. Od vás potřebujeme jen vědět, komu chcete co říct — zbytek je na nás.</p>
    </div>
    <div className="steps rv" id="steps">
      <div className="step"><span className="step-n">KROK 01</span><h3>Konzultace zdarma</h3><p>Krátký hovor nebo schůzka. Vyjasníme si cíl, rozsah a termín. Odcházíte s cenou, ne s odhadem „někde mezi“.</p></div>
      <div className="step"><span className="step-n">KROK 02</span><h3>Příprava a natáčení</h3><p>Scénář a harmonogram dopředu, ať natáčecí den nikdo neimprovizuje. Kameru i dron vozíme s sebou.</p></div>
      <div className="step"><span className="step-n">KROK 03</span><h3>Střih a postprodukce</h3><p>Střih, barvy, zvuk a titulky v DaVinci Resolve Studio. Posíláme náhled, ke kterému se vyjádříte.</p></div>
      <div className="step"><span className="step-n">KROK 04</span><h3>Odevzdání a úpravy</h3><p>Dostanete hotové soubory ve všech formátech, které potřebujete. Kolo úprav je součástí, ne příplatek.</p></div>
    </div>
  </div>
</section>

<section className="section" id="prace">
  <div className="wrap">
    <div className="head rv">
      <span className="slate">04 &nbsp;·&nbsp; <b>Ukázka</b></span>
      <h2>Podívejte se, jak to vypadá.</h2>
      <p className="lede">Devadesát vteřin z toho, co jsme natočili. Celé projekty i jednotlivá videa najdete v portfoliu.</p>
    </div>
    <Link className="reel rv" to="/portfolio" aria-label="Přehrát showreel">
      <i className="sheen"></i><i className="scan"></i>
      <span className="slot">Místo pro upoutávkové video</span>
      <span className="reel-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>
      <div className="reel-meta">
        <div><h3>Showreel</h3><small>Výběr z naší práce &nbsp;·&nbsp; 90 s &nbsp;·&nbsp; 4K</small></div>
        <span className="btn btn-ghost">Celé portfolio
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </div>
    </Link>
  </div>
</section>

<section className="section" id="cenik">
  <div className="wrap">
    <div className="head rv">
      <span className="slate">05 &nbsp;·&nbsp; <b>Ceník</b></span>
      <h2>Víte, do čeho jdete.</h2>
      <p className="lede">Ceny jsou orientační a vždy „od“ — finální částku řekneme na konzultaci zdarma, když známe rozsah. Žádné skryté položky.</p>
    </div>
    <div className="plans rv">
      <article className="plan">
        <h3>Reel</h3>
        <div className="amt">250 Kč <em>/ video · od</em></div>
        <ul>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Jedno vertikální video 9:16</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Střih, titulky, hudba</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Barevné sladění</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Výhodnější při odběru série</li>
        </ul>
        <Link className="btn btn-ghost" to="/kontakt">Mám zájem</Link>
      </article>
      <article className="plan hot">
        <span className="badge">Nejčastější volba</span>
        <h3>Firemní video</h3>
        <div className="amt">Na míru <em>· dle rozsahu</em></div>
        <ul>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Scénář a příprava natáčení</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Natáčecí den — kamera i dron</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Střih, grading a zvuk v Resolve</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Široká i vertikální verze</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Kolo úprav v ceně</li>
        </ul>
        <Link className="btn btn-primary" to="/kontakt">Chci kalkulaci</Link>
      </article>
      <article className="plan">
        <h3>Balíček obsahu</h3>
        <div className="amt">Měsíčně <em>· po dohodě</em></div>
        <ul>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Pravidelné natáčení a dodávky</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Sada videí každý měsíc</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Přednostní termíny</li>
          <li><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>Nižší cena za kus</li>
        </ul>
        <Link className="btn btn-ghost" to="/kontakt">Domluvit podmínky</Link>
      </article>
    </div>
    <p className="note">Všechny ceny jsou bez DPH · Konzultace a kalkulace je zdarma a nezávazná</p>
  </div>
</section>

<section className="section" id="faq">
  <div className="wrap">
    <div className="head rv">
      <span className="slate">06 &nbsp;·&nbsp; <b>Časté dotazy</b></span>
      <h2>Na co se ptáte nejčastěji.</h2>
    </div>
    <div className="lq rv">
      <div className="lq-blobs" aria-hidden="true">
        <i style={{ '--s': '230px', '--tx': '-4%', '--ty': '2%', '--d': '0s' } as React.CSSProperties}></i>
        <i style={{ '--s': '170px', '--tx': '38%', '--ty': '-6%', '--d': '-5s' } as React.CSSProperties}></i>
        <i style={{ '--s': '260px', '--tx': '70%', '--ty': '28%', '--d': '-9s' } as React.CSSProperties}></i>
        <i style={{ '--s': '190px', '--tx': '16%', '--ty': '58%', '--d': '-14s' } as React.CSSProperties}></i>
        <i style={{ '--s': '150px', '--tx': '56%', '--ty': '76%', '--d': '-3s' } as React.CSSProperties}></i>
      </div>
      <div className="lq-list">
        <div className="lq-item" style={{ '--md': '-1.7s' } as React.CSSProperties}>
          <button className="lq-q" type="button" id="q1" aria-expanded="false" aria-controls="a1"><span>Kolik bude moje video stát?</span><i className="drop" aria-hidden="true"></i></button>
          <div className="lq-a" id="a1" role="region" aria-labelledby="q1"><div><p>Záleží na délce natáčení a náročnosti postprodukce. Reels začínají na 250 Kč za video, u firemních videí cenu spočítáme podle rozsahu. Kalkulace je zdarma a nezávazná — dozvíte se konkrétní číslo, ne rozpětí.</p></div></div>
        </div>
        <div className="lq-item" style={{ '--md': '-3.4s' } as React.CSSProperties}>
          <button className="lq-q" type="button" id="q2" aria-expanded="false" aria-controls="a2"><span>Jak dlouho to celé trvá?</span><i className="drop" aria-hidden="true"></i></button>
          <div className="lq-a" id="a2" role="region" aria-labelledby="q2"><div><p>Od poptávky k hotovému videu obvykle počítejte s několika týdny — příprava, natáčecí den a postprodukce. Přesný termín si potvrdíme hned na začátku a držíme ho.</p></div></div>
        </div>
        <div className="lq-item" style={{ '--md': '-5.1s' } as React.CSSProperties}>
          <button className="lq-q" type="button" id="q3" aria-expanded="false" aria-controls="a3"><span>Musím vědět, co chci natočit?</span><i className="drop" aria-hidden="true"></i></button>
          <div className="lq-a" id="a3" role="region" aria-labelledby="q3"><div><p>Ne. Stačí, když nám řeknete, komu chcete co sdělit a čeho chcete dosáhnout. Scénář, lokace i harmonogram připravíme my a předem vám je pošleme ke schválení.</p></div></div>
        </div>
        <div className="lq-item" style={{ '--md': '-6.8s' } as React.CSSProperties}>
          <button className="lq-q" type="button" id="q4" aria-expanded="false" aria-controls="a4"><span>Vyjedete i mimo Prahu?</span><i className="drop" aria-hidden="true"></i></button>
          <div className="lq-a" id="a4" role="region" aria-labelledby="q4"><div><p>Ano, vyjíždíme prakticky kamkoliv po České republice — s kamerou i dronem. Cestovné si vyjasníme předem, aby vás nic nepřekvapilo na faktuře.</p></div></div>
        </div>
        <div className="lq-item" style={{ '--md': '-8.5s' } as React.CSSProperties}>
          <button className="lq-q" type="button" id="q5" aria-expanded="false" aria-controls="a5"><span>Co když se mi výsledek nebude líbit?</span><i className="drop" aria-hidden="true"></i></button>
          <div className="lq-a" id="a5" role="region" aria-labelledby="q5"><div><p>Posíláme náhled před finálním exportem, takže se k videu vyjádříte dřív, než je hotové. Kolo úprav je součástí ceny, ne příplatek.</p></div></div>
        </div>
        <div className="lq-item" style={{ '--md': '-10.2s' } as React.CSSProperties}>
          <button className="lq-q" type="button" id="q6" aria-expanded="false" aria-controls="a6"><span>Dostanu i vertikální verzi na sítě?</span><i className="drop" aria-hidden="true"></i></button>
          <div className="lq-a" id="a6" role="region" aria-labelledby="q6"><div><p>Ano. Z jednoho natáčení připravíme širokou verzi na web i vertikální na Reels, TikTok a Shorts — s titulky, protože většina lidí se dívá bez zvuku.</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="section final" id="pojdme">
  <div className="wrap final-in rv">
    <span className="slate">07 &nbsp;·&nbsp; <b>Pojďme do toho</b></span>
    <h2>Konzultace je zdarma.<br /><span className="grad-text">Kalkulace taky.</span></h2>
    <p className="lede">Napište pár vět o projektu. Ozveme se obvykle do jednoho pracovního dne a rovnou řekneme, co to bude stát a kdy to stihneme.</p>
    <div className="cta-row">
      <Link className="btn btn-primary" to="/kontakt">Nezávazná poptávka
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>
      <Link className="btn btn-ghost" to="/cenik">Prohlédnout ceník</Link>
    </div>
    <p className="note" style={{ marginTop: '6px' } as React.CSSProperties}>Bez závazků · Bez zbytečných schůzek · Odpověď do jednoho pracovního dne</p>
  </div>
</section>
</main>


<div className="mcta" id="mcta">
  <a className="btn btn-ghost" href="#cenik">Ceník</a>
  <Link className="btn btn-primary" to="/kontakt">Konzultace zdarma</Link>
</div>


      </div>
    </>
  );
};
