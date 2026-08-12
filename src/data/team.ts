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
    bio: 'Sem doplň Evino představení — specializace, styl, co ji na tvorbě baví.',
    photo: null,
    accent: 'pink',
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
    bio: 'Sem doplň Václavovo představení — specializace, styl, co ho na tvorbě baví.',
    photo: null,
    accent: 'purple',
    instagram: 'https://www.instagram.com/asperro.studio', // ← nahraď Václavovým IG
    ico: '24401013',
    videos: [
      { title: 'Ukázka – krátký formát', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'short' },
      { title: 'Ukázka – dlouhý formát', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'long' },
      { title: 'Ukázka – motion grafika', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM', category: 'motion' },
    ],
  },
];
