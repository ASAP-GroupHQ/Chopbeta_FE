"use client";

import {
  ChevronDown,
  Download,
  Filter,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

interface UserDirectoryFiltersProps {
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  isFiltersOpen: boolean;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onFiltersToggle: () => void;
  onReset: () => void;
  onExport: () => void;
}

export default function UserDirectoryFilters({
  searchQuery,
  selectedRole,
  selectedStatus,
  isFiltersOpen,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onFiltersToggle,
  onReset,
  onExport,
}: UserDirectoryFiltersProps) {
  return (
    <div className="border-b border-[#edf0ed] p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">All Users</h2>
          <p className="mt-1 text-sm text-[#829087]">
            View and manage all registered users
          </p>
        </div>
        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe6e1] px-3 text-sm font-medium text-[#344239] transition hover:border-[#268348] hover:bg-[#f5faf6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268348]"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export
        </button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search users</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#909a93]"
            aria-hidden="true"
          />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, email or phone"
            className="h-11 w-full rounded-lg border border-[#e4e9e5] bg-white pl-10 pr-10 text-sm outline-none transition placeholder:text-[#9aa39d] focus:border-[#31844d] focus:ring-2 focus:ring-[#31844d]/10"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89948d] hover:text-[#344239]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-expanded={isFiltersOpen}
            onClick={onFiltersToggle}
            className={`inline-flex h-11 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268348] ${
              isFiltersOpen
                ? "border-[#268348] bg-[#f4faf6] text-[#246f3e]"
                : "border-[#e4e9e5] text-[#48564d] hover:bg-[#f8faf8]"
            }`}
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filters
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#e4e9e5] px-3 text-sm font-medium text-[#48564d] transition hover:bg-[#f8faf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268348]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      {isFiltersOpen && (
        <div className="mt-3 grid gap-3 rounded-xl bg-[#f8faf8] p-3 sm:grid-cols-2 sm:p-4">
          <label className="text-xs font-medium text-[#67746b]">
            Role
            <select
              value={selectedRole}
              onChange={(event) => onRoleChange(event.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-[#e1e7e2] bg-white px-3 text-sm font-normal text-[#344239] outline-none focus:border-[#31844d]"
            >
              <option>All roles</option>
              <option>Student</option>
              <option>Admin</option>
            </select>
          </label>
          <label className="text-xs font-medium text-[#67746b]">
            Status
            <select
              value={selectedStatus}
              onChange={(event) => onStatusChange(event.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-[#e1e7e2] bg-white px-3 text-sm font-normal text-[#344239] outline-none focus:border-[#31844d]"
            >
              <option>All statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
