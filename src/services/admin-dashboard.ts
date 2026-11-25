import { apiClient } from "@/services/api-client";
import type {
  AdminMealActivity,
  AdminRecentActivity,
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

const isAdminRecentActivity = (
  value: unknown,
): value is AdminRecentActivity =>
  typeof value === "object" &&
  value !== null &&
  "_id" in value &&
  typeof value._id === "string" &&
  "description" in value &&
  typeof value.description === "string";

export const adminDashboardService = {
  async getTotalUsers(): Promise<number> {
    const response = await apiClient.get<ApiEnvelope<number>>(
      "/admin/dashboard/total-users",
    );
    return requireCount(response.data.data, "total users");
  },

  async getTotalMeals(): Promise<number> {
    const response = await apiClient.get<ApiEnvelope<number>>(
      "/admin/dashboard/total-meals",
    );
    return requireCount(response.data.data, "total meals");
  },

  async getDailyActiveUsers(date: string): Promise<number> {
    const response = await apiClient.get<
      ApiEnvelope<CountPayload | number>
    >("/admin/daily-active-users", { params: { date } });
    const payload = response.data.data;
    return requireCount(
      typeof payload === "number" ? payload : payload.totalActiveUsers,
      "daily active users",
    );
  },

  async getCompletedMeals(date: string): Promise<number> {
    const response = await apiClient.get<ApiEnvelope<CountPayload>>(
      "/admin/dashboard/completed-meals",
      { params: { date } },
    );
    return countFromPayload(
      response.data.data,
      "totalCompletedMeals",
      "completedMeals",
    );
  },

  async getGeneratedMeals(date: string): Promise<AdminMealActivity[]> {
    const response = await apiClient.get<ApiEnvelope<CountPayload>>(
      "/admin/dashboard/generated-meals",
      { params: { date } },
    );
    countFromPayload(
      response.data.data,
      "totalGeneratedMeals",
      "generatedMeals",
    );
    return Array.isArray(response.data.data.generatedMeals)
      ? response.data.data.generatedMeals
      : [];
  },

  async getPlannedMeals(date: string): Promise<number> {
    const response = await apiClient.get<ApiEnvelope<CountPayload>>(
      "/admin/dashboard/planned-meals",
      { params: { date } },
    );
    return countFromPayload(
      response.data.data,
      "totalPlannedMeals",
      "plannedMeals",
    );
  },

  async getUserRetentionRate(date: string): Promise<string | null> {
    const response = await apiClient.get<
      ApiEnvelope<RetentionPayload | null>
    >("/admin/dashboard/user-retention-rate", {
      params: { queryDate: date },
    });
    return response.data.data?.retentionRate ?? null;
  },

  async getRecentActivities(
    page: number,
    pageSize: number,
  ): Promise<AdminRecentActivity[]> {
    const response = await apiClient.get<ApiEnvelope<unknown>>(
      "/admin/dashboard/recent-activities",
      { params: { page, pageSize } },
    );
    const activities = response.data.data;

    if (
      !Array.isArray(activities) ||
      !activities.every(isAdminRecentActivity)
    ) {
      throw new Error("The recent activities API response was invalid.");
    }

    return activities;
  },
};
