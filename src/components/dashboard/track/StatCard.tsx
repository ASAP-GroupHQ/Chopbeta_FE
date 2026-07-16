"use client";

import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string | React.ReactNode;
  progressColor?: string;
  progressWidth?: string;
  isLoading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtext,
  progressColor,
  progressWidth,
  isLoading = false,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex flex-col justify-between min-h-[115px] transition-all hover:shadow-md duration-300">
      {isLoading ? (
        // Pulsing skeleton loader while data is being fetched
        <div className="animate-pulse space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
          <div className="h-3 bg-gray-100 rounded w-2/3 mx-auto mt-2" />
        </div>
      ) : (
        <>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div className="flex-col">
              <span className="text-xs text-gray-400 font-medium tracking-wide block">
                {label}
              </span>
              <span className="text-[22px] font-bold text-gray-800 leading-tight block mt-0.5">
                {value}
              </span>
            </div>
          </div>

          <div className="w-full mt-3">
            {progressColor && progressWidth ? (
              <div className="space-y-1.5">
                <span className="text-[11px] text-gray-500 text-center block">
                  {subtext}
                </span>

                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      backgroundColor: progressColor,
                      width: progressWidth,
                    }}
                  />
                </div>
              </div>
            ) : (
              <span className="text-[11px] text-gray-500 text-center block">
                {subtext}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};
