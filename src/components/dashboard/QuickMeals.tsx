"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

const MEALS = [
  { id: 1, name: "Rice & beans", price: "₦1000" },
  { id: 2, name: "Cassava flake & Floating berries", price: "₦600" },
  { id: 3, name: "Spaghetti & turkey", price: "₦3000" },
  { id: 4, name: "Indomie & egg", price: "₦1500" },
];

const TIME_OPTIONS = [
  {
    value: "morning",
    label: "Morning (6AM-12PM)",
    tagline: "Perfect for Morning",
  },
  {
    value: "afternoon",
    label: "Afternoon (12PM-6PM)",
    tagline: "Perfect for Afternoon",
  },
  {
    value: "evening",
    label: "Evening (7PM-11PM)",
    tagline: "Perfect for Evening",
  },
  { value: "snacks", label: "Snacks (Anytime)", tagline: "Light & Easy Bites" },
];

export default function QuickMeals() {
  const [selectedTime, setSelectedTime] = useState("morning");

  const currentTagline = TIME_OPTIONS.find(
    (t) => t.value === selectedTime,
  )?.tagline;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-[#1A2E35]">Quick Meals</h3>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5 transition-all duration-200">
            {currentTagline}
          </p>
        </div>

        <div className="relative inline-block">
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="appearance-none pr-8 pl-3 py-1.5 border border-gray-100 rounded-lg text-[11px] font-bold text-[#1A2E35] bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#1E6B3C]/20 transition-all cursor-pointer"
          >
            {TIME_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="font-semibold text-gray-700"
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
            <FiChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Grid List */}
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
                unoptimized
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
