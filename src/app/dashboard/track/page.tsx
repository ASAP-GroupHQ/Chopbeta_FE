"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  MealEatenIcon,
  BudgetIcon,
  SpentIcon,
  StreakIcon,
  FireIcon,
} from "@/components/dashboard/track/TrackMealIcons";
import { StatCard } from "@/components/dashboard/track/StatCard";
import { MealLogCard } from "@/components/dashboard/track/MealLogCard";
import { ProgressSidebar } from "@/components/dashboard/track/ProgressSidebar";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { trackService } from "@/services/track";
import { mealService } from "@/services/meal";
import { StreakData, SpentMealEntry } from "@/types/track";
import { PlannedMealData } from "@/types/meal";

// Helper: Safely convert MongoDB Decimal objects or raw string numbers into float numbers
const parseDecimal = (val: unknown): number => {
  if (typeof val === "number") return val;
  if (typeof val === "string") return parseFloat(val) || 0;
  if (typeof val === "object" && val !== null && "$numberDecimal" in val) {
    return parseFloat((val as { $numberDecimal: string }).$numberDecimal) || 0;
  }
  return 0;
};

// Map planned meal entry to standard UI structure
const mapToMealLog = (item: PlannedMealData) => {
  if (!item) return null;
  const targetId = item._id || item.mealId || "";

  return {
    id: targetId,
    time: item.addedAt
      ? new Date(item.addedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    name: item.mealTitle || "Unknown Meal",
    tag: item.category || "Budget Friendly",
    price: parseDecimal(item.estimatedPrice),
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
    eaten: Boolean(item.isEaten),
  };
};

// Map spent entry from daily-spent endpoint directly to UI structure for the "Eaten" tab fallback
const mapSpentToMealLog = (item: SpentMealEntry) => {
  if (!item) return null;

  return {
    id: item._id,
    time: item.eatenAt
      ? new Date(item.eatenAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    name: item.mealId?.mealTitle || "Eaten Meal",
    tag: "Eaten Today",
    price: parseDecimal(item.mealId?.estimatedPrice),
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
    eaten: true,
  };
};

export default function TrackMealPage() {
  const [meals, setMeals] = useState<PlannedMealData[]>([]);
  const [spentMeals, setSpentMeals] = useState<SpentMealEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"planned" | "eaten">("planned");
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [mealsLoading, setMealsLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>("");

  // Tracking stats
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [streakLoading, setStreakLoading] = useState<boolean>(true);

  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [budgetLoading, setBudgetLoading] = useState<boolean>(true);

  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [spentLoading, setSpentLoading] = useState<boolean>(true);

  // Safe Array handling
  const safeMeals = Array.isArray(meals) ? meals : [];

  // Derived metrics
  const eatenCount = safeMeals.filter((m) => m && m.isEaten).length;
  const totalCount = safeMeals.length;

  const spentPercentage =
    totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  // Toggle meal as eaten
  const handleToggleEaten = async (id: string) => {
    const targetMeal = safeMeals.find(
      (m) => m && (m._id === id || m.mealId === id),
    );

    if (!targetMeal || targetMeal.isEaten) return;

    try {
      setIsLoading(true);
      const res = await trackService.markAsEaten(id);

      if (res && res.success) {
        // Optimistic local state update
        setMeals((prev) => {
          const prevArray = Array.isArray(prev) ? prev : [];
          return prevArray.map((m) =>
            m && (m._id === id || m.mealId === id)
              ? { ...m, isEaten: true }
              : m,
          );
        });

        // Re-sync dashboard metrics (Daily Spent, Streak, etc.)
        await fetchTrackerData();
      }
    } catch (error) {
      console.error("Failed to mark meal as eaten:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkNextMealAsEaten = async () => {
    const firstUnchecked = safeMeals.find((m) => m && !m.isEaten);
    if (firstUnchecked) {
      const targetId = firstUnchecked._id || firstUnchecked.mealId;
      if (targetId) {
        await handleToggleEaten(targetId);
      }
    }
  };

  const incrementWater = () => {
    setWaterGlasses((prev) => (prev < 6 ? prev + 1 : 0));
  };

  const fetchTrackerData = async () => {
    setMealsLoading(true);
    setStreakLoading(true);
    setBudgetLoading(true);
    setSpentLoading(true);

    const [mealsRes, streakRes, budgetRes, spentRes] = await Promise.allSettled(
      [
        mealService.getPlannedMeals(),
        trackService.getStreak(),
        trackService.getDailyBudget(),
        trackService.getDailySpent(),
      ],
    );

    // Planned Meals
    if (
      mealsRes.status === "fulfilled" &&
      mealsRes.value?.data?.plannedMeals &&
      Array.isArray(mealsRes.value.data.plannedMeals)
    ) {
      setMeals(mealsRes.value.data.plannedMeals);
    } else {
      setMeals([]);
    }
    setMealsLoading(false);

    // Streak
    if (streakRes.status === "fulfilled" && streakRes.value?.data) {
      setStreak(streakRes.value.data);
    }
    setStreakLoading(false);

    // Daily Budget
    if (budgetRes.status === "fulfilled" && budgetRes.value?.data) {
      const parsedBudget = parseDecimal(budgetRes.value.data.totalBudget);
      setTotalBudget(parsedBudget);
    }
    setBudgetLoading(false);

    // Daily Spent
    if (spentRes.status === "fulfilled" && spentRes.value?.data) {
      const parsedSpent = parseDecimal(spentRes.value.data.totalMoneySpent);
      setTotalSpent(parsedSpent);
      setSpentMeals(spentRes.value.data.meals || []);
    } else {
      setTotalSpent(0);
      setSpentMeals([]);
    }
    setSpentLoading(false);
  };

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    setCurrentDate(new Date().toLocaleDateString("en-US", options));
    fetchTrackerData();
  }, []);

  // Display mapped meals based on active view tab
  const getDisplayedMeals = () => {
    if (activeTab === "planned") {
      return safeMeals
        .map(mapToMealLog)
        .filter((item): item is NonNullable<typeof item> => item !== null);
    }

    // Combine locally checked eaten meals with backend spent meals array
    const eatenFromPlanned = safeMeals
      .filter((m) => m && m.isEaten)
      .map(mapToMealLog);
    const eatenFromSpent = spentMeals.map(mapSpentToMealLog);

    const merged = [...eatenFromPlanned, ...eatenFromSpent].filter(
      (item): item is NonNullable<typeof item> => item !== null,
    );

    // Deduplicate by ID
    const uniqueMap = new Map();
    merged.forEach((item) => uniqueMap.set(item.id, item));
    return Array.from(uniqueMap.values());
  };

  const displayedMeals = getDisplayedMeals();

  return (
    <>
      <Head>
        <title>Track Meal - ChopBeta</title>
      </Head>

      <div className="min-h-screen bg-[#FAFAFC] p-4 md:p-8 font-sans antialiased">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-gray-900 tracking-tight">
              Track Meal
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Track your meal, stay consistent and achieve your nutritional
              goals.
            </p>
          </div>

          <div className="flex items-center self-end sm:self-auto gap-4">
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-1.5 shadow-sm text-xs font-bold text-gray-700 select-none">
              <button className="hover:text-black transition-colors">‹</button>
              <span className="px-1 min-w-[70px] text-center">
                {currentDate || "Loading..."}
              </span>
              <button className="hover:text-black transition-colors">›</button>
            </div>

            <HeaderActions />
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<MealEatenIcon />}
            label="Meal Eaten"
            value={`${eatenCount}/${totalCount}`}
            subtext="Keep it up!"
            progressColor="#1E6B3C"
            progressWidth={totalCount > 0 ? (eatenCount / totalCount) * 100 : 0}
            isLoading={mealsLoading}
          />

          <StatCard
            icon={<BudgetIcon />}
            label="Budget"
            value={`₦ ${totalBudget.toLocaleString()}`}
            subtext="Today's budget"
            isLoading={budgetLoading}
          />

          <StatCard
            icon={<SpentIcon />}
            label="Spent"
            value={`₦ ${totalSpent.toLocaleString()}`}
            subtext={
              totalBudget > 0
                ? `${spentPercentage.toFixed(0)}% of limit`
                : "Budget unset"
            }
            progressColor={spentPercentage > 100 ? "#DC2626" : "#E85D26"}
            progressWidth={spentPercentage}
            isLoading={spentLoading || budgetLoading}
          />

          <StatCard
            icon={<StreakIcon />}
            label="Streak"
            value={
              streak
                ? `${streak.currentStreak} ${
                    streak.currentStreak === 1 ? "day" : "days"
                  }`
                : "0 days"
            }
            subtext={
              <span className="flex items-center gap-1 justify-center">
                You&apos;re on fire! <FireIcon />
              </span>
            }
            isLoading={streakLoading}
          />
        </div>

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center border-b border-gray-200/60 gap-8 text-sm font-bold tracking-wide">
              <button
                onClick={() => setActiveTab("planned")}
                className={`pb-3 transition-colors ${
                  activeTab === "planned"
                    ? "text-[#1E6B3C] border-b-2 border-[#1E6B3C]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Planned
              </button>
              <button
                onClick={() => setActiveTab("eaten")}
                className={`pb-3 transition-colors ${
                  activeTab === "eaten"
                    ? "text-[#1E6B3C] border-b-2 border-[#1E6B3C]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Eaten
              </button>
            </div>

            {/* Meal Cards Container */}
            <div className="space-y-4 min-h-[300px]">
              {mealsLoading || spentLoading ? (
                [1, 2].map((n) => (
                  <div
                    key={n}
                    className="h-24 bg-white border border-gray-100 rounded-2xl animate-pulse w-full"
                  />
                ))
              ) : displayedMeals.length > 0 ? (
                displayedMeals.map((meal) => (
                  <MealLogCard
                    key={meal.id}
                    meal={meal}
                    onToggleEaten={handleToggleEaten}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-sm text-gray-400 bg-white rounded-2xl border border-gray-100">
                  No logged items to display under this view.
                </div>
              )}
            </div>

            <button
              onClick={handleMarkNextMealAsEaten}
              disabled={isLoading || mealsLoading || eatenCount === totalCount}
              className="w-full h-14 bg-[#1E6B3C] hover:bg-[#154d2b] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm text-base tracking-wide"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-xl font-medium">+</span>
                  <span>Mark a Meal as Eaten</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 pl-1 font-medium select-none">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.77778 11.1111H8V8H7.22222M8 4.88889H8.00778M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                    stroke="#1E6B3C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-semibold text-gray-500">Tip:</span>
              <span>
                Consistency is the key to a healthier you. Keep tracking! 💚
              </span>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ProgressSidebar
              eatenCount={eatenCount}
              totalCount={totalCount}
              waterGlasses={waterGlasses}
              onAddWater={incrementWater}
            />
          </div>
        </div>
      </div>
    </>
  );
}
