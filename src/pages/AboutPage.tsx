import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  VideoCameraIcon,
  ComputerDesktopIcon,
  FolderOpenIcon,
  PhotoIcon,
  ScissorsIcon,
  FilmIcon,
  SparklesIcon,
  SwatchIcon,
  SpeakerWaveIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';

// ------------------------------------------------------------
// Sekce DaVinci Resolve Studio – „had" jako na hlavní stránce.
// Ikony odpovídají významu jednotlivých stránek programu.
// ------------------------------------------------------------
const DAVINCI_PAGES = [
  {
    icon: FolderOpenIcon,
    name: 'Media',
    subtitle: 'Organizace a příprava na prvním místě',
    desc: 'Základ každého úspěšného projektu spočívá v perfektním pořádku. V Media page importujeme, třídíme a připravujeme veškeré zdrojové soubory z natáčení. Všechna videa, zvukové stopy a grafika zde dostávají přesná metadata a logickou strukturu. Díky tomu náš tým neztrácí čas hledáním, ale může se od první chvíle plně soustředit na tvůrčí proces.',
    color: 'text-cyan-400',
    dot: 'from-cyan-400 to-cyan-600 shadow-cyan-500/40',
  },
  {
    icon: PhotoIcon,
    name: 'Photo',
    subtitle: 'Precizní práce se statickým vizuálem',
    desc: 'Ačkoliv se zaměřujeme na pohyblivý obraz, perfektně si poradíme i se začleněním statických prvků. V této fázi integrujeme vaše produktové fotografie, loga nebo dodanou grafiku přímo do projektu. Nastavujeme jim správné rozlišení a připravujeme je pro další animaci či barvení tak, aby přirozeně a profesionálně splynuly s celkovým video obsahem.',
    color: 'text-cyan-300',
    dot: 'from-cyan-300 to-cyan-500 shadow-cyan-400/40',
  },
  {
    icon: ScissorsIcon,
    name: 'Cut',
    subtitle: 'Rychlá montáž a hrubý sestřih',
    desc: 'Rychlost je klíčová, obzvlášť u dynamických formátů na sociální sítě. Cut page nám slouží pro bleskovou selekci těch nejlepších záběrů z natáčení a tvorbu hrubého sestřihu (rough cut). Díky zjednodušenému rozhraní a chytrým nástrojům tu dokážeme okamžitě oddělit zrno od plev a postavit pevnou základní kostru vašeho videa.',
    color: 'text-teal-400',
    dot: 'from-teal-400 to-teal-600 shadow-teal-500/40',
  },
  {
    icon: FilmIcon,
    name: 'Edit',
    subtitle: 'Rytmus, preciznost a dokonalý storytelling',
    desc: 'Srdce celé naší postprodukce. Zde dáváme hrubému sestřihu finální rytmus a strukturu. Pracujeme s nejpokročilejšími nástroji pro nelineární střih. Ať už skládáme rychlé formáty, nebo rozsáhlé promo video, v Edit page tvoříme ucelený příběh, který udrží divákovu pozornost od první do poslední vteřiny.',
    color: 'text-purple-400',
    dot: 'from-purple-400 to-purple-600 shadow-purple-500/40',
  },
  {
    icon: SparklesIcon,
    name: 'Fusion',
    subtitle: 'Pokročilé VFX a motion grafika bez hranic',
    desc: 'Místo, kde posouváme realitu. Fusion je náš nástroj pro tvorbu špičkových vizuálních efektů, složitých animací a kompozic přímo uvnitř videa. Od precizního odstraňování nechtěných objektů přes pokročilé trackování až po komplexní holografické efekty – přesně tady vznikají vizuály, které diváky posadí do židle a dodají videu moderní drive.',
    color: 'text-violet-400',
    dot: 'from-violet-400 to-violet-600 shadow-violet-500/40',
  },
  {
    icon: SwatchIcon,
    name: 'Color',
    subtitle: 'Filmový look a atmosféra, která prodává',
    desc: 'Nejsilnější nástroj pro barvení na světě, který standardně využívají i hollywoodská studia. V Color page neděláme jen základní úpravu jasu a kontrastu; tvoříme vizuální identitu vašeho videa. Vytáhneme z každého pixelu maximum, sjednotíme tóny a dodáme záběrům hloubku a prémiový „look", díky kterému vaše značka okamžitě vynikne.',
    color: 'text-pink-400',
    dot: 'from-pink-400 to-pink-600 shadow-pink-500/40',
  },
  {
    icon: SpeakerWaveIcon,
    name: 'Fairlight',
    subtitle: 'Křišťálově čistý zvuk a profi sound design',
    desc: 'Dokonalé video tvoří z 50 % zvuk. Fairlight nám poskytuje plnohodnotné zvukové studio přímo v projektu. Čistíme zde nechtěné ruchy z mikrofonů, precizně mícháme mluvené slovo a tvoříme úderný sound design na míru. Každý obrazový střih tak podpoříme zvukovými efekty, které dají videu tu správnou dynamiku a emoci.',
    color: 'text-rose-400',
    dot: 'from-rose-400 to-rose-600 shadow-rose-500/40',
  },
  {
    icon: RocketLaunchIcon,
    name: 'Deliver',
    subtitle: 'Finální export v nejvyšší kvalitě',
    desc: 'Poslední krok, než video zamíří k vám. V Deliver page pečlivě kontrolujeme veškeré parametry a renderujeme finální výstup přesně na míru vašim potřebám. Ať už potřebujete vysoce kvalitní master soubor, komprimované video pro web, nebo specifické vertikální formáty pro sociální sítě, zaručíme bezchybný export připravený k okamžitému zveřejnění.',
    color: 'text-pink-300',
    dot: 'from-pink-300 to-pink-500 shadow-pink-400/40',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

export const AboutPage = () => {
  return (
    <>
      <SEO
        title="O nás"
        description="AsperroStudio – sehraný tříčlenný tým videotvůrců. Kompletní videoprodukce od natáčení po postprodukci v DaVinci Resolve Studio."
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-20">
        {/* Background – jemné záře ve firemních barvách */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[128px]" />
        </div>

        <Container className="relative z-10">
          {/* ===== Kdo jsme? ===== */}
          <motion.div className="text-center max-w-3xl mx-auto mb-10" {...fadeUp}>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Kdo jsme?
            </h1>
            <p className="text-xl md:text-2xl font-display font-semibold bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Kreativci, kteří nedělají průměrný obsah.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-5 text-gray-200 text-base md:text-lg leading-relaxed mb-20"
            {...fadeUp}
          >
            <p>
              Nejsme jen továrna na rychlý střih. AsperroStudio je sehraný
              tříčlenný tým, který věří, že v dnešní záplavě obsahu přežije jen
              to video, které dokáže diváka okamžitě zastavit.
            </p>
            <p>
              Propojujeme precizní natáčení s pokročilou postprodukcí. Od
              dynamických vertikálních formátů pro sociální sítě až po vizuálně
              promakaná promo videa s perfektním sound designem a VFX efekty.
              Nezáleží na tom, jestli zrovna letíme s dronem, chytáme stabilní
              záběry na bezzrcadlovku, nebo sedíme u motion grafiky – náš cíl je
              vždy stejný: odvyprávět příběh vaší značky tak, aby rezonoval a
              prodával.
            </p>
            <p>
              Neschováváme se za korporátní fráze. Zakládáme si na moderním
              vizuálu, osobním přístupu, spolehlivosti a energii, kterou dáváme
              do každého frameu.
            </p>
            <p className="font-semibold text-white">
              Jsme AsperroStudio. Tvoříme obsah, který má drive.
            </p>
          </motion.div>

          {/* ===== Kompletní videoprodukce ===== */}
          <motion.div
            className="max-w-3xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-7 md:p-10 mb-20"
            {...fadeUp}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-lg shadow-cyan-500/25">
                <VideoCameraIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display">
                  Kompletní videoprodukce
                </h2>
                <p className="text-cyan-400 font-medium">
                  Nejen stříháme, my váš příběh i natočíme
                </p>
              </div>
            </div>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed">
              Nečekáme jen u počítačů na to, až nám někdo pošle natočený
              materiál. AsperroStudio zajišťuje kompletní produkci přímo na
              place. Od prvotní kreativy přes samotnou akci až po finální
              export. Náš sehraný tříčlenný tým je připraven vyrazit za vámi a
              zachytit váš brand v tom nejlepším možném světle – ať už jde o
              rychlé formáty na sítě, nebo atmosférické promo.
            </p>
          </motion.div>

          {/* ===== Hollywoodský standard ===== */}
          <motion.div
            className="max-w-3xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-7 md:p-10 mb-20"
            {...fadeUp}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 text-white shadow-lg shadow-pink-500/25">
                <ComputerDesktopIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display">
                  V čem tvoříme?
                </h2>
                <p className="text-pink-400 font-medium">Hollywoodský standard.</p>
              </div>
            </div>
            <div className="text-gray-200 text-base md:text-lg leading-relaxed space-y-4">
              <p>
                Celá postprodukce v AsperroStudiu běží na DaVinci Resolve
                Studio. Není to jen střihačský program – je to nejvýkonnější
                ekosystém na trhu, který tvoří standard i u těch největších
                filmových trháků.
              </p>
              <p>
                Tento software nám dává obrovskou technologickou výhodu.
                Umožňuje našemu tříčlennému týmu pracovat na projektu současně,
                zrychlovat rutinní procesy pomocí vlastních automatizačních
                skriptů a nedělat absolutně žádné kompromisy v kvalitě. Celou
                postprodukci tak držíme pod jednou střechou.
              </p>
              <p>
                Abychom z vašich záběrů vytáhli naprosté maximum, prochází u
                nás video těmito specializovanými sekcemi:
              </p>
            </div>
          </motion.div>

          {/* ===== Had: DaVinci Resolve sekce ===== */}
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              A co DaVinci Resolve Studio{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                vlastně umí?
              </span>
            </h2>
          </motion.div>

          {/* Zakroucený had – vlnovka s kartami střídavě po stranách */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vlnitá čára v pozadí (jen na větších obrazovkách) */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full hidden md:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path
                d="M 50 0
                   C 85 6, 85 19, 50 25
                   C 15 31, 15 44, 50 50
                   C 85 56, 85 69, 50 75
                   C 15 81, 15 94, 50 100"
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="0.5"
                strokeDasharray="2 1.5"
                opacity="0.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />
            </svg>

            {/* Svislá čára pro mobil */}
            <div
              aria-hidden="true"
              className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 opacity-60 md:hidden"
            />

            <ol className="relative space-y-10 md:space-y-0">
              {DAVINCI_PAGES.map((page, index) => {
                const Icon = page.icon;
                const isLeft = index % 2 === 0;
                return (
                  <motion.li
                    key={page.name}
                    className={`relative md:w-[46%] md:py-6 ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                    initial={{ opacity: 0, y: 30, rotate: isLeft ? -2 : 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55 }}
                  >
                    {/* Bod na čáře – jen mobil */}
                    <div
                      aria-hidden="true"
                      className={`absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${page.dot} shadow-lg ring-4 ring-dark md:hidden`}
                    />

                    <div
                      className={`ml-14 md:ml-0 relative rounded-3xl bg-dark-50/80 backdrop-blur border border-white/10 hover:border-white/25 transition-colors p-6 md:p-7 pt-10 md:pt-12 text-center`}
                    >
                      {/* Ikona v bublině přesahující kartu */}
                      <div
                        className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl rotate-45 bg-gradient-to-br ${page.dot} shadow-lg flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 -rotate-45 text-white" />
                      </div>

                      <span className="text-xs uppercase tracking-[0.25em] text-gray-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold font-display mt-1">
                        {page.name}
                      </h3>
                      <p className={`${page.color} text-sm font-medium mt-1 mb-3`}>
                        {page.subtitle}
                      </p>
                      <p className="text-gray-200 text-base leading-relaxed text-left">
                        {page.desc}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* ===== CTA ===== */}
          <motion.div className="text-center mt-20" {...fadeUp}>
            <p className="text-gray-300 mb-5">
              Chcete video, které má drive? Napište nám.
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Nezávazná poptávka
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </Container>
      </div>
    </>
  );
};
