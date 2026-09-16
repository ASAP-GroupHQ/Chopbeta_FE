import { Users } from "lucide-react";

const stats = [
  { label: "Total Users", value: "2,458", note: "All registered users", change: "up 12.5%", iconClass: "bg-[#105D38]", cardClass: "bg-[#EBF7F0]/40 border-[#D5EEDF]/40", changeClass: "text-[#105D38] bg-[#E1F3E9]" },
  { label: "Active Users", value: "2,120", note: "Active in the last 30 days", change: "up 8.3%", iconClass: "bg-[#1E6B7B]", cardClass: "bg-[#EBF5F7]/50 border-[#D5ECEF]/50", changeClass: "text-[#1E6B7B] bg-[#E1EFF2]" },
  { label: "Inactive Users", value: "358", note: "All registered users", change: "up 12.5%", iconClass: "bg-[#9F2143]", cardClass: "bg-[#FBEBEF]/50 border-[#F5D5DE]/50", changeClass: "text-[#9F2143] bg-[#F7E1E6]" },
];

export default function UserManagementStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className={`flex items-center justify-between rounded-xl border p-4 shadow-sm ${stat.cardClass}`}>
          <div className="flex items-start gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${stat.iconClass}`}><Users className="h-4 w-4" /></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{stat.label}</p><p className="mt-0.5 text-xl font-extrabold text-slate-900">{stat.value}</p><p className="mt-1 text-[10px] font-medium text-slate-400">{stat.note}</p></div>
          </div>
          <div className="space-y-1 text-right"><span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${stat.changeClass}`}>{stat.change}</span><p className="text-[9px] font-medium text-slate-400">vs last 30 days</p></div>
        </div>
      ))}
    </div>
  );
}
