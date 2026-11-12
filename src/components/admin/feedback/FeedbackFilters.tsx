"use client";

import type { FormEvent } from "react";
import { ChevronDown, Search as SearchIcon } from "lucide-react";
import type { FeedbackCategory, FeedbackStatus } from "@/constants/admin-feedback";

interface FeedbackFiltersProps {
  searchQuery: string;
  selectedType: "All Types" | FeedbackCategory;
  selectedStatus: "All Status" | FeedbackStatus;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onTypeChange: (value: "All Types" | FeedbackCategory) => void;
  onStatusChange: (value: "All Status" | FeedbackStatus) => void;
}

export default function FeedbackFilters({
  searchQuery,
  selectedType,
  selectedStatus,
  onSearchChange,
  onSearch,
  onTypeChange,
  onStatusChange,
}: FeedbackFiltersProps) {
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={submitSearch}
      className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_150px_150px_auto] sm:items-center"
    >
      <label className="relative min-w-0">
        <span className="sr-only">Search feedback</span>
        <SearchIcon
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9090a0]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search meals by name, email or keyword......"
          className="h-10 w-full rounded-lg border border-[#e7e4eb] bg-white pl-9 pr-3 text-xs font-medium text-[#303044] outline-none transition placeholder:text-[#9292a2] focus:border-[#4c9869] focus:ring-2 focus:ring-[#4c9869]/10"
        />
      </label>

      <FilterSelect
        label="Filter by feedback type"
        value={selectedType}
        options={["All Types", "Suggestion", "Compliment", "Complaint"]}
        onChange={(value) =>
          onTypeChange(value as "All Types" | FeedbackCategory)
        }
      />
      <FilterSelect
        label="Filter by status"
        value={selectedStatus}
        options={["All Status", "New", "In progress", "Resolved"]}
        onChange={(value) =>
          onStatusChange(value as "All Status" | FeedbackStatus)
        }
      />
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#216a40] px-5 text-xs font-bold text-white shadow-sm transition hover:bg-[#195633] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#216a40] active:scale-[0.98]"
      >
        <SearchIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Search
      </button>
    </form>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative min-w-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-[#e7e4eb] bg-white px-3 pr-9 text-xs font-semibold text-[#49495d] outline-none transition focus:border-[#4c9869]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77778a]"
        aria-hidden="true"
      />
    </label>
  );
}
