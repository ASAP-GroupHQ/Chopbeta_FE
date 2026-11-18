export interface AdminMealActivity {
  mealId: string;
  mealTitle?: string;
  generatedAt?: string;
  plannedAt?: string;
  completedAt?: string;
}

export interface AdminTopMeal {
  mealId: string;
  mealTitle: string;
  category: string;
  count: number;
}

export interface AdminDashboardSummary {
  totalUsers: number;
  dailyActiveUsers: number;
  completedMeals: number;
  generatedMeals: number;
  plannedMeals: number;
  userRetentionRate: string | null;
  totalMeals: number;
  generatedMealActivity: AdminMealActivity[];
}
