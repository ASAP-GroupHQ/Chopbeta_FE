"use client";

import { Fragment } from "react";
import { Search } from "lucide-react";

interface MealFiltersProps {
  categories: string[];
  resultCount: number;
  selectedCategory: string;
  selectedStatus: string;
  searchQuery: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function MealFilters({
  categories,
  resultCount,
  selectedCategory,
  selectedStatus,
  searchQuery,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
}: MealFiltersProps) {
  return (
    <Fragment>
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F4EC] px-2.5 py-1 text-[10px] font-semibold text-[#1E6B3C]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1E6B3C]" />
          {selectedStatus === "All Status" ? "All meals" : selectedStatus}
        </span>
        <p className="text-[11px] font-medium text-gray-400">
          {resultCount} {resultCount === 1 ? "meal" : "meals"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 bg-[#FCFCFD] p-3 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(140px,1fr))] sm:p-4">
        <label className="relative block">
          <span className="sr-only">Search meals</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search meals by name..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs font-medium text-[#1A2E35] outline-none transition placeholder:text-gray-400 focus:border-[#1E6B3C] focus:ring-2 focus:ring-green-700/10"
          />
        </label>

        <label>
          <span className="sr-only">Filter by category</span>
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-[#344054] outline-none transition focus:border-[#1E6B3C] focus:ring-2 focus:ring-green-700/10"
          >
            <option>All Categories</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by status</span>
          <select
            value={selectedStatus}
            onChange={(event) => onStatusChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-[#344054] outline-none transition focus:border-[#1E6B3C] focus:ring-2 focus:ring-green-700/10"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </label>

        <label>
          <span className="sr-only">Sort meals</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-[#344054] outline-none transition focus:border-[#1E6B3C] focus:ring-2 focus:ring-green-700/10"
          >
            <option value="latest">Sort by: Latest</option>
            <option value="oldest">Sort by: Oldest</option>
            <option value="price">Sort by: Price High-Low</option>
          </select>
        </label>
      </div>
    </Fragment>
  );
}
