import type { MetricCardProps } from "./types";

export default function AdminMetricCard({ title, value, subtext, trend, trendType, icon, bgIconColor }: MetricCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between"><div className="space-y-1"><p className="text-xs font-medium text-gray-500">{title}</p><p className="text-2xl font-bold text-gray-900">{value}</p></div><div className={`rounded-xl p-2.5 text-white ${bgIconColor}`}>{icon}</div></div>
      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-2 text-[11px]"><span className="text-gray-400">{subtext}</span><span className={`font-semibold ${trendType === "up" ? "text-emerald-600" : "text-red-500"}`}>{trend}</span></div>
    </div>
  );
}
