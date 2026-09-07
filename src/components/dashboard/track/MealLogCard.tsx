"use client";

import React from "react";
import { MealLog } from "@/types/meal";

interface MealLogCardProps {
  meal: MealLog;
  onToggleEaten: (id: string) => void;
  isLoading?: boolean;
}

export const MealLogCard: React.FC<MealLogCardProps> = ({
  meal,
  onToggleEaten,
  isLoading = false,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-md">
      {/* Left Section: Status Dot & Meal Details */}
      <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-3">
        <div
          className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
            meal.eaten ? "bg-[#1E6B3C]" : "bg-gray-300"
          }`}
        />

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`font-semibold text-sm md:text-base truncate transition-colors ${
                meal.eaten ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {meal.name}
            </h4>
            {meal.tag && (
              <span className="text-[10px] sm:text-xs font-semibold text-[#1E6B3C] bg-[#1E6B3C]/10 px-2 py-0.5 rounded-md flex-shrink-0">
                {meal.tag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="font-bold text-gray-800">
              ₦{meal.price.toLocaleString()}
            </span>
            {meal.time && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-gray-400 font-medium">{meal.time}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Status Label & Interactive Checkbox */}
      <div className="flex items-center gap-3 pl-2 flex-shrink-0">
        <div className="hidden sm:block">
          {meal.eaten ? (
            <span className="text-[#1E6B3C] font-semibold text-xs bg-[#1E6B3C]/10 px-2.5 py-1 rounded-full">
              Eaten
            </span>
          ) : (
            <span className="text-gray-400 font-medium text-xs">Not Eaten</span>
          )}
        </div>

        <button
          onClick={() => onToggleEaten(meal.uniqueId)}
          disabled={isLoading}
          aria-label={
            meal.eaten ? "Mark meal as not eaten" : "Mark meal as eaten"
          }
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none border-2 ${
            isLoading
              ? "opacity-50 cursor-not-allowed border-gray-300"
              : "cursor-pointer"
          } ${
            meal.eaten
              ? "bg-[#1E6B3C] border-[#1E6B3C] text-white scale-100"
              : "border-gray-300 hover:border-[#1E6B3C] bg-gray-50/50"
          }`}
        >
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            meal.eaten && (
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3"
              >
                <path
                  d="M1 4.5L4.33333 8L11 1"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )
          )}
        </button>
      </div>
    </div>
  );
};
