export type ExploreMealType = "swallow" | "soup" | "snacks" | "rice" | "others";

export interface ExploreQuickFilter {
  label: string;
  type?: ExploreMealType;
}

export interface ExploreMacronutrients {
  carbohydrates?: string | number;
  proteins?: string | number;
  fats?: string | number;
}

export interface ExploreNutrition {
  estimatedCalories?: string | number;
  estimatedMacronutrients?: ExploreMacronutrients;
  macronutrients?: ExploreMacronutrients;
}

export interface ExploreMeal {
  _id: string;
  mealTitle: string;
  category?: string;
  type?: string;
  description?: string;
  estimatedPrice?: { $numberDecimal?: string } | string | number;
  averageNutritionalInfo?: ExploreNutrition;
  imageUrl?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ExploreApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface AllExploreMealsResponse extends ExploreApiResponse {
  data: {
    meals: ExploreMeal[];
    totalMeals: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface SearchExploreMealsResponse extends ExploreApiResponse {
  data: ExploreMeal[];
}

export interface ExploreMealsPage {
  meals: ExploreMeal[];
  totalMeals?: number;
  totalPages?: number;
  currentPage: number;
  hasMore: boolean;
}
