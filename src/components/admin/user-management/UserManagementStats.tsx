import { CheckCircle2, Users, UserX } from "lucide-react";

interface UserManagementStatsProps {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export default function UserManagementStats({
  totalUsers,
  activeUsers,
  inactiveUsers,
}: UserManagementStatsProps) {
  const stats = [
    { label: "Total Users", value: totalUsers, note: "All registered users", icon: Users, iconClass: "bg-[#105D38]", cardClass: "bg-[#EBF7F0]/40 border-[#D5EEDF]/40" },
    { label: "Active Users", value: activeUsers, note: "Currently active users", icon: CheckCircle2, iconClass: "bg-[#1E6B7B]", cardClass: "bg-[#EBF5F7]/50 border-[#D5ECEF]/50" },
    { label: "Inactive Users", value: inactiveUsers, note: "Currently inactive users", icon: UserX, iconClass: "bg-[#9F2143]", cardClass: "bg-[#FBEBEF]/50 border-[#F5D5DE]/50" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map(({ label, value, note, icon: Icon, iconClass, cardClass }) => (
        <div key={label} className={`flex items-center gap-3 rounded-xl border p-4 shadow-sm ${cardClass}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${iconClass}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-0.5 text-xl font-extrabold text-slate-900">{value.toLocaleString()}</p>
            <p className="mt-1 text-[10px] font-medium text-slate-400">{note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
