"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ChartDataPoint {
  day: string;
  spent: number;
}

interface SpendingChartProps {
  data: ChartDataPoint[];
}

// Custom Tooltip component to handle clean custom hover designs natively
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A2E] text-white p-3 rounded-xl shadow-xl border border-gray-800 text-xs font-medium">
        <p className="text-gray-400 mb-0.5">
          {payload[0].payload.day} Day Summary
        </p>
        <p className="text-sm font-bold text-white">
          ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function SpendingChart({ data }: SpendingChartProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-base text-[#1A1A2E]">
          Spending Insights
        </h3>
        <select className="text-xs bg-gray-50 border border-gray-100 rounded-lg p-1.5 outline-none font-medium cursor-pointer text-gray-600">
          <option>This week</option>
        </select>
      </div>
      <p className="text-xs text-gray-400 mb-6">
        You spent <span className="text-[#0F623D] font-semibold">12% less</span>{" "}
        compared to last week
      </p>

      {/* Chart wrapper container */}
      <div className="w-full h-48 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -22, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="historyColorSpent"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#0F623D" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0F623D" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#F1F1F5"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              stroke="#A3A3C2"
              className="font-medium"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#A3A3C2"
              className="font-medium"
              tickFormatter={(v) => `₦${v.toLocaleString()}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#0F623D",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="spent"
              stroke="#0F623D"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#historyColorSpent)"
              activeDot={{ r: 5, strokeWidth: 0, fill: "#0F623D" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
