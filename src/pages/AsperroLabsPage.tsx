import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLowPerf } from '../utils/performanceMode';
import '../styles/labs.css';

// ============================================================
//  ASPERROLABS – veřejná stránka produktové větve
//  Vlastní značka (jiné logo i paleta je záměr — oddělení
//  od AsperroStudia). Vede na ni jen odkaz v patičce webu.
//  Texty a produkty upravíš přímo tady.
// ============================================================

export const AsperroLabsPage = () => {
  const lowPerf = useLowPerf();

  useEffect(() => {
    if (lowPerf) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(
      document.querySelectorAll('.labs section, .labs .hero, .labs .close')
    ) as HTMLElement[];
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.style.opacity = '1';
            t.style.transform = 'none';
            io.unobserve(t);
          }
        });
      },
      { threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.transition = '';
      });
    };
  }, [lowPerf]);

  return (
    <>
      <SEO
        title="AsperroLabs"
        description="AsperroLabs — produktová větev AsperroStudia. Makra, skripty, LUTy a systémy z reálné produkce, kurzy a technická řešení pro firmy."
      />
      <div className="labs">

<svg width="0" height="0" style={{ position: 'absolute' }}><defs>
  <linearGradient id="lg" x1="0.05" y1="0" x2="0.95" y2="1">
    <stop offset="0%" stopColor="#5FF3EA"/><stop offset="52%" stopColor="#9E9CF2"/><stop offset="100%" stopColor="#F45BF0"/>
  </linearGradient>
</defs></svg>

<div className="wrap">

<nav><div className="inner">
  <div className="brand">
    <svg width="30" height="30" viewBox="0 0 500 500" aria-hidden="true">
      <path d="M 220.56 115.00 Q 250.00 98.00 279.44 115.00 L 352.19 157.00 Q 381.64 174.00 381.64 208.00 L 381.64 292.00 Q 381.64 326.00 352.19 343.00 L 279.44 385.00 Q 250.00 402.00 220.56 385.00 L 147.81 343.00 Q 118.36 326.00 118.36 292.00 L 118.36 208.00 Q 118.36 174.00 147.81 157.00 Z" fill="none" stroke="url(#lg)" strokeWidth="27" strokeLinejoin="round"/>
      <circle cx="250" cy="184" r="24" fill="none" stroke="url(#lg)" strokeWidth="11"/>
      <circle cx="184" cy="250" r="25" fill="url(#lg)"/>
      <circle cx="316" cy="250" r="25" fill="url(#lg)"/>
      <circle cx="250" cy="316" r="25" fill="url(#lg)"/>
    </svg><span>Asperro<span className="lb">Labs</span></span>
  </div>
  <div className="navlinks">
    <a href="#assets">Pro tvůrce</a>
    <a href="#tools">Nástroje</a>
    <a href="#firmy">Pro firmy</a>
    <a href="#kurzy">Kurzy</a>
    <a href="#zdarma">Zdarma</a>
  </div>
</div></nav>

<div className="inner">

{/* HERO */}
<div className="hero">
  <svg className="icon" viewBox="0 0 500 500">
    <path d="M 220.56 115.00 Q 250.00 98.00 279.44 115.00 L 352.19 157.00 Q 381.64 174.00 381.64 208.00 L 381.64 292.00 Q 381.64 326.00 352.19 343.00 L 279.44 385.00 Q 250.00 402.00 220.56 385.00 L 147.81 343.00 Q 118.36 326.00 118.36 292.00 L 118.36 208.00 Q 118.36 174.00 147.81 157.00 Z" fill="none" stroke="url(#lg)" strokeWidth="27" strokeLinejoin="round"/>
    <circle cx="250" cy="184" r="24" fill="none" stroke="url(#lg)" strokeWidth="11"/>
    <circle cx="184" cy="250" r="25" fill="url(#lg)"/>
    <circle cx="316" cy="250" r="25" fill="url(#lg)"/>
    <circle cx="250" cy="316" r="25" fill="url(#lg)"/>
  </svg>
  <div className="eyebrow"><span className="dot"></span>Produktová větev AsperroStudio</div>
  <h1>Nástroje z reálné produkce.<span className="g">Ne z marketingu.</span></h1>
  <p className="lead">Makra, skripty, LUTy a systémy, které si vyrábíme pro vlastní zakázky —
  zabalené tak, aby fungovaly i vám. A pro firmy technická řešení, kde nejde o „natočit video“,
  ale o video ve velkém měřítku.</p>
  <div className="btnrow">
    <a className="btn btn-p" href="#assets">Prohlédnout produkty →</a>
    <a className="btn btn-s" href="#firmy">Řešení pro firmy</a>
  </div>
  <div className="pillrow">
    <span className="pill"><b>DaVinci Resolve</b> &amp; Fusion</span>
    <span className="pill"><b>Doživotní</b> licence</span>
    <span className="pill">Aktualizace <b>zdarma</b></span>
    <span className="pill"><b>Česká</b> podpora</span>
  </div>
</div>

{/* 01 DIGITAL ASSETS */}
<section id="assets">
  <div className="kicker"><span className="dot"></span>01 — Digitální produkty pro tvůrce</div>
  <h2>Věci, které si <span className="g">jen stáhnete a použijete</span></h2>
  <p className="sub">Všechno vzniklo kvůli konkrétní zakázce, ne kvůli prodeji. Proto to řeší reálné problémy
  a proto je toho v balíčku přesně tolik, kolik jsme sami potřebovali.</p>

  <div className="grid g2">

    <div className="prod t-cy hot">
      <span className="flag">Nejžádanější</span>
      <div className="kind">FUSION · .SETTING</div>
      <h3>Fusion Motion Pack</h3>
      <p className="txt">Makra a nodové struktury pro věci, které se v každém projektu staví znovu od nuly.</p>
      <ul>
        <li>Dynamická typografie s automatickým rámečkem podle délky textu</li>
        <li>Komplexní přechody — light leak, zoom whip, glitch sada</li>
        <li>Motion blur presety pro grafiku i záběry</li>
        <li>Vše jako otevřené makro, ne zamčený efekt</li>
      </ul>
      <div className="pricerow"><span className="amt">1 290 Kč</span><span className="per">jednorázově</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

    <div className="prod t-cy">
      <div className="kind">LUA / PYTHON · SKRIPTY</div>
      <h3>Workflow Scripts</h3>
      <p className="txt">Skripty přímo do Resolve, které řeší úkony, na kterých se denně ztrácejí desítky minut.</p>
      <ul>
        <li>Hromadné přejmenování klipů a vrstev podle zvoleného klíče</li>
        <li>Export do sady delivery presetů jedním kliknutím</li>
        <li>Kontrola timeline před odevzdáním — mezery, offline média, chybné rozlišení</li>
        <li>Instalace bez programování, krok za krokem</li>
      </ul>
      <div className="pricerow"><span className="amt">990 Kč</span><span className="per">jednorázově</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

    <div className="prod t-cy">
      <div className="kind">LUT · CUBE + POWERGRADE</div>
      <h3>Žánrové LUT sady</h3>
      <p className="txt">Tři samostatné balíčky profilované na konkrétní kamery, ne univerzální „film look“.</p>
      <ul>
        <li>Svatba — měkký kontrast, pleťové tóny na prvním místě</li>
        <li>Real estate — čistý interiér, srovnané bílé a okenní světlo</li>
        <li>Dark cinematic — hluboké stíny, kontrolovaná halace</li>
        <li>Ke každé sadě otevřený node tree, ne jen .cube</li>
      </ul>
      <div className="pricerow"><span className="amt">690 Kč</span><span className="per">za sadu · 1 590 Kč za všechny</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

    <div className="prod t-cy">
      <div className="kind">AUDIO · WAV 48/24</div>
      <h3>Essential Creator SFX Pack</h3>
      <p className="txt">Vlastní knihovna ruchů nahraná při natáčení. Zvuky, které v běžných knihovnách slyšíte pořád dokola, tady nejsou.</p>
      <ul>
        <li>Whooshe a přechodové ruchy v několika rychlostech</li>
        <li>Impacty a risery pro dynamické střihy</li>
        <li>Reálné ruchy — dveře, kroky, technika, prostředí</li>
        <li>Licence pro komerční použití včetně klientských zakázek</li>
      </ul>
      <div className="pricerow"><span className="amt">790 Kč</span><span className="per">jednorázově</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

  </div>
</section>

{/* 02 CREATOR TOOLS */}
<section id="tools">
  <div className="kicker k-pu"><span className="dot"></span>02 — Nástroje pro řízení byznysu</div>
  <h2>Administrativa, kterou <span className="g">nemusíte stavět znovu</span></h2>
  <p className="sub">Faktury, sledování ziskovosti a schvalování videí nesnáší skoro každý kreativec.
  Tohle jsou systémy, které používáme sami — hotové k nasazení během odpoledne.</p>

  <div className="grid g3">

    <div className="prod t-pu">
      <div className="kind">GOOGLE SHEETS · APPS SCRIPT</div>
      <h3>Faktury &amp; Zisk</h3>
      <p className="txt">Tabulka, která z vyplněného řádku vygeneruje fakturu a hlídá, kolik na projektu opravdu zbylo.</p>
      <ul>
        <li>Automatické generování faktury do PDF</li>
        <li>Ziskovost po projektech a po klientech</li>
        <li>Finanční dashboard za měsíc a rok</li>
        <li>Hlídání splatnosti a upomínek</li>
      </ul>
      <div className="pricerow"><span className="amt">1 490 Kč</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

    <div className="prod t-pu hot">
      <div className="kind">NOTION · ŠABLONA</div>
      <h3>Produkční systém</h3>
      <p className="txt">Celá cesta zakázky na jednom místě — od první poptávky po archivaci projektu.</p>
      <ul>
        <li>Pipeline: poptávka → nabídka → natáčení → post → předání</li>
        <li>Checklisty pro výjezd a pro odevzdání</li>
        <li>Databáze klientů, techniky a lokací</li>
        <li>Přehled vytíženosti týmu na týdny dopředu</li>
      </ul>
      <div className="pricerow"><span className="amt">1 190 Kč</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

    <div className="prod t-pu">
      <div className="kind">SYSTÉM · PORTÁL</div>
      <h3>Klientský portál</h3>
      <p className="txt">Předpřipravené prostředí pro onboarding klienta a schvalování videí. Působí to profesionálně od prvního kontaktu.</p>
      <ul>
        <li>Onboarding formulář a sběr podkladů</li>
        <li>Schvalovací kolečko s verzemi a komentáři</li>
        <li>Přehledné předání finálních souborů</li>
        <li>Návod na napojení na vlastní doménu</li>
      </ul>
      <div className="pricerow"><span className="amt">2 490 Kč</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

  </div>
</section>

{/* 03 PRO FIRMY */}
<section id="firmy">
  <div className="kicker k-pk"><span className="dot"></span>03 — Řešení pro firmy</div>
  <h2>Když nejde o jedno video, ale o <span className="g">video ve velkém</span></h2>
  <p className="sub">Tyhle věci se neprodávají tlačítkem. Domluvíme se na rozsahu, uděláme pilot
  a teprve pak se rozhoduje o nasazení naplno.</p>

  <div className="grid g3">

    <div className="prod t-pk">
      <div className="kind">LOKALIZACE</div>
      <h3>AI lokalizace obsahu</h3>
      <p className="txt">Firemní video přeložené a nadabované do deseti jazyků včetně úpravy pohybu rtů.</p>
      <ul>
        <li>Překlad a lokalizace scénáře, ne strojový přepis</li>
        <li>Syntetický dabing s konzistentním hlasem napříč jazyky</li>
        <li>Lip-sync tam, kde je mluvčí v záběru</li>
        <li>Jazykové mutace titulků a grafiky</li>
      </ul>
      <div className="pricerow"><span className="amt">Na míru</span></div>
      <div className="note">CENA PODLE STOPÁŽE A POČTU JAZYKŮ</div>
      <a className="buy" href="#">Nezávazná konzultace</a>
    </div>

    <div className="prod t-pk hot">
      <div className="kind">E-COMMERCE</div>
      <h3>Video reklamy ve velkém</h3>
      <p className="txt">Z jedné sady produktových fotek a textů z e-shopu automaticky vygenerované desítky video-reklam.</p>
      <ul>
        <li>Napojení na produktový feed</li>
        <li>Šablony v brandu klienta, formáty pro všechny sítě</li>
        <li>Desítky variant pro A/B testování během hodin</li>
        <li>Nové produkty generují reklamy automaticky</li>
      </ul>
      <div className="pricerow"><span className="amt">Na míru</span></div>
      <div className="note">NASAZENÍ + MĚSÍČNÍ PROVOZ</div>
      <a className="buy" href="#">Nezávazná konzultace</a>
    </div>

    <div className="prod t-pk">
      <div className="kind">AI ASISTENT</div>
      <h3>Firemní AI na míru</h3>
      <p className="txt">Asistent natrénovaný na interních datech klienta, který slouží jako technická podpora zaměstnancům.</p>
      <ul>
        <li>Zdroj: manuály, provozní řády, interní postupy</li>
        <li>Odpovědi s odkazem na konkrétní stránku dokumentu</li>
        <li>Přístup z mobilu pro lidi v terénu i ve výrobě</li>
        <li>Data zůstávají pod kontrolou klienta</li>
      </ul>
      <div className="pricerow"><span className="amt">Na míru</span></div>
      <div className="note">PILOT PŘED PLNÝM NASAZENÍM</div>
      <a className="buy" href="#">Nezávazná konzultace</a>
    </div>

  </div>
</section>

{/* 04 KURZY */}
<section id="kurzy">
  <div className="kicker k-bl"><span className="dot"></span>04 — Konzultace a vzdělávání</div>
  <h2>Know-how, které jinde <span className="g">česky nenajdete</span></h2>
  <p className="sub">Zaměřené na úzké a těžké věci. Žádné „úvody do střihu“ — na ty jsou lepší a levnější zdroje.</p>

  <div className="grid g3">

    <div className="prod t-bl">
      <div className="kind">MASTERCLASS · VIDEO</div>
      <h3>Fusion: tracking a compositing</h3>
      <p className="txt">Pokročilý kurz pro editory, kteří už ve Fusionu umí základ a narazili na strop.</p>
      <ul>
        <li>Planar a 3D tracking na reálných záběrech</li>
        <li>Keying a čištění masek v obtížných podmínkách</li>
        <li>Vkládání grafiky do scény, aby seděla světlem i grainem</li>
        <li>Projektové soubory ke stažení</li>
      </ul>
      <div className="pricerow"><span className="amt">3 900 Kč</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

    <div className="prod t-bl">
      <div className="kind">MASTERCLASS · VIDEO</div>
      <h3>Automatizace video agentury</h3>
      <p className="txt">Jak zautomatizovat provoz malého studia tak, aby vám administrativa nesebrala víc než dvě hodiny týdně.</p>
      <ul>
        <li>Nastavení pipeline od poptávky po archivaci</li>
        <li>Skripty a automatizace v postprodukci</li>
        <li>Cenotvorba a hlídání ziskovosti</li>
        <li>Šablony, které používáme v praxi</li>
      </ul>
      <div className="pricerow"><span className="amt">3 900 Kč</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Koupit</a>
    </div>

    <div className="prod t-bl">
      <div className="kind">KONZULTACE · NA MÍSTĚ</div>
      <h3>Audit workflow</h3>
      <p className="txt">Pro marketingová oddělení a firmy, které točí interně a ztrácejí čas na chaosu.</p>
      <ul>
        <li>Zmapování současného procesu natáčení a postu</li>
        <li>Návrh struktury dat, záloh a archivace</li>
        <li>Doporučení techniky a delivery standardů</li>
        <li>Písemný výstup s konkrétními kroky</li>
      </ul>
      <div className="pricerow"><span className="amt">od 12 000 Kč</span></div>
      <div className="note">NÁVRH CENY — DOLADIT</div>
      <a className="buy" href="#">Domluvit termín</a>
    </div>

  </div>
</section>

{/* ZDARMA */}
<section id="zdarma">
  <div className="kicker"><span className="dot"></span>Zdarma, bez registrace</div>
  <h2>Nejdřív si <span className="g">osahejte kvalitu</span></h2>
  <p className="sub">Než někomu pošlete peníze, má smysl vědět, jak pracujeme. Tyhle věci jsou zdarma
  a zdarma zůstanou — žádný e-mail výměnou za soubor.</p>

  <div className="free">
    <div className="type">CUBE</div>
    <div className="txt"><h4>Starter LUT — R50 ↔ DJI matching</h4>
    <p>Kalibrační LUT, který srovná materiál z Canonu a dronu do jednoho vzhledu.</p></div>
    <div className="act">Stáhnout</div>
  </div>
  <div className="free">
    <div className="type">SETTING</div>
    <div className="txt"><h4>Ukázkové Fusion makro</h4>
    <p>Jeden přechod z Motion Packu v plné verzi, ať víte, jak jsou makra postavená.</p></div>
    <div className="act">Stáhnout</div>
  </div>
  <div className="free">
    <div className="type">WAV</div>
    <div className="txt"><h4>SFX sampler — 20 zvuků</h4>
    <p>Výběr z knihovny ruchů v plné kvalitě 48 kHz / 24 bit.</p></div>
    <div className="act">Stáhnout</div>
  </div>
  <div className="free">
    <div className="type">PDF</div>
    <div className="txt"><h4>Checklist: příprava na natáčení a předání</h4>
    <p>Dva jednostránkové seznamy, které používáme před každým výjezdem a odevzdáním.</p></div>
    <div className="act">Stáhnout</div>
  </div>
</section>

{/* PROC */}
<section>
  <div className="kicker"><span className="dot"></span>Proč zrovna od nás</div>
  <h2>Všechno tady vzniklo <span className="g">při placené práci</span></h2>
  <div className="grid g3">
    <div className="card">
      <div className="ico i-cy">◎</div>
      <h3>Ověřeno provozem</h3>
      <p>Žádný produkt tu není proto, že se dobře prodává. Každý vznikl, protože jsme ho
      potřebovali na konkrétní zakázce a nikde neexistoval.</p>
    </div>
    <div className="card">
      <div className="ico i-pu">▤</div>
      <h3>Otevřené, ne zamčené</h3>
      <p>Makra i grady dostáváte jako rozebratelné struktury. Můžete se v nich hrabat,
      upravovat je a učit se z nich — to je půlka hodnoty.</p>
    </div>
    <div className="card">
      <div className="ico i-pk">◈</div>
      <h3>Česky a dostupně</h3>
      <p>Dokumentace, podpora i komunikace v češtině. Když něco nefunguje, píšete lidem,
      kteří ten nástroj sami denně používají.</p>
    </div>
  </div>
</section>

{/* FAQ */}
<section>
  <div className="kicker"><span className="dot"></span>Než se zeptáte</div>
  <h2>Časté <span className="g">otázky</span></h2>
  <div style={{ maxWidth: '780px' }}>
    <div className="faq">
      <h4>Funguje to i ve free verzi Resolve?</h4>
      <p>LUTy, PowerGrady a SFX ano. Část Fusion maker a některé skripty vyžadují Studio verzi —
      u každého produktu je to uvedené v popisu ještě před nákupem.</p>
    </div>
    <div className="faq">
      <h4>Co když vyjde nová verze Resolve a něco přestane fungovat?</h4>
      <p>Aktualizace jsou v ceně napořád. Kompatibilitu testujeme po každém větším vydání
      a opravenou verzi dostanete e-mailem, bez doplatku.</p>
    </div>
    <div className="faq">
      <h4>Můžu produkty použít v klientských zakázkách?</h4>
      <p>Ano, licence je komerční a pro jednoho člověka nebo jedno studio bez omezení počtu projektů.
      Nesmí se dál přeprodávat ani šířit jako součást jiného balíčku.</p>
    </div>
    <div className="faq">
      <h4>Co když mi to nesedne?</h4>
      <p>Vrácení peněz do 14 dnů bez udání důvodu. U digitálních produktů to není povinnost,
      ale radši vrátíme peníze, než abychom někoho nechali s věcí, kterou nepoužije.</p>
    </div>
    <div className="faq">
      <h4>Děláte to i na míru?</h4>
      <p>Ano — skript nebo systém přizpůsobený vašemu workflow řešíme jako samostatnou zakázku.
      Napište, co potřebujete, a řekneme, jestli to dává smysl a kolik to bude stát.</p>
    </div>
  </div>
</section>

{/* NEWSLETTER */}
<section>
  <div className="news">
    <h3>Jeden e-mail měsíčně. Nic víc.</h3>
    <p>Nové produkty, aktualizace stávajících a technické poznámky z provozu.
    Bez prodejních sekvencí a bez předávání adresy komukoliv dalšímu.</p>
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        const btn = e.currentTarget.querySelector('button');
        if (btn) btn.textContent = 'Díky!';
      }}
    >
      <input type="email" placeholder="vas@email.cz" required />
      <button type="submit">Odebírat</button>
    </form>
    <small>Odhlásit se dá jedním klikem v každém e-mailu.</small>
  </div>
</section>

{/* STUDIO */}
<div className="close" id="studio">
  <div className="kicker" style={{ justifyContent: 'center' }}><span className="dot"></span>A když potřebujete video</div>
  <h2>Labs jsou nástroje. <span className="g">Studio je práce.</span></h2>
  <p className="lead" style={{ marginBottom: '36px' }}>Všechno tady vzniklo v AsperroStudiu při natáčení a střihu
  pro klienty. Když hledáte tým, který takhle přemýšlí i o vaší zakázce, jsme o jedno kliknutí vedle.</p>
  <div className="btnrow" style={{ marginBottom: '0' }}>
    <Link className="btn btn-p" to="/kontakt">Nezávazná poptávka →</Link>
    <Link className="btn btn-s" to="/portfolio">Portfolio AsperroStudio</Link>
  </div>
</div>


</div></div>


      </div>
    </>
  );
};
