"use client";

import { useState } from "react";
import Image from "next/image";
import HeaderActions from "@/components/dashboard/HeaderActions";
import {
  ActiveUsersIcon,
  AveragePriceIcon,
  TotalMealsIcon,
  TotalUserIcon,
} from "@/components/icons/AdminIcons";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Crown,
  Soup,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
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

type TimeRange = "Today" | "7 Days" | "30 Days" | "90 Days" | "Custom";

const ranges: TimeRange[] = ["Today", "7 Days", "30 Days", "90 Days"];

const mealPlanData = [
  { day: "Apr 25", plans: 20 },
  { day: "Apr 28", plans: 21 },
  { day: "May 1", plans: 20 },
  { day: "May 4", plans: 16 },
  { day: "May 7", plans: 12 },
  { day: "May 10", plans: 13 },
  { day: "May 13", plans: 9 },
  { day: "May 16", plans: 17 },
  { day: "May 18", plans: 25 },
  { day: "May 20", plans: 33 },
  { day: "May 22", plans: 25 },
  { day: "May 24", plans: 7 },
];

const categoryData = [
  { name: "Local Dishes", value: 38.5, color: "#2f925d" },
  { name: "Breakfast", value: 22.8, color: "#746be8" },
  { name: "Quick Meals", value: 12.4, color: "#52c0ae" },
  { name: "Snacks", value: 15.6, color: "#ff9087" },
  { name: "Others", value: 10.7, color: "#36bfd0" },
];

const userGrowthData = [
  { day: "Apr 25", users: 18 },
  { day: "Apr 30", users: 17 },
  { day: "May 5", users: 10 },
  { day: "May 15", users: 8 },
  { day: "May 20", users: 38 },
  { day: "May 24", users: 6 },
];

const visiblePointsByRange: Record<TimeRange, number> = {
  Today: 1,
  "7 Days": 4,
  "30 Days": 8,
  "90 Days": 12,
  Custom: 8,
};

const analyticsStats = [
  {
    title: "Total Meal plans",
    value: "48,732",
    icon: TotalMealsIcon,
    tint: "bg-[#eaf4ed]",
    trend: "12.5%",
  },
  {
    title: "Average Price",
    value: "₦800",
    icon: AveragePriceIcon,
    tint: "bg-[#eaf4ed]",
    trend: "12.5%",
  },
  {
    title: "Total User",
    value: "48,732",
    icon: TotalUserIcon,
    tint: "bg-[#f5eafa]",
    trend: "12.5%",
  },
  {
    title: "Active User",
    value: "12,732",
    icon: ActiveUsersIcon,
    tint: "bg-[#eaf4ed]",
    trend: "12.5%",
  },
];

const topMeals = [
  {
    meal: {
      name: "Bread & Egg",
      category: "Breakfast",
      image: "/images/meals/Fried-Rice.png",
    },
    count: "8,452",
  },
  {
    meal: {
      name: "Pap & Akara",
      category: "Local Dish",
      image: "/images/meals/Puff-puff.jpg",
    },
    count: "8,452",
  },
  {
    meal: {
      name: "Noodles",
      category: "Quick meal",
      image: "/images/meals/quick-meal.png",
    },
    count: "8,452",
  },
  {
    meal: {
      name: "Rice & Beans",
      category: "Local Dish",
      image: "/images/meals/beans and plantain.png",
    },
    count: "8,452",
  },
  {
    meal: {
      name: "Rice & Beans",
      category: "Local Dish",
      image: "/images/meals/Ofada_rice.png",
    },
    count: "8,452",
  },
];

const insightItems = [
  {
    title: "Meal generation increased by 22%",
    detail:
      "Total meal plan generated grew from 39,912 to 48,732 in the last 30 days.",
    icon: "growth",
    color: "#369464",
  },
  {
    title: "User growth is steady",
    detail: "New users increased by 8.7% compared to the previous 30 days.",
    icon: "users",
    color: "#7867ff",
  },
  {
    title: "Local dishes remain the most popular",
    detail: "38.7% of all meal plans were for local dishes.",
    icon: "meal",
    color: "#2f925d",
  },
  {
    title: "Peak activity",
    detail: "Most meal plans are generated between 12 PM and 3 PM.",
    icon: "peak",
    color: "#3947d5",
  },
];

