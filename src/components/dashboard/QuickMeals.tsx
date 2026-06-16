"use client";

import React from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

const MEALS = [
  { id: 1, name: "Rice & beans", price: "₦1000" },
  { id: 2, name: "Cassava flake & Floating berries", price: "₦600" },
  { id: 3, name: "Spaghetti & turkey", price: "₦3000" },
  { id: 4, name: "Indomie & egg", price: "₦1500" },
];

export default function QuickMeals() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
      {/* Header Selector Strip Row */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-[#1A2E35]">Quick Meals</h3>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
            Perfect for Morning
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-lg text-[11px] font-bold text-[#1A2E35] bg-white shadow-sm hover:bg-gray-50 transition-all">
          Morning (6AM-12PM)
          <FiChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* Grid List - Horizontal swipe scrolling on mobile viewports */}
      <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory">
        {MEALS.map((meal, idx) => (
          <div
            key={idx}
            className="min-w-[140px] sm:min-w-0 bg-white border border-gray-50 rounded-2xl p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-gray-100 transition-all snap-start"
          >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
              <Image
                src="/images/meals/quick-meal.png"
                alt={meal.name}
                fill
                sizes="(max-width: 640px) 140px, 200px"
                className="object-cover"
              />
            </div>
            <div className="space-y-0.5 px-0.5">
              <h4 className="text-xs font-bold text-[#1A2E35] truncate">
                {meal.name}
              </h4>
              <p className="text-[11px] font-black text-[#1E6B3C]">
                {meal.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
