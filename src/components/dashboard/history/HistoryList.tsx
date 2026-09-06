"use client";

import React from "react";

export interface MealHistoryItem {
  id: string;
  date: string;
  dayOfWeek: string;
  mealCount: number;
  status: "Completed" | "Partial";
  totalSpent: number;
}

interface HistoryListProps {
  items: MealHistoryItem[];
}

export default function HistoryList({ items }: HistoryListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-sm transition"
        >
          {/* Date, Day and Divider */}
          <div className="flex items-center gap-6">
            <div className="min-w-[110px]">
              <p className="font-bold text-sm sm:text-base text-[#0F623D]">
                {item.date}
              </p>
              <p className="text-xs text-gray-400 font-medium capitalize mt-0.5">
                {item.dayOfWeek}
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-[1px] h-9 bg-gray-100" />
          </div>

          {/* Meals Count & Status Badge */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#1A1A2E]">
              {item.mealCount} Meals
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.status === "Completed"
                  ? "bg-[#E6F4EA] text-[#0F623D]"
                  : "bg-[#FFF0E6] text-[#FF7A00]"
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* Total Cost Spent & Expand Trigger */}
          <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-0 pt-3 sm:pt-0">
            <div className="sm:text-right">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Total Spent
              </p>
              <p className="font-extrabold text-sm sm:text-base text-[#1A1A2E] mt-0.5">
                ₦{item.totalSpent.toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 p-1 transition cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
