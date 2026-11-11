"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ADMIN_STATS_CARDS,
  ADMIN_QUICK_ACTIONS,
  ADMIN_RECENT_ACTIVITIES,
  ADMIN_POPULAR_MEALS,
} from "@/constants/admin-dashboard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

type ChartWeek = "this-week" | "last-week";

const DUMMY_GENERATED_MEAL_DATA: Record<
  ChartWeek,
  { day: string; plans: number }[]
> = {
  "this-week": [
    { day: "Mon", plans: 185 },
    { day: "Tue", plans: 305 },
    { day: "Wed", plans: 238 },
    { day: "Thu", plans: 75 },
    { day: "Fri", plans: 210 },
    { day: "Sat", plans: 215 },
    { day: "Sun", plans: 180 },
  ],
  "last-week": [
    { day: "Mon", plans: 140 },
    { day: "Tue", plans: 220 },
    { day: "Wed", plans: 195 },
    { day: "Thu", plans: 265 },
    { day: "Fri", plans: 185 },
    { day: "Sat", plans: 245 },
    { day: "Sun", plans: 205 },
  ],
};

export default function AdminDashboardPage() {
  const [greeting, setGreeting] = useState("Welcome Back Admin!");
  const [selectedWeek, setSelectedWeek] = useState<ChartWeek>("this-week");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good Morning, Admin!");
    else if (currentHour < 16) setGreeting("Good Afternoon, Admin!");
    else setGreeting("Good Evening, Admin!");
  }, []);

  const chartData = DUMMY_GENERATED_MEAL_DATA[selectedWeek];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* HEADER BANNER */}
      <div className="flex items-center justify-between w-full">
        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A2E35] flex items-center gap-2">
            {greeting} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Here&apos;s what&apos;s happening with ChopBeta.
          </p>
        </div>
        <HeaderActions />
      </div>

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {ADMIN_STATS_CARDS.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={idx}
              className="flex min-h-[144px] flex-col justify-between rounded-xl border border-[#DDE2E8] bg-white p-2.5 shadow-[0_2px_6px_rgba(26,46,53,0.06)] sm:p-3"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex shrink-0 items-center justify-center">
                  <IconComponent className="h-[54px] w-[50px] object-contain" />
                </div>
                <span className="min-w-0 text-[13px] font-medium leading-[1.45] text-[#41464B]">
                  {stat.title}
                </span>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold leading-none tracking-tight text-[#222222]">
                  {stat.value}
                </h3>
                <div className="mt-2 flex items-center justify-between gap-1.5">
                  <p className="flex min-w-0 items-center gap-1 text-[10px] font-medium leading-4 text-[#267447]">
                    <svg
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4 12L12 4M6 4h6v6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="truncate">{stat.change}</span>
                  </p>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#267447]"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M2.5 15.5L7.5 10.5L11 13.5L17.5 6.5M12.5 6.5H17.5V11.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MIDDLE SECTION: QUICK ACTIONS & RECENT ACTIVITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Quick Actions (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1A2E35]">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {ADMIN_QUICK_ACTIONS.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <Link
                  key={idx}
                  href={action.link}
                  className="group flex min-h-[154px] min-w-0 flex-col items-center justify-center rounded-xl border border-[#DDE2E8] bg-white px-2.5 py-4 text-center shadow-[0_3px_6px_rgba(26,46,53,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-green-600 hover:bg-green-50/30 hover:shadow-[0_6px_12px_rgba(26,46,53,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                >
                  <div className="mb-2.5 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                    <ActionIcon className="h-11 w-11 object-contain" />
                  </div>
                  <h4 className="text-xs font-bold leading-4 text-[#1A2E35] sm:text-[13px]">
                    {action.title}
                  </h4>
                  <p className="mt-1 max-w-[130px] text-[10px] leading-[1.35] text-gray-500 sm:text-[11px]">
                    {action.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activities (Right 5 Cols) */}
        <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_2px_8px_rgba(26,46,53,0.04)] sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1A2E35]">
              Recent Activities
            </h3>
            <Link
              href="/admin/activities"
              className="text-xs font-bold text-green-700 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="relative mt-6 space-y-5 pl-6 sm:space-y-6">
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-[5px] top-3 w-px bg-[#E5E7EB]"
            />
            {ADMIN_RECENT_ACTIVITIES.map((activity) => (
              <div
                key={activity.name}
                className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-6 top-3 h-[11px] w-[11px] rounded-full border-2 border-white ${activity.markerColor}`}
                />
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-black/5">
                    <Image
                      src={activity.avatar}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[#1A2E35]">
                      {activity.name}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 whitespace-nowrap text-right text-[10px] font-medium text-gray-400 sm:text-[11px]">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOWER SECTION: MEAL PLAN GENERATED CHART & POPULAR MEALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Meal Plan Generated Chart Card (7 Cols) */}
        <div className="min-w-0 space-y-4 rounded-2xl border border-[#DDE2E8] bg-white p-5 shadow-[0_2px_8px_rgba(26,46,53,0.05)] sm:p-6 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1A2E35]">
              Meals Plan Generated
            </h3>
            <select
              aria-label="Select chart week"
              value={selectedWeek}
              onChange={(event) =>
                setSelectedWeek(
                  event.target.value === "last-week"
                    ? "last-week"
                    : "this-week",
                )
              }
              className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
            >
              <option value="this-week">This Week</option>
              <option value="last-week">Last Week</option>
            </select>
          </div>
          <div className="h-[260px] w-full text-xs sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tick={{ fill: "#6B7280", fontSize: 11 }}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6B7280", fontSize: 11 }}
                  tickMargin={8}
                  width={36}
                />
                <Tooltip
                  cursor={{ stroke: "#7765FF", strokeDasharray: "4 4" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 8px 20px rgba(26,46,53,0.10)",
                    fontSize: 12,
                  }}
                  formatter={(value) => [value ?? 0, "Plans generated"]}
                  labelFormatter={(label) => `${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="plans"
                  stroke="#7765FF"
                  strokeWidth={2}
                  dot={{
                    r: 3.5,
                    fill: "#FFFFFF",
                    stroke: "#7765FF",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 5,
                    fill: "#7765FF",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Popular Meals (5 Cols) */}
        <div className="min-w-0 space-y-4 rounded-2xl border border-[#DDE2E8] bg-white p-5 shadow-[0_2px_8px_rgba(26,46,53,0.05)] sm:p-6 lg:col-span-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1A2E35]">
              Most Popular Meals
            </h3>
            <Link
              href="/admin/meals"
              className="text-xs font-bold text-green-700 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {ADMIN_POPULAR_MEALS.map((meal) => (
              <div
                key={meal.name}
                className="grid grid-cols-[48px_minmax(0,1fr)_auto_auto] items-center gap-x-2.5 gap-y-2 sm:grid-cols-[52px_minmax(0,1fr)_auto_auto] sm:gap-x-3"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 self-center">
                  <h4 className="truncate text-xs font-bold text-[#1A2E35] sm:text-sm">
                    {meal.name}
                  </h4>
                  <p className="mt-0.5 truncate text-[10px] font-medium text-gray-500">
                    {meal.category}
                  </p>
                </div>
                <div className="min-w-[74px] text-right sm:min-w-[88px]">
                  <p className="text-xs font-semibold text-[#30343B] sm:text-sm">
                    {meal.count}
                  </p>
                  <p className="text-[10px] text-gray-500 sm:text-xs">
                    times chosen
                  </p>
                </div>
                <div
                  className="col-start-2 col-end-5 h-1.5 overflow-hidden rounded-full bg-[#E3F0E9]"
                  role="progressbar"
                  aria-label={`${meal.name} popularity`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Number.parseInt(meal.progress, 10)}
                >
                  <div
                    className="h-full rounded-full bg-[#2E8B57] transition-[width]"
                    style={{ width: meal.progress }}
                  />
                </div>
                <span className="col-start-4 row-start-1 whitespace-nowrap text-[10px] font-medium text-[#267447] sm:text-xs">
                  ↑ {meal.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
