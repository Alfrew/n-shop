export interface BaseFilters {
  orderProperty?: string;
  orderDirection?: "desc" | "asc";
  forceRefresh?: boolean;
  skip?: number;
  take?: number;
}
