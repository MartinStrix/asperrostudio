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

export interface TeamVideo {
  title: string;   // Název ukázky (zobrazí se pod videem)
  url: string;     // Odkaz na YouTube
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
  videos: TeamVideo[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 'martin-polacek',
    name: 'Martin Poláček',
    age: 24,
    bio: 'Sem doplň Martinovo představení — čemu se ve střihu věnuje, jaký má styl a co ho baví. Dvě až čtyři věty stačí.',
    photo: null, // ← až bude fotka: '/team/martin.jpg'
    accent: 'cyan',
    instagram: 'https://www.instagram.com/asperro.studio', // ← nahraď Martinovým IG
    ico: null, // ← až budeš mít: '12345678'
    videos: [
      { title: 'Ukázka práce', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM' },
      // další video přidáš takhle:
      // { title: 'Název videa', url: 'https://youtu.be/XXXXXXX' },
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
    ico: null,
    videos: [
      { title: 'Ukázka práce', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM' },
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
    ico: null,
    videos: [
      { title: 'Ukázka práce', url: 'https://www.youtube.com/watch?v=uTmfflJWOvM' },
    ],
  },
];
