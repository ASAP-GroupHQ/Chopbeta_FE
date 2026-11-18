import { isAxiosError } from "axios";
import { apiClient } from "@/services/api-client";
import type {
  AdminFeedback,
  FeedbackCategory,
  FeedbackOverviewItem,
  FeedbackStats,
  FeedbackStatus,
} from "@/types/admin-feedback";

interface ApiEnvelope<T> {
  data: T;
}

interface FeedbackRecord {
  _id: string;
  userId: string;
  email: string;
  message: string;
  rating: number;
  type: "positive" | "neutral" | "negative";
  category: "suggestion" | "compliment" | "complaint";
  status: "new" | "reviewing" | "resolved";
  createdAt: string;
}

interface FeedbackListPayload {
  result?: FeedbackRecord[];
}

interface FeedbackStatsPayload {
  totalFeedback: number;
  positiveFeedback: number;
  neutralFeedback: number;
  negativeFeedback: number;
}

interface FeedbackOverviewPayload {
  overview: Array<{ value: string; count: number; percentage: string }>;
}

const categories: Record<FeedbackRecord["category"], FeedbackCategory> = {
  suggestion: "Suggestion",
  compliment: "Compliment",
  complaint: "Complaint",
};

const statuses: Record<FeedbackRecord["status"], FeedbackStatus> = {
  new: "New",
  reviewing: "In progress",
  resolved: "Resolved",
};

const colors: Record<FeedbackCategory, string> = {
  Suggestion: "#32875a",
  Compliment: "#438bd8",
  Complaint: "#dc766e",
};

const retryDelay = (retryAfter: unknown, attempt: number): number => {
  const value = typeof retryAfter === "string" ? retryAfter : "";
  const seconds = Number(value);
  if (value && Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1000;
  }
  const retryDate = Date.parse(value);
  if (value && Number.isFinite(retryDate)) {
    return Math.max(0, retryDate - Date.now());
  }
  return 1000 * (attempt + 1);
};

async function getWithRateLimitRetry<T>(
  url: string,
  config?: { params?: Record<string, string> },
): Promise<T> {
  for (let attempt = 0; ; attempt += 1) {
    try {
      const response = await apiClient.get<ApiEnvelope<T>>(url, config);
      return response.data.data;
    } catch (error) {
      if (
        !isAxiosError(error) ||
        error.response?.status !== 429 ||
        attempt >= 2
      ) {
        throw error;
      }

      await new Promise<void>((resolve) =>
        setTimeout(
          resolve,
          retryDelay(error.response?.headers["retry-after"], attempt),
        ),
      );
    }
  }
}

export const adminFeedbackService = {
  async getFeedback(): Promise<AdminFeedback[]> {
    const feedback: AdminFeedback[] = [];
    for (const status of ["new", "reviewing", "resolved"] as const) {
      const payload = await getWithRateLimitRetry<FeedbackListPayload>(
        "/admin/feedback/get-feedback",
        { params: { status } },
      );
      const list = payload.result;
      if (!Array.isArray(list)) {
        throw new Error("The feedback API response was invalid.");
      }
      feedback.push(...list.map((item) => {
        const type = categories[item.category];
        const statusLabel = statuses[item.status];
        if (!type || !statusLabel) {
          throw new Error("The feedback API returned an unsupported category or status.");
        }
        return {
          id: item._id,
          name: item.email || item.userId,
          email: item.email,
          type,
          rating: item.rating,
          message: item.message,
          date: new Date(item.createdAt).toLocaleDateString(),
          status: statusLabel,
        };
      }));
    }
    return feedback;
  },

  async getStats(): Promise<FeedbackStats> {
    const data = await getWithRateLimitRetry<FeedbackStatsPayload>(
      "/admin/feedback/get-feedback-total",
    );
    return {
      total: data.totalFeedback,
      positive: data.positiveFeedback,
      neutral: data.neutralFeedback,
      negative: data.negativeFeedback,
    };
  },

  async getCategoryOverview(): Promise<FeedbackOverviewItem[]> {
    const data = await getWithRateLimitRetry<FeedbackOverviewPayload>(
      "/admin/feedback/get-feedback-overview",
      { params: { queryParams: "category" } },
    );
    if (!Array.isArray(data.overview)) {
      throw new Error("The feedback overview API response was invalid.");
    }
    return data.overview.map((item) => {
      const category = item.value.toLowerCase();
      if (
        category !== "suggestion" &&
        category !== "compliment" &&
        category !== "complaint"
      ) {
        throw new Error("The feedback overview API returned an unsupported category.");
      }
      const name = categories[category];
      return {
        name,
        value: Number(item.percentage),
        color: colors[name],
      };
    });
  },

  async advanceStatus(id: string): Promise<void> {
    await apiClient.patch(
      `/admin/feedback/update-feedback-status/${encodeURIComponent(id)}`,
    );
  },
};
