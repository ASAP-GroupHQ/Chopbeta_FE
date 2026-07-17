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

export interface Macronutrients {
  carbohydrates?: number;
  proteins?: number;
  fats?: number;
}

export interface AverageNutritionalInfo {
  estimatedCalories?: number;
  macronutrients?: Macronutrients;
  estimatedMacronutrients?: Macronutrients; // safety fallback
}

export interface MealItem {
  _id: string;
  mealTitle: string;
  averageNutritionalInfo?: AverageNutritionalInfo;
  category: string;
  estimatedPrice: {
    $numberDecimal: string;
  };
  description?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface QuickMealItem {
  _id: string;
  mealTitle: string;
  category: string;
  estimatedPrice: {
    $numberDecimal: string;
  };
  averageNutritionalInfo?: AverageNutritionalInfo;
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

export interface GenerateMealsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MealItem[];
}

// Added for the tracking/planning endpoint response
export interface AddToPlannedResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any; 
}