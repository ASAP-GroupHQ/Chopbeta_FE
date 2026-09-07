"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface MealDetail {
  id: string;
  time: string;
  name: string;
  price: number;
  status: "Completed" | "Pending" | "Cancelled";
  image?: string;
}

export interface MealHistoryItem {
  id: string;
  date: string;
  dayOfWeek: string;
  mealCount: number;
  status: "Completed" | "Partial";
  totalSpent: number;
  meals?: MealDetail[];
}

interface HistoryListProps {
  items: MealHistoryItem[];
  onSavePlan?: (itemId: string) => void;
}

export default function HistoryList({ items, onSavePlan }: HistoryListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    items[0]?.id || null,
  );

  return (
    <div className="space-y-4 font-sans">
      {items.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white px-5 py-12 text-center text-sm text-gray-400 shadow-xs">
          No plans found in this category.
        </div>
      )}
      {items.map((item) => {
        const isExpanded = expandedId === item.id;

        return (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 transition shadow-xs"
          >
            {/* Top Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Date & Day */}
              <div className="flex items-center gap-6">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#14532d] tracking-tight">
                    {item.date}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium capitalize mt-0.5">
                    {item.dayOfWeek}
                  </p>
                </div>
              </div>

              {/* Meal Count & Status Badge */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-800">
                  {item.mealCount} Meals
                </span>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                    item.status === "Completed"
                      ? "bg-[#EAF5ED] text-[#14532d]"
                      : "bg-[#FFF4EC] text-[#E65100]"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Total Spent & Toggle Chevron */}
              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium">
                    Total Spent
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">
                    ₦{item.totalSpent.toLocaleString()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedId((currentId) =>
                      currentId === item.id ? null : item.id,
                    )
                  }
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? "Collapse" : "Expand"} details for ${item.date}`}
                  className="p-1 text-gray-800 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 15 12 9 18 15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Collapsible Content Area */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pt-6 mt-4 border-t border-gray-100">
                  {/* Table Layout */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[550px]">
                      <thead>
                        <tr className="text-gray-400 font-medium border-b border-gray-100">
                          <th className="pb-3 font-normal w-28">Time</th>
                          <th className="pb-3 font-normal">Meal</th>
                          <th className="pb-3 font-normal">Price</th>
                          <th className="pb-3 font-normal">Status</th>
                          <th className="pb-3 font-normal text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {item.meals?.map((meal) => (
                          <tr key={meal.id} className="text-gray-700">
                            {/* Time */}
                            <td className="py-4 font-bold text-gray-500 whitespace-nowrap">
                              {meal.time}
                            </td>

                            {/* Meal Thumbnail + Name */}
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                  <Image
                                    src={meal.image || "/placeholder-meal.jpg"}
                                    alt={meal.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="font-bold text-gray-800 text-sm">
                                  {meal.name}
                                </span>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="py-4 font-bold text-gray-900 whitespace-nowrap">
                              ₦{meal.price.toLocaleString()}
                            </td>

                            {/* Status */}
                            <td className="py-4 font-medium text-gray-500 whitespace-nowrap">
                              {meal.status}
                            </td>

                            {/* Action Menu */}
                            <td className="py-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                aria-label="Meal options"
                                className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                              >
                                <svg
                                  width="20"
                                  height="20"
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

                  {/* Save Plan Button */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => onSavePlan?.(item.id)}
                      className="inline-flex items-center gap-2 border border-[#14532d] text-[#14532d] hover:bg-[#EAF5ED] px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
