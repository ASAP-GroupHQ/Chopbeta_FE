import { apiClient } from "./api-client";

// the precise meal layout shape matching the backend response
export interface MealItem {
  _id: string;
  mealTitle: string;
  category: "morning" | "afternoon" | "evening" | "lunch" | string;
  estimatedPrice: {
    $numberDecimal: string;
  };
  averageNutritionalInfo: {
    estimatedCalories: number;
    macronutrients: {
      carbohydrates: number;
      proteins: number;
      fats: number;
    };
  };
  description?: string;
  createdAt?: string;
  updatedAt?: string;
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

export const mealService = {
  generateMeals: async (
    price: number | string,
  ): Promise<GenerateMealsResponse> => {
    const response = await apiClient.get<GenerateMealsResponse>(
      `/meals/generate-meals?price=${price}`,
    );
    return response.data;
  },

  getQuickMeals: async (filter: string): Promise<QuickMealsResponse> => {
    const response = await apiClient.get<QuickMealsResponse>(
      `/meals/quick-meals?filter=${filter}`,
    );
    return response.data;
  },
};
