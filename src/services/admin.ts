import { apiClient } from "./api-client";

type DecimalValue = number | string | { $numberDecimal?: string };
type NutrientValue = number | string;

export interface MealNutritionalInfo {
  estimatedCalories?: NutrientValue;
  macronutrients?: {
    carbohydrates?: NutrientValue;
    proteins?: NutrientValue;
    fats?: NutrientValue;
  };
  estimatedMacronutrients?: Record<string, NutrientValue>;
}

export interface AdminMeal {
  _id: string;
  mealTitle: string;
  category: string;
  estimatedPrice: DecimalValue;
  description?: string;
  averageNutritionalInfo?: MealNutritionalInfo;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  role?: string;
  isActive?: boolean;
  isSuspended?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  lastActive?: string;
  username?: string;
  phoneNumber?: string;
}

interface PaginatedData<T> {
  users?: T[];
  meals?: T[];
  totalPages?: number;
  totalUsers?: number;
  totalMeals?: number;
}

interface ApiEnvelope<T> {
  data: T;
}

interface CountData {
  count?: number;
  activeUsers?: AdminUser[];
  inactiveUsers?: AdminUser[];
}

export interface AdminUserData {
  users: AdminUser[];
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface AdminUserSummary {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface MealActivity {
  mealId: string;
  mealTitle?: string;
  generatedAt?: string;
  plannedAt?: string;
  completedAt?: string;
}

export interface DailyActiveUsers {
  date: string;
  dayOfWeek?: string;
  activeUsersCount: number;
}

export interface WeeklyAdminData {
  generatedMeals: MealActivity[];
  plannedMeals: MealActivity[];
  completedMeals: MealActivity[];
  totalGeneratedMeals: number;
  totalPlannedMeals: number;
  totalCompletedMeals: number;
  dailyActiveUsers: DailyActiveUsers[];
  totalActiveUsers: number;
}

export interface MealWriteData {
  mealTitle: string;
  category: string;
  estimatedPrice: number;
  description: string;
  averageNutritionalInfo: MealNutritionalInfo;
}

export function toAmount(value: DecimalValue): number {
  const amount = typeof value === "object"
    ? value.$numberDecimal
    : value;
  const parsed = Number(amount);
  if (!Number.isFinite(parsed)) {
    throw new Error("The meal price returned by the API was invalid.");
  }
  return parsed;
}

async function getPaginated<T>(
  url: string,
  listKey: "users" | "meals",
  totalKey: "totalUsers" | "totalMeals",
): Promise<{ items: T[]; total: number }> {
  const items: T[] = [];
  let currentPage = 1;
  let totalPages = 1;
  let total = 0;

  while (currentPage <= totalPages) {
    const response = await apiClient.get<ApiEnvelope<PaginatedData<T>>>(url, {
      params: { page: currentPage, pageSize: 100 },
    });
    const data = response.data.data;
    const pageItems = data[listKey];
    if (!Array.isArray(pageItems)) {
      throw new Error(`The ${listKey} API response was invalid.`);
    }
    items.push(...pageItems);
    if (!Number.isFinite(data.totalPages) || !Number.isFinite(data[totalKey])) {
      throw new Error(`The paginated ${listKey} API response was incomplete.`);
    }
    totalPages = data.totalPages!;
    total = data[totalKey]!;
    currentPage += 1;
  }

  return { items, total };
}

async function getUserStatusCount(
  url: string,
  listKey: "activeUsers" | "inactiveUsers",
  includeAllUsers = true,
): Promise<{ users: AdminUser[]; count: number }> {
  const users: AdminUser[] = [];
  let currentPage = 1;
  let totalPages = 1;
  let count = 0;

  while (currentPage <= totalPages) {
    const response = await apiClient.get<ApiEnvelope<CountData & {
      totalPages?: number;
    }>>(url, {
      params: { page: currentPage, pageSize: 100 },
    });
    const data = response.data.data;
    const pageUsers = data[listKey];
    if (!Array.isArray(pageUsers)) {
      throw new Error(`The ${listKey} API response was invalid.`);
    }
    users.push(...pageUsers);
    if (!Number.isFinite(data.totalPages) || !Number.isFinite(data.count)) {
      throw new Error(`The ${listKey} API response was incomplete.`);
    }
    totalPages = Math.max(1, data.totalPages!);
    count = data.count!;
    if (!includeAllUsers) break;
    currentPage += 1;
  }

  return { users, count };
}

const getDateQuery = (date: string) => ({ date });

export const adminService = {
  async getUserSummary(): Promise<AdminUserSummary> {
    const [users, active, inactive] = await Promise.all([
      apiClient.get<ApiEnvelope<PaginatedData<AdminUser>>>(
        "/auth/user/all-users",
        { params: { page: 1, pageSize: 1 } },
      ),
      getUserStatusCount("/auth/user/active-users", "activeUsers", false),
      getUserStatusCount("/auth/user/inactive-users", "inactiveUsers", false),
    ]);

    const totalUsers = users.data.data.totalUsers;
    if (!Number.isFinite(totalUsers)) {
      throw new Error("The total users API response was invalid.");
    }

    return {
      totalUsers: totalUsers!,
      activeUsers: active.count,
      inactiveUsers: inactive.count,
    };
  },

  async getUsers(): Promise<AdminUserData> {
    const [allUsers, active, inactive] = await Promise.all([
      getPaginated<AdminUser>("/auth/user/all-users", "users", "totalUsers"),
      getUserStatusCount("/auth/user/active-users", "activeUsers"),
      getUserStatusCount("/auth/user/inactive-users", "inactiveUsers"),
    ]);

    const activeIds = new Set(active.users.map((user) => user._id));
    const inactiveIds = new Set(inactive.users.map((user) => user._id));
    return {
      users: allUsers.items.map((user) => ({
        ...user,
        isActive: activeIds.has(user._id)
          ? true
          : inactiveIds.has(user._id)
            ? false
            : user.isActive,
      })),
      totalUsers: allUsers.total,
      activeUsers: active.count,
      inactiveUsers: inactive.count,
    };
  },

  async getMeals(): Promise<AdminMeal[]> {
    const { items } = await getPaginated<AdminMeal>(
      "/meals/all-meals",
      "meals",
      "totalMeals",
    );
    return items;
  },

  async getMealCount(): Promise<number> {
    const response = await apiClient.get<ApiEnvelope<number>>(
      "/admin/dashboard/total-meals",
    );
    const total = response.data.data;
    if (!Number.isFinite(total)) {
      throw new Error("The total meals API response was invalid.");
    }
    return total;
  },

  async updateMeal(id: string, data: Partial<MealWriteData>): Promise<void> {
    await apiClient.put(`/meals/edit/${encodeURIComponent(id)}`, data);
  },

  async createMeal(data: MealWriteData): Promise<string> {
    const response = await apiClient.post<ApiEnvelope<AdminMeal>>(
      "/meals/add",
      data,
    );
    const id = response.data.data?._id;
    if (!id) throw new Error("The create meal API response did not include a meal ID.");
    return id;
  },

  async toggleMealStatus(id: string): Promise<void> {
    await apiClient.patch(
      `/meals/change-active-status/${encodeURIComponent(id)}`,
    );
  },

  async deleteMeal(id: string): Promise<void> {
    await apiClient.delete(`/meals/delete/${encodeURIComponent(id)}`);
  },

  async getWeeklyData(date: string): Promise<WeeklyAdminData> {
    const [generated, planned, completed, activeUsers] = await Promise.all([
      apiClient.get<ApiEnvelope<{
        generatedMeals: MealActivity[];
        totalGeneratedMeals: number;
      }>>("/admin/dashboard/generated-meals", { params: getDateQuery(date) }),
      apiClient.get<ApiEnvelope<{
        plannedMeals: MealActivity[];
        totalPlannedMeals: number;
      }>>("/admin/dashboard/planned-meals", { params: getDateQuery(date) }),
      apiClient.get<ApiEnvelope<{
        completedMeals: MealActivity[];
        totalCompletedMeals: number;
      }>>("/admin/dashboard/completed-meals", { params: getDateQuery(date) }),
      apiClient.get<ApiEnvelope<{
        dailyActiveUsers: DailyActiveUsers[];
        totalActiveUsers: number;
      }>>("/admin/daily-active-users", { params: getDateQuery(date) }),
    ]);

    return {
      ...generated.data.data,
      ...planned.data.data,
      ...completed.data.data,
      ...activeUsers.data.data,
    };
  },
};