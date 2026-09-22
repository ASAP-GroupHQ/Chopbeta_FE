import { Download, Filter, Plus, RotateCcw, Search } from "lucide-react";

interface MealManagementToolbarProps {
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

const categories = ["All Categories", "Breakfast", "Lunch", "Dinner", "Snacks", "Drinks"];
const statuses = ["All Status", "Active", "Inactive"];
const sortOptions = ["Latest", "Price: Low to High", "Price: High to Low"];

export default function MealManagementToolbar({
  searchTerm,
  categoryFilter,
  statusFilter,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onReset,
}: MealManagementToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="flex w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search meals by name"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select value={categoryFilter} onChange={(event) => onCategoryChange(event.target.value)} className="bg-transparent outline-none">
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)} className="bg-transparent outline-none">
              {statuses.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} className="bg-transparent outline-none">
              {sortOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-50"
            aria-label="Reset filters"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
          >
            <Plus className="h-4 w-4" />
            New Meal
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-50"
            aria-label="Export meals"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
