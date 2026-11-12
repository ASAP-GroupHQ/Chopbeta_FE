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

export const FEEDBACK_STATS = [
  { label: "Total feedback", value: 248, tone: "green", icon: "total" },
  { label: "Positive feedback", value: 176, tone: "green", icon: "positive" },
  { label: "Neutral feedback", value: 42, tone: "amber", icon: "neutral" },
  { label: "Negative feedback", value: 30, tone: "rose", icon: "negative" },
] as const;

export const FEEDBACK_OVERVIEW = [
  { name: "Suggestion", value: 60, color: "#32875a" },
  { name: "Compliment", value: 23, color: "#438bd8" },
  { name: "Complaint", value: 17, color: "#dc766e" },
];

export const ADMIN_FEEDBACK: AdminFeedback[] = [
  {
    id: "feedback-1",
    name: "Victor Oboyibo",
    email: "victor.oboyibo@example.com",
    type: "Suggestion",
    rating: 3.5,
    message: "Please add more affordable meal options.",
    date: "Nov 5, 2026",
    status: "New",
  },
  {
    id: "feedback-2",
    name: "Emmanuel Ozomena",
    email: "emmanuel.ozomena@example.com",
    type: "Compliment",
    rating: 5,
    message: "Great app! Very helpful.",
    date: "Nov 4, 2026",
    status: "In progress",
  },
  {
    id: "feedback-3",
    name: "Treasure Jairus",
    email: "treasure.jairus@example.com",
    type: "Complaint",
    rating: 3,
    message: "Prices are not always updated.",
    date: "Nov 3, 2026",
    status: "Resolved",
  },
  {
    id: "feedback-4",
    name: "Amaka Nwosu",
    email: "amaka.nwosu@example.com",
    type: "Suggestion",
    rating: 4,
    message: "It would be helpful to save favorite meal plans.",
    date: "Nov 2, 2026",
    status: "New",
  },
  {
    id: "feedback-5",
    name: "Samuel Okafor",
    email: "samuel.okafor@example.com",
    type: "Compliment",
    rating: 5,
    message: "The meal recommendations fit my budget perfectly.",
    date: "Nov 1, 2026",
    status: "Resolved",
  },
  {
    id: "feedback-6",
    name: "Ifeoma Eze",
    email: "ifeoma.eze@example.com",
    type: "Complaint",
    rating: 2,
    message: "My saved preferences did not appear in my plan.",
    date: "Oct 30, 2026",
    status: "In progress",
  },
  {
    id: "feedback-7",
    name: "Daniel Adebayo",
    email: "daniel.adebayo@example.com",
    type: "Suggestion",
    rating: 4,
    message: "Please include more regional dishes.",
    date: "Oct 29, 2026",
    status: "New",
  },
  {
    id: "feedback-8",
    name: "Grace Okon",
    email: "grace.okon@example.com",
    type: "Suggestion",
    rating: 4,
    message: "A weekly shopping list would be a useful addition.",
    date: "Oct 28, 2026",
    status: "Resolved",
  },
];
