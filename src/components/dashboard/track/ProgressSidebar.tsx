"use client";

import React from "react";
import { DropIcon, WaterCupIcon, SmallTipIcon } from "./TrackMealIcons";

interface ProgressSidebarProps {
  eatenCount: number;
  totalCount: number;
  waterGlasses: number;
  onAddWater: () => void;
}

export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  eatenCount,
  totalCount,
  waterGlasses,
  onAddWater,
}) => {
  const completionPercentage = Math.round((eatenCount / totalCount) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Daily Progress  */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-800">Daily Progress</h3>
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                className="text-gray-100"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#1E6B3C] transition-all duration-500 ease-out"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base font-extrabold text-gray-800">
                {completionPercentage}%
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[#1E6B3C] text-sm">Great job!</h4>
            <p className="text-xs text-gray-500 leading-normal">
                You&&apos;ve eaten {eatenCount} of {totalCount} meals today
            </p>
          </div>
        </div>
      </div>

      {/* Small Tip Dynamic Widget Context Box */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between min-h-[120px]">
        <div className="p-4 flex gap-3 items-start">
          <div className="mt-0.5">
            <SmallTipIcon />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[#1E6B3C] tracking-wide uppercase">
              Small Tip
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Try to complete all your meals to stay energized and focused
              throughout the day
            </p>
          </div>
        </div>
        {/* <div className="h-[50px] w-full bg-gradient-to-r from-orange-50 to-orange-100/50 opacity-60 relative">
          <div className="absolute right-2 bottom-0 text-3xl opacity-20 select-none">
            🍲
          </div>
        </div> */}
      </div>

      {/* Nutritional Balance Horizontal Progress Indicators */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800">
            Nutritional Balance
          </h3>
          <span className="text-[10px] text-gray-400 block mt-0.5">
            Based on meal eaten
          </span>
        </div>
        <div className="space-y-3">
          {[
            { label: "Carbs", val: "55%", color: "bg-[#1E6B3C]" },
            { label: "Protein", val: "70%", color: "bg-[#1E6B3C]" },
            { label: "Fat", val: "60%", color: "bg-[#E85D26]" },
          ].map((macro, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 text-xs font-semibold text-gray-700"
            >
              <span className="w-12 text-gray-500">{macro.label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${macro.color}`}
                  style={{ width: macro.val }}
                />
              </div>
              <span className="w-8 text-right font-bold">{macro.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hydration Reminders & Quick Track Widget */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <DropIcon />
          <h3 className="text-sm font-bold text-gray-800">
            Hydration Reminder
          </h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Drink at least 6-8 glasses of water today to stay healthy and focused.
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5 py-1">
            {[...Array(6)].map((_, idx) => (
              <button
                key={idx}
                onClick={onAddWater}
                className="transform hover:scale-110 active:scale-95 transition-transform duration-150 focus:outline-none"
              >
                <WaterCupIcon filled={idx < waterGlasses} />
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-[#72B2F3] mt-1">
            {waterGlasses} / 6 glasses
          </span>
        </div>
      </div>
    </div>
  );
};
