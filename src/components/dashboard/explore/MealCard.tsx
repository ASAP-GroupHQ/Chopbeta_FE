"use client";

import type { ExploreMeal } from "@/types/explore";
import { ArrowUpRight } from "lucide-react";

interface MealCardProps {
  meal: ExploreMeal;
  onSelect: (meal: ExploreMeal) => void;
}

function formatPrice(price: ExploreMeal["estimatedPrice"]): string {
  const value =
    typeof price === "object" && price !== null
      ? Number(price.$numberDecimal)
      : Number(price);

  return Number.isFinite(value) ? value.toLocaleString() : "—";
}

export default function MealCard({ meal, onSelect }: MealCardProps) {
  const calories = meal.averageNutritionalInfo?.estimatedCalories;

  return (
    <button
      type="button"
      onClick={() => onSelect(meal)}
      aria-label={`View details for ${meal.mealTitle}`}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-emerald-950/90 via-slate-950/25 to-emerald-900/5 transition-colors duration-300 group-hover:from-emerald-950/95 group-hover:via-emerald-950/35" />
        <img
          src={
            meal.imageUrl ||
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1170&q=80"
          }
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {meal.type && (
          <span className="absolute left-4 top-4 z-20 rounded-full border border-white/40 bg-emerald-950/55 px-3 py-1 text-[10px] font-semibold capitalize tracking-wide text-white shadow-sm backdrop-blur-sm">
            {meal.type}
          </span>
        )}
        <div className="absolute inset-x-4 bottom-4 z-20 space-y-1 text-white">
          <h2 className="line-clamp-2 text-base font-bold leading-snug drop-shadow">
            {meal.mealTitle}
          </h2>
          <p className="line-clamp-1 text-xs font-medium capitalize text-emerald-50">
            {meal.category || meal.type || "Meal"}
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3 bg-gradient-to-br from-emerald-50 via-white to-orange-50/70 px-4 py-4">
        <div>
          <p className="text-sm font-bold text-emerald-950">
            ₦{formatPrice(meal.estimatedPrice)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {calories ? `${calories} kcal` : "Nutrition details"}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-2 text-[11px] font-semibold text-white shadow-sm shadow-emerald-900/15 transition-all duration-200 group-hover:bg-orange-500 group-hover:shadow-orange-500/20">
          View details
          <ArrowUpRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </button>
  );
}
