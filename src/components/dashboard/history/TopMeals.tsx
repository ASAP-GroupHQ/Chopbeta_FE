"use client";

import React from "react";

export interface TopMealItem {
  name: string;
  count: number;
}

interface TopMealsProps {
  meals: TopMealItem[];
}

export default function TopMeals({ meals }: TopMealsProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-base text-[#1A1A2E] mb-4">
        Top Meals This week
      </h3>
      <div className="space-y-4">
        {meals.map((meal, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gray-100 border border-gray-50 rounded-xl flex items-center justify-center font-bold text-[#0F623D] text-sm shadow-sm" />
              <span className="text-sm font-semibold text-gray-800">
                {meal.name}
              </span>
            </div>
            <span className="text-xs font-bold text-[#0F623D] bg-[#E6F4EA] px-2.5 py-1 rounded-lg">
              {meal.count} times
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
