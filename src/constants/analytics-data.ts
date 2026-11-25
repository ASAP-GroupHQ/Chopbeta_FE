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
