"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";
import {
  getAnalyticsTimeRange,
  MEAL_CATEGORY_ANALYTICS,
  MEAL_PLAN_ANALYTICS,
  type AnalyticsTimeRange,
  USER_GROWTH_ANALYTICS,
  VISIBLE_POINTS_BY_RANGE,
} from "@/constants/analytics-data";

const chartCardClass =
  "min-w-0 overflow-hidden rounded-xl border border-[#e8e4ed] bg-white/80 shadow-[0_2px_8px_rgba(47,39,68,0.035)]";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e8e4ed",
  boxShadow: "0 8px 20px rgba(47,39,68,0.10)",
  fontSize: 11,
};

interface AnalyticsChartsProps {
  selectedRange: AnalyticsTimeRange;
  onSelectRange: (range: AnalyticsTimeRange) => void;
}

export default function AnalyticsCharts({
  selectedRange,
  onSelectRange,
}: AnalyticsChartsProps) {
  const visibleMealPlans = MEAL_PLAN_ANALYTICS.slice(
    -VISIBLE_POINTS_BY_RANGE[selectedRange],
  );
  const visibleUserGrowth = USER_GROWTH_ANALYTICS.slice(
    -Math.min(
      VISIBLE_POINTS_BY_RANGE[selectedRange],
      USER_GROWTH_ANALYTICS.length,
    ),
  );

  return (
    <section
      aria-label="Platform charts"
      className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3"
    >
      <article className={chartCardClass}>
        <ChartHeader
          title="Meal Plans Generated"
          selectedRange={selectedRange}
          onSelectRange={onSelectRange}
        />
        <div className="h-[220px] px-2 pb-2 pt-3 sm:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={visibleMealPlans}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="mealPlanFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#746be8" stopOpacity={0.28} />
                  <stop
                    offset="100%"
                    stopColor="#746be8"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="#eceaf0"
                strokeDasharray="3 4"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={{ stroke: "#e5e2ea" }}
                tick={{ fill: "#858598", fontSize: 9 }}
                interval={2}
                tickMargin={7}
              />
              <YAxis
                domain={[0, 40]}
                ticks={[0, 8, 16, 24, 32, 40]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#858598", fontSize: 9 }}
                width={26}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [value ?? 0, "Meal plans"]}
              />
              <Area
                type="monotone"
                dataKey="plans"
                stroke="#746be8"
                strokeWidth={2}
                fill="url(#mealPlanFill)"
                activeDot={{
                  r: 4,
                  fill: "#746be8",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                dot={{
                  r: 2,
                  fill: "white",
                  stroke: "#746be8",
                  strokeWidth: 1.5,
                }}
                isAnimationActive
                animationDuration={700}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className={chartCardClass}>
        <ChartHeader
          title="Meal Plans by category"
          selectedRange={selectedRange}
          onSelectRange={onSelectRange}
        />
        <div className="flex min-h-[220px] items-center gap-2 px-3 py-3 sm:min-h-[250px] sm:px-4">
          <div className="relative h-[190px] min-w-0 flex-1 sm:h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MEAL_CATEGORY_ANALYTICS}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="54%"
                  outerRadius="88%"
                  paddingAngle={0}
                  stroke="none"
                  animationDuration={700}
                >
                  {MEAL_CATEGORY_ANALYTICS.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value ?? 0}%`, "Meal plans"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-[#3d3d50]">48,731</span>
              <span className="text-[9px] text-[#858598]">Total Plans</span>
            </div>
          </div>
          <ul className="min-w-[112px] flex-1 space-y-3">
            {MEAL_CATEGORY_ANALYTICS.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-2 text-[9px] sm:text-[10px]"
              >
                <span className="flex min-w-0 items-center gap-1.5 text-[#77778a]">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="shrink-0 font-semibold text-[#4b4b60]">
                  {item.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className={`${chartCardClass} lg:col-span-2 2xl:col-span-1`}>
        <ChartHeader
          title="User Growth"
          selectedRange={selectedRange}
          onSelectRange={onSelectRange}
        />
        <div className="h-[220px] px-2 pb-2 pt-3 sm:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={visibleUserGrowth}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#eceaf0"
                strokeDasharray="3 4"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={{ stroke: "#e5e2ea" }}
                tick={{ fill: "#858598", fontSize: 9 }}
                tickMargin={7}
              />
              <YAxis
                domain={[0, 40]}
                ticks={[0, 8, 16, 24, 32, 40]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#858598", fontSize: 9 }}
                width={26}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [value ?? 0, "New users"]}
              />
              <Bar
                dataKey="users"
                fill="#9990ed"
                radius={[8, 8, 0, 0]}
                maxBarSize={34}
                animationDuration={700}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}

function ChartHeader({
  title,
  selectedRange,
  onSelectRange,
}: {
  title: string;
  selectedRange: AnalyticsTimeRange;
  onSelectRange: (range: AnalyticsTimeRange) => void;
}) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-2 border-b border-[#e9e6ed] bg-[#eeedf3] px-3 py-2">
      <h2 className="truncate text-[11px] font-semibold text-[#36364a] sm:text-xs">
        {title}
      </h2>
      <label className="relative flex shrink-0 items-center">
        <span className="sr-only">Select chart period</span>
        <select
          value={selectedRange}
          onChange={(event) =>
            onSelectRange(getAnalyticsTimeRange(event.target.value))
          }
          className="max-w-[108px] appearance-none bg-transparent py-1 pl-1 pr-5 text-[9px] font-medium text-[#77778a] outline-none sm:max-w-[120px] sm:text-[10px]"
        >
          <option value="Today">Today</option>
          <option value="7 Days">Last 7 Days</option>
          <option value="30 Days">Last 30 Days</option>
          <option value="90 Days">Last 90 Days</option>
          <option value="Custom">Custom</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-[#77778a]" />
      </label>
    </div>
  );
}
