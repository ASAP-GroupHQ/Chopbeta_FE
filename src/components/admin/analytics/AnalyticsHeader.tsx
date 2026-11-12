"use client";

import HeaderActions from "@/components/dashboard/HeaderActions";
import { CalendarDays, ChevronDown } from "lucide-react";
import {
  ANALYTICS_RANGES,
  type AnalyticsTimeRange,
} from "@/constants/analytics-data";

interface AnalyticsHeaderProps {
  selectedRange: AnalyticsTimeRange;
  showCustomRange: boolean;
  onSelectRange: (range: AnalyticsTimeRange) => void;
}

export default function AnalyticsHeader({
  selectedRange,
  showCustomRange,
  onSelectRange,
}: AnalyticsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 space-y-3">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-black tracking-tight text-[#202035] sm:text-3xl">
            Analytics
          </h1>
          <p className="text-xs font-medium text-[#7b7b8e] sm:text-sm">
            Track platform performance, user activity and meal trends with
            real-time insights
          </p>
        </div>
        <div className="flex max-w-full flex-col items-start gap-2">
          <div className="flex max-w-full flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectRange("Custom")}
              className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition ${
                selectedRange === "Custom"
                  ? "border-[#2e8b57] bg-[#2e8b57] text-white"
                  : "border-[#e7e4eb] bg-white text-[#66667a] hover:bg-[#fbfaff]"
              }`}
            >
              Custom
              <CalendarDays className="h-4 w-4" />
            </button>
            {ANALYTICS_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => onSelectRange(range)}
                aria-pressed={selectedRange === range}
                className={`h-9 rounded-lg border px-3 text-xs font-medium transition ${
                  selectedRange === range
                    ? "border-[#2e8b57] bg-[#2e8b57] text-white shadow-sm"
                    : "border-[#e7e4eb] bg-white text-[#66667a] hover:bg-[#fbfaff]"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="flex min-h-9 max-w-full items-center gap-2 rounded-lg border border-[#e7e4eb] bg-white px-2.5 text-xs text-[#66667a]">
            <CalendarDays className="h-4 w-4 shrink-0 text-[#77778a]" />
            {showCustomRange ? (
              <div className="flex min-w-0 flex-wrap items-center gap-1">
                <input
                  type="date"
                  aria-label="Custom range start date"
                  defaultValue="2025-04-25"
                  className="w-[116px] bg-transparent text-[10px] outline-none"
                />
                <span>–</span>
                <input
                  type="date"
                  aria-label="Custom range end date"
                  defaultValue="2025-05-24"
                  className="w-[116px] bg-transparent text-[10px] outline-none"
                />
              </div>
            ) : (
              <>
                <span className="whitespace-nowrap">
                  Apr 25, 2025 - May 24, 2025
                </span>
                <ChevronDown className="h-4 w-4 shrink-0" />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 justify-end">
        <HeaderActions />
      </div>
    </header>
  );
}
