import { GameProduct } from './GameProduct';

export interface GameProductStore {
  lastFetch: number | null;
  gameProductList: GameProduct[];
}
