"use client";

import React, { useEffect, useState } from "react";
import HistoryTabs from "@/components/dashboard/history/HistoryTabs";
import HistoryList, {
  MealHistoryItem,
} from "@/components/dashboard/history/HistoryList";
import SpendingChart from "@/components/dashboard/history/SpendingChart";
import TopMeals, { TopMealItem } from "@/components/dashboard/history/TopMeals";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { mealService } from "@/services/meal";
import {
  CompletedMealHistoryItem,
  ApiPartialMealItem,
  PlannedMealsHistoryItem,
} from "@/types/meal";

const toDateKey = (date: string) => new Date(date).toISOString().slice(0, 10);

const formatDate = (dateKey: string) =>
  new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

const buildHistory = (
  completedMeals: CompletedMealHistoryItem[],
  partialMeals: ApiPartialMealItem[],
  plannedMeals: PlannedMealsHistoryItem[],
): MealHistoryItem[] => {
  const grouped = new Map<string, MealHistoryItem>();

  const addGroup = (
    date: string,
    status: MealHistoryItem["status"],
    meal: NonNullable<MealHistoryItem["meals"]>[number],
  ) => {
    const dateKey = toDateKey(date);
    const groupId = `${status}-${dateKey}`;
    const existing = grouped.get(groupId);

    if (existing) {
      existing.meals = [...(existing.meals || []), meal];
      existing.mealCount += 1;
      existing.totalSpent += meal.price || 0;
      return;
    }

    grouped.set(groupId, {
      id: groupId,
      date: formatDate(dateKey),
      dayOfWeek: new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      mealCount: 1,
      status,
      totalSpent: meal.price || 0,
      meals: [meal],
    });
  };

  completedMeals.forEach((meal) => {
    addGroup(meal.eatenAt, "Completed", {
      id: meal.uniqueId,
      time: formatTime(meal.eatenAt),
      name: meal.mealTitle,
      price: null,
      status: "Completed",
    });
  });

  partialMeals.forEach((meal) => {
    const price = meal.estimatedPrice?.$numberDecimal
      ? Number(meal.estimatedPrice.$numberDecimal)
      : null;

    addGroup(meal.addedAt, "Partial", {
      id: meal.uniqueId,
      time: formatTime(meal.addedAt),
      name: meal.mealTitle,
      price,
      status: "Pending",
    });
  });

  plannedMeals.forEach((meal) => {
    const price = meal.estimatedPrice?.$numberDecimal
      ? Number(meal.estimatedPrice.$numberDecimal)
      : null;

    addGroup(meal.addedAt, "Saved", {
      id: meal.mealId,
      time: formatTime(meal.addedAt),
      name: meal.mealTitle,
      price,
      status: "Pending",
    });
  });

  return Array.from(grouped.values()).sort((first, second) =>
    second.id.localeCompare(first.id),
  );
};

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
  const [history, setHistory] = useState<MealHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [completedResponse, partialResponse, plannedResponse] =
          await Promise.all([
            mealService.getAllCompletedMeals(1, 10),
            mealService.getAllPartialMealsForHistory(1, 10),
            mealService.getAllPlannedMealsForHistory(1, 10),
          ]);

        setHistory(
          buildHistory(
            completedResponse.data?.meals || [],
            partialResponse.data?.data || [],
            plannedResponse.data?.meals || [],
          ),
        );
      } catch (loadError) {
        console.error("Failed to load meal history:", loadError);
        setError("Unable to load your meal history right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const filteredHistory =
    activeTab === "All Plans"
      ? history
      : history.filter((item) => item.status === activeTab);

  const totalSpent = history.reduce((sum, item) => sum + item.totalSpent, 0);
  const totalMeals = history.reduce((sum, item) => sum + item.mealCount, 0);
  const completedPlans = history.filter(
    (item) => item.status === "Completed",
  ).length;

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
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-xs hover:bg-gray-50 transition text-sm font-medium">
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

          <HeaderActions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <HistoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {isLoading ? (
            <div className="rounded-2xl border border-gray-100 bg-white px-5 py-12 text-center text-sm text-gray-400 shadow-xs">
              Loading meal history...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-100 bg-white px-5 py-12 text-center text-sm text-red-500 shadow-xs">
              {error}
            </div>
          ) : (
            <HistoryList items={filteredHistory} />
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-[#1A1A2E]">
                History Summary
              </h3>
              <select className="text-xs bg-gray-50 border border-gray-100 rounded-lg p-1.5 outline-hidden font-medium text-gray-600 cursor-pointer">
                <option>This week</option>
              </select>
            </div>
            {history.length === 0 ? (
              <div className="h-28 flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-xl">
                <span className="text-xs">
                  No history summary available yet
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-1">
                <div>
                  <p className="text-xs text-gray-400">Total plans</p>
                  <p className="text-xl font-bold text-[#1A1A2E] mt-1">
                    {history.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Meals recorded</p>
                  <p className="text-xl font-bold text-[#1A1A2E] mt-1">
                    {totalMeals}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Completed plans</p>
                  <p className="text-xl font-bold text-[#0F623D] mt-1">
                    {completedPlans}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total spent</p>
                  <p className="text-xl font-bold text-[#0F623D] mt-1">
                    ₦{totalSpent.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          <SpendingChart data={CHART_DATA} />

          <TopMeals meals={TOP_MEALS} />

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
