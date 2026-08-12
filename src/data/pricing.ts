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
        desc: 'Pokročilé dynamické titulky, color grading a základní motion grafika.',
        priceFrom: 600,
        priceSuffix: '/ video',
      },
      {
        id: 'shorts-komplex',
        name: 'Komplexní produkce',
        desc: 'Náročné efekty, pokročilá motion grafika a sound design. Obsah, co vyčnívá.',
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
        id: 'shorts-voiceover',
        name: 'Voiceover / mluvené slovo',
        desc: 'Nahrání a zpracování hlasu k videu.',
        priceFrom: 250,
        perUnit: true,
      },
      {
        id: 'shorts-titulky-jazyk',
        name: 'Titulky v dalším jazyce',
        desc: 'Např. anglická verze titulků.',
        priceFrom: 150,
        perUnit: true,
      },
      {
        id: 'shorts-horizontal',
        name: 'Horizontální verze navíc',
        desc: 'Stejné video přizpůsobené pro YouTube / web.',
        priceFrom: 200,
        perUnit: true,
      },
      {
        id: 'shorts-expres',
        name: 'Expresní dodání do 48 h',
        priceFrom: 150,
        perUnit: true,
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
        desc: 'Více kameramanů ze studia, delší stopáž a dodání nezkrácených záznamů v ceně.',
        priceFrom: 30000,
      },
    ],
    addons: [
      {
        id: 'svatba-kameraman',
        name: 'Druhý kameraman',
        desc: 'Více úhlů, žádný ztracený moment.',
        priceFrom: 5000,
        includedIn: ['svatba-premium'],
      },
      {
        id: 'svatba-raw',
        name: 'Nezkrácené záznamy',
        desc: 'Kompletní surové záběry z celého dne.',
        priceFrom: 3000,
        includedIn: ['svatba-premium'],
      },
      {
        id: 'svatba-teaser',
        name: 'Teaser do 24 hodin',
        desc: 'Krátká ochutnávka na sítě hned den po svatbě.',
        priceFrom: 2000,
      },
      {
        id: 'svatba-expres',
        name: 'Expresní dodání do 14 dnů',
        priceFrom: 4000,
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
        desc: 'Natáčecí den s profesionální technikou (kamera, stabilizace). Hodinově od 700 Kč.',
        priceFrom: 5000,
        priceSuffix: '/ natáčecí den',
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
        desc: 'Rozsáhlá produkce s důrazem na prémiový vizuál, storytelling a sound design.',
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
        id: 'firemni-scenar',
        name: 'Scénář a kreativa na míru',
        desc: 'Kompletní příprava konceptu před natáčením.',
        priceFrom: 3000,
      },
      {
        id: 'firemni-social',
        name: 'Vertikální sestřihy pro sítě',
        desc: 'Reels / TikTok verze z natočeného materiálu.',
        priceFrom: 1500,
      },
      {
        id: 'firemni-expres',
        name: 'Expresní dodání',
        priceFrom: 3000,
      },
    ],
  },
  // ----------------------------------------------------------
  {
    id: 'postprodukce',
    name: 'Samostatná postprodukce',
    desc: 'Máte natočeno? Postaráme se o střih, grading, VFX i zvuk. Sazba od 500 Kč / hodina.',
    tierTitle: 'Vyberte rozsah projektu',
    tiers: [
      {
        id: 'post-maly',
        name: 'Menší zakázka',
        desc: 'Cca do 5 hodin práce – kratší střih nebo dílčí úpravy.',
        priceFrom: 2500,
      },
      {
        id: 'post-stredni',
        name: 'Střední projekt',
        desc: 'Cca 5–15 hodin práce – kompletní střih a základní grading.',
        priceFrom: 7500,
      },
      {
        id: 'post-velky',
        name: 'Velký projekt',
        desc: '15+ hodin práce – náročný střih, pokročilá postprodukce.',
        priceFrom: 12000,
      },
    ],
    addons: [
      {
        id: 'post-grading',
        name: 'Pokročilý color grading',
        desc: 'Filmový look laděný ručně v Color page.',
        priceFrom: 1500,
      },
      {
        id: 'post-vfx',
        name: 'VFX a kompozice ve Fusion',
        desc: 'Odstranění objektů, trackování, efekty.',
        priceFrom: 2000,
      },
      {
        id: 'post-sound',
        name: 'Sound design a mix',
        desc: 'Čistý zvuk a úderný mix ve Fairlight.',
        priceFrom: 1500,
      },
      {
        id: 'post-expres',
        name: 'Expresní dodání',
        priceFrom: 2000,
      },
    ],
  },
];

export const formatPrice = (price: number): string =>
  price.toLocaleString('cs-CZ');
