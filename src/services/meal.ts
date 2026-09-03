import { apiClient } from "@/services/api-client";
import {
  GenerateMealsResponse,
  QuickMealsResponse,
  AddToPlannedResponse,
  PlannedMealsResponse,
  AllPartialMealsResponse,
  MealLog,
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

  getPlannedMeals: async (): Promise<PlannedMealsResponse> => {
    const response = await apiClient.get<PlannedMealsResponse>(
      "/track/planned-meals",
    );
    return response.data;
  },

  // Fetches partial meals for a given page, pageSize, and optional date (YYYY-MM-DD)
  getAllPartialMeals: async (
    page: number = 1,
    pageSize: number = 10,
    date?: string,
  ): Promise<{ meals: MealLog[]; totalMeals: number; totalPages: number }> => {
    const params: Record<string, string | number> = {
      page,
      pageSize,
    };

    if (date) {
      params.date = date;
    }

    const response = await apiClient.get<AllPartialMealsResponse>(
      "/track/all-partial-meals",
      { params },
    );

    const rawData = response.data.data;

    // Transform backend decimal objects and ISO dates into client-friendly structure
    const mappedMeals: MealLog[] = (rawData.data || []).map((item) => ({
      id: item.uniqueId,
      name: item.mealTitle || "Untitled Meal",
      price: item.estimatedPrice?.$numberDecimal
        ? parseFloat(item.estimatedPrice.$numberDecimal)
        : 0,
      time: item.addedAt
        ? new Date(item.addedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      tag: "Partial Meal",
      eaten: false,
    }));

    return {
      meals: mappedMeals,
      totalMeals: rawData.totalMeals || 0,
      totalPages: rawData.totalPages || 1,
    };
  },
};
