import { Check, Minus, Plus } from "lucide-react";
import type { PriceMeal } from "./types";

interface PriceManagementTableProps {
  meals: PriceMeal[];
  onPriceChange: (id: string, amount: number) => void;
  onSavePrice: (id: string) => void;
}

export default function PriceManagementTable({ meals, onPriceChange, onSavePrice }: PriceManagementTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Meal prices</h2>
          <p className="mt-0.5 text-xs text-slate-500">Adjust and save proposed prices.</p>
        </div>
        <span className="text-xs font-medium text-slate-500">{meals.length} meals</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3">Meal</th>
              <th scope="col" className="px-4 py-3">Category</th>
              <th scope="col" className="px-4 py-3">Current price</th>
              <th scope="col" className="px-4 py-3">New price</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-5 py-3">Last updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {meals.map((meal) => {
              const hasPendingPrice = meal.newPrice !== meal.currentPrice;

              return (
                <tr key={meal.id} className="transition-colors hover:bg-slate-50/70">
                  <th scope="row" className="px-5 py-3.5 font-medium text-slate-800">
                    <span className="flex items-center gap-3">
                      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xl">{meal.image}</span>
                      {meal.name}
                    </span>
                  </th>
                  <td className="px-4 py-3.5 text-slate-600">{meal.category}</td>
                  <td className="px-4 py-3.5 font-medium text-slate-700">₦{meal.currentPrice.toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onPriceChange(meal.id, -50)}
                        disabled={meal.newPrice <= 0}
                        aria-label={`Decrease ${meal.name} price by 50 naira`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={14} />
                      </button>
                      <span className={`min-w-20 text-center font-semibold ${hasPendingPrice ? "text-emerald-700" : "text-slate-700"}`}>
                        ₦{meal.newPrice.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => onPriceChange(meal.id, 50)}
                        aria-label={`Increase ${meal.name} price by 50 naira`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Plus size={14} />
                      </button>
                      {hasPendingPrice && (
                        <button
                          type="button"
                          onClick={() => onSavePrice(meal.id)}
                          aria-label={`Save new price for ${meal.name}`}
                          title="Save new price"
                          className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-white transition hover:bg-emerald-800"
                        >
                          <Check size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${meal.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {meal.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{meal.lastUpdated}</td>
                </tr>
              );
            })}
            {meals.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-500">
                  No meals match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}