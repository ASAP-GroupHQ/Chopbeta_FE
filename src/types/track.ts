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
