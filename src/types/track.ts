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