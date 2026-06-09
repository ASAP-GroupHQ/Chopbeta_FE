"use client";

import React from "react";
import HeaderActions from "@/components/dashboard/HeaderActions";

export default function ExploreHeader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Explore Meals <span className="text-emerald-600 text-lg">⚙️</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Discover affordable meals near your campus
          </p>
        </div>
        <HeaderActions />
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search meals, canteens, ingredients..."
          className="w-full bg-white pl-12 pr-4 py-3.5 rounded-xl border border-transparent shadow-sm text-sm focus:outline-none focus:border-emerald-600 transition-all placeholder-gray-400"
        />
      </div>
    </div>
  );
}
