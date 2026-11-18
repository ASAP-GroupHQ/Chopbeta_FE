import { PRICE_STATS } from "@/constants/admin-management";
import type { PriceStats as PriceStatsData } from "@/types/admin-prices";

export default function PriceStats({ stats }: { stats: PriceStatsData | null }) {
  const values: Record<string, number | undefined> = {
    "Total Meal": stats?.totalMeals,
    "Average Price": stats?.averagePrice,
    "Highest Price": stats?.highestPrice,
    "Lowest Price": stats?.lowestPrice,
  };

  return (
    <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
      {PRICE_STATS.map((stat) => {
        const Icon = stat.icon;
        const value = values[stat.title];
        return (
          <article
            key={stat.title}
            className={`flex min-h-[76px] items-center gap-3 overflow-hidden rounded-xl border bg-white/70 px-3 py-2.5 shadow-[0_2px_8px_rgba(47,39,68,0.03)] sm:px-3.5 ${stat.borderColor}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf4ef]">
              <Icon className="h-9 w-9 object-contain" />
            </div>
            <div className="min-w-0 flex-1 space-y-0.5">
              <span className="block truncate text-[11px] font-medium text-[#818193]">
                {stat.title}
              </span>
              <h3 className="text-lg font-bold leading-tight text-[#202035]">
                {value === undefined
                  ? "—"
                  : stat.title === "Total Meal"
                    ? value.toLocaleString("en-NG")
                    : `₦${Math.round(value).toLocaleString("en-NG")}`}
              </h3>
              <span className="text-[9px] font-medium text-[#89899a]">
                Current data
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
