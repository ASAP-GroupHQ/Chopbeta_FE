"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, TrendingUp, Users, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { adminService, type WeeklyAdminData } from "@/services/admin";
import AdminHeader from "./AdminHeader";
import AdminMetricCard from "./AdminMetricCard";
import AdminSidebar from "./AdminSidebar";
import MostPopularMeals from "./MostPopularMealsCard";
import type { PopularMeal } from "./types";

const quickActions = [
  { label: "Add new meals", desc: "Add a new meal to the database", href: "/admin/meal-management", icon: "➕", color: "bg-indigo-50 border-indigo-100" },
  { label: "Update Meal Prices", desc: "Update prices of existing foods", href: "/admin/price-management", icon: "💵", color: "bg-teal-50 border-teal-100" },
  { label: "View Users", desc: "View and manage user accounts", href: "/admin/users", icon: "👤", color: "bg-blue-50 border-blue-100" },
  { label: "View Analytics", desc: "See detailed platform analytics", href: "/admin/analytics", icon: "📊", color: "bg-green-50 border-green-100" },
];

function QuickActions() {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-sm font-bold text-gray-900">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all hover:shadow-md ${action.color}`}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm">{action.icon}</div>
            <h4 className="mb-1 text-xs font-bold text-gray-900">{action.label}</h4>
            <p className="max-w-[120px] text-[10px] leading-tight text-gray-400">{action.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

const formatDate = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

function createDailySeries(data: WeeklyAdminData) {
  const days = new Map<string, { day: string; generated: number; planned: number; completed: number }>();

  const addRecords = (
    records: WeeklyAdminData["generatedMeals"],
    dateKey: "generatedAt" | "plannedAt" | "completedAt",
    countKey: "generated" | "planned" | "completed",
  ) => {
    for (const record of records) {
      if (!record[dateKey]) continue;
      const date = record[dateKey]!.slice(0, 10);
      const item = days.get(date) ?? {
        day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        generated: 0,
        planned: 0,
        completed: 0,
      };
      item[countKey] += 1;
      days.set(date, item);
    }
  };

  addRecords(data.generatedMeals, "generatedAt", "generated");
  addRecords(data.plannedMeals, "plannedAt", "planned");
  addRecords(data.completedMeals, "completedAt", "completed");
  return [...days.entries()].sort(([first], [second]) => first.localeCompare(second)).map(([, item]) => item);
}

function createPopularMeals(data: WeeklyAdminData): PopularMeal[] {
  const grouped = new Map<string, { name: string; count: number }>();
  for (const activity of data.generatedMeals) {
    if (!activity.mealTitle) continue;
    const current = grouped.get(activity.mealId) ?? { name: activity.mealTitle, count: 0 };
    current.count += 1;
    grouped.set(activity.mealId, current);
  }

  const sorted = [...grouped.entries()].sort(([, first], [, second]) => second.count - first.count).slice(0, 4);
  const maxCount = sorted[0]?.[1].count ?? 1;
  return sorted.map(([id, meal]) => ({
    id,
    name: meal.name,
    category: "Meal",
    timesChosen: meal.count,
    trend: "This week",
    percentage: Math.round((meal.count / maxCount) * 100),
    imageUrl: "",
  }));
}

export default function AdminDashboardView() {
  const [userCount, setUserCount] = useState(0);
  const [mealCount, setMealCount] = useState(0);
  const [weeklyData, setWeeklyData] = useState<WeeklyAdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reportDate = formatDate(new Date());

  useEffect(() => {
    let isCurrent = true;

    Promise.all([
      adminService.getUserSummary(),
      adminService.getMealCount(),
      adminService.getWeeklyData(reportDate),
    ])
      .then(([users, meals, weekly]) => {
        if (!isCurrent) return;
        setUserCount(users.totalUsers);
        setMealCount(meals);
        setWeeklyData(weekly);
      })
      .catch((loadError: Error) => {
        if (isCurrent) setError(loadError.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [reportDate]);

  const dailySeries = useMemo(
    () => weeklyData ? createDailySeries(weeklyData) : [],
    [weeklyData],
  );
  const popularMeals = useMemo(
    () => weeklyData ? createPopularMeals(weeklyData) : [],
    [weeklyData],
  );

  return (
    <div className="admin-page-background min-h-screen pl-64">
      <AdminSidebar />
      <AdminHeader title="Admin Dashboard" subtitle="Monitor ChopBeta activity, users and meal performance." />
      <main className="p-8">
        {error && <p role="alert" className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
        {isLoading
          ? <p className="rounded-xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">Loading dashboard...</p>
          : <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <AdminMetricCard title="Total users" value={userCount.toLocaleString()} subtext="Registered accounts" trend="Current total" trendType="up" icon={<Users className="h-5 w-5" />} bgIconColor="bg-emerald-600" />
              <AdminMetricCard title="Total meals" value={mealCount.toLocaleString()} subtext="Meals in the catalog" trend="Current total" trendType="up" icon={<UtensilsCrossed className="h-5 w-5" />} bgIconColor="bg-blue-600" />
              <AdminMetricCard title="Meals generated" value={(weeklyData?.totalGeneratedMeals ?? 0).toLocaleString()} subtext="This week" trend="Weekly" trendType="up" icon={<BarChart3 className="h-5 w-5" />} bgIconColor="bg-orange-500" />
              <AdminMetricCard title="Meals planned" value={(weeklyData?.totalPlannedMeals ?? 0).toLocaleString()} subtext="This week" trend="Weekly" trendType="up" icon={<TrendingUp className="h-5 w-5" />} bgIconColor="bg-violet-600" />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <QuickActions />
              <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">Recent meal activity</h2>
                <div className="mt-4 space-y-4">
                  {(weeklyData?.generatedMeals ?? []).slice(-5).reverse().map((activity) => (
                    <div key={activity.mealId + activity.generatedAt} className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-700"><span className="font-semibold">{activity.mealTitle ?? "Meal"}</span> was generated</p>
                        <p className="mt-1 text-xs text-gray-400">{activity.generatedAt ? new Date(activity.generatedAt).toLocaleString() : "This week"}</p>
                      </div>
                    </div>
                  ))}
                  {!weeklyData?.generatedMeals.length && <p className="text-sm text-slate-500">No meal activity for this week.</p>}
                </div>
              </section>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
              <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800">Weekly meal activity</h2>
                  <span className="rounded border border-gray-100 bg-gray-50 px-2 py-1 text-xs text-gray-400">{reportDate}</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailySeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #E5E7EB" }} />
                      <Line type="monotone" dataKey="generated" name="Generated" stroke="#6366F1" strokeWidth={2} />
                      <Line type="monotone" dataKey="planned" name="Planned" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="completed" name="Completed" stroke="#F97316" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <MostPopularMeals meals={popularMeals} />
            </div>
          </>}
      </main>
    </div>
  );
}
