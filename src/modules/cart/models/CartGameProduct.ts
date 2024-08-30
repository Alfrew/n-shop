import { GameProductType } from "@/modules/gameProducts/models/GameProduct";

export interface CartGameProduct {
  coverUrl: string;
  id: string;
  inStock?: number;
  name: string;
  price: number;
  quantity: number;
  type: GameProductType;
}
