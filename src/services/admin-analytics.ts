import { apiClient } from "@/services/api-client";
import type {
  AdminAnalyticsData,
  AnalyticsTimeRange,
  AnalyticsTopMeal,
} from "@/types/admin-analytics";

interface ApiEnvelope<T> {
  data: T;
}

interface GeneratedMealRecord {
  mealId: string;
  mealTitle?: string;
  generatedAt?: string;
  category?: string;
  price?: number | string | { $numberDecimal?: string };
}

interface GrowthPayload {
  growthPercentage?: string;
  series?: Array<{ date: string; count: number }>;
}

interface TopMealRecord {
  mealId: string;
  count: number;
  mealTitle: string;
  category: string;
}

interface AnalyticsRecord {
  activeUsers?: Array<{
    users?: unknown[];
  }>;
  generatedMeals?: Array<{
    record?: GeneratedMealRecord[];
  }>;
  totalUsers?: Array<{ count?: number }>;
}

const analysisFilter: Record<AnalyticsTimeRange, string> = {
  Today: "today",
  "7 Days": "sevenDays",
  "30 Days": "lastThirtyDays",
  "90 Days": "lastNinetyDays",
  Custom: "customDateRange",
};

const summaryFilter: Record<AnalyticsTimeRange, string> = {
  Today: "today",
  "7 Days": "sevenDaysAgo",
  "30 Days": "thirtyDaysAgo",
  "90 Days": "ninetyDaysAgo",
  Custom: "thirtyDaysAgo",
};

const numberFromPrice = (
  price: GeneratedMealRecord["price"],
): number | null => {
  const value = typeof price === "object" ? price?.$numberDecimal : price;
  const result = Number(value);
  return Number.isFinite(result) ? result : null;
};

const colors = ["#2f925d", "#746be8", "#52c0ae", "#ff9087", "#36bfd0"];

export const adminAnalyticsService = {
  async getTopMeals(filter: AnalyticsTimeRange = "7 Days"): Promise<AnalyticsTopMeal[]> {
    const response = await apiClient.get<ApiEnvelope<TopMealRecord[]>>(
      "/admin/analytics/top-meals",
      { params: { filter: summaryFilter[filter] } },
    );
    if (!Array.isArray(response.data.data)) {
      throw new Error("The top meals API response was invalid.");
    }
    return response.data.data;
  },

  async getGeneratedMealsAnalysis(
    filter: AnalyticsTimeRange,
    customRange?: { startDate: string; endDate: string },
  ): Promise<Pick<AdminAnalyticsData, "mealPlans" | "totalMealPlans">> {
    const generatedParams =
      filter === "Custom"
        ? {
            filter: analysisFilter[filter],
            startDate: customRange?.startDate,
            endDate: customRange?.endDate,
          }
        : { filter: analysisFilter[filter] };
    const response = await apiClient.get<
      ApiEnvelope<GeneratedMealRecord[] | { message?: string }>
    >("/admin/analytics/generated-meals-analysis", {
      params: generatedParams,
    });
    const generatedData = response.data.data;
    const generatedRecords = Array.isArray(generatedData) ? generatedData : [];

    const perDay = new Map<string, number>();
    for (const meal of generatedRecords) {
      if (!meal.generatedAt) continue;
      const day = new Date(meal.generatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      perDay.set(day, (perDay.get(day) ?? 0) + 1);
    }

    return {
      mealPlans: [...perDay].map(([day, plans]) => ({ day, plans })),
      totalMealPlans: generatedRecords.length,
    };
  },

  async getGrowthRate(
    filter: AnalyticsTimeRange,
  ): Promise<Pick<AdminAnalyticsData, "userGrowth" | "growthPercentage">> {
    const response = await apiClient.get<ApiEnvelope<GrowthPayload>>(
      "/admin/analytics/growth-rate",
      { params: { filter: summaryFilter[filter] } },
    );
    const growthData = response.data.data;
    return {
      userGrowth: (growthData.series ?? []).map((point) => ({
        day: new Date(point.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        users: point.count,
      })),
      growthPercentage: growthData.growthPercentage ?? null,
    };
  },

  async getAnalyticsRecord(): Promise<
    Pick<
      AdminAnalyticsData,
      "mealCategories" | "totalUsers" | "activeUsers" | "averageMealPrice"
    >
  > {
    const response = await apiClient.get<ApiEnvelope<AnalyticsRecord[]>>(
      "/admin/analytics/analytics-record",
    );
    const analyticsRecords = response.data.data;
    if (!Array.isArray(analyticsRecords)) {
      throw new Error("The analytics record API response was invalid.");
    }

    const categoryCounts = new Map<string, number>();
    const prices: number[] = [];
    for (const record of analyticsRecords) {
      for (const group of record.generatedMeals ?? []) {
        for (const meal of group.record ?? []) {
          if (meal.category) {
            categoryCounts.set(
              meal.category,
              (categoryCounts.get(meal.category) ?? 0) + 1,
            );
          }
          const price = numberFromPrice(meal.price);
          if (price !== null) prices.push(price);
        }
      }
    }
    const categoryTotal = [...categoryCounts.values()].reduce(
      (total, count) => total + count,
      0,
    );
    const mealCategories = [...categoryCounts].map(([name, count], index) => ({
      name,
      value: categoryTotal ? Math.round((count / categoryTotal) * 1000) / 10 : 0,
      color: colors[index % colors.length],
    }));
    const latestRecord = analyticsRecords[analyticsRecords.length - 1];
    const userCounts = latestRecord?.totalUsers ?? [];
    const totalUsers = userCounts[userCounts.length - 1]?.count ?? null;
    const activeUsers = latestRecord?.activeUsers
      ? latestRecord.activeUsers.reduce(
        (total, group) => total + (group.users?.length ?? 0),
        0,
      )
      : null;

    return {
      mealCategories,
      totalUsers,
      activeUsers,
      averageMealPrice: prices.length
        ? prices.reduce((total, price) => total + price, 0) / prices.length
        : null,
    };
  },
};
