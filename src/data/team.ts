// ============================================================
//  TÝM ASPERROSTUDIO
// ------------------------------------------------------------
//  Jediný soubor, který upravuješ, když chceš změnit editory.
//
//  - Fotku nahraj do  public/team/  (např. martin.jpg)
//    a nastav photo: '/team/martin.jpg'.
//    Dokud je photo: null, zobrazí se kolečko s iniciály.
//  - `instagram` = odkaz na profil editora (zkopíruj z prohlížeče).
//  - Videa: stačí běžný YouTube odkaz.
// ============================================================

export type VideoCategory = 'short' | 'long' | 'motion';
// short  = Krátké formáty (Reels, TikTok, Shorts)
// long   = Dlouhé formáty (YouTube, spoty, filmy)
// motion = Motion grafika (animace, efekty)

export interface TeamVideo {
  title: string;           // Název ukázky (zobrazí se pod videem)
  url: string;             // Odkaz na YouTube
  category: VideoCategory; // 'short' | 'long' | 'motion'
}

export interface TeamMember {
  id: string;                          // použije se v adrese, např. /tym/martin-polacek
  name: string;
  age: number;
  role: string;                        // Postavení ve studiu (zobrazí se pod jménem)
  bio: string;                         // Představení editora (2–4 věty)
  photo: string | null;                // '/team/soubor.jpg' nebo null
  accent: 'cyan' | 'pink' | 'purple';  // Barva profilu
  instagram: string;                   // Odkaz na Instagram
  ico: string | null;                  // IČO editora, např. '12345678' (null = zatím nezobrazovat)
  story?: { title: string; text: string }[]; // Delší představení po kapitolách (nepovinné)
  videos: TeamVideo[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 'martin-polacek',
    name: 'Martin Poláček',
    age: 24,
    role: 'Founder · Kameraman · Editor · Web designer · AI workflow',
    bio: 'Ahoj, jmenuji se Martin. Pocházím z Plzeňského kraje a v současné době působím přímo v Plzni. Už řadu let se naplno věnuji grafickému designu a video editu pod hlavičkou AsperroStudio. Vzhledem k tomu, že do mé kompetence spadá i samotné natáčení, není pro mě problém za zajímavým projektem s kamerou nebo dronem vycestovat v podstatě kamkoliv.',
    photo: '/team/martin.jpg',
    accent: 'cyan',
    instagram: 'https://www.instagram.com/martinpollacek/',
    ico: '24399949',
    story: [
      {
        title: 'Od Movie Makeru k profesionální postprodukci',
        text: 'Moje cesta ke střihu začala u obyčejného programu Movie Maker. Z něj jsem se posunul ke Camtasia Studiu, ale i to mi po čase přestalo stačit. Nakonec jsem se ocitl na rozcestí a rozhodoval se mezi Adobe Premiere a DaVinci Resolve. Jednoduše řečeno – vybral jsem si DaVinci a této volby zdaleka nelituji. Pracuji v něm již několik let a zjišťuji, že možnosti, které nabízí pro střih i vizuální úpravy, jsou takřka neomezené.',
      },
      {
        title: 'Seberozvoj a čistá hlava',
        text: 'Nebojím se investovat – a to jak do spolehlivé techniky, tak především do sebe samotného. Jsem už nějakou dobu členem komunity The 1% a měl jsem možnost účastnit se hned několika jejich akcí. Neustále studuji, hledám nové postupy a snažím se posouvat dál. Kreativní práce vyžaduje soustředění a balanc, a proto se nedílnou součástí mého každodenního života staly také meditace, které mi pomáhají udržet si čistou mysl.',
      },
    ],
    videos: [
      { title: 'Ukázka – krátký formát', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'short' },
      { title: 'Ukázka – dlouhý formát', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'long' },
      { title: 'Ukázka – motion grafika', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'motion' },
      // další video přidáš takhle:
      // { title: 'Název videa', url: 'https://youtu.be/XXXXXXX', category: 'short' },
    ],
  },
  {
    id: 'eva-havrdova',
    name: 'Eva Havrdová',
    age: 22,
    role: 'Editorka',
    bio: 'Ahoj, jmenuji se Evča. Působím v Plzni pod AsperroStudiem. Jsem editorka videí a nejvíce mě baví vytvářet videa pro udržení pozornosti.',
    photo: null,
    accent: 'pink',
    story: [
      {
        title: 'Edit a můj styl',
        text: 'Vytvářím videa, která umí udržet diváky v napětí, jsou kreativní, zábavná a posunou váš obsah na vyšší úroveň. Vynikám v porozumění platformě YouTube, jejím algoritmům a nejnovějším trendům. Ráda ale vytvářím i jiné typy videí — shorty na TikTok a Instagram i long form videa a podcasty. Edituji v DaVinci Resolve už rok; vytvořím hrubý střih, ale také 3D objekty ve Fusionu. Stále se učím novým věcem, proto přijmu jakoukoliv kritiku a ráda se všem vyjdu vstříc k vaší úplné spokojenosti.',
      },
      {
        title: 'Osobní život',
        text: 'V osobním životě se ráda učím novým věcem, především v oblasti sportu a pohybu. Pravidelně chodím do fitka a věnuji se pole dance, které mě baví svou kombinací síly, elegance a disciplíny — celkově mám ráda aktivní životní styl. Kromě toho se starám o dvě chlupaté koule, které mi dělají společnost a přinášejí do každodenního života radost. Ve volném čase také velmi ráda cestuji, poznávám nová místa a kultury a sbírám nové zážitky i inspiraci.',
      },
    ],
    instagram: 'https://www.instagram.com/asperro.studio', // ← nahraď Eviným IG
    ico: '29561876',
    videos: [
      { title: 'Ukázka – krátký formát', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'short' },
      { title: 'Ukázka – dlouhý formát', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'long' },
      { title: 'Ukázka – motion grafika', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'motion' },
    ],
  },
  {
    id: 'vaclav-ivanco',
    name: 'Václav Ivančo',
    age: 22,
    role: 'Editor · AI workflow',
    bio: 'Ahoj, jsem Václav. Pocházím ze Středočeského kraje, kousek od Prahy, a v AsperroStudiu se věnuju střihu videí — s důrazem na to, jak dnešní práci s obrazem umí posunout AI. Nejsem člověk jednoho stylu — baví mě editovat prostě všechno a v každém projektu hledám rovnováhu mezi pečlivostí a rychlostí.',
    photo: null,
    accent: 'purple',
    story: [
      {
        title: 'Jak jsem se do toho dostal',
        text: 'Ke střihu mě přivedl Martin — ukázal mi, o co v tom jde, a chytlo mě to natolik, že jsem se do toho pustil naplno. Naučil jsem se pracovat v DaVinci Resolve a od té doby se v něm zdokonaluju dál. Jsem součástí komunity The 1%.',
      },
      {
        title: 'AI jako součást řemesla',
        text: 'AI beru jako přirozenou součást dnešní postprodukce, ne jako zkratku. Obor se v téhle oblasti posouvá extrémně rychle, a tak i teď aktivně makám na tom, abych v AI workflow držel krok — vždycky je co objevovat a co se naučit nového.',
      },
      {
        title: 'Kam to směřuji',
        text: 'Mám v tomhle oboru velké ambice. Nechci zůstat u drobných zakázek — cílím na to, abych si časem troufl i na fakt velké projekty, které mě posunou dál jako editora i jako kreativce.',
      },
    ],
    instagram: 'https://www.instagram.com/asperro.studio', // ← nahraď Václavovým IG
    ico: '24401013',
    videos: [
      { title: 'Ukázka – krátký formát', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'short' },
      { title: 'Ukázka – dlouhý formát', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'long' },
      { title: 'Ukázka – motion grafika', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'motion' },
    ],
  },
];
