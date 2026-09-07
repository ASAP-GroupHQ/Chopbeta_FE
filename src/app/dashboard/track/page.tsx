"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
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
import { StreakData, SpentMealEntry } from "@/types/track";
import { mealService } from "@/services/meal";
import { PlannedMealData, MealLog } from "@/types/meal";

const parseDecimal = (val: unknown): number => {
  if (typeof val === "number") return val;
  if (typeof val === "string") return parseFloat(val) || 0;
  if (typeof val === "object" && val !== null && "$numberDecimal" in val) {
    return parseFloat((val as { $numberDecimal: string }).$numberDecimal) || 0;
  }
  return 0;
};

const mapToMealLog = (item: PlannedMealData): MealLog | null => {
  if (!item || !item.uniqueId) return null;

  return {
    id: item._id || item.mealId,
    uniqueId: item.uniqueId,
    time: item.addedAt
      ? new Date(item.addedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    name: item.mealTitle || "Unknown Meal",
    tag: item.category || "Budget Friendly",
    price: parseDecimal(item.estimatedPrice),
    eaten: Boolean(item.isEaten),
  };
};

const mapSpentToMealLog = (item: SpentMealEntry): MealLog | null => {
  if (!item) return null;
  if (!item.uniqueId) return null;

  return {
    id: item._id,
    uniqueId: item.uniqueId,
    time: item.eatenAt
      ? new Date(item.eatenAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    name: item.mealId?.mealTitle || "Eaten Meal",
    tag: "Eaten Today",
    price: parseDecimal(item.mealId?.estimatedPrice),
    eaten: true,
  };
};

export default function TrackMealPage() {
  const [meals, setMeals] = useState<PlannedMealData[]>([]);
  const [partialMeals, setPartialMeals] = useState<MealLog[]>([]);
  const [spentMeals, setSpentMeals] = useState<SpentMealEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"planned" | "eaten">("planned");
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [mealsLoading, setMealsLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>("");

  // Tracking Stats
  const [eatenTodayCount, setEatenTodayCount] = useState<number>(0);
  const [eatenTodayLoading, setEatenTodayLoading] = useState<boolean>(true);

  const [streak, setStreak] = useState<StreakData | null>(null);
  const [streakLoading, setStreakLoading] = useState<boolean>(true);

  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [budgetLoading, setBudgetLoading] = useState<boolean>(true);

  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [spentLoading, setSpentLoading] = useState<boolean>(true);

  const safeMeals = Array.isArray(meals) ? meals : [];

  const eatenCount = safeMeals.filter((m) => m && m.isEaten).length;
  const totalCount = safeMeals.length + partialMeals.length;

  const spentPercentage =
    totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  const handleToggleEaten = async (uniqueId: string) => {
    const targetMeal = safeMeals.find((m) => m.uniqueId === uniqueId);
    const targetLog = displayedMeals.find(
      (meal) => meal.uniqueId === uniqueId,
    );
    const wasEaten = targetMeal?.isEaten ?? targetLog?.eaten ?? false;
    const nextEaten = !wasEaten;

    setTogglingId(uniqueId);

    const previousMeals = [...meals];
    const previousPartialMeals = [...partialMeals];
    const previousSpentMeals = [...spentMeals];

    setMeals((prev) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.map((m) =>
        m && m.uniqueId === uniqueId
          ? { ...m, isEaten: nextEaten }
          : m,
      );
    });
    setPartialMeals((prev) =>
      prev.map((meal) =>
        meal.uniqueId === uniqueId
          ? { ...meal, eaten: nextEaten }
          : meal,
      ),
    );
    if (!nextEaten) {
      setSpentMeals((prev) =>
        prev.filter(
          (meal) =>
            meal.uniqueId !== uniqueId,
        ),
      );
    }

    try {
      const res = await trackService.markAsEaten(uniqueId);

      if (res && res.success) {
        toast.success(
          res.message ||
            (nextEaten
              ? "Meal marked as eaten successfully!"
              : "Meal removed from eaten meals successfully!"),
        );
        await fetchTrackerData(true);
      } else {
        setMeals(previousMeals);
        setPartialMeals(previousPartialMeals);
        setSpentMeals(previousSpentMeals);
        toast.error(res?.message || "Failed to update meal status.");
      }
    } catch (error) {
      console.error("Failed to update meal status:", error);
      setMeals(previousMeals);
      setPartialMeals(previousPartialMeals);
      setSpentMeals(previousSpentMeals);
      toast.error("Failed to update meal status. Please try again.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleMarkNextMealAsEaten = async () => {
    const firstUnchecked = safeMeals.find((m) => m && !m.isEaten);
    if (firstUnchecked) {
      setIsLoading(true);
      await handleToggleEaten(firstUnchecked.uniqueId);
      setIsLoading(false);
    } else {
      toast.info("All planned meals are marked as eaten!");
    }
  };

  const incrementWater = () => {
    setWaterGlasses((prev) => (prev < 6 ? prev + 1 : 0));
  };

  const fetchTrackerData = async (silent = false) => {
    if (!silent) {
      setMealsLoading(true);
      setEatenTodayLoading(true);
      setStreakLoading(true);
      setBudgetLoading(true);
      setSpentLoading(true);
    }

    const [
      mealsRes,
      partialRes,
      eatenTodayRes,
      streakRes,
      budgetRes,
      spentRes,
    ] = await Promise.allSettled([
      mealService.getPlannedMeals(),
      mealService.getAllPartialMeals(1, 10),
      trackService.getMealsEatenToday(),
      trackService.getStreak(),
      trackService.getDailyBudget(),
      trackService.getDailySpent(),
    ]);

    // Planned Meals
    if (
      mealsRes.status === "fulfilled" &&
      mealsRes.value?.data?.plannedMeals &&
      Array.isArray(mealsRes.value.data.plannedMeals)
    ) {
      setMeals(mealsRes.value.data.plannedMeals);
    } else if (!silent) {
      setMeals([]);
    }

    // Partial Meals
    if (partialRes.status === "fulfilled" && partialRes.value?.meals) {
      setPartialMeals(partialRes.value.meals);
    } else if (!silent) {
      setPartialMeals([]);
    }
    setMealsLoading(false);

    // Meals Eaten Today Count
    if (
      eatenTodayRes.status === "fulfilled" &&
      eatenTodayRes.value?.success &&
      typeof eatenTodayRes.value?.data?.count === "number"
    ) {
      setEatenTodayCount(eatenTodayRes.value.data.count);
    } else if (!silent) {
      setEatenTodayCount(0);
    }
    setEatenTodayLoading(false);

    // Streak
    if (streakRes.status === "fulfilled" && streakRes.value?.data) {
      setStreak(streakRes.value.data);
    }
    setStreakLoading(false);

    // Daily Budget
    if (budgetRes.status === "fulfilled" && budgetRes.value?.data) {
      setTotalBudget(budgetRes.value.data.totalBudget || 0);
    }
    setBudgetLoading(false);

    // Daily Spent
    if (spentRes.status === "fulfilled" && spentRes.value?.data) {
      const parsedSpent = parseDecimal(spentRes.value.data.totalMoneySpent);
      setTotalSpent(parsedSpent);
      setSpentMeals(spentRes.value.data.meals || []);
    } else if (!silent) {
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

  const getDisplayedMeals = (): MealLog[] => {
    if (activeTab === "planned") {
      const plannedMapped = safeMeals
        .map(mapToMealLog)
        .filter((item): item is MealLog => item !== null);

      return [...plannedMapped, ...partialMeals];
    }

    const eatenFromPlanned = safeMeals
      .filter((m) => m && m.isEaten)
      .map(mapToMealLog);
    const eatenFromPartial = partialMeals.filter((pm) => pm.eaten);
    const eatenFromSpent = spentMeals.map((item) => {
      return mapSpentToMealLog(item);
    });

    const merged = [
      ...eatenFromPlanned,
      ...eatenFromPartial,
      ...eatenFromSpent,
    ].filter((item): item is MealLog => item !== null);

    const uniqueMap = new Map<string, MealLog>();
    merged.forEach((item) => uniqueMap.set(item.uniqueId, item));
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
            value={`${eatenTodayCount}`}
            subtext="Keep it up!"
            progressColor="#1E6B3C"
            progressWidth={
              totalCount > 0 ? (eatenTodayCount / totalCount) * 100 : 0
            }
            isLoading={eatenTodayLoading || mealsLoading}
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
                    key={meal.uniqueId}
                    meal={meal}
                    onToggleEaten={handleToggleEaten}
                    isLoading={togglingId === meal.uniqueId}
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
              <span className="font-semibold text-gray-500">Tip:</span>
              <span>
                Consistency is the key to a healthier you. Keep tracking! 💚
              </span>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ProgressSidebar
              eatenCount={eatenTodayCount}
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
