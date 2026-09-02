// ============================================================
//  CENÍK – DATA PRO KALKULAČKU
// ------------------------------------------------------------
//  Ceny nastavené podle průzkumu trhu (léto 2026) pro
//  ambiciózní semi-pro tým: viditelně dostupnější než velké
//  agentury, ale ne podezřele levné. Vše "od" – finální
//  nabídka vzniká na konzultaci zdarma.
//  Podrobné vysvětlení cen máš v souboru cenik-noty (jen pro tebe).
//
//  - priceFrom  = cena "od" v Kč
//  - perUnit    = cena se násobí počtem videí (krátké formáty)
//  - includedIn = ID variant, kde je doplněk už v ceně
// ============================================================

export interface PricingTier {
  id: string;
  name: string;
  desc: string;
  priceFrom: number;
  priceSuffix?: string;
}

export interface PricingAddon {
  id: string;
  name: string;
  desc?: string;
  priceFrom: number;
  perUnit?: boolean;
  includedIn?: string[];
}

export interface QuantityOption {
  count: number;
  label: string;
  note?: string;
}

export interface PricingCategory {
  id: string;
  name: string;
  desc: string;
  tierTitle: string;
  tiers: PricingTier[];
  quantities?: QuantityOption[];
  addons: PricingAddon[];
}

