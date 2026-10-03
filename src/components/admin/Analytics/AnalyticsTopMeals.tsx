const topMeals = [
  { id: 1, name: "Bread & Egg", category: "Breakfast", count: "8,452", catStyle: "bg-purple-50 text-purple-600" },
  { id: 2, name: "Pap & Akara", category: "Local Dish", count: "8,452", catStyle: "bg-green-50 text-green-600" },
  { id: 3, name: "Noodles", category: "Quick meal", count: "8,452", catStyle: "bg-orange-50 text-orange-600" },
  { id: 4, name: "Rice & Beans", category: "Local Dish", count: "8,452", catStyle: "bg-green-50 text-green-600" },
  { id: 5, name: "Chicken Pasta", category: "Quick meal", count: "8,452", catStyle: "bg-red-50 text-red-600" },
];

export default function AnalyticsTopMeals() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Top Meal Picks</h3>
        <button type="button" className="text-xs font-medium text-emerald-700 hover:text-emerald-800">
          See all
        </button>
      </div>

      <div className="space-y-3">
        {topMeals.map((meal) => (
          <div key={meal.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-700 shadow-sm">
                {meal.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{meal.name}</p>
                <span className={`mt-1 inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${meal.catStyle}`}>
                  {meal.category}
                </span>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-700">{meal.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
