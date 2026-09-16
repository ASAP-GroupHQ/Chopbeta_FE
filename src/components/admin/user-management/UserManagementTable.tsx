import { Eye, MoreHorizontal } from "lucide-react";
import type { UserRecord } from "./types";

interface UserManagementTableProps {
  users: UserRecord[];
}

export default function UserManagementTable({ users }: UserManagementTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="grid grid-cols-[2fr_2fr_1fr_1fr_40px] gap-4 border-b border-slate-100 px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400"><span>User</span><span>Email</span><span>Status</span><span>Last active</span><span /></div>
      {users.length === 0 ? <p className="px-5 py-10 text-center text-sm text-slate-400">No users found.</p> : users.map((user) => (
        <div key={user.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_40px] items-center gap-4 border-b border-slate-50 px-5 py-4 last:border-0">
          <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">{user.name.charAt(0)}</div><div><p className="text-xs font-semibold text-slate-800">{user.name}</p><p className="text-[10px] text-slate-400">{user.username}</p></div></div>
          <span className="truncate text-xs text-slate-600">{user.email}</span>
          <span className={`text-xs font-semibold ${user.status === "Inactive" ? "text-rose-600" : "text-emerald-600"}`}>{user.status ?? "Active"}</span>
          <span className="text-xs text-slate-500">{user.lastActive || "Recently"}</span>
          <div className="flex items-center gap-1"><button aria-label={`View ${user.name}`} className="rounded p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700"><Eye className="h-4 w-4" /></button><button aria-label={`More actions for ${user.name}`} className="rounded p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700"><MoreHorizontal className="h-4 w-4" /></button></div>
        </div>
      ))}
    </div>
  );
}