const chartCardClass =
  "min-w-0 overflow-hidden rounded-xl border border-[#e8e4ed] bg-white/80 shadow-[0_2px_8px_rgba(47,39,68,0.035)]";

function getTimeRange(value: string): TimeRange {
  if (
    value === "Today" ||
    value === "7 Days" ||
    value === "30 Days" ||
    value === "90 Days" ||
    value === "Custom"
  ) {
    return value;
  }
  return "30 Days";
}

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30 Days");
  const [showCustomRange, setShowCustomRange] = useState(false);

  const selectRange = (range: TimeRange) => {
    setSelectedRange(range);
    setShowCustomRange(range === "Custom");
  };
  const visibleMealPlanData = mealPlanData.slice(
    -visiblePointsByRange[selectedRange],
  );
  const visibleUserGrowthData = userGrowthData.slice(
    -Math.min(visiblePointsByRange[selectedRange], userGrowthData.length),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-4"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black tracking-tight text-[#202035] sm:text-3xl">
              Analytics
            </h1>
            <p className="text-xs font-medium text-[#7b7b8e] sm:text-sm">
              Track platform performance, user activity and meal trends with
              real-time insights
            </p>
          </div>
          <div className="flex max-w-full flex-col items-start gap-2">
            <div className="flex max-w-full flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => selectRange("Custom")}
                className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition ${
                  selectedRange === "Custom"
                    ? "border-[#2e8b57] bg-[#2e8b57] text-white"
                    : "border-[#e7e4eb] bg-white text-[#66667a] hover:bg-[#fbfaff]"
                }`}
              >
                Custom
                <CalendarDays className="h-4 w-4" />
              </button>
              {ranges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => selectRange(range)}
                  aria-pressed={selectedRange === range}
                  className={`h-9 rounded-lg border px-3 text-xs font-medium transition ${
                    selectedRange === range
                      ? "border-[#2e8b57] bg-[#2e8b57] text-white shadow-sm"
                      : "border-[#e7e4eb] bg-white text-[#66667a] hover:bg-[#fbfaff]"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="flex min-h-9 max-w-full items-center gap-2 rounded-lg border border-[#e7e4eb] bg-white px-2.5 text-xs text-[#66667a]">
              <CalendarDays className="h-4 w-4 shrink-0 text-[#77778a]" />
              {showCustomRange ? (
                <div className="flex min-w-0 flex-wrap items-center gap-1">
                  <input
                    type="date"
                    aria-label="Custom range start date"
                    defaultValue="2025-04-25"
                    className="w-[116px] bg-transparent text-[10px] outline-none"
                  />
                  <span>–</span>
                  <input
                    type="date"
                    aria-label="Custom range end date"
                    defaultValue="2025-05-24"
                    className="w-[116px] bg-transparent text-[10px] outline-none"
                  />
                </div>
              ) : (
                <>
                  <span className="whitespace-nowrap">
                    Apr 25, 2025 - May 24, 2025
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 justify-end">
          <HeaderActions />
        </div>
      </header>

      <section
        aria-label="Analytics summary"
        className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {analyticsStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.title}
              className="flex min-h-[76px] items-center gap-3 rounded-xl border border-[#e9e3ed] bg-white/70 px-3 py-2.5 shadow-[0_2px_8px_rgba(47,39,68,0.03)] sm:px-3.5"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${stat.tint}`}
              >
                <Icon className="h-9 w-9 object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-[#818193]">
                  {stat.title}
                </p>
                <p className="mt-0.5 text-lg font-bold leading-tight text-[#202035]">
                  {stat.value}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="rounded-full bg-[#e8f4ec] px-1.5 py-0.5 text-[9px] font-semibold text-[#339464]">
                    ↑ {stat.trend}
                  </span>
                  <span className="text-[9px] font-medium text-[#89899a]">
                    vs last 30 days
                  </span>
                </div>
              </div>
              <TrendSparkline
                color={stat.title === "Total User" ? "#c86bd3" : "#2f925d"}
              />
            </article>
          );
        })}
      </section>

      <section
        aria-label="Platform charts"
        className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3"
      >
        <article className={chartCardClass}>
          <ChartHeader
            title="Meal Plans Generated"
            selectedRange={selectedRange}
            onSelect={selectRange}
          />
          <div className="h-[220px] px-2 pb-2 pt-3 sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={visibleMealPlanData}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="mealPlanFill" x1="0" y1="0" x2="0" y2="1">
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
            onSelect={selectRange}
          />
          <div className="flex min-h-[220px] items-center gap-2 px-3 py-3 sm:min-h-[250px] sm:px-4">
            <div className="relative h-[190px] min-w-0 flex-1 sm:h-[210px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="54%"
                    outerRadius="88%"
                    paddingAngle={0}
                    stroke="none"
                    animationDuration={700}
                  >
                    {categoryData.map((item) => (
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
              {categoryData.map((item) => (
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
            onSelect={selectRange}
          />
          <div className="h-[220px] px-2 pb-2 pt-3 sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visibleUserGrowthData}
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

      <section className="grid gap-3 lg:grid-cols-2">
        <article className={`${chartCardClass} self-start`}>
          <div className="flex items-center gap-2 border-b border-[#ebe8ef] px-3 py-3 sm:px-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff5d8] text-[#d3a600]">
              <Crown className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-bold text-[#303044]">Top Meals</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[380px] text-left">
              <thead className="bg-[#eeedf3] text-[9px] font-semibold text-[#77778a]">
                <tr>
                  <th className="px-3 py-2">#</th>
                  <th className="px-2 py-2">Meal Name</th>
                  <th className="px-2 py-2">Category</th>
                  <th className="px-3 py-2 text-right">Generated Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeebf1]">
                {topMeals.map(({ meal, count }, index) => (
                  <tr
                    key={`${meal.name}-${index}`}
                    className="transition-colors hover:bg-[#fbfaff]"
                  >
                    <td className="px-3 py-2 text-[10px] font-semibold text-[#77778a]">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-[#f1eff5] text-[#55556a]">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-2">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[#eeeaf0] bg-[#f1edf2]">
                          <Image
                            src={meal.image}
                            alt={meal.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <span className="whitespace-nowrap text-[10px] font-semibold text-[#3c3c50]">
                          {meal.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <CategoryBadge category={meal.category} />
                    </td>
                    <td className="px-3 py-2 text-right text-[10px] font-semibold text-[#4b4b60]">
                      {count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="min-w-0 space-y-2">
          <div className="flex items-center gap-2 px-1 py-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7ebe5] text-[#c8856a]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="#C8856A"
                  fillOpacity="0.1"
                />
                <path
                  d="M19.87 26.4V23.8H12.1557V26.4C12.1557 27.83 13.3129 29 14.7271 29H17.2986C18.7129 29 19.87 27.83 19.87 26.4ZM11.1143 20.004C11.2814 20.238 11.4871 20.693 11.6671 21.2H20.3586C20.5514 20.693 20.7443 20.238 20.9114 20.004C21.3614 19.354 21.8371 18.795 22.3 18.236C23.6243 16.663 25 15.038 25 12.1C25 7.082 20.9629 3 16 3C11.0371 3 7 7.082 7 12.1C7 15.064 8.37571 16.689 9.7 18.249C10.1629 18.795 10.6386 19.354 11.1014 20.004H11.1143ZM16.0129 6.9V9.5C14.5986 9.5 13.4414 10.67 13.4414 12.1H10.87C10.87 9.227 13.1714 6.9 16.0129 6.9Z"
                  fill="#C8856A"
                />
              </svg>
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#303044]">
                Quick Insights
              </h2>
              <p className="text-[10px] text-[#858598]">
                Key takeaways from platform performance
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {insightItems.map((item) => (
              <article
                key={item.title}
                className="group flex items-center gap-3 rounded-xl border border-[#eeeaf0] bg-white/80 px-3 py-3 shadow-[0_2px_8px_rgba(47,39,68,0.025)] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_5px_14px_rgba(47,39,68,0.07)] sm:px-4"
              >
                <InsightIcon type={item.icon} color={item.color} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[11px] font-semibold text-[#37374b] sm:text-xs">
                    {item.title === "Meal generation increased by 22%" ? (
                      <>
                        Meal generation increased by{" "}
                        <span className="text-[#339464]">22%</span>
                      </>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#858598]">
                    {item.detail}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#858598] transition-transform group-hover:translate-x-0.5" />
              </article>
            ))}
          </div>
        </article>
      </section>
    </motion.div>
  );
}

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e8e4ed",
  boxShadow: "0 8px 20px rgba(47,39,68,0.10)",
  fontSize: 11,
};

function TrendSparkline({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 42 22"
      fill="none"
      className="h-6 w-9 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M2 19L13 11L23 14L39 3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartHeader({
  title,
  selectedRange,
  onSelect,
}: {
  title: string;
  selectedRange: TimeRange;
  onSelect: (range: TimeRange) => void;
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
          onChange={(event) => onSelect(getTimeRange(event.target.value))}
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

function CategoryBadge({ category }: { category: string }) {
  const color =
    category === "Local Dish"
      ? "bg-[#eaf4ed] text-[#378158]"
      : category === "Breakfast"
        ? "bg-[#f8eef9] text-[#b05ac0]"
        : "bg-[#fff1e9] text-[#ee754c]";
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-semibold ${color}`}
    >
      {category}
    </span>
  );
}

function InsightIcon({ type, color }: { type: string; color: string }) {
  if (type === "growth") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f3ec] text-[#369464]">
        <Activity className="h-4 w-4" />
      </span>
    );
  }
  if (type === "users") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efedff] text-[#7867ff]">
        <UsersRound className="h-4 w-4" />
      </span>
    );
  }
  if (type === "meal") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf4ed] text-[#2f925d]">
        <Soup className="h-4 w-4" />
      </span>
    );
  }

  function QuickInsightIcon() {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="16" fill="#C8856A" fillOpacity="0.1" />
        <path
          d="M19.87 26.4V23.8H12.1557V26.4C12.1557 27.83 13.3129 29 14.7271 29H17.2986C18.7129 29 19.87 27.83 19.87 26.4ZM11.1143 20.004C11.2814 20.238 11.4871 20.693 11.6671 21.2H20.3586C20.5514 20.693 20.7443 20.238 20.9114 20.004C21.3614 19.354 21.8371 18.795 22.3 18.236C23.6243 16.663 25 15.038 25 12.1C25 7.082 20.9629 3 16 3C11.0371 3 7 7.082 7 12.1C7 15.064 8.37571 16.689 9.7 18.249C10.1629 18.795 10.6386 19.354 11.1014 20.004H11.1143ZM16.0129 6.9V9.5C14.5986 9.5 13.4414 10.67 13.4414 12.1H10.87C10.87 9.227 13.1714 6.9 16.0129 6.9Z"
          fill="#C8856A"
        />
      </svg>
    );
  }
  if (type === "peak") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ededff] text-[#3947d5]">
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="none"
          aria-hidden="true"
        >
          <rect
            width="32"
            height="32"
            rx="16"
            fill="#263CCF"
            fillOpacity="0.1"
          />
          <path
            d="M12.493 24.292C11.3977 23.8193 10.4447 23.178 9.634 22.368C8.82333 21.558 8.18167 20.606 7.709 19.512C7.23633 18.418 7 17.2483 7 16.003C7 14.7577 7.23633 13.5877 7.709 12.493C8.181 11.3977 8.82133 10.4447 9.63 9.634C10.4387 8.82333 11.391 8.18167 12.487 7.709C13.583 7.23633 14.753 7 15.997 7C17.241 7 18.411 7.23633 19.507 7.709C20.6023 8.181 21.5553 8.82167 22.366 9.631C23.1767 10.4403 23.8183 11.3927 24.291 12.488C24.7637 13.5833 25 14.753 25 15.997C25 17.241 24.764 18.411 24.292 19.507C23.82 20.603 23.1787 21.556 22.368 22.366C21.5573 23.176 20.6053 23.8177 19.512 24.291C18.4187 24.7643 17.249 25.0007 16.003 25C14.757 24.9993 13.587 24.7633 12.493 24.292ZM8 16H16V8C13.7667 8 11.875 8.775 10.325 10.325C8.775 11.875 8 13.7667 8 16Z"
            fill="#263CCF"
          />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
      style={{ color, backgroundColor: `${color}14` }}
    >
      <Activity className="h-4 w-4" />
    </span>
  );
}
