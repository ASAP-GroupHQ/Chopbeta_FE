"use client";

import React from "react";

interface MealLog {
  id: string;
  time: string;
  name: string;
  tag: string;
  price: number;
  image: string;
  eaten: boolean;
}

interface MealLogCardProps {
  meal: MealLog;
  onToggleEaten: (id: string) => void;
}

export const MealLogCard: React.FC<MealLogCardProps> = ({
  meal,
  onToggleEaten,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-md">
      {/* Left section: Image and Text info */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-[85px] h-[65px] sm:w-[100px] sm:h-[75px] rounded-xl object-cover flex-shrink-0"
        />
        <div className="space-y-1 min-w-0 flex-1">
          <h4 className="font-semibold text-gray-800 text-sm md:text-base truncate">
            {meal.name}
          </h4>
          <span className="text-[10px] sm:text-xs font-medium text-[#1E6B3C] bg-[#1E6B3C]/5 px-2 py-0.5 rounded-md block w-fit">
            {meal.tag}
          </span>
          <span className="text-sm font-bold text-gray-700 block">
            ₦{meal.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Right section: Interactive single toggle button and status */}
      <div className="flex items-center gap-4 pl-2 flex-shrink-0">
        {/* Status Text label (Hidden on small mobile screens to save layout real estate) */}
        <div className="hidden sm:block">
          {meal.eaten ? (
            <div className="flex items-center gap-1.5 text-[#1E6B3C] font-semibold text-xs bg-[#1E6B3C]/5 px-2.5 py-1 rounded-full">
              <span>Eaten</span>
            </div>
          ) : (
            <span className="text-gray-300 font-medium text-xs">Not Eaten</span>
          )}
        </div>

        {/* Clean, primary toggle button handle */}
        <button
          onClick={() => onToggleEaten(meal.id)}
          aria-label="Toggle meal eaten status"
          className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none border-2 cursor-pointer ${
            meal.eaten
              ? "bg-[#1E6B3C] border-[#1E6B3C] text-white scale-100"
              : "border-gray-300 hover:border-[#1E6B3C] bg-gray-50/50"
          }`}
        >
          {meal.eaten && (
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-2.5"
            >
              <path
                d="M1 4.5L4.33333 8L11 1"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
