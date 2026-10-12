import { apiClient } from "@/services/api-client";
import type {
  AllExploreMealsResponse,
  ExploreMealType,
  ExploreMealsPage,
  SearchExploreMealsResponse,
} from "@/types/explore";

const PAGE_SIZE = 10;

interface GetMealsParams {
  page?: number;
  mealTitle?: string;
  type?: ExploreMealType;
}

export const exploreService = {
  getMeals: async ({
    page = 1,
    mealTitle = "",
    type,
  }: GetMealsParams = {}): Promise<ExploreMealsPage> => {
    const searchTerm = mealTitle.trim();

    if (searchTerm || type) {
      const params: Record<string, string | number> = {};
      if (type) params.type = type;
      params.page = page;
      params.pageSize = PAGE_SIZE;
      params.sortBy = "newest";
      if (searchTerm) params.mealTitle = searchTerm;

      const response = await apiClient.get<SearchExploreMealsResponse>(
        "/meals/search-meals",
        { params },
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Unable to search meals.");
      }

      const { meals, count, totalPages, currentPage } = response.data.data;
      return {
        meals,
        totalMeals: count,
        totalPages,
        currentPage,
        hasMore: currentPage < totalPages,
      };
    }

    const params: Record<string, string | number> = {
      page,
      pageSize: PAGE_SIZE,
    };
    const response = await apiClient.get<AllExploreMealsResponse>(
      "/meals/all-meals",
      { params },
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Unable to load meals.");
    }

    const { meals, totalMeals, totalPages, currentPage } = response.data.data;
    return {
      meals,
      totalMeals,
      totalPages,
      currentPage,
      hasMore: currentPage < totalPages,
    };
  },
};
