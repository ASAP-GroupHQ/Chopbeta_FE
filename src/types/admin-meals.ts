export type DecimalValue = number | string | { $numberDecimal?: string };
export type NutrientValue = number | string;
export const MEAL_TYPES = ["rice", "swallow", "soup", "snack", "others"] as const;
export type MealType = (typeof MEAL_TYPES)[number];

export interface EstimatedMacronutrients {
  carbohydrates?: NutrientValue;
  proteins?: NutrientValue;
  fats?: NutrientValue;
}

export interface MealNutritionalInfo {
  estimatedCalories?: NutrientValue;
  macronutrients?: EstimatedMacronutrients;
  estimatedMacronutrients?: EstimatedMacronutrients;
}

export interface AdminMeal {
  _id: string;
  mealTitle: string;
  category: string;
  type?: MealType;
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
  type: MealType;
  estimatedPrice: number;
  description: string;
  averageNutritionalInfo: {
    estimatedCalories: number;
    estimatedMacronutrients: {
      carbohydrates: number;
      proteins: number;
      fats: number;
    };
  };
}

export type MealUpdateData = Omit<
  Partial<MealWriteData>,
  "averageNutritionalInfo"
> & {
  averageNutritionalInfo?: {
    estimatedCalories?: NutrientValue;
    estimatedMacronutrients?: EstimatedMacronutrients;
  };
};

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
