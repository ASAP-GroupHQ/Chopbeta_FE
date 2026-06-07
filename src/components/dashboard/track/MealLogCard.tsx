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
    <div className="flex items-center gap-4 md:gap-8 group">
      <div className="flex items-center gap-4 w-[110px] flex-shrink-0">
        <span className="text-sm font-bold text-[#1E6B3C] tracking-wide">
          {meal.time}
        </span>
        <button
          onClick={() => onToggleEaten(meal.id)}
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none border-2 ${
            meal.eaten
              ? "bg-[#1E6B3C] border-[#1E6B3C] text-white scale-100"
              : "border-gray-300 hover:border-[#1E6B3C] bg-white"
          }`}
        >
          {meal.eaten && (
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5L4.33333 8L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>


      <div className="flex-1 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-[100px] h-[75px] rounded-xl object-cover"
          />
          <div className="space-y-1">
            <h4 className="font-semibold text-gray-800 text-sm md:text-base">
              {meal.name}
            </h4>
            <span className="text-xs font-medium text-[#1E6B3C] bg-[#1E6B3C]/5 px-2 py-0.5 rounded-md block w-fit">
              {meal.tag}
            </span>
            <span className="text-sm font-bold text-gray-700 block">
              ₦{meal.price}
            </span>
          </div>
        </div>

        <div className="pr-4 hidden sm:block">
          {meal.eaten ? (
            <div className="flex items-center gap-1.5 text-[#1E6B3C] font-semibold text-xs bg-[#1E6B3C]/5 px-2.5 py-1 rounded-full">
              <span>Eaten</span>
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.5L4.33333 8L11 1"
                  stroke="#1E6B3C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <span className="text-gray-300 font-medium text-xs">Not Eaten</span>
          )}
        </div>
      </div>
    </div>
  );
};
