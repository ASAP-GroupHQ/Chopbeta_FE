"use client";

import React from "react";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { SettingsIcon, SearchIcon } from "@/components/icons/NavIcons";

interface ExploreHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ExploreHeader({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: ExploreHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Explore Meals <SettingsIcon className="w-5 h-5 text-emerald-600" />
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Discover affordable meals near your campus
          </p>
        </div>
        <HeaderActions />
      </div>

      <form onSubmit={onSearchSubmit} role="search">
        <div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm transition focus-within:border-emerald-200 focus-within:ring-2 focus-within:ring-emerald-700/10 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </span>
            <span className="sr-only">Search meals</span>
            <input
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Search meals by name..."
              className="w-full rounded-xl bg-transparent py-3 pl-11 pr-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1E5E3A] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174b2e] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto"
          >
            <SearchIcon className="h-4 w-4 text-white" />
            Search meals
          </button>
        </div>
      </form>
    </div>
  );
}
