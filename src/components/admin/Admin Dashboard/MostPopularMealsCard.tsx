import type { PopularMeal } from "./types";

interface MostPopularMealsProps {
  meals: PopularMeal[];
}

export default function MostPopularMeals({ meals }: MostPopularMealsProps) {
  return (
    <section className="w-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">Most Popular Meals</h3>
        <span className="text-xs font-medium text-gray-400">This week</span>
      </div>

      {meals.length === 0
        ? <p className="py-6 text-center text-sm text-slate-500">No meal activity for this week.</p>
        : <div className="space-y-5">
          {meals.map((meal) => (
            <div key={meal.id} className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-800">
                {meal.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold leading-tight text-gray-900">{meal.name}</h4>
                    <p className="mt-0.5 text-xs font-medium text-gray-400">{meal.category}</p>
                  </div>
                  <div className="min-w-[90px] text-left">
                    <span className="block text-sm font-bold leading-tight text-gray-900">{meal.timesChosen.toLocaleString()}</span>
                    <span className="block text-[11px] text-gray-400">times generated</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-emerald-800" style={{ width: `${meal.percentage}%` }} />
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-emerald-600">{meal.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>}
    </section>
  );
}
