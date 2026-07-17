"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown, FiActivity } from "react-icons/fi";
import { mealService, QuickMealItem } from "@/services/meal";

const TIME_OPTIONS = [
  {
    value: "morning",
    label: "Morning (6AM-12PM)",
    tagline: "Perfect for Morning",
    apiFilter: "breakfast",
  },
  {
    value: "afternoon",
    label: "Afternoon (12PM-6PM)",
    tagline: "Perfect for Afternoon",
    apiFilter: "lunch",
  },
  {
    value: "evening",
    label: "Evening (7PM-11PM)",
    tagline: "Perfect for Evening",
    apiFilter: "dinner",
  },
  {
    value: "snacks",
    label: "Snacks (Anytime)",
    tagline: "Light & Easy Bites",
    apiFilter: "snacks",
  },
];

export default function QuickMeals() {
  const [selectedTime, setSelectedTime] = useState("morning");
  const [meals, setMeals] = useState<QuickMealItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeOption = TIME_OPTIONS.find((t) => t.value === selectedTime);
  const currentTagline = activeOption?.tagline;

  useEffect(() => {
    const fetchQuickMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const filterVal = activeOption?.apiFilter || "morning";
        const response = await mealService.getQuickMeals(filterVal);

        // Safe resolution of the nested meals array
        if (response) {
          if (response.data && Array.isArray(response.data.meals)) {
            // Case 1: Standard Axios response structure (response.data.meals)
            setMeals(response.data.meals);
          } else if (
            (response as any).meals &&
            Array.isArray((response as any).meals)
          ) {
            // Case 2: In case your client interceptor already unwraps response.data
            setMeals((response as any).meals);
          } else {
            setMeals([]);
          }
        } else {
          setMeals([]);
        }
      } catch (err: any) {
        console.error("Error retrieving quick meals:", err);
        setError("Failed to load meals.");
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuickMeals();
  }, [selectedTime, activeOption]);

  const getImagePlaceholder = (title: string) => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("rice") || lowerTitle.includes("jollof"))
      return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500";
    if (
      lowerTitle.includes("egg") ||
      lowerTitle.includes("bread") ||
      lowerTitle.includes("pap") ||
      lowerTitle.includes("akara")
    )
      return "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500";
    if (
      lowerTitle.includes("swallow") ||
      lowerTitle.includes("egusi") ||
      lowerTitle.includes("fufu")
    )
      return "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=500";
    if (
      lowerTitle.includes("beans") ||
      lowerTitle.includes("dodo") ||
      lowerTitle.includes("plantain")
    )
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500";
    if (
      lowerTitle.includes("spaghetti") ||
      lowerTitle.includes("pasta") ||
      lowerTitle.includes("noodles")
    )
      return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500";

    return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-[#1A2E35]">Quick Meals</h3>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5 transition-all duration-200">
            {currentTagline}
          </p>
        </div>

        <div className="relative inline-block">
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="appearance-none pr-8 pl-3 py-1.5 border border-gray-100 rounded-lg text-[11px] font-bold text-[#1A2E35] bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1E6B3C]/20 transition-all cursor-pointer"
          >
            {TIME_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="font-semibold text-gray-700"
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
            <FiChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Grid List with Loading Skeletons */}
      {loading ? (
        <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="min-w-35 sm:min-w-0 bg-white border border-gray-50 rounded-2xl p-2.5 space-y-3 animate-pulse"
            >
              <div className="relative w-full aspect-square rounded-xl bg-gray-100" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded-md w-3/4" />
                <div className="h-3 bg-gray-100 rounded-md w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="py-6 text-center text-xs font-semibold text-red-500">
          {error}
        </div>
      ) : meals.length === 0 ? (
        <div className="py-8 text-center text-xs font-bold text-gray-400">
          No quick meals found for this time block.
        </div>
      ) : (
        <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="min-w-35 sm:min-w-0 bg-white border border-gray-50 rounded-2xl p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-gray-100 transition-all snap-start"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
                <Image
                  src={getImagePlaceholder(meal.mealTitle)}
                  alt={meal.mealTitle}
                  fill
                  sizes="(max-width: 640px) 140px, 200px"
                  className="object-cover"
                  unoptimized
                />

                {/* Safe render for calories as a numeric value */}
                {meal.averageNutritionalInfo?.estimatedCalories && (
                  <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-md flex items-center gap-0.5 text-[8px] font-black text-white">
                    <FiActivity size={8} className="text-emerald-400" />
                    {meal.averageNutritionalInfo.estimatedCalories}
                  </div>
                )}
              </div>

              <div className="space-y-0.5 px-0.5">
                <h4 className="text-xs font-bold text-[#1A2E35] truncate">
                  {meal.mealTitle}
                </h4>
                <p className="text-[11px] font-black text-[#1E6B3C]">
                  ₦
                  {parseFloat(
                    meal.estimatedPrice.$numberDecimal,
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
