export interface GameProduct {
  coverUrl: string;
  description: string;
  id: string;
  imageUrl: string;
  inStock?: number;
  name: string;
  price: number;
  type: GameProductType;
}

export type GameProductType = 'DLC' | 'GAME' | 'BUNDLE';
