export interface Macronutrients {
  carbohydrates?: number | string;
  proteins?: number | string;
  fats?: number | string;
}

export interface AverageNutritionalInfo {
  estimatedCalories?: number | string;
  macronutrients?: Macronutrients;
  estimatedMacronutrients?: Macronutrients;
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
  imageUrl?: string;
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
  imageUrl?: string;
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

export interface AddToPlannedResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
}

export interface PlannedMealData {
  _id: string;
  isEaten: boolean;
  plannedAt: string;
  mealId: MealItem;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlannedMealsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    plannedMeals: PlannedMealData[];
  };
}
