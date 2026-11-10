import { CheckCircle2, FolderOpen, Utensils, XCircle } from "lucide-react";

interface MealManagementStatsProps {
  total: number;
  active: number;
  inactive: number;
  categories: number;
}

export default function MealManagementStats({ total, active, inactive, categories }: MealManagementStatsProps) {
  const stats = [
    {
      label: "Total Meals",
      value: total,
      note: "All meals in menu",
      icon: Utensils,
      cardClass: "border-emerald-100 bg-emerald-50/60",
      iconClass: "bg-emerald-600 text-white",
    },
    {
      label: "Active Meals",
      value: active,
      note: "Currently available",
      icon: CheckCircle2,
      cardClass: "border-teal-100 bg-teal-50/60",
      iconClass: "bg-teal-600 text-white",
    },
    {
      label: "Inactive Meals",
      value: inactive,
      note: "Not currently available",
      icon: XCircle,
      cardClass: "border-rose-100 bg-rose-50/60",
      iconClass: "bg-rose-600 text-white",
    },
    {
      label: "Categories",
      value: categories,
      note: "Total categories",
      icon: FolderOpen,
      cardClass: "border-indigo-100 bg-indigo-50/60",
      iconClass: "bg-indigo-600 text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, note, icon: Icon, cardClass, iconClass }) => (
        <div key={label} className={`flex items-start gap-4 rounded-2xl border p-5 shadow-sm ${cardClass}`}>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
            <p className="mt-1 text-[11px] text-slate-500">{note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
