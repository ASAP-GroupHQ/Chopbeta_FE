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

export const mealService = {
  generateMeals: async (price: number | string): Promise<GenerateMealsResponse> => {
    const response = await apiClient.get<GenerateMealsResponse>(
      `/meals/generate-meals?price=${price}`
    );
    return response.data;
  },
};