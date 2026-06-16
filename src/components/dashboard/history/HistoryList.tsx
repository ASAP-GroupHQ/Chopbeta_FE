"use client";

import React from "react";

export interface MealHistoryItem {
  id: string;
  date: string;
  dayOfWeek: string;
  mealCount: number;
  status: "Completed" | "Partial";
  images: string[];
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
          className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
        >
          {/* Date and Day */}
          <div className="min-w-[120px]">
            <p className="font-semibold text-base text-[#0F623D]">
              {item.date}
            </p>
            <p className="text-xs text-gray-400 capitalize">{item.dayOfWeek}</p>
          </div>

          {/* Meals Count & Status Badge */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700">
              {item.mealCount} Meals
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.status === "Completed"
                  ? "bg-[#E6F4EA] text-[#0F623D]"
                  : "bg-[#FFF0E6] text-[#FF7A00]"
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* Inline Meal Thumbnails */}
          <div className="flex items-center -space-x-2 overflow-hidden">
            {item.images.map((_, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded-xl border-2 border-white overflow-hidden bg-gray-200 shadow-sm"
              />
            ))}
          </div>

          {/* Total Cost Spent & Action */}
          <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-0 pt-3 sm:pt-0">
            <div className="sm:text-right">
              <p className="text-xs text-gray-400">Total Spent</p>
              <p className="font-bold text-base text-[#1A1A2E]">
                ₦{item.totalSpent.toLocaleString()}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1 transition">
              <svg
                width="12"
                height="12"
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
