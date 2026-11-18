import { apiClient } from "@/services/api-client";
import type {
  AdminMeal,
  DecimalValue,
  MealStats,
  MealWriteData,
} from "@/types/admin-meals";

interface ApiEnvelope<T> {
  data: T;
}

interface PaginatedMeals {
  meals?: AdminMeal[];
  totalPages?: number;
}

interface MealCollection {
  meal?: AdminMeal[];
  count?: number;
}

const numericPrice = (value: DecimalValue): number => {
  const amount = typeof value === "object" ? value.$numberDecimal : value;
  const parsed = Number(amount);
  if (!Number.isFinite(parsed)) {
    throw new Error("The meal price returned by the API was invalid.");
  }
  return parsed;
};

const countMeals = (payload: MealCollection, label: string): number => {
  if (Number.isFinite(payload.count)) return payload.count!;
  if (Array.isArray(payload.meal)) return payload.meal.length;
  throw new Error(`The ${label} API response was invalid.`);
};

export const adminMealsService = {
  async getMeals(): Promise<AdminMeal[]> {
    const meals: AdminMeal[] = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const response = await apiClient.get<ApiEnvelope<PaginatedMeals>>(
        "/meals/all-meals",
        { params: { page, pageSize: 100 } },
      );
      const payload = response.data.data;
      if (!Array.isArray(payload.meals)) {
        throw new Error("The meals API response was invalid.");
      }
      if (!Number.isFinite(payload.totalPages)) {
        throw new Error("The paginated meals API response was incomplete.");
      }
      meals.push(...payload.meals);
      totalPages = Math.max(1, payload.totalPages!);
      page += 1;
    }

    return meals;
  },

  async getStats(): Promise<MealStats> {
    const [total, active, inactive, categories] = await Promise.all([
      apiClient.get<ApiEnvelope<number>>("/admin/dashboard/total-meals"),
      apiClient.get<ApiEnvelope<MealCollection>>("/admin/meals/active-meals"),
      apiClient.get<ApiEnvelope<MealCollection>>(
        "/admin/meals/inactive-meals",
      ),
      apiClient.get<ApiEnvelope<{ categories?: number }>>(
        "/admin/meals/categories",
      ),
    ]);
    const totalMeals = Number(total.data.data);
    const categoryCount = Number(categories.data.data.categories);
    if (!Number.isFinite(totalMeals) || !Number.isFinite(categoryCount)) {
      throw new Error("The meal statistics API response was invalid.");
    }
    return {
      totalMeals,
      activeMeals: countMeals(active.data.data, "active meals"),
      inactiveMeals: countMeals(inactive.data.data, "inactive meals"),
      categories: categoryCount,
    };
  },

  async createMeal(data: MealWriteData): Promise<string> {
    const response = await apiClient.post<ApiEnvelope<AdminMeal>>(
      "/meals/add",
      data,
    );
    const id = response.data.data?._id;
    if (!id) {
      throw new Error("The create meal API response did not include a meal ID.");
    }
    return id;
  },

  async uploadMealImage(id: string, image: File): Promise<string> {
    const formData = new FormData();
    formData.append("mealImage", image);
    const response = await apiClient.post<
      ApiEnvelope<{ imageUrl?: string }>
    >(`/meals/add-image/${encodeURIComponent(id)}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = response.data.data?.imageUrl;
    if (!imageUrl) {
      throw new Error("The meal image API response did not include an image URL.");
    }
    return imageUrl;
  },

  async updateMeal(id: string, data: Partial<MealWriteData>): Promise<void> {
    await apiClient.put(`/meals/edit/${encodeURIComponent(id)}`, data);
  },

  async toggleMealStatus(id: string): Promise<void> {
    await apiClient.patch(
      `/meals/change-active-status/${encodeURIComponent(id)}`,
    );
  },

  async deleteMeal(id: string): Promise<void> {
    await apiClient.delete(`/meals/delete/${encodeURIComponent(id)}`);
  },

  toPrice: numericPrice,
};
