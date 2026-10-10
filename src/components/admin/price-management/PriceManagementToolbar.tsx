import { RotateCcw, Search } from "lucide-react";
import type { PriceMealCategory, PriceMealStatus } from "./types";

interface PriceManagementToolbarProps {
  searchTerm: string;
  categories: PriceMealCategory[];
  category: PriceMealCategory | "All Categories";
  status: PriceMealStatus | "All Status";
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: PriceMealCategory | "All Categories") => void;
  onStatusChange: (value: PriceMealStatus | "All Status") => void;
  onReset: () => void;
}

const statuses: Array<PriceMealStatus | "All Status"> = ["All Status", "Active", "Inactive"];

export default function PriceManagementToolbar({
  searchTerm,
  categories,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onReset,
}: PriceManagementToolbarProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <label className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 lg:max-w-sm">
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search meals"
          className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
        />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as PriceMealCategory | "All Categories")}
          className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
        >
          {["All Categories", ...categories].map((item) => <option key={item}>{item}</option>)}
        </select>
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value as PriceMealStatus | "All Status")}
          className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600"
        >
          {statuses.map((item) => <option key={item}>{item}</option>)}
        </select>
        <button
          type="button"
          onClick={onReset}
          aria-label="Reset price filters"
          title="Reset filters"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <RotateCcw size={15} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </section>
  );
}