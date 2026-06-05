export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  type: "budget" | "meal" | "system";
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Meal Schedule Ready 🍲",
    description:
      "Your personalized afternoon meal options have been generated successfully based on your preferences.",
    time: "2 mins ago",
    isUnread: true,
    type: "meal",
  },
  {
    id: "2",
    title: "Budget Threshold Alert ⚠️",
    description:
      "You've spent 50% of your daily budget limit (₦1,000 used of ₦2,000).",
    time: "1 hour ago",
    isUnread: true,
    type: "budget",
  },
  {
    id: "3",
    title: "Account Setup Verified 🎉",
    description:
      "Welcome to ChopBeta! Your dietary profile configuration has been sync'd successfully.",
    time: "Yesterday",
    isUnread: false,
    type: "system",
  },
];
