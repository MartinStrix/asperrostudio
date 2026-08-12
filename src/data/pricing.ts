// ============================================================
//  CENÍK – DATA PRO KALKULAČKU
// ------------------------------------------------------------
//  Všechny ceny a texty kalkulačky upravuješ TADY.
//  Ceny jsou vždy "od" – finální nabídka vzniká na konzultaci.
//
//  - priceFrom  = cena "od" v Kč
//  - perUnit    = true → cena se násobí počtem videí
//                 (má smysl jen u krátkých formátů)
//  - includedIn = ID variant, ve kterých je doplněk už v ceně
//                 (pak se nepřičítá a zobrazí se "v ceně")
// ============================================================

export interface PricingTier {
  id: string;
  name: string;
  desc: string;
  priceFrom: number;
  priceSuffix?: string; // např. '/ video'
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
    desc: 'Reels, TikTok, YouTube Shorts – dynamický obsah, který zastaví scrollování.',
    tierTitle: 'Vyberte úroveň zpracování',
    tiers: [
      {
        id: 'shorts-zakladni',
        name: 'Základní rychlý střih',
        desc: 'Jednoduchý střih, hudba a plynulé přechody. Ideální na pravidelný obsah.',
        priceFrom: 250,
        priceSuffix: '/ video',
      },
      {
        id: 'shorts-standard',
        name: 'Standardní produkce',
        desc: 'Dynamické titulky, color grading, základní motion grafika i horizontální verze — vše v ceně.',
        priceFrom: 600,
        priceSuffix: '/ video',
      },
      {
        id: 'shorts-komplex',
        name: 'Komplexní produkce',
        desc: 'Náročné efekty, pokročilá motion grafika, sound design, voiceover i titulky v dalším jazyce — vše v ceně.',
        priceFrom: 1000,
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
        priceFrom: 3000,
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
    id: 'reklama',
    name: 'Reklama',
    desc: 'Reklamní spoty, které zaujmou a prodávají – pro sítě, web i kampaně.',
    tierTitle: 'Vyberte typ reklamy',
    tiers: [
      {
        id: 'reklama-social',
        name: 'Reklamní spot pro sociální sítě',
        desc: 'Krátký úderný spot pro výkonnostní kampaně — verze pro jednotlivé sítě v ceně.',
        priceFrom: 6000,
      },
      {
        id: 'reklama-online',
        name: 'Online / TV reklamní spot',
        desc: 'Plnohodnotný spot — scénář, natáčení, postprodukce i profesionální voiceover v ceně.',
        priceFrom: 15000,
      },
      {
        id: 'reklama-kampan',
        name: 'Prémiová kampaň',
        desc: 'Sada spotů a formátů pro celou kampaň — scénář, natáčení, voiceover i verze pro sítě v ceně.',
        priceFrom: 30000,
      },
    ],
    addons: [
      {
        id: 'reklama-nataceni',
        name: 'Natáčení na lokaci',
        desc: 'Natočení materiálu s profesionální technikou.',
        priceFrom: 3000,
        includedIn: ['reklama-online', 'reklama-kampan'],
      },
      {
        id: 'reklama-dron',
        name: 'Záběry z dronu',
        desc: 'Letecké záběry, které dodají spotu velkolepost.',
        priceFrom: 2500,
      },
      {
        id: 'reklama-scenar',
        name: 'Scénář a kreativa na míru',
        desc: 'Kompletní příprava konceptu spotu.',
        priceFrom: 3000,
        includedIn: ['reklama-online', 'reklama-kampan'],
      },
      {
        id: 'reklama-voiceover',
        name: 'Profesionální voiceover',
        priceFrom: 1500,
        includedIn: ['reklama-online', 'reklama-kampan'],
      },
      {
        id: 'reklama-social-verze',
        name: 'Vertikální verze pro sítě',
        desc: 'Reels / TikTok sestřihy ze spotu.',
        priceFrom: 1500,
        includedIn: ['reklama-social', 'reklama-kampan'],
      },
      {
        id: 'reklama-expres',
        name: 'Expresní dodání',
        desc: 'Přednostní zpracování projektu.',
        priceFrom: 500,
      },
    ],
  },
  // ----------------------------------------------------------
  {
    id: 'firemni',
    name: 'Firemní & promo video',
    desc: 'Podniky, služby a eventy. Video, které představí vaši značku profesionálně.',
    tierTitle: 'Vyberte typ projektu',
    tiers: [
      {
        id: 'firemni-den',
        name: 'Kameramanské práce na lokaci',
        desc: 'Natáčení s profesionální technikou – event, rozhovory, záběry provozu.',
        priceFrom: 5000,
      },
      {
        id: 'firemni-promo',
        name: 'Menší promo video',
        desc: 'Např. pro kavárnu či službu. Kompletní proces od scénáře přes natáčení po finální video.',
        priceFrom: 8000,
      },
      {
        id: 'firemni-image',
        name: 'Korporátní image video',
        desc: 'Rozsáhlá produkce — prémiový vizuál, storytelling, sound design i vertikální sestřihy pro sítě v ceně.',
        priceFrom: 20000,
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
        priceFrom: 500,
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
        priceFrom: 18000,
      },
      {
        id: 'svatba-premium',
        name: 'Prémiový balíček',
        desc: 'Více kameramanů ze studia, delší stopáž, dron i dodání nezkrácených záznamů v ceně.',
        priceFrom: 30000,
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
        priceFrom: 5000,
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
        priceFrom: 500,
      },
    ],
  },
  // ----------------------------------------------------------
  {
    id: 'postprodukce',
    name: 'Samostatná postprodukce',
    desc: 'Máte natočeno? Postaráme se o střih, grading, VFX i zvuk ve špičkové kvalitě.',
    tierTitle: 'Vyberte rozsah projektu',
    tiers: [
      {
        id: 'post-maly',
        name: 'Menší zakázka',
        desc: 'Kratší střih nebo dílčí úpravy vašeho materiálu.',
        priceFrom: 2500,
      },
      {
        id: 'post-stredni',
        name: 'Střední projekt',
        desc: 'Kompletní střih a základní color grading v ceně.',
        priceFrom: 7500,
      },
      {
        id: 'post-velky',
        name: 'Velký projekt',
        desc: 'Náročný střih — pokročilý color grading, VFX i sound design v ceně.',
        priceFrom: 12000,
      },
    ],
    addons: [
      {
        id: 'post-nataceni',
        name: 'Dotáčky na lokaci',
        desc: 'Chybí záběry? Přijedeme je natočit.',
        priceFrom: 3000,
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
        priceFrom: 500,
      },
    ],
  },
  // ----------------------------------------------------------
  {
    id: 'namiru',
    name: 'Projekt na míru (od A do Z)',
    desc: 'Kompletně volitelný projekt – sami si poskládáte přesně to, co potřebujete.',
    tierTitle: 'Vyberte základ projektu',
    tiers: [
      {
        id: 'namiru-post',
        name: 'Pouze postprodukce',
        desc: 'Materiál dodáte vy, my zajistíme kompletní zpracování.',
        priceFrom: 2500,
      },
      {
        id: 'namiru-nataceni',
        name: 'Natáčení + postprodukce',
        desc: 'Natočíme i zpracujeme. Klasická kompletní zakázka.',
        priceFrom: 8000,
      },
      {
        id: 'namiru-komplet',
        name: 'Kompletní produkce od scénáře',
        desc: 'Od prvotní kreativy a scénáře přes natáčení až po finální video.',
        priceFrom: 12000,
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
        priceFrom: 3000,
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
        priceFrom: 1500,
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
        priceFrom: 500,
      },
    ],
  },
];

export const formatPrice = (price: number): string =>
  price.toLocaleString('cs-CZ');
