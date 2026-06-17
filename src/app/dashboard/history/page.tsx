"use client";

import React, { useState } from "react";
import HistoryTabs from "@/components/dashboard/history/HistoryTabs";
import HistoryList, {
  MealHistoryItem,
} from "@/components/dashboard/history/HistoryList";
import SpendingChart from "@/components/dashboard/history/SpendingChart";
import TopMeals, { TopMealItem } from "@/components/dashboard/history/TopMeals";
import HeaderActions from "@/components/dashboard/HeaderActions";

const MOCK_HISTORY_DATA: MealHistoryItem[] = [
  {
    id: "1",
    date: "May 13, 2026",
    dayOfWeek: "Tuesday",
    mealCount: 2,
    status: "Completed",
    images: ["", "", ""],
    totalSpent: 1000,
  },
  {
    id: "2",
    date: "May 13, 2026",
    dayOfWeek: "Tuesday",
    mealCount: 2,
    status: "Completed",
    images: ["", ""],
    totalSpent: 1000,
  },
  {
    id: "3",
    date: "May 13, 2026",
    dayOfWeek: "Tuesday",
    mealCount: 2,
    status: "Partial",
    images: ["", ""],
    totalSpent: 1000,
  },
  {
    id: "4",
    date: "May 13, 2026",
    dayOfWeek: "Tuesday",
    mealCount: 3,
    status: "Completed",
    images: ["", "", ""],
    totalSpent: 1000,
  },
  {
    id: "5",
    date: "May 13, 2026",
    dayOfWeek: "Tuesday",
    mealCount: 2,
    status: "Partial",
    images: ["", ""],
    totalSpent: 1000,
  },
];

const CHART_DATA = [
  { day: "Mon", spent: 2100 },
  { day: "Tue", spent: 1300 },
  { day: "Wed", spent: 1600 },
  { day: "Thu", spent: 1200 },
  { day: "Fri", spent: 1100 },
  { day: "Sat", spent: 900 },
  { day: "Sun", spent: 650 },
];

const TOP_MEALS: TopMealItem[] = [
  { name: "Rice and Beans", count: 3 },
  { name: "Bread and Egg", count: 2 },
  { name: "Pap and Akara", count: 2 },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<string>("All Plans");

  return (
    <div className="min-h-screen bg-[#F9F8FC] p-4 md:p-8 text-[#1A1A2E]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            History
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View your past meal plans and track your progress over time.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition text-sm font-medium">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z"
                fill="#1A1A2E"
                fillOpacity="0.85"
              />
            </svg>
            <span>Jun 1 - 6, 2026</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition text-sm font-medium">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.25 7.63711H5.56635M2.14827 7.63711H0.75M2.14827 7.63711C2.14827 7.18395 2.32829 6.74934 2.64872 6.42891C2.96916 6.10848 3.40376 5.92846 3.85692 5.92846C4.31008 5.92846 4.74468 6.10848 5.06512 6.42891C5.38555 6.74934 5.56557 7.18395 5.56557 7.63711C5.56557 8.09027 5.38555 8.52487 5.06512 8.8453C4.74468 9.16574 4.31008 9.34576 3.85692 9.34576C3.40376 9.34576 2.96916 9.16574 2.64872 8.8453C2.32829 8.52487 2.14827 8.09027 2.14827 7.63711ZM15.25 12.8156H10.7448M10.7448 12.8156C10.7448 13.2688 10.5644 13.7039 10.2439 14.0244C9.92335 14.3449 9.48864 14.525 9.03538 14.525C8.58222 14.525 8.14762 14.3442 7.82718 14.0238C7.50675 13.7033 7.32673 13.2687 7.32673 12.8156M10.7448 12.8156C10.7448 12.3623 10.5644 11.928 10.2439 11.6075C9.92335 11.287 9.48864 11.1069 9.03538 11.1069C8.58222 11.1069 8.14762 11.2869 7.82718 11.6074C7.50675 11.9278 7.32673 12.3624 7.32673 12.8156M7.32673 12.8156H0.75M15.25 2.45865H12.8164M9.39827 2.45865H0.75M9.39827 2.45865C9.39827 2.00549 9.57829 1.57089 9.89872 1.25045C10.2192 0.930018 10.6538 0.75 11.1069 0.75C11.3313 0.75 11.5535 0.794196 11.7608 0.880063C11.9681 0.965931 12.1565 1.09179 12.3151 1.25045C12.4738 1.40911 12.5996 1.59747 12.6855 1.80478C12.7714 2.01208 12.8156 2.23427 12.8156 2.45865C12.8156 2.68303 12.7714 2.90522 12.6855 3.11252C12.5996 3.31982 12.4738 3.50818 12.3151 3.66685C12.1565 3.82551 11.9681 3.95137 11.7608 4.03723C11.5535 4.1231 11.3313 4.1673 11.1069 4.1673C10.6538 4.1673 10.2192 3.98728 9.89872 3.66685C9.57829 3.34641 9.39827 2.91181 9.39827 2.45865Z"
                stroke="#1A1A2E"
                strokeOpacity="0.7"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <span>Filter</span>
          </button>

          <HeaderActions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <HistoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <HistoryList items={MOCK_HISTORY_DATA} />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* HISTORY SUMMARY CARD */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-[#1A1A2E]">
                History Summary
              </h3>
              <select className="text-xs bg-gray-50 border border-gray-100 rounded-lg p-1.5 outline-none font-medium text-gray-600">
                <option>This week</option>
              </select>
            </div>
            <div className="h-28 flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-xl">
              <span className="text-xs">No metrics context loaded</span>
            </div>
          </div>

          <SpendingChart data={CHART_DATA} />

          <TopMeals meals={TOP_MEALS} />

          {/* BUDGET ADVOCACY CARD */}
          <div className="bg-[#EAF4EF] rounded-2xl p-5 border border-[#D5ECE1] relative overflow-hidden">
            <h4 className="font-bold text-sm text-[#0F623D] mb-1">
              Save More, Eat Better
            </h4>
            <p className="text-xs text-[#0F623D]/80 leading-relaxed max-w-[85%]">
              Keep planning ahead and sticking to your budget. You&apos;re doing
              great!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
