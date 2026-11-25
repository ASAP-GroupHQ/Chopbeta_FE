"use client";

import { Crown, UtensilsCrossed } from "lucide-react";
import type { AnalyticsTopMeal } from "@/types/admin-analytics";

const cardClass =
  "min-w-0 overflow-hidden rounded-xl border border-[#e8e4ed] bg-white/80 shadow-[0_2px_8px_rgba(47,39,68,0.035)]";

export default function TopMeals({ meals }: { meals: AnalyticsTopMeal[] }) {
  return (
    <article className={`${cardClass} self-start`}>
      <div className="flex items-center gap-2 border-b border-[#ebe8ef] px-3 py-3 sm:px-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff5d8] text-[#d3a600]">
          <Crown className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-bold text-[#303044]">Top Meals</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[380px] text-left">
          <thead className="bg-[#eeedf3] text-[9px] font-semibold text-[#77778a]">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-2 py-2">Meal Name</th>
              <th className="px-2 py-2">Category</th>
              <th className="px-3 py-2 text-right">Generated Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eeebf1]">
            {meals.map((meal, index) => (
              <tr
                key={`${meal.mealId}-${index}`}
                className="transition-colors hover:bg-[#fbfaff]"
              >
                <td className="px-3 py-2 text-[10px] font-semibold text-[#77778a]">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-[#f1eff5] text-[#55556a]">
                    {index + 1}
                  </span>
                </td>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#eeeaf0] bg-[#f1edf2] text-[#7a7a8c]">
                      <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span className="whitespace-nowrap text-[10px] font-semibold text-[#3c3c50]">
                      {meal.mealTitle}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2">
                  <CategoryBadge category={meal.category} />
                </td>
                <td className="px-3 py-2 text-right text-[10px] font-semibold text-[#4b4b60]">
                  {meal.count.toLocaleString("en-NG")}
                </td>
              </tr>
            ))}
            {meals.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-8 text-center text-xs text-[#858598]"
                >
                  No meal data available for this period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const color =
    category === "Local Dish"
      ? "bg-[#eaf4ed] text-[#378158]"
      : category === "Breakfast"
        ? "bg-[#f8eef9] text-[#b05ac0]"
        : "bg-[#fff1e9] text-[#ee754c]";

  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-semibold ${color}`}
    >
      {category}
    </span>
  );
}
