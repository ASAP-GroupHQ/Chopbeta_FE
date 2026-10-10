export type MealStatus = "Active" | "Inactive";

export interface MealItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  calories: number;
  nutritionalInfo?: {
    estimatedCalories?: number | string;
    macronutrients?: {
      carbohydrates?: number | string;
      proteins?: number | string;
      fats?: number | string;
    };
    estimatedMacronutrients?: Record<string, number | string>;
  };
  status: MealStatus;
  dateAdded: string;
}
