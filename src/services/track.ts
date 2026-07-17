import { apiClient } from "@/services/api-client";
import { StreakResponse, DailyBudgetResponse, DailySpentResponse } from "@/types/track";

export const trackService = {
  getStreak: async (): Promise<StreakResponse> => {
    const response = await apiClient.get<StreakResponse>("/track/streak");
    return response.data;
  },

  getDailyBudget: async (): Promise<DailyBudgetResponse> => {
    const response = await apiClient.get<DailyBudgetResponse>(
      "/track/daily-budget",
    ); 
    return response.data;
  },

  getDailySpent: async (): Promise<DailySpentResponse> => {
    const response = await apiClient.get<DailySpentResponse>("/track/daily-spent");
    return response.data;
  },
};
