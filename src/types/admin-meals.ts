export type DecimalValue = number | string | { $numberDecimal?: string };
export type NutrientValue = number | string;

export interface MealNutritionalInfo {
  estimatedCalories?: NutrientValue;
  macronutrients?: {
    carbohydrates?: NutrientValue;
    proteins?: NutrientValue;
    fats?: NutrientValue;
  };
  estimatedMacronutrients?: Record<string, NutrientValue>;
}

export interface AdminMeal {
  _id: string;
  mealTitle: string;
  category: string;
  estimatedPrice: DecimalValue;
  description?: string;
  averageNutritionalInfo?: MealNutritionalInfo;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface MealWriteData {
  mealTitle: string;
  category: string;
  estimatedPrice: number;
  description: string;
  averageNutritionalInfo: MealNutritionalInfo;
}

export interface MealEdits {
  name: string;
  description: string;
  category: string;
  price: string;
  calories: string;
}

export interface ManagedMeal {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  calories: string;
  status: string;
  dateAdded: string;
  image?: string;
  source: AdminMeal;
}

export interface MealStats {
  totalMeals: number;
  activeMeals: number;
  inactiveMeals: number;
  categories: number;
}
