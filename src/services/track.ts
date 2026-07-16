import { apiClient } from "@/services/api-client";
import { StreakResponse } from "@/types/track";

export const trackService = {
  
  getStreak: async (): Promise<StreakResponse> => {
    const response = await apiClient.get<StreakResponse>("/track/streak");
    return response.data;
  },
};
