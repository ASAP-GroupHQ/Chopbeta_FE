import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import type { MealItem } from "./types";

interface MealManagementTableProps {
  meals: MealItem[];
  activeMenuMealId: string | null;
  onView: (meal: MealItem) => void;
  onEdit: (meal: MealItem) => void;
  onDelete: (mealId: string) => void;
  onToggleMenu: (mealId: string) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export default function MealManagementTable({
  meals,
  activeMenuMealId,
  onView,
  onEdit,
  onDelete,
  onToggleMenu,
}: MealManagementTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.8fr_1fr_110px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        <span>Meal</span>
        <span>Category</span>
        <span>Price</span>
        <span>Calories</span>
        <span>Status</span>
        <span>Date added</span>
        <span className="text-right">Actions</span>
      </div>

      {meals.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-slate-500">No meals match your current filters.</p>
      ) : (
        meals.map((meal) => (
          <div key={meal.id} className="grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.8fr_1fr_110px] items-center gap-4 border-b border-slate-100 px-5 py-5 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800">
                {meal.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{meal.name}</p>
                <p className="text-[11px] text-slate-500">{meal.description}</p>
              </div>
            </div>

            <span className="text-sm text-slate-600">{meal.category}</span>
            <span className="text-sm font-semibold text-slate-800">{formatCurrency(meal.price)}</span>
            <span className="text-sm text-slate-600">{meal.calories} kcal</span>
            <span
              className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                meal.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}
            >
              {meal.status}
            </span>
            <span className="text-sm text-slate-500">{meal.dateAdded}</span>

            <div className="relative flex items-center justify-end gap-2 pr-1">
              <button
                type="button"
                aria-label={`View ${meal.name}`}
                onClick={() => onView(meal)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={`Edit ${meal.name}`}
                onClick={() => onEdit(meal)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${meal.name}`}
                onClick={() => onDelete(meal.id)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`More actions for ${meal.name}`}
                  onClick={() => onToggleMenu(meal.id)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {activeMenuMealId === meal.id && (
                  <div className="absolute right-0 top-full z-10 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        onView(meal);
                        onToggleMenu(meal.id);
                      }}
                      className="block w-full rounded-lg px-2 py-1.5 text-left text-xs text-slate-600 transition hover:bg-slate-100"
                    >
                      View details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onEdit(meal);
                        onToggleMenu(meal.id);
                      }}
                      className="block w-full rounded-lg px-2 py-1.5 text-left text-xs text-slate-600 transition hover:bg-slate-100"
                    >
                      Edit meal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(meal.id);
                        onToggleMenu(meal.id);
                      }}
                      className="block w-full rounded-lg px-2 py-1.5 text-left text-xs text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
