import {
  ActiveUsersIcon,
  AveragePriceIcon,
  TotalMealsIcon,
  TotalUserIcon,
} from "@/components/icons/AdminIcons";
import type { AdminAnalyticsData } from "@/types/admin-analytics";

const statCards = [
  {
    title: "Total Meal plans",
    icon: TotalMealsIcon,
    tint: "bg-[#eaf4ed]",
  },
  {
    title: "Average Price",
    icon: AveragePriceIcon,
    tint: "bg-[#eaf4ed]",
  },
  {
    title: "Total User",
    icon: TotalUserIcon,
    tint: "bg-[#f5eafa]",
  },
  {
    title: "Active User",
    icon: ActiveUsersIcon,
    tint: "bg-[#eaf4ed]",
  },
] as const;

export default function AnalyticsStats({
  data,
}: {
  data: AdminAnalyticsData;
}) {
  const values: Record<string, string> = {
    "Total Meal plans":
      data.totalMealPlans?.toLocaleString("en-NG") ?? "—",
    "Average Price":
      data.averageMealPrice === null
        ? "—"
        : `₦${Math.round(data.averageMealPrice).toLocaleString("en-NG")}`,
    "Total User": data.totalUsers?.toLocaleString("en-NG") ?? "—",
    "Active User": data.activeUsers?.toLocaleString("en-NG") ?? "—",
  };
  return (
    <section
      aria-label="Analytics summary"
      className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <article
            key={stat.title}
            className="flex min-h-[76px] items-center gap-3 rounded-xl border border-[#e9e3ed] bg-white/70 px-3 py-2.5 shadow-[0_2px_8px_rgba(47,39,68,0.03)] sm:px-3.5"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${stat.tint}`}
            >
              <Icon className="h-9 w-9 object-contain" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-[#818193]">
                {stat.title}
              </p>
              <p className="mt-0.5 text-lg font-bold leading-tight text-[#202035]">
                {values[stat.title]}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
