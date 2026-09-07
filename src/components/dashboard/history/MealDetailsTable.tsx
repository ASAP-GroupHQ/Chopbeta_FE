"use client";

import React from "react";
import Image from "next/image";

export interface MealDetail {
  id: string;
  time: string;
  name: string;
  price: number;
  status: "Completed" | "Pending" | "Cancelled";
  image?: string;
}

interface MealDetailsTableProps {
  meals?: MealDetail[];
  onSavePlan?: () => void;
}

export default function MealDetailsTable({
  meals = [],
  onSavePlan,
}: MealDetailsTableProps) {
  if (!meals.length) return null;

  return (
    <div className="pt-4 border-t border-gray-100 mt-4 space-y-4">
      {/* Mobile-friendly Responsive Container */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
          <thead>
            <tr className="text-gray-400 font-medium border-b border-gray-100">
              <th className="pb-3 font-normal w-24">Time</th>
              <th className="pb-3 font-normal">Meal</th>
              <th className="pb-3 font-normal">Price</th>
              <th className="pb-3 font-normal">Status</th>
              <th className="pb-3 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {meals.map((meal) => (
              <tr key={meal.id} className="text-[#1A1A2E]">
                <td className="py-3 font-medium text-gray-500 whitespace-nowrap">
                  {meal.time}
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-3 min-w-[150px]">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={meal.image || "/placeholder-meal.jpg"}
                        alt={meal.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-xs sm:text-sm truncate">
                      {meal.name}
                    </span>
                  </div>
                </td>

                <td className="py-3 font-bold whitespace-nowrap">
                  ₦{meal.price.toLocaleString()}
                </td>

                <td className="py-3 whitespace-nowrap">
                  <span
                    className={`font-medium text-xs ${
                      meal.status === "Completed"
                        ? "text-gray-500"
                        : "text-amber-600"
                    }`}
                  >
                    {meal.status}
                  </span>
                </td>

                <td className="py-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    aria-label="More options"
                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition cursor-pointer"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onSavePlan}
          className="inline-flex items-center gap-2 border border-[#0F623D] text-[#0F623D] hover:bg-[#EAF4EF] px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Save plan
        </button>
      </div>
    </div>
  );
}
