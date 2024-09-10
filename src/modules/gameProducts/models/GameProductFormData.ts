import { GameProductType } from "./GameProduct";

export interface GameProductFormData {
  coverUrl: string;
  description: string;
  id?: string;
  imageUrl: string;
  inStock?: number;
  name: string;
  price: number;
  releaseDate: string;
  type: GameProductType;
}
