import { BaseFilters } from "@/core/models/BaseFilters";
import { GameProductType } from "./GameProduct";

export interface GameProductFilters extends BaseFilters {
  types?: GameProductType[];
  maxPrice?: Number;
  minPrice?: Number;
}
