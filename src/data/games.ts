import { LayoutGrid, Zap } from 'lucide-react';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  category: 'Action' | 'Puzzle' | 'Arcade' | 'Strategy' | 'Sports';
  rating: number;
  featured?: boolean;
}

export const GAMES: Game[] = [
  {
    id: '2d-craft',
    title: '2D Craft',
    description: 'Explore, build, and survive in this blocky decentralized dimension. Craft your reality.',
    thumbnail: 'https://images.unsplash.com/photo-1627389955609-70111d3d6390?q=80&w=800&h=600&auto=format&fit=crop',
    embedUrl: 'https://turbowarp.org/10128407/embed?autoplay=&addons=remove-curved-stage-border%2Cpause%2Cgamepad&isFirstSession=true',
    category: 'Arcade',
    rating: 4.9,
    featured: true,
  }
];

export const CATEGORIES = [
  { name: 'All', icon: LayoutGrid },
  { name: 'Arcade', icon: Zap },
];
