export type PriceMealCategory = string;
export type PriceMealStatus = "Active" | "Inactive";

export interface PriceMeal {
  id: string;
  name: string;
  category: PriceMealCategory;
  currentPrice: number;
  newPrice: number;
  status: PriceMealStatus;
  lastUpdated: string;
  image: string;
}