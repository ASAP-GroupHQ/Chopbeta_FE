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
import { StreakData } from "@/types/track";
import { PlannedMealData } from "@/types/meal";

// Map the real backend data shape into the format expected by UI component
const mapToMealLog = (item: PlannedMealData) => {
  if (!item) return null;

  return {
    id: item._id,
    time: "",
    name: item.mealId?.mealTitle || "Unknown Meal",
    tag: item.mealId?.category || "Budget Friendly",
    price: item.mealId?.estimatedPrice?.$numberDecimal
      ? parseFloat(item.mealId.estimatedPrice.$numberDecimal)
      : 0,
    image:
      item.mealId?.imageUrl ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
    eaten: !!item.isEaten,
  };
};

export default function TrackMealPage() {
  const [meals, setMeals] = useState<PlannedMealData[]>([]);
  const [activeTab, setActiveTab] = useState<"planned" | "eaten">("planned");
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [mealsLoading, setMealsLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>("");

  // System integrations
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [streakLoading, setStreakLoading] = useState<boolean>(true);

  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [budgetLoading, setBudgetLoading] = useState<boolean>(true);

  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [spentLoading, setSpentLoading] = useState<boolean>(true);

  // —— DEFENSIVE ARRAYS SAFE GUARDING ——
  const safeMeals = Array.isArray(meals) ? meals : [];

  // Derive eating metrics from real integrated states
  const eatenCount = safeMeals.filter((m) => m && m.isEaten).length;
  const totalCount = safeMeals.length;

  // Safe percentage calculation for spent progress bar
  const spentPercentage =
    totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  // 🟢 Integrated PATCH mark-as-eaten API call
  const handleToggleEaten = async (id: string) => {
    const targetMeal = safeMeals.find((m) => m && m._id === id);
    // Don't trigger API if already eaten or invalid target
    if (!targetMeal || targetMeal.isEaten) return;

    try {
      setIsLoading(true);
      const res = await trackService.markAsEaten(id);

      if (res && res.success) {
        // Optimistically update local array
        setMeals((prev) => {
          const prevArray = Array.isArray(prev) ? prev : [];
          return prevArray.map((m) =>
            m && m._id === id ? { ...m, isEaten: true } : m,
          );
        });

        // Re-fetch metrics (Daily Spent, Streak, etc.) to keep top cards synced with backend
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
      await handleToggleEaten(firstUnchecked._id);
    }
  };

  const incrementWater = () => {
    setWaterGlasses((prev) => (prev < 6 ? prev + 1 : 0));
  };

  const fetchTrackerData = async () => {
    // Fetch Planned Meals
    try {
      setMealsLoading(true);
      const mealsRes = await mealService.getPlannedMeals();

      if (
        mealsRes?.data?.plannedMeals &&
        Array.isArray(mealsRes.data.plannedMeals)
      ) {
        setMeals(mealsRes.data.plannedMeals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Error retrieving planned meals layout:", error);
      setMeals([]);
    } finally {
      setMealsLoading(false);
    }

    // Fetch Streak
    try {
      setStreakLoading(true);
      const streakRes = await trackService.getStreak();
      if (streakRes?.success && streakRes?.data) {
        setStreak(streakRes.data);
      }
    } catch (error) {
      console.error("Error retrieving streak data:", error);
    } finally {
      setStreakLoading(false);
    }

    // Fetch Daily Budget
    try {
      setBudgetLoading(true);
      const budgetRes = await trackService.getDailyBudget();
      if (budgetRes?.success && budgetRes?.data) {
        setTotalBudget(budgetRes.data.totalBudget);
      }
    } catch (error) {
      console.error("Error retrieving daily budget data:", error);
    } finally {
      setBudgetLoading(false);
    }

    // Fetch Daily Spent Money
    try {
      setSpentLoading(true);
      const spentRes = await trackService.getDailySpent();
      if (spentRes?.success && spentRes?.data) {
        setTotalSpent(spentRes.data.totalMoneySpent);
      }
    } catch (error) {
      console.error("Error retrieving daily spent data:", error);
    } finally {
      setSpentLoading(false);
    }
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

  // Filter items matching active interactive dashboard views
  const filteredMeals =
    activeTab === "planned"
      ? safeMeals
      : safeMeals.filter((m) => m && m.isEaten);

  // Apply visual transformation mapping and drop null nodes
  const displayedMeals = filteredMeals
    .map(mapToMealLog)
    .filter((item): item is NonNullable<typeof item> => item !== null);

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

        {/* Top Metric Cards Matrix Grid Container */}
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
                ? `${streak.currentStreak} ${streak.currentStreak === 1 ? "day" : "days"}`
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
                className={`pb-3 transition-colors ${activeTab === "planned" ? "text-[#1E6B3C] border-b-2 border-[#1E6B3C]" : "text-gray-400 hover:text-gray-600"}`}
              >
                Planned
              </button>
              <button
                onClick={() => setActiveTab("eaten")}
                className={`pb-3 transition-colors ${activeTab === "eaten" ? "text-[#1E6B3C] border-b-2 border-[#1E6B3C]" : "text-gray-400 hover:text-gray-600"}`}
              >
                Eaten
              </button>
            </div>

            {/* List rendered row items */}
            <div className="space-y-4 min-h-[300px]">
              {mealsLoading ? (
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
                  No logged items to display under this view state filters.
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
