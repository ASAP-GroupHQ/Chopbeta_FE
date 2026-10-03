import { Lightbulb, TrendingUp, Users, UtensilsCrossed } from "lucide-react";

type AnalyticsQuickInsightsProps = {
  audienceLeader: { name: string; value: number };
  mealPlanPeak: { name: string; value: number };
  userGrowthPeak: { name: string; value: number };
};

export default function AnalyticsQuickInsights({
  audienceLeader,
  mealPlanPeak,
  userGrowthPeak,
}: AnalyticsQuickInsightsProps) {
  const insights = [
    {
      icon: UtensilsCrossed,
      label: "Leading category",
      value: audienceLeader.name,
      detail: `${audienceLeader.value}% of audience mix`,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      icon: TrendingUp,
      label: "Meal plan peak",
      value: mealPlanPeak.name,
      detail: `${mealPlanPeak.value} plans created`,
      color: "bg-sky-50 text-sky-700",
    },
    {
      icon: Users,
      label: "User growth peak",
      value: userGrowthPeak.name,
      detail: `${userGrowthPeak.value} new users`,
      color: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
          <Lightbulb size={16} />
        </span>
        <h3 className="text-lg font-bold text-slate-800">Quick Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map(({ icon: Icon, label, value, detail, color }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
              <Icon size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="truncate text-sm font-semibold text-slate-800">{value}</p>
            </div>
            <p className="shrink-0 text-right text-xs font-medium text-slate-500">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}