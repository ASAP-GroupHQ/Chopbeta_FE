import { Download, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

interface UserManagementToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function UserManagementToolbar({ searchQuery, onSearchChange }: UserManagementToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <label className="flex min-w-[260px] flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search users by name, email or username" className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400" />
      </label>
      <div className="flex items-center gap-2">
        <button aria-label="Filter users" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"><SlidersHorizontal className="h-4 w-4" />Filters</button>
        <button aria-label="Reset filters" className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50"><RotateCcw className="h-4 w-4" /></button>
        <button aria-label="Download users" className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50"><Download className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
