import { apiClient } from "@/services/api-client";
import {
  GenerateMealsResponse,
  QuickMealsResponse,
  AddToPlannedResponse,
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
};
