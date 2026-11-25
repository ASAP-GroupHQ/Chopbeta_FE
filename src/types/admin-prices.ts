export interface ManagedPrice {
  id: string;
  name: string;
  category: string;
  categoryType: "local" | "breakfast" | "quick";
  image?: string;
  currentPrice: string;
  newPrice: number;
  priceChange: string;
  changeType: "increase" | "decrease" | "none";
  status: string;
  lastUpdated: string;
}

export interface PriceStats {
  totalMeals: number;
  averagePrice: number;
  highestPrice: number;
  lowestPrice: number;
}
