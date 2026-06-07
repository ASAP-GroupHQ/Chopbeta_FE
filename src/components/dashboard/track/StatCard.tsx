"use client";

import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string | React.ReactNode;
  progressColor?: string;
  progressWidth?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtext,
  progressColor,
  progressWidth,
}) => {
  return (
    /* Changed h-[115px] to min-h-[115px] to safely avoid clipping any content */
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex flex-col justify-between min-h-[115px] transition-all hover:shadow-md duration-300">
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
            <span className="text-[11px] text-gray-500 text-center block">{subtext}</span>

            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ backgroundColor: progressColor, width: progressWidth }}
              />
            </div>
          </div>
        ) : (
          <span className="text-[11px] text-gray-500 text-center block">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
