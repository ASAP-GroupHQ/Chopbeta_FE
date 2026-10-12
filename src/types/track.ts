export interface StreakData {
  currentStreak: number;
  lastActiveAt: string;
}

export interface StreakResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: StreakData;
}

export interface BudgetEntry {
  _id: string;
  amount: {
    $numberDecimal: string;
  };
  createdAt: string;
}

export interface DailyBudgetResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    todayBudget: BudgetEntry[];
    totalBudget: number;
  };
}

export interface SpentMealEntry {
  mealId: {
    _id: string;
    mealTitle: string;
    estimatedPrice: {
      $numberDecimal: string;
    };
  };
  uniqueId: string;
  eatenAt: string;
  _id: string;
}

export interface DailySpentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meals: SpentMealEntry[];
    totalMoneySpent: number | { $numberDecimal: string } | string;
  };
}

export interface EatenMealItem {
  mealId: string;
  uniqueId: string;
  eatenAt: string;
  _id: string;
}

export interface MealsEatenTodayResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meals: Array<{
      mealId: string;
      uniqueId: string;
      eatenAt: string;
      _id: string;
    }>;
    count: number;
  };
}

export interface PlannedTodayResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    plannedMeals: Array<{
      estimatedPrice?: { $numberDecimal: string };
      addedAt?: string;
      mealId?: string;
      uniqueId?: string;
      UniqueId?: string;
      _id?: string;
      mealTitle?: string;
      category?: string;
      isEaten?: boolean;
    }>;
    count: number;
  };
}

export interface MarkAsEatenData {
  mealId: string;
  uniqueId: string;
  eatenAt: string;
  _id: string;
}

export interface MarkAsEatenResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MarkAsEatenData | null;
}

export type WeeklyHistoryAmount =
  | number
  | string
  | { $numberDecimal: string };

export interface WeeklyHistoryMeal {
  _id?: string;
  mealId?:
    | string
    | {
        _id?: string;
        mealTitle?: string;
        estimatedPrice?: WeeklyHistoryAmount;
      };
  uniqueId?: string;
  mealTitle?: string;
  price?: WeeklyHistoryAmount;
  estimatedPrice?: WeeklyHistoryAmount;
  generatedAt?: string;
  eatenAt?: string;
  addedAt?: string;
  createdAt?: string;
}

export interface WeeklyHistoryData {
  _id: string;
  budget?: Array<{
    _id?: string;
    amount: WeeklyHistoryAmount;
    createdAt: string;
  }>;
  generatedMeals?: WeeklyHistoryMeal[];
  eatenMeals?: WeeklyHistoryMeal[];
  plannedMeals?: WeeklyHistoryMeal[];
  createdAt: string;
  newWeekDate: string;
  updatedAt: string;
}

export interface WeeklyHistoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: WeeklyHistoryData | null;
}
