<<<<<<< HEAD
import { apiClient } from "@/services/api-client";
import {
  GenerateMealsResponse,
  QuickMealsResponse,
  AddToPlannedResponse,
  DailySpentResponse,
  PlannedMealsResponse, // Imported new response interface
} from "@/types/meal";
=======
import { apiClient } from "./api-client";

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
  imageUrl?: string;
  img?: string;
  image?: string;
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
>>>>>>> 94e4339909ac628acbda3ec6382f591fd355a993

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

  addToPlanned: async (mealId: string): Promise<AddToPlannedResponse> => {
    const response = await apiClient.patch<AddToPlannedResponse>(
      `/track/add-to-planned/${mealId}`,
    );
    return response.data;
  },

  getDailySpent: async (): Promise<DailySpentResponse> => {
    const response =
      await apiClient.get<DailySpentResponse>("/track/daily-spent");
    return response.data;
  },

  getPlannedMeals: async (): Promise<PlannedMealsResponse> => {
    const response = await apiClient.get<PlannedMealsResponse>(
      "/track/planned-meals",
    );
    return response.data;
  },

  
};
