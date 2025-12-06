export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  description?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Ukázka naší práce',
    category: 'showcase',
    videoUrl: 'https://www.youtube.com/watch?v=uTmfflJWOvM',
    description: 'Profesionální video produkce od AsperroStudio',
  },
];