export const PRICING_CATEGORIES: PricingCategory[] = [
  // ----------------------------------------------------------
  {
    id: 'shorts',
    name: 'Krátké formáty',
    desc: 'Reels, TikTok, YouTube Shorts – obsah, který zastaví scrollování.',
    tierTitle: 'Vyberte úroveň zpracování',
    tiers: [
      {
        id: 'shorts-zakladni',
        name: 'Základní rychlý střih',
        desc: 'Střih, hudba a plynulé přechody. Ideální na pravidelný obsah.',
        priceFrom: 250,
        priceSuffix: '/ video',
      },
      {
        id: 'shorts-standard',
        name: 'Standardní produkce',
        desc: 'Dynamické titulky, color grading, základní motion grafika i horizontální verze — vše v ceně.',
        priceFrom: 550,
        priceSuffix: '/ video',
      },
      {
        id: 'shorts-komplex',
        name: 'Komplexní produkce',
        desc: 'Náročné efekty, pokročilá motion grafika, sound design, voiceover i titulky v dalším jazyce — vše v ceně.',
        priceFrom: 950,
        priceSuffix: '/ video',
      },
    ],
    quantities: [
      { count: 1, label: '1 video', note: 'na vyzkoušení' },
      { count: 3, label: '3 videa' },
      { count: 5, label: '5 videí' },
      { count: 10, label: '10 videí / měsíc', note: 'měsíční balíček pro dlouhodobou spolupráci' },
    ],
    addons: [
      {
        id: 'shorts-nataceni',
        name: 'Natočení materiálu u vás',
        desc: 'Přijedeme a natočíme podklady přímo na místě.',
        priceFrom: 2500,
      },
      {
        id: 'shorts-dron',
        name: 'Záběry z dronu',
        desc: 'Letecké záběry pro působivější obsah.',
        priceFrom: 2500,
      },
      {
        id: 'shorts-expres',
        name: 'Expresní dodání',
        desc: 'Přednostní zpracování vašich videí.',
        priceFrom: 500,
      },
    ],
  },
  // ----------------------------------------------------------
  {
    id: 'firemni',
    name: 'Firemní & reklamní video',
    desc: 'Promo, spoty a prezentace — video, které vaši značku prodává.',
    tierTitle: 'Vyberte typ projektu',
    tiers: [
      {
        id: 'firemni-den',
        name: 'Kameramanské práce na lokaci',
        desc: 'Natáčení s profesionální technikou — event, rozhovory, záběry provozu.',
        priceFrom: 4500,
      },
      {
        id: 'firemni-promo',
        name: 'Promo / spot pro sociální sítě',
        desc: 'Kompletní proces od scénáře přes natáčení po finální video. Ideální pro menší podniky a kampaně na sítích.',
        priceFrom: 7500,
      },
      {
        id: 'firemni-image',
        name: 'Image video / velký spot',
        desc: 'Rozsáhlá produkce s důrazem na prémiový vizuál a storytelling — scénář, voiceover i vertikální sestřihy v ceně.',
        priceFrom: 16000,
      },
    ],
    addons: [
      {
        id: 'firemni-dron',
        name: 'Záběry z dronu',
        desc: 'Letecké záběry, které dodají produkci velkolepost.',
        priceFrom: 2500,
      },
      {
        id: 'firemni-scenar',
        name: 'Scénář a kreativa na míru',
        desc: 'Kompletní příprava konceptu před natáčením.',
        priceFrom: 2500,
        includedIn: ['firemni-promo', 'firemni-image'],
      },
      {
        id: 'firemni-voiceover',
        name: 'Profesionální voiceover',
        priceFrom: 1200,
        includedIn: ['firemni-image'],
      },
      {
        id: 'firemni-social',
        name: 'Vertikální sestřihy pro sítě',
        desc: 'Reels / TikTok verze z natočeného materiálu.',
        priceFrom: 1500,
        includedIn: ['firemni-image'],
      },
      {
        id: 'firemni-expres',
        name: 'Expresní dodání',
        desc: 'Přednostní zpracování projektu.',
        priceFrom: 1200,
      },
    ],
  },
  // ----------------------------------------------------------
  {
    id: 'svatba',
    name: 'Svatební video',
    desc: 'Váš nejkrásnější den zachycený tak, aby vydržel navždy. Natáčení i střih.',
    tierTitle: 'Vyberte balíček',
    tiers: [
      {
        id: 'svatba-puldenni',
        name: 'Základní balíček (půldenní)',
        desc: 'Natáčení obřadu a hostiny, tvorba 3–5minutového svatebního klipu.',
        priceFrom: 10000,
      },
      {
        id: 'svatba-celodenni',
        name: 'Standard (celodenní)',
        desc: 'Kompletní den od příprav po párty včetně záběrů z dronu. Delší video + krátký highlight klip.',
        priceFrom: 16500,
      },
      {
        id: 'svatba-premium',
        name: 'Prémiový balíček',
        desc: 'Více kameramanů, delší stopáž, dron, teaser i nezkrácené záznamy v ceně.',
        priceFrom: 26000,
      },
    ],
    addons: [
      {
        id: 'svatba-dron',
        name: 'Záběry z dronu',
        desc: 'Letecké záběry místa i okolí.',
        priceFrom: 2500,
        includedIn: ['svatba-celodenni', 'svatba-premium'],
      },
      {
        id: 'svatba-kameraman',
        name: 'Druhý kameraman',
        desc: 'Více úhlů, žádný ztracený moment.',
        priceFrom: 4500,
        includedIn: ['svatba-premium'],
      },
      {
        id: 'svatba-teaser',
        name: 'Teaser hned po svatbě',
        desc: 'Krátká ochutnávka na sítě, dokud emoce žijí.',
        priceFrom: 2000,
        includedIn: ['svatba-premium'],
      },
      {
        id: 'svatba-expres',
        name: 'Expresní dodání',
        desc: 'Přednostní zpracování vašeho filmu.',
        priceFrom: 2000,
      },
    ],
  },
  // ----------------------------------------------------------
  {
    id: 'postprodukce',
    name: 'Samostatná postprodukce',
    desc: 'Máte natočeno? Postaráme se o střih, grading, VFX i zvuk.',
    tierTitle: 'Vyberte rozsah projektu',
    tiers: [
      {
        id: 'post-maly',
        name: 'Menší zakázka',
        desc: 'Kratší střih nebo dílčí úpravy vašeho materiálu.',
        priceFrom: 2000,
      },
      {
        id: 'post-stredni',
        name: 'Střední projekt',
        desc: 'Kompletní střih a základní color grading v ceně.',
        priceFrom: 6500,
      },
      {
        id: 'post-velky',
        name: 'Velký projekt',
        desc: 'Náročný střih — pokročilý color grading, VFX i sound design v ceně.',
        priceFrom: 11000,
      },
    ],
    addons: [
      {
        id: 'post-nataceni',
        name: 'Dotáčky na lokaci',
        desc: 'Chybí záběry? Přijedeme je natočit.',
        priceFrom: 2500,
      },
      {
        id: 'post-dron',
        name: 'Záběry z dronu',
        desc: 'Doplnění projektu o letecké záběry.',
        priceFrom: 2500,
      },
      {
        id: 'post-expres',
        name: 'Expresní dodání',
        desc: 'Přednostní zpracování projektu.',
        priceFrom: 1000,
      },
    ],
  },
  // ----------------------------------------------------------
  {
    id: 'namiru',
    name: 'Projekt na míru (od A do Z)',
    desc: 'Kompletně volitelný projekt — poskládáte si přesně to, co potřebujete.',
    tierTitle: 'Vyberte základ projektu',
    tiers: [
      {
        id: 'namiru-post',
        name: 'Pouze postprodukce',
        desc: 'Materiál dodáte vy, my zajistíme kompletní zpracování.',
        priceFrom: 2000,
      },
      {
        id: 'namiru-nataceni',
        name: 'Natáčení + postprodukce',
        desc: 'Natočíme i zpracujeme. Klasická kompletní zakázka.',
        priceFrom: 7000,
      },
      {
        id: 'namiru-komplet',
        name: 'Kompletní produkce od scénáře',
        desc: 'Od prvotní kreativy a scénáře přes natáčení až po finální video.',
        priceFrom: 11000,
      },
    ],
    addons: [
      {
        id: 'namiru-dron',
        name: 'Záběry z dronu',
        desc: 'Letecké záběry k projektu.',
        priceFrom: 2500,
      },
      {
        id: 'namiru-scenar',
        name: 'Scénář a kreativa na míru',
        priceFrom: 2500,
        includedIn: ['namiru-komplet'],
      },
      {
        id: 'namiru-motion',
        name: 'Motion grafika a animace',
        desc: 'Animovaná loga, infografiky, dynamické prvky.',
        priceFrom: 2000,
      },
      {
        id: 'namiru-grading',
        name: 'Pokročilý color grading',
        desc: 'Filmový look laděný ručně v Color page.',
        priceFrom: 1500,
      },
      {
        id: 'namiru-vfx',
        name: 'VFX a kompozice ve Fusion',
        desc: 'Odstranění objektů, trackování, efekty.',
        priceFrom: 2000,
      },
      {
        id: 'namiru-sound',
        name: 'Sound design a mix',
        desc: 'Čistý zvuk a úderný mix ve Fairlight.',
        priceFrom: 1500,
      },
      {
        id: 'namiru-voiceover',
        name: 'Profesionální voiceover',
        priceFrom: 1200,
      },
      {
        id: 'namiru-titulky',
        name: 'Titulky (i další jazyky)',
        priceFrom: 1000,
      },
      {
        id: 'namiru-social',
        name: 'Vertikální verze pro sítě',
        desc: 'Reels / TikTok sestřihy z projektu.',
        priceFrom: 1500,
      },
      {
        id: 'namiru-expres',
        name: 'Expresní dodání',
        desc: 'Přednostní zpracování projektu.',
        priceFrom: 1200,
      },
    ],
  },
];

