"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartNoAxesColumnIncreasing, ChevronDown } from "lucide-react";
import {
  FEEDBACK_OVERVIEW,
  type FeedbackCategory,
} from "@/constants/admin-feedback";

interface FeedbackOverviewProps {
  selectedCategory: "All Categories" | FeedbackCategory;
  onCategoryChange: (category: "All Categories" | FeedbackCategory) => void;
}

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e8e4ed",
  boxShadow: "0 8px 20px rgba(47,39,68,0.10)",
  fontSize: 11,
};

export default function FeedbackOverview({
  selectedCategory,
  onCategoryChange,
}: FeedbackOverviewProps) {
  const chartData =
    selectedCategory === "All Categories"
      ? FEEDBACK_OVERVIEW
      : FEEDBACK_OVERVIEW.filter((item) => item.name === selectedCategory).map(
          (item) => ({ ...item, value: 100 }),
        );

  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-[#e9e5ed] bg-white p-4 shadow-[0_2px_10px_rgba(47,39,68,0.035)] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#303044]">
          <ChartNoAxesColumnIncreasing
            className="h-5 w-5 text-[#287749]"
            aria-hidden="true"
          />
          Feedback Overview
        </h2>
        <label className="relative">
          <span className="sr-only">Feedback overview category</span>
          <select
            value={selectedCategory}
            onChange={(event) =>
              onCategoryChange(
                event.target.value as "All Categories" | FeedbackCategory,
              )
            }
            className="h-9 appearance-none rounded-lg border border-[#e7e4eb] bg-white py-1.5 pl-3 pr-8 text-[11px] font-medium text-[#5b5b6d] outline-none focus:border-[#4c9869]"
          >
            <option>All Categories</option>
            {FEEDBACK_OVERVIEW.map(({ name }) => (
              <option key={name}>{name}</option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#77778a]"
            aria-hidden="true"
          />
        </label>
      </div>

      <div className="flex min-h-[210px] flex-col items-center justify-center gap-2 pt-2 sm:flex-row sm:gap-4">
        <div className="relative h-[190px] w-full max-w-[220px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="82%"
                stroke="white"
                strokeWidth={1}
                label={({ value }) => `${value}%`}
                labelLine={false}
                isAnimationActive
                animationDuration={650}
              >
                {chartData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [`${value ?? 0}%`, "Feedback"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex w-full max-w-[240px] flex-col gap-3">
          {chartData.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-3 text-xs"
            >
              <span className="flex min-w-0 items-center gap-2 text-[#747486]">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.name}</span>
              </span>
              <span className="font-semibold text-[#4b4b60]">
                {item.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
