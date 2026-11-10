import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface AnalyticsMetricCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: ReactNode;
  accentClassName: string;
  positive?: boolean;
}

export default function AnalyticsMetricCard({
  title,
  value,
  change,
  description,
  icon,
  accentClassName,
  positive = true,
}: AnalyticsMetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">{title}</p>
          <h3 className="mt-0.5 text-2xl font-bold text-slate-900">{value}</h3>
        </div>
        <div className={`rounded-xl p-2.5 ${accentClassName}`}>{icon}</div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px]">
        <span
          className={`flex items-center gap-0.5 rounded px-1.5 py-0.5 font-semibold ${
            positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}
        >
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </span>
        <span className="text-slate-400">{description}</span>
      </div>
    </div>
  );
}
