"use client";

import { ChevronDown, RotateCcw, Search } from "lucide-react";

interface PriceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function PriceFilters({
  searchQuery,
  onSearchChange,
}: PriceFiltersProps) {
  return (
    <section className="flex flex-col items-stretch justify-between gap-2.5 rounded-xl border border-[#e9e3ed] bg-white/80 p-3 shadow-[0_2px_8px_rgba(47,39,68,0.03)] lg:flex-row lg:items-center">
      <label className="relative w-full lg:max-w-md lg:flex-1">
        <span className="sr-only">Search meals</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a0a0af]"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search meal by name, category or keyword......"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-10 w-full rounded-lg border border-[#e7e5ec] bg-white pl-9 pr-3 text-xs font-medium text-[#28283c] outline-none transition placeholder:text-[#9292a2] focus:border-[#4c9869] focus:ring-2 focus:ring-[#4c9869]/10"
        />
      </label>

      <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
        <FilterSelect
          label="Filter by category"
          className="lg:min-w-[145px]"
          options={["All Categories", "Breakfast", "Local Dish", "Quick meal"]}
        />
        <FilterSelect
          label="Filter by status"
          className="lg:min-w-[128px]"
          options={["All Status", "Active", "Inactive"]}
        />
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#e7e5ec] bg-white px-3 text-xs font-semibold text-[#424256] shadow-[0_1px_3px_rgba(47,39,68,0.04)] transition hover:bg-[#faf9fb] sm:w-auto"
        >
          <RotateCcw
            className="h-4 w-4 text-[#747488]"
            aria-hidden="true"
          />
          Reset Filters
        </button>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  options,
  className,
}: {
  label: string;
  options: string[];
  className: string;
}) {
  return (
    <label className={`relative min-w-0 flex-1 lg:flex-none ${className}`}>
      <span className="sr-only">{label}</span>
      <select className="h-10 w-full appearance-none rounded-lg border border-[#e7e5ec] bg-white py-2 pl-3 pr-9 text-xs font-semibold text-[#303044] outline-none transition focus:border-[#4c9869]">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77778a]" />
    </label>
  );
}
