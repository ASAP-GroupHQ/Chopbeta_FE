"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiActivity,
  FiChevronDown,
  FiClock,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { QuickMealItem } from "@/types/meal";
import { mealService } from "@/services/meal";
import { useToast } from "@/context/ToastContext";

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

// Global default fallback asset if database returns an empty url
const DEFAULT_MEAL_IMAGE =
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500";

export default function QuickMeals() {
  const toast = useToast();
  const [selectedTime, setSelectedTime] = useState("morning");
  const [meals, setMeals] = useState<QuickMealItem[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<QuickMealItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeOption = TIME_OPTIONS.find((t) => t.value === selectedTime);
  const currentTagline = activeOption?.tagline;

  useEffect(() => {
    if (!selectedMeal) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedMeal(null);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedMeal]);

  const formatPrice = (meal: QuickMealItem) =>
    parseFloat(meal.estimatedPrice?.$numberDecimal || "0").toLocaleString();

  const formatNutrition = (value?: number | string) =>
    value === undefined || value === null ? "-" : value.toString();

  useEffect(() => {
    if (meals.length < 2 || loading || selectedMeal || isCarouselPaused) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    const advanceCarousel = () => {
      if (window.innerWidth >= 640) return;

      const firstCard = carousel.firstElementChild as HTMLElement | null;
      if (!firstCard) return;

      const cardStep = firstCard.getBoundingClientRect().width + 12;
      const isAtEnd =
        carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;

      carousel.scrollTo({
        left: isAtEnd ? 0 : carousel.scrollLeft + cardStep,
        behavior: "smooth",
      });
    };

    const timer = window.setInterval(advanceCarousel, 3800);
    return () => window.clearInterval(timer);
  }, [isCarouselPaused, loading, meals.length, selectedMeal]);

  const pauseCarousel = () => setIsCarouselPaused(true);
  const resumeCarousel = () => setIsCarouselPaused(false);

  const handleAddToPlan = async () => {
    if (!selectedMeal || isAdding) return;

    setIsAdding(true);
    try {
      await mealService.addToPlanned(selectedMeal._id);
      toast.success("Meal added to your plan", selectedMeal.mealTitle);
      setSelectedMeal(null);
    } catch (error: any) {
      toast.error(error?.message || "Could not add this meal to your plan.");
    } finally {
      setIsAdding(false);
    }
  };

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
            setMeals(response.data.meals);
          } else if (
            (response as any).meals &&
            Array.isArray((response as any).meals)
          ) {
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
        <div
          ref={carouselRef}
          onMouseEnter={pauseCarousel}
          onMouseLeave={resumeCarousel}
          onTouchStart={pauseCarousel}
          onTouchEnd={resumeCarousel}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 scrollbar-none sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0"
          aria-label="Quick meals carousel"
        >
          {meals.map((meal) => (
            <motion.button
              type="button"
              key={meal._id}
              onClick={() => setSelectedMeal(meal)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="min-w-35 sm:min-w-0 bg-white border border-gray-50 rounded-2xl p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-gray-100 transition-all snap-start"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
                <Image
                  src={meal.imageUrl || DEFAULT_MEAL_IMAGE}
                  alt={meal.mealTitle}
                  fill
                  sizes="(max-width: 640px) 140px, 200px"
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    // Safety handler if the live cloud image breaks
                    const target = e.target as HTMLImageElement;
                    if (target.src !== DEFAULT_MEAL_IMAGE) {
                      target.src = DEFAULT_MEAL_IMAGE;
                    }
                  }}
                />

                {/* Safe render for calories as a numeric/string value */}
                {meal.averageNutritionalInfo?.estimatedCalories && (
                  <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-md flex items-center gap-0.5 text-[8px] font-black text-white">
                    <FiActivity size={8} className="text-emerald-400" />
                    {meal.averageNutritionalInfo.estimatedCalories
                      .toString()
                      .includes("kcal")
                      ? meal.averageNutritionalInfo.estimatedCalories
                      : `${meal.averageNutritionalInfo.estimatedCalories} kcal`}
                  </div>
                )}
              </div>

              <div className="space-y-0.5 px-0.5">
                <h4 className="text-xs font-bold text-[#1A2E35] truncate">
                  {meal.mealTitle}
                </h4>
                <p className="text-[11px] font-black text-[#1E6B3C]">
                  ₦{formatPrice(meal)}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedMeal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#10221b]/45 pb-16 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedMeal(null);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-meal-title"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-h-[calc(92vh-4rem)] w-full overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:max-h-[92vh] sm:max-w-lg sm:rounded-[28px]"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                <Image
                  src={selectedMeal.imageUrl || DEFAULT_MEAL_IMAGE}
                  alt={selectedMeal.mealTitle}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />
                <button
                  type="button"
                  aria-label="Close meal details"
                  onClick={() => setSelectedMeal(null)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-white"
                >
                  <FiX />
                </button>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                    {selectedMeal.category} · {selectedMeal.type || "meal"}
                  </p>
                  <h2 id="quick-meal-title" className="text-2xl font-black leading-tight">
                    {selectedMeal.mealTitle}
                  </h2>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm leading-relaxed text-gray-500">
                    {selectedMeal.description || "A delicious meal for your plan."}
                  </p>
                  <p className="shrink-0 text-lg font-black text-[#1E6B3C]">
                    ₦{formatPrice(selectedMeal)}
                  </p>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-black text-[#1A2E35]">
                      Estimated nutrition
                    </h3>
                    <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
                      <FiClock /> Per serving
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div className="rounded-2xl bg-[#EAF6EE] p-3">
                      <FiActivity className="mb-3 text-[#1E6B3C]" />
                      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                        Calories
                      </p>
                      <p className="mt-1 text-sm font-black text-[#1A2E35]">
                        {formatNutrition(selectedMeal.averageNutritionalInfo?.estimatedCalories)}
                      </p>
                    </div>
                    {[
                      ["Carbs", selectedMeal.averageNutritionalInfo?.estimatedMacronutrients?.carbohydrates],
                      ["Protein", selectedMeal.averageNutritionalInfo?.estimatedMacronutrients?.proteins],
                      ["Fats", selectedMeal.averageNutritionalInfo?.estimatedMacronutrients?.fats],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-gray-50 p-3">
                        <p className="mb-4 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                          {label}
                        </p>
                        <p className="text-sm font-black text-[#1A2E35]">
                          {formatNutrition(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToPlan}
                  disabled={isAdding}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-[#185a31] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isAdding ? "Adding to your plan..." : <><FiPlus /> Add to plan</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
