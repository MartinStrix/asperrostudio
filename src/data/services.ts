import {
  FilmIcon,
  BuildingOfficeIcon,
  HeartIcon,
  VideoCameraIcon,
  CalendarIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

export interface Service {
  id: string;
  icon: typeof FilmIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'reklamni-spoty',
    icon: FilmIcon,
    title: 'Reklamní spoty',
    description: 'Profesionální reklamní videa pro televizní a online kampaně, která zaujmou a prodávají.',
  },
  {
    id: 'firemni-videa',
    icon: BuildingOfficeIcon,
    title: 'Firemní videa',
    description: 'Prezentační a školicí videa pro vaši firmu. Představte svůj tým a služby profesionálně.',
  },
  {
    id: 'svatebni-video',
    icon: HeartIcon,
    title: 'Svatební video',
    description: 'Zachytíme váš nejkrásnější den v životě. Vzpomínky, které vydrží navždy.',
  },
  {
    id: 'dokumenty',
    icon: VideoCameraIcon,
    title: 'Dokumenty',
    description: 'Dokumentární filmy a reportáže. Příběhy, které stojí za vyprávění.',
  },
  {
    id: 'eventova-videa',
    icon: CalendarIcon,
    title: 'Eventová videa',
    description: 'Záznamy z konferencí, koncertů a firemních akcí v nejvyšší kvalitě.',
  },
  {
    id: 'socialni-site',
    icon: ShareIcon,
    title: 'Sociální sítě',
    description: 'Krátká videa optimalizovaná pro Instagram, TikTok a YouTube Shorts.',
  },
];