// ============================================================
//  SLEVOVÉ / PROMO KÓDY
// ------------------------------------------------------------
//  Akci spustíš přidáním řádku, ukončíš jeho smazáním.
//  - code            = kód, který zadá klient (na velikosti
//                      písmen nezáleží)
//  - discountPercent = sleva v procentech z celkové ceny
//  - label           = interní popisek (zobrazí se u slevy)
// ============================================================
export interface PromoCode {
  code: string;
  discountPercent: number;
  label?: string;
}

export const PROMO_CODES: PromoCode[] = [
  { code: 'OpenAS2026', discountPercent: 25, label: 'Uvítací akce' },
  { code: 'AS10', discountPercent: 10 },
  { code: 'MartinEdit15', discountPercent: 15, label: 'Martin' },
  { code: 'VaclavEdit15', discountPercent: 15, label: 'Václav' },
  { code: 'EvaEdit15', discountPercent: 15, label: 'Eva' },
  { code: 'ASEdit15', discountPercent: 15, label: 'AsperroStudio' },
  // další akce přidáš takhle:
  // { code: 'LETO2026', discountPercent: 15, label: 'Letní akce' },
];

export const findPromoCode = (input: string): PromoCode | undefined =>
  PROMO_CODES.find(
    (promo) => promo.code.trim().toLowerCase() === input.trim().toLowerCase()
  );

export const formatPrice = (price: number): string =>
  price.toLocaleString('cs-CZ');
