export interface StreakData {
  currentStreak: number;
  lastActiveAt: string; // ISO date string
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
  eatenAt: string;
  _id: string;
}

export interface DailySpentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meals: SpentMealEntry[];
    totalMoneySpent: number;
  };
}
