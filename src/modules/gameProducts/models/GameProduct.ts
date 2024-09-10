export interface GameProduct {
  coverUrl: string;
  description: string;
  id: string;
  imageUrl: string;
  inStock?: number;
  name: string;
  price: number;
  releaseDate: string;
  type: GameProductType;
}

export type GameProductType = "DLC" | "GAME" | "BUNDLE";
