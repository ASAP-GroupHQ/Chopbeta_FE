"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ExploreMeal } from "@/types/explore";

interface MealDetailsDialogProps {
  meal: ExploreMeal | null;
  onClose: () => void;
}

function formatAmount(value: string | number | undefined, unit: string): string {
  if (value === undefined || value === "") return "Not provided";
  const amount = String(value);
  return /\b(kcal|g)\b/i.test(amount) ? amount : `${amount} ${unit}`;
}

function formatPrice(price: ExploreMeal["estimatedPrice"]): string {
  const value =
    typeof price === "object" && price !== null
      ? Number(price.$numberDecimal)
      : Number(price);

  return Number.isFinite(value) ? `₦${value.toLocaleString()}` : "Price unavailable";
}

export default function MealDetailsDialog({
  meal,
  onClose,
}: MealDetailsDialogProps) {
  useEffect(() => {
    if (!meal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [meal, onClose]);

  const nutrients = meal?.averageNutritionalInfo;
  const macros =
    nutrients?.estimatedMacronutrients ?? nutrients?.macronutrients ?? {};
  const macroItems = [
    ["Carbohydrates", macros.carbohydrates],
    ["Proteins", macros.proteins],
    ["Fats", macros.fats],
  ] as const;

  return (
    <AnimatePresence>
      {meal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="meal-details-title"
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-52 bg-slate-200 sm:h-64">
              <img
                src={
                  meal.imageUrl ||
                  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1170&q=80"
                }
                alt={meal.mealTitle}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close meal details"
                autoFocus
                className="absolute right-4 top-4 rounded-full bg-black/45 p-2 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
              <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {meal.category || meal.type || "Meal"}
                </p>
                <h2
                  id="meal-details-title"
                  className="text-2xl font-bold drop-shadow sm:text-3xl"
                >
                  {meal.mealTitle}
                </h2>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xl font-bold text-slate-900">
                  {formatPrice(meal.estimatedPrice)}
                </p>
                {meal.type && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-800">
                    {meal.type}
                  </span>
                )}
              </div>

              {meal.description && (
                <p className="text-sm leading-6 text-slate-600">
                  {meal.description}
                </p>
              )}

              <section aria-labelledby="meal-nutrition-title">
                <div className="mb-3">
                  <h3
                    id="meal-nutrition-title"
                    className="text-sm font-bold text-slate-900"
                  >
                    Estimated nutrition
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Nutritional values provided for this meal
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl bg-orange-50 p-3 sm:p-4">
                    <p className="text-[11px] font-medium text-slate-500">
                      Calories
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatAmount(nutrients?.estimatedCalories, "kcal")}
                    </p>
                  </div>
                  {macroItems.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl bg-slate-50 p-3 sm:p-4"
                    >
                      <p className="text-[11px] font-medium text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {formatAmount(value, "g")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
