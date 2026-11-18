import { apiClient } from "@/services/api-client";
import type {
  AdminDashboardSummary,
  AdminMealActivity,
} from "@/types/admin-dashboard";

interface ApiEnvelope<T> {
  data: T;
}

interface CountPayload {
  totalActiveUsers?: number;
  totalCompletedMeals?: number;
  completedMeals?: unknown[];
  totalGeneratedMeals?: number;
  generatedMeals?: AdminMealActivity[];
  totalPlannedMeals?: number;
  plannedMeals?: unknown[];
}

interface RetentionPayload {
  retentionRate?: string;
}

const requireCount = (value: unknown, label: string): number => {
  const count = Number(value);
  if (value === null || value === undefined || !Number.isFinite(count)) {
    throw new Error(`The ${label} API response was invalid.`);
  }
  return count;
};

const countFromPayload = (
  payload: CountPayload,
  totalKey:
    | "totalCompletedMeals"
    | "totalGeneratedMeals"
    | "totalPlannedMeals",
  listKey: "completedMeals" | "generatedMeals" | "plannedMeals",
): number => {
  if (payload[totalKey] !== undefined) {
    return requireCount(payload[totalKey], totalKey);
  }
  if (Array.isArray(payload[listKey])) return payload[listKey].length;
  throw new Error(`The ${totalKey} API response was incomplete.`);
};

export const adminDashboardService = {
  async getSummary(date: string): Promise<AdminDashboardSummary> {
    const [users, meals, activeUsers, completed, generated, planned, retention] =
      await Promise.all([
        apiClient.get<ApiEnvelope<number>>("/admin/dashboard/total-users"),
        apiClient.get<ApiEnvelope<number>>("/admin/dashboard/total-meals"),
        apiClient.get<ApiEnvelope<CountPayload | number>>(
          "/admin/daily-active-users",
          { params: { date } },
        ),
        apiClient.get<ApiEnvelope<CountPayload>>(
          "/admin/dashboard/completed-meals",
          { params: { date } },
        ),
        apiClient.get<ApiEnvelope<CountPayload>>(
          "/admin/dashboard/generated-meals",
          { params: { date } },
        ),
        apiClient.get<ApiEnvelope<CountPayload>>(
          "/admin/dashboard/planned-meals",
          { params: { date } },
        ),
        apiClient.get<ApiEnvelope<RetentionPayload | null>>(
          "/admin/dashboard/user-retention-rate",
          { params: { queryDate: date } },
        ),
      ]);

    const activePayload = activeUsers.data.data;
    return {
      totalUsers: requireCount(users.data.data, "total users"),
      totalMeals: requireCount(meals.data.data, "total meals"),
      dailyActiveUsers: requireCount(
        typeof activePayload === "number"
          ? activePayload
          : activePayload.totalActiveUsers,
        "daily active users",
      ),
      completedMeals: countFromPayload(
        completed.data.data,
        "totalCompletedMeals",
        "completedMeals",
      ),
      generatedMeals: countFromPayload(
        generated.data.data,
        "totalGeneratedMeals",
        "generatedMeals",
      ),
      plannedMeals: countFromPayload(
        planned.data.data,
        "totalPlannedMeals",
        "plannedMeals",
      ),
      userRetentionRate: retention.data.data?.retentionRate ?? null,
      generatedMealActivity: Array.isArray(generated.data.data.generatedMeals)
        ? generated.data.data.generatedMeals
        : [],
    };
  },
};
