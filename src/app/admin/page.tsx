"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
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

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Welcome Back Admin!");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good Morning, Admin!");
    else if (currentHour < 16) setGreeting("Good Afternoon, Admin!");
    else setGreeting("Good Evening, Admin!");
  }, []);

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
              className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between min-h-[135px]"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-11 h-11 object-contain" />
                </div>
                <span className="text-xs font-bold text-gray-500 leading-tight">
                  {stat.title}
                </span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#1A2E35]">
                  {stat.value}
                </h3>
                <p className="text-[10px] font-bold text-green-600 flex items-center gap-1 mt-1">
                  <span>↗</span> {stat.change}
                </p>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ADMIN_QUICK_ACTIONS.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <Link
                  key={idx}
                  href={action.link}
                  className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-green-600 hover:bg-green-50/30 hover:shadow-md transition group"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform flex items-center justify-center">
                    <ActionIcon className="w-11 h-11 object-contain" />
                  </div>
                  <h4 className="text-xs font-bold text-[#1A2E35]">
                    {action.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                    {action.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activities (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
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
          <div className="space-y-4 divide-y divide-gray-50">
            {ADMIN_RECENT_ACTIVITIES.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between pt-3 first:pt-0"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base flex-shrink-0">
                    {activity.avatar}
                  </span>
                  <div>
                    <p className="text-xs text-gray-800 font-medium">
                      <span className="font-bold text-[#1A2E35]">
                        {activity.name}
                      </span>{" "}
                      {activity.action}
                    </p>
                    <span className="text-[10px] text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOWER SECTION: MEAL PLAN GENERATED CHART & POPULAR MEALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Meal Plan Generated Chart Card (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1A2E35]">
              Meals Plan Generated
            </h3>
            <span className="text-xs font-semibold text-gray-500 border border-gray-200 px-3 py-1 rounded-lg">
              This Week ▾
            </span>
          </div>

          {/* Graphical Mock Visual */}
          <div className="h-64 w-full flex flex-col justify-between pt-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
              <div className="border-b border-gray-100 w-full" />
              <div className="border-b border-gray-100 w-full" />
              <div className="border-b border-gray-100 w-full" />
              <div className="border-b border-gray-100 w-full" />
            </div>

            {/* SVG Wave representation for graph */}
            <div className="relative h-44 w-full flex items-end">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 700 200"
                fill="none"
              >
                <path
                  d="M0 150 C 100 80, 200 40, 300 90 C 400 140, 500 60, 600 70 C 650 75, 700 100, 700 100"
                  stroke="#1E6B3C"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Data Points */}
                <circle cx="0" cy="150" r="5" fill="#1E6B3C" />
                <circle cx="116" cy="70" r="5" fill="#1E6B3C" />
                <circle cx="233" cy="95" r="5" fill="#1E6B3C" />
                <circle cx="350" cy="160" r="5" fill="#1E6B3C" />
                <circle cx="466" cy="85" r="5" fill="#1E6B3C" />
                <circle cx="583" cy="80" r="5" fill="#1E6B3C" />
                <circle cx="700" cy="100" r="5" fill="#1E6B3C" />
              </svg>
            </div>

            {/* X-Axis Days */}
            <div className="flex justify-between text-xs font-bold text-gray-400 pt-2 border-t border-gray-100">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Most Popular Meals (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
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

          <div className="space-y-4">
            {ADMIN_POPULAR_MEALS.map((meal, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-green-100 flex items-center justify-center text-lg">
                      🍲
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A2E35]">
                      {meal.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {meal.category}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-[#1A2E35]">
                    {meal.count}
                  </p>
                  <p className="text-[10px] font-semibold text-green-600 mt-0.5">
                    ↑ 8%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
