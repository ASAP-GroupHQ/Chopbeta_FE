"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiActivity, FiPlus, FiX } from "react-icons/fi";
import { MealItem } from "@/types/meal";
import { mealService } from "@/services/meal";
import { useToast } from "@/context/ToastContext";

interface MealCardProps {
  meal: MealItem;
}

const DEFAULT_MEAL_IMAGE =
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500";

export default function MealCard({ meal }: MealCardProps) {
  const toast = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const nutrition = meal.averageNutritionalInfo || {};
  const macros = nutrition.estimatedMacronutrients || nutrition.macronutrients || {};
  const calories = nutrition.estimatedCalories || "0";
  const price = meal.estimatedPrice?.$numberDecimal
    ? parseFloat(meal.estimatedPrice.$numberDecimal).toLocaleString()
    : "0";

  const handleAddMealPlan = async () => {
    if (isAdding || isAdded) return;
    setIsAdding(true);
    try {
      const response = await mealService.addToPlanned(meal._id);
      if (response.success) {
        setIsAdded(true);
        toast.success(`${meal.mealTitle} added to your plan successfully!`);
      } else {
        toast.error(response.message || "Failed to add meal to planner.");
      }
    } catch (error: any) {
      toast.error(error.message || "Error adding meal to planner.");
    } finally {
      setIsAdding(false);
    }
  };

  const openDetails = () => setShowDetails(true);

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={openDetails}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDetails();
          }
        }}
        role="button"
        tabIndex={0}
        className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_4px_16px_rgba(26,46,53,0.05)] transition-all hover:-translate-y-1 hover:border-green-100 hover:shadow-[0_12px_24px_rgba(30,107,60,0.12)]"
      >
        <div>
          <div className="relative mb-3 aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-50">
            <img
              src={meal.imageUrl || DEFAULT_MEAL_IMAGE}
              alt={meal.mealTitle}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.src = DEFAULT_MEAL_IMAGE;
              }}
            />
            <button
              type="button"
              aria-label={`Add ${meal.mealTitle} to your plan`}
              onClick={(event) => {
                event.stopPropagation();
                handleAddMealPlan();
              }}
              disabled={isAdding || isAdded}
              className={`absolute right-2 top-2 z-10 rounded-xl p-2 shadow-sm transition-all hover:scale-110 active:scale-95 ${
                isAdded
                  ? "bg-green-700 text-white"
                  : "bg-white/90 text-[#1A2E35] backdrop-blur-sm hover:bg-green-50 hover:text-green-700"
              }`}
            >
              {isAdding ? (
                <span className="block h-4 w-4 animate-spin rounded-full border-2 border-green-700 border-t-transparent" />
              ) : (
                <FiPlus size={16} className="stroke-3" />
              )}
            </button>
          </div>
          <h3 className="mb-1 line-clamp-2 px-1 text-sm font-bold text-[#1A2E35]">
            {meal.mealTitle}
          </h3>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-gray-50 px-1 pt-2">
          <span className="text-sm font-extrabold text-green-700">₦{price}</span>
          <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-400">
            <FiActivity size={12} /> Details
          </span>
        </div>
      </motion.article>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setShowDetails(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`meal-title-${meal._id}`}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="relative h-52 bg-slate-200 sm:h-64">
                <img
                  src={meal.imageUrl || DEFAULT_MEAL_IMAGE}
                  alt={meal.mealTitle}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = DEFAULT_MEAL_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <button
                  type="button"
                  aria-label="Close meal details"
                  onClick={() => setShowDetails(false)}
                  className="absolute right-4 top-4 rounded-full bg-black/45 p-2 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <FiX aria-hidden="true" className="h-5 w-5" />
                </button>
                <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-6">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                    {meal.category || meal.type || "Meal"}
                  </p>
                  <h4
                    id={`meal-title-${meal._id}`}
                    className="text-2xl font-bold drop-shadow sm:text-3xl"
                  >
                    {meal.mealTitle}
                  </h4>
                </div>
              </div>

              <div className="space-y-6 p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-bold text-slate-900">₦{price}</p>
                  {meal.type && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-800">
                      {meal.type}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-6 text-slate-600">
                  {meal.description ||
                    "A delicious meal selected for your budget."}
                </p>

                <section aria-labelledby={`meal-nutrition-title-${meal._id}`}>
                  <div className="mb-3">
                    <h5
                      id={`meal-nutrition-title-${meal._id}`}
                      className="text-sm font-bold text-slate-900"
                    >
                      Estimated nutrition
                    </h5>
                    <p className="mt-1 text-xs text-slate-500">
                      Nutritional values provided for this meal
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["Calories", calories],
                      ["Carbohydrates", macros.carbohydrates || "0"],
                      ["Proteins", macros.proteins || "0"],
                      ["Fats", macros.fats || "0"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className={`rounded-2xl p-3 sm:p-4 ${
                          label === "Calories" ? "bg-orange-50" : "bg-slate-50"
                        }`}
                      >
                        <p className="text-[11px] font-medium text-slate-500">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {value}
                          {label === "Calories" &&
                          !value.toString().includes("kcal")
                            ? " kcal"
                            : label !== "Calories" &&
                                !value.toString().includes("g")
                              ? " g"
                              : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* <button
                type="button"
                onClick={handleAddMealPlan}
                disabled={isAdding || isAdded}
                className="sticky bottom-0 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3.5 text-sm font-extrabold text-white shadow-[0_-8px_18px_rgba(255,255,255,0.95)] transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAdded ? "Added to your plan" : isAdding ? "Adding to your plan..." : <><FiPlus /> Add to plan</>}
              </button> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
