import { apiClient } from "@/services/api-client";
import {
  GenerateMealsResponse,
  QuickMealsResponse,
  AddToPlannedResponse,
  DailySpentResponse,
  PlannedMealsResponse, // Imported new response interface
} from "@/types/meal";

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
