import { GameProductType } from "./GameProduct";

export interface GameProductFilters extends BaseFilters {
  types?: GameProductType[];
  maxPrice?: Number;
  minPrice?: Number;
}

export interface BaseFilters {
  orderProperty?: string;
  orderDirection?: "desc" | "asc";
  forceRefresh?: boolean;
  skip?: number;
  take?: number;
}
