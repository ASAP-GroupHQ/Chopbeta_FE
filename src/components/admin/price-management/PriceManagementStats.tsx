import { DollarSign, TrendingDown, TrendingUp, UtensilsCrossed } from "lucide-react";
import type { PriceMeal } from "./types";

interface PriceManagementStatsProps {
  meals: PriceMeal[];
}

export default function PriceManagementStats({ meals }: PriceManagementStatsProps) {
  const prices = meals.map((meal) => meal.currentPrice);
  const averagePrice = prices.length ? Math.round(prices.reduce((total, price) => total + price, 0) / prices.length) : 0;
  const highestPrice = prices.length ? Math.max(...prices) : 0;
  const lowestPrice = prices.length ? Math.min(...prices) : 0;
  const stats = [
    { title: "Total Meals", value: meals.length.toLocaleString(), helper: "Meals in price list", icon: UtensilsCrossed, iconClass: "bg-emerald-50 text-emerald-700" },
    { title: "Average Price", value: `₦${averagePrice.toLocaleString()}`, helper: "Across listed meals", icon: DollarSign, iconClass: "bg-sky-50 text-sky-700" },
    { title: "Highest Price", value: `₦${highestPrice.toLocaleString()}`, helper: "Current listed price", icon: TrendingUp, iconClass: "bg-rose-50 text-rose-700" },
    { title: "Lowest Price", value: `₦${lowestPrice.toLocaleString()}`, helper: "Current listed price", icon: TrendingDown, iconClass: "bg-amber-50 text-amber-700" },
  ];

  return (
    <section aria-label="Price summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ title, value, helper, icon: Icon, iconClass }) => (
        <article key={title} className="flex min-h-32 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-500">{title}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
            </div>
            <span className={`rounded-lg p-2 ${iconClass}`}><Icon size={18} /></span>
          </div>
          <p className="mt-4 text-xs text-slate-500">{helper}</p>
        </article>
      ))}
    </section>
  );
}