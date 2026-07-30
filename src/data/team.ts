// ============================================================
//  TÝM ASPERROSTUDIO
// ------------------------------------------------------------
//  Tohle je JEDINÝ soubor, který musíš upravovat, když chceš
//  přidat / změnit editora nebo jeho videa.
//
//  JAK PŘIDAT EDITORA:
//  1. Zkopíruj jeden blok { ... } níže a uprav údaje.
//  2. Fotku nahraj do složky  public/team/  (např. martin.jpg)
//     a do pole `photo` napiš '/team/martin.jpg'.
//     Pokud fotku zatím nemáš, nech photo: null — místo ní se
//     zobrazí kolečko s iniciály.
//  3. Do `videos` vlož odkazy na YouTube (stačí normální odkaz
//     z prohlížeče, např. https://www.youtube.com/watch?v=XXXX
//     nebo zkrácený https://youtu.be/XXXX).
// ============================================================

export interface TeamVideo {
  title: string;   // Název ukázky (zobrazí se pod videem)
  url: string;     // Odkaz na YouTube
}

export interface TeamMember {
  id: string;                       // unikátní, malými písmeny, bez diakritiky (použije se v adrese)
  name: string;                     // Jméno editora
  role: string;                     // Specializace, např. „Střih & Motion Design"
  bio: string;                      // Krátké představení (2–3 věty)
  photo: string | null;             // '/team/soubor.jpg' nebo null
  accent: 'cyan' | 'pink' | 'purple'; // Barva karty (ladí s webem)
  socials?: {
    youtube?: string;
    instagram?: string;
    tiktok?: string;
  };
  videos: TeamVideo[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 'editor-1',
    name: 'Jméno Editora',
    role: 'Střih & Postprodukce',
    bio: 'Sem napiš krátké představení editora — čemu se věnuje, jaký má styl a co ho baví. Dvě až tři věty stačí.',
    photo: null, // ← až budeš mít fotku: '/team/editor-1.jpg'
    accent: 'cyan',
    socials: {
      youtube: 'https://www.youtube.com/@Asperro.Studio',
    },
    videos: [
      {
        title: 'Ukázka práce',
        url: 'https://www.youtube.com/watch?v=uTmfflJWOvM',
      },
      // ← další videa přidáš takhle:
      // { title: 'Reklamní spot XY', url: 'https://youtu.be/XXXXXXX' },
    ],
  },
  {
    id: 'editor-2',
    name: 'Jméno Editora',
    role: 'Motion Design & Grafika',
    bio: 'Sem napiš krátké představení druhého editora. Text i videa upravíš v souboru src/data/team.ts.',
    photo: null,
    accent: 'pink',
    videos: [
      {
        title: 'Ukázka práce',
        url: 'https://www.youtube.com/watch?v=uTmfflJWOvM',
      },
    ],
  },
];
