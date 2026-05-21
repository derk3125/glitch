import { LayoutGrid, Zap } from 'lucide-react';
import craftBlockImg from '../assets/images/craft_block_1779327588081.png';

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
    thumbnail: craftBlockImg,
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
