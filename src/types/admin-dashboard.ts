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

