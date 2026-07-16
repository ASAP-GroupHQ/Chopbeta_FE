// src/types/meal.ts

// the precise meal layout shape matching the backend response
export interface MealItem {
  _id: string;
  mealTitle: string;
  category: string;
  estimatedPrice: {
    $numberDecimal: string;
  };
  description?: string;
  type?: string;
  averageNutritionalInfo?: {
    estimatedCalories?: string;
    estimatedMacronutrients?: {
      carbohydrates?: string;
      proteins?: string;
      fats?: string;
    };
  };
}

export interface GenerateMealsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MealItem[];
}

export interface QuickMealItem {
  _id: string;
  mealTitle: string;
  category: string;
  estimatedPrice: {
    $numberDecimal: string;
  };
  averageNutritionalInfo?: {
    estimatedCalories?: string;
    estimatedMacronutrients?: {
      carbohydrates?: string;
      proteins?: string;
      fats?: string;
    };
  };
}

export interface QuickMealsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meals: QuickMealItem[];
    count: number;
  };
}
