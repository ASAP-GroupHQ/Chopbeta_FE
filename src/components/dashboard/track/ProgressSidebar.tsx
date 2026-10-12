"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiDroplet } from "react-icons/fi";
import trackMealTips from "@/data/track-meal-tips.json";
import { getHydrationFeedback, type WaterUnit } from "@/lib/hydration";
import HydrationFeedbackModal from "./HydrationFeedbackModal";
import { DropIcon, SmallTipIcon } from "./TrackMealIcons";

interface ProgressSidebarProps {
  eatenCount: number;
  totalCount: number;
}

export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  eatenCount,
  totalCount,
}) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [waterCount, setWaterCount] = useState("");
  const [waterUnit, setWaterUnit] = useState<WaterUnit>("glasses");
  const [hydrationFeedback, setHydrationFeedback] = useState<
    ReturnType<typeof getHydrationFeedback> | null
  >(null);
  const completionPercentage = Math.round((eatenCount / totalCount) * 100) || 0;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTipIndex((currentIndex) => (currentIndex + 1) % trackMealTips.length);
    }, 35_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const closeHydrationFeedback = useCallback(() => {
    setHydrationFeedback(null);
  }, []);

  const handleHydrationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const count = Number(waterCount);

    if (!Number.isInteger(count) || count < 0 || count > 99) return;

    setHydrationFeedback(getHydrationFeedback(count, waterUnit));
  };

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
              You&apos;ve eaten {eatenCount} meals today
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
            <div className="relative min-h-[52px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={tipIndex}
                  aria-live="polite"
                  className="text-xs text-gray-500 leading-relaxed"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {trackMealTips[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
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
          A common guide is about 8 glasses today. Your needs can vary, so sip
          steadily and listen to your body.
        </p>
        <form onSubmit={handleHydrationSubmit} className="space-y-3">
          <label
            htmlFor="water-count"
            className="block text-xs font-semibold text-gray-700"
          >
            How much water have you had today?
          </label>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-2">
            <input
              id="water-count"
              name="waterCount"
              type="number"
              min="0"
              max="99"
              step="1"
              required
              value={waterCount}
              onChange={(event) => setWaterCount(event.target.value)}
              placeholder="0"
              aria-describedby="water-entry-note"
              className="h-11 min-w-0 rounded-xl border border-gray-200 px-3 text-sm text-gray-800 outline-none transition focus:border-[#1E6B3C] focus:ring-2 focus:ring-[#1E6B3C]/15"
            />
            <select
              id="water-unit"
              name="waterUnit"
              value={waterUnit}
              onChange={(event) => {
                const unit = event.target.value;
                if (
                  unit === "glasses" ||
                  unit === "bottles" ||
                  unit === "sachets"
                ) {
                  setWaterUnit(unit);
                }
              }}
              aria-label="Water type"
              className="h-11 min-w-0 rounded-xl border border-gray-200 bg-white px-2 text-xs font-medium text-gray-700 outline-none transition focus:border-[#1E6B3C] focus:ring-2 focus:ring-[#1E6B3C]/15 sm:px-3 sm:text-sm"
            >
              <option value="glasses">Glasses</option>
              <option value="bottles">Bottles</option>
              <option value="sachets">Sachets</option>
            </select>
          </div>
          <p
            id="water-entry-note"
            className="text-[11px] leading-relaxed text-gray-400"
          >
            Bottles and sachets are
            estimated as 2 glasses each.
          </p>
          <button
            type="submit"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-4 text-sm font-bold text-white transition hover:bg-[#185A31] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 cursor-pointer"
          >
            <FiDroplet aria-hidden="true" size={16} />
            Check my hydration
          </button>
        </form>
      </div>
      <HydrationFeedbackModal
        feedback={hydrationFeedback}
        onClose={closeHydrationFeedback}
      />
    </div>
  );
};
