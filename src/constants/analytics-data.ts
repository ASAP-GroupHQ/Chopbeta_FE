import {
  ActiveUsersIcon,
  AveragePriceIcon,
  TotalMealsIcon,
  TotalUserIcon,
} from "@/components/icons/AdminIcons";

export type AnalyticsTimeRange =
  | "Today"
  | "7 Days"
  | "30 Days"
  | "90 Days"
  | "Custom";

export const ANALYTICS_RANGES: AnalyticsTimeRange[] = [
  "Today",
  "7 Days",
  "30 Days",
  "90 Days",
];

export const VISIBLE_POINTS_BY_RANGE: Record<AnalyticsTimeRange, number> = {
  Today: 1,
  "7 Days": 4,
  "30 Days": 8,
  "90 Days": 12,
  Custom: 8,
};

export const MEAL_PLAN_ANALYTICS = [
  { day: "Apr 25", plans: 20 },
  { day: "Apr 28", plans: 21 },
  { day: "May 1", plans: 20 },
  { day: "May 4", plans: 16 },
  { day: "May 7", plans: 12 },
  { day: "May 10", plans: 13 },
  { day: "May 13", plans: 9 },
  { day: "May 16", plans: 17 },
  { day: "May 18", plans: 25 },
  { day: "May 20", plans: 33 },
  { day: "May 22", plans: 25 },
  { day: "May 24", plans: 7 },
];

export const MEAL_CATEGORY_ANALYTICS = [
  { name: "Local Dishes", value: 38.5, color: "#2f925d" },
  { name: "Breakfast", value: 22.8, color: "#746be8" },
  { name: "Quick Meals", value: 12.4, color: "#52c0ae" },
  { name: "Snacks", value: 15.6, color: "#ff9087" },
  { name: "Others", value: 10.7, color: "#36bfd0" },
];

export const USER_GROWTH_ANALYTICS = [
  { day: "Apr 25", users: 18 },
  { day: "Apr 30", users: 17 },
  { day: "May 5", users: 10 },
  { day: "May 15", users: 8 },
  { day: "May 20", users: 38 },
  { day: "May 24", users: 6 },
];

export const ANALYTICS_STATS = [
  {
    title: "Total Meal plans",
    value: "48,732",
    icon: TotalMealsIcon,
    tint: "bg-[#eaf4ed]",
    trend: "12.5%",
    sparklineColor: "#2f925d",
  },
  {
    title: "Average Price",
    value: "₦800",
    icon: AveragePriceIcon,
    tint: "bg-[#eaf4ed]",
    trend: "12.5%",
    sparklineColor: "#2f925d",
  },
  {
    title: "Total User",
    value: "48,732",
    icon: TotalUserIcon,
    tint: "bg-[#f5eafa]",
    trend: "12.5%",
    sparklineColor: "#c86bd3",
  },
  {
    title: "Active User",
    value: "12,732",
    icon: ActiveUsersIcon,
    tint: "bg-[#eaf4ed]",
    trend: "12.5%",
    sparklineColor: "#2f925d",
  },
];

export const TOP_MEALS = [
  {
    name: "Bread & Egg",
    category: "Breakfast",
    image: "/images/meals/Fried-Rice.png",
    count: "8,452",
  },
  {
    name: "Pap & Akara",
    category: "Local Dish",
    image: "/images/meals/Puff-puff.jpg",
    count: "8,452",
  },
  {
    name: "Noodles",
    category: "Quick meal",
    image: "/images/meals/quick-meal.png",
    count: "8,452",
  },
  {
    name: "Rice & Beans",
    category: "Local Dish",
    image: "/images/meals/beans and plantain.png",
    count: "8,452",
  },
  {
    name: "Rice & Beans",
    category: "Local Dish",
    image: "/images/meals/Ofada_rice.png",
    count: "8,452",
  },
];

export const QUICK_INSIGHTS = [
  {
    title: "Meal generation increased by 22%",
    detail:
      "Total meal plan generated grew from 39,912 to 48,732 in the last 30 days.",
    icon: "growth",
    color: "#369464",
  },
  {
    title: "User growth is steady",
    detail: "New users increased by 8.7% compared to the previous 30 days.",
    icon: "users",
    color: "#7867ff",
  },
  {
    title: "Local dishes remain the most popular",
    detail: "38.7% of all meal plans were for local dishes.",
    icon: "meal",
    color: "#2f925d",
  },
  {
    title: "Peak activity",
    detail: "Most meal plans are generated between 12 PM and 3 PM.",
    icon: "peak",
    color: "#3947d5",
  },
];

export function getAnalyticsTimeRange(value: string): AnalyticsTimeRange {
  if (
    value === "Today" ||
    value === "7 Days" ||
    value === "30 Days" ||
    value === "90 Days" ||
    value === "Custom"
  ) {
    return value;
  }
  return "30 Days";
}
