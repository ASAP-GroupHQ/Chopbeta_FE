export type AnalyticsTimeRange =
  | "Today"
  | "7 Days"
  | "30 Days"
  | "90 Days"
  | "Custom";

export interface AnalyticsPoint {
  day: string;
  plans: number;
}

export interface UserGrowthPoint {
  day: string;
  users: number;
}

export interface MealCategoryPoint {
  name: string;
  value: number;
  color: string;
}

export interface AnalyticsTopMeal {
  mealId: string;
  mealTitle: string;
  category: string;
  count: number;
}

export interface AdminAnalyticsData {
  mealPlans: AnalyticsPoint[];
  userGrowth: UserGrowthPoint[];
  mealCategories: MealCategoryPoint[];
  topMeals: AnalyticsTopMeal[];
  totalMealPlans: number;
  totalUsers: number | null;
  activeUsers: number | null;
  averageMealPrice: number | null;
  growthPercentage: string | null;
}
