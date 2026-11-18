export type FeedbackCategory = "Suggestion" | "Compliment" | "Complaint";
export type FeedbackStatus = "New" | "In progress" | "Resolved";

export interface AdminFeedback {
  id: string;
  name: string;
  email: string;
  type: FeedbackCategory;
  rating: number;
  message: string;
  date: string;
  status: FeedbackStatus;
}

export interface FeedbackStats {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

export interface FeedbackOverviewItem {
  name: FeedbackCategory;
  value: number;
  color: string;
}
