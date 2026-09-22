export type MealStatus = "Active" | "Inactive";

export interface MealItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  calories: number;
  status: MealStatus;
  dateAdded: string;
}
