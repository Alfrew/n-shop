import { BaseFilters } from "@/core/models/BaseFilters";
import { GameProductType } from "./GameProduct";
import { SelectOptionItem } from "@/core/components/inputs/SelectControl";

export interface GameProductFilters extends BaseFilters {
  types?: GameProductType[];
  maxPrice?: Number;
  minPrice?: Number;
}

export interface GameProductSortListItem extends SelectOptionItem {
  value: gameProductSortType;
}

export type gameProductSortType = "price-asc" | "price-desc" | "releaseDate-asc" | "releaseDate-desc" | "name-asc" | "name-desc" | "default";
