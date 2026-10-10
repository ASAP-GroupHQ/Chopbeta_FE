export interface AnalyticsTopMeal {
  id: string;
  name: string;
  category: string;
  count: number;
}

interface AnalyticsTopMealsProps {
  meals: AnalyticsTopMeal[];
}

export default function AnalyticsTopMeals({ meals }: AnalyticsTopMealsProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Top Meal Picks</h3>
        <span className="text-xs font-medium text-slate-400">This week</span>
      </div>

      {meals.length === 0
        ? <p className="py-6 text-center text-sm text-slate-500">No meal activity for this week.</p>
        : <div className="space-y-3">
          {meals.map((meal) => (
            <div key={meal.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-700 shadow-sm">
                  {meal.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{meal.name}</p>
                  <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                    {meal.category}
                  </span>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-700">{meal.count.toLocaleString()}</p>
            </div>
          ))}
        </div>}
    </div>
  );
}
