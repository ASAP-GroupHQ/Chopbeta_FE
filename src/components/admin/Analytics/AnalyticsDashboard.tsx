"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  DollarSign,
  TrendingUp,
  UserCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { adminService, toAmount, type AdminMeal, type WeeklyAdminData } from "@/services/admin";
import AdminHeader from "../Admin Dashboard/AdminHeader";
import AdminSidebar from "../Admin Dashboard/AdminSidebar";
import AnalyticsQuickInsights from "./AnalyticsQuickInsights";
import AnalyticsMetricCard from "./AnalyticsMetricCard";
import AnalyticsTopMeals, { type AnalyticsTopMeal } from "./AnalyticsTopMeals";

const colors = ["#10B981", "#3B82F6", "#06B6D4", "#F43F5E", "#A855F7", "#F59E0B"];
const formatDate = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

function createCategoryData(meals: AdminMeal[]) {
  const counts = new Map<string, number>();
  meals.forEach((meal) => {
    const category = meal.category.trim().replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Other";
    counts.set(category, (counts.get(category) ?? 0) + 1);
  });
  const total = meals.length || 1;
  return [...counts.entries()].map(([name, count], index) => ({
    name,
    value: Math.round((count / total) * 1000) / 10,
    color: colors[index % colors.length],
  }));
}

function createTopMeals(data: WeeklyAdminData): AnalyticsTopMeal[] {
  const grouped = new Map<string, AnalyticsTopMeal>();
  data.generatedMeals.forEach((activity) => {
    if (!activity.mealTitle) return;
    const meal = grouped.get(activity.mealId) ?? {
      id: activity.mealId,
      name: activity.mealTitle,
      category: "Meal",
      count: 0,
    };
    meal.count += 1;
    grouped.set(activity.mealId, meal);
  });
  return [...grouped.values()].sort((first, second) => second.count - first.count).slice(0, 5);
}

function createUserGrowthData(data: WeeklyAdminData) {
  return data.dailyActiveUsers.map((day) => ({
    name: day.dayOfWeek ?? new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
    value: day.activeUsersCount,
  }));
}

function CylinderBar(props: {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  const { fill = "#8B5CF6", x = 0, y = 0, width = 0, height = 0 } = props;
  const radius = Math.min(width / 2, 18);

  return (
    <g>
      <ellipse cx={x + width / 2} cy={y + height} rx={width / 2} ry={Math.max(radius * 0.5, 6)} fill="rgba(139, 92, 246, 0.18)" />
      <rect x={x} y={y} width={width} height={height} rx={radius} fill={fill} />
      <ellipse cx={x + width / 2} cy={y} rx={width / 2} ry={Math.max(radius * 0.5, 6)} fill="rgba(255,255,255,0.45)" />
      <rect x={x} y={y} width={width} height={height} rx={radius} fill="url(#cylinderGlow)" opacity={0.22} />
    </g>
  );
}

export default function AnalyticsDashboard() {
  const reportDate = formatDate(new Date());
  const [weeklyData, setWeeklyData] = useState<WeeklyAdminData | null>(null);
  const [meals, setMeals] = useState<AdminMeal[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    Promise.all([
      adminService.getWeeklyData(reportDate),
      adminService.getMeals(),
      adminService.getUserSummary(),
    ])
      .then(([weekly, mealList, users]) => {
        if (!isCurrent) return;
        setWeeklyData(weekly);
        setMeals(mealList);
        setTotalUsers(users.totalUsers);
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

  const categories = useMemo(() => createCategoryData(meals), [meals]);
  const topMeals = useMemo(
    () => weeklyData ? createTopMeals(weeklyData) : [],
    [weeklyData],
  );
  const userGrowthData = useMemo(
    () => weeklyData ? createUserGrowthData(weeklyData) : [],
    [weeklyData],
  );
  const mealPlanTrendData = useMemo(() => weeklyData
    ? weeklyData.generatedMeals.reduce<Array<{ name: string; value: number }>>((series, meal) => {
      if (!meal.generatedAt) return series;
      const date = meal.generatedAt.slice(0, 10);
      const label = new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const existing = series.find((item) => item.name === label);
      if (existing) existing.value += 1;
      else series.push({ name: label, value: 1 });
      return series;
    }, [])
    : [], [weeklyData]);

  const audienceLeader = categories.reduce(
    (leader, item) => item.value > leader.value ? item : leader,
    { name: "No categories", value: 0, color: "#A855F7" },
  );
  const mealPlanPeak = mealPlanTrendData.reduce(
    (peak, item) => item.value > peak.value ? item : peak,
    { name: "No activity", value: 0 },
  );
  const userGrowthPeak = userGrowthData.reduce(
    (peak, item) => item.value > peak.value ? item : peak,
    { name: "No activity", value: 0 },
  );
  const averagePrice = meals.length
    ? Math.round(meals.reduce((sum, meal) => sum + toAmount(meal.estimatedPrice), 0) / meals.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-slate-800">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader title="Analytics" subtitle="Track platform performance, user activity and meal trends with real-time insights." />

        <main className="p-6 md:p-8">
          {error && <p role="alert" className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          {isLoading
            ? <p className="rounded-xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">Loading analytics...</p>
            : <>
              <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="rounded-lg bg-emerald-800 px-4 py-1.5 text-xs font-medium text-white">7 Days</span>
                <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                  <Calendar size={14} className="text-slate-400" />
                  <span>Week through {reportDate}</span>
                </div>
              </div>

              <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <AnalyticsMetricCard
                  title="Meals generated"
                  value={(weeklyData?.totalGeneratedMeals ?? 0).toLocaleString()}
                  change="7 days"
                  description="Current period"
                  icon={<UtensilsCrossed size={18} />}
                  accentClassName="bg-emerald-50 text-emerald-600"
                />
                <AnalyticsMetricCard
                  title="Average meal price"
                  value={`₦${averagePrice.toLocaleString()}`}
                  change="Current"
                  description="Across listed meals"
                  icon={<DollarSign size={18} />}
                  accentClassName="bg-green-50 text-green-600"
                />
                <AnalyticsMetricCard
                  title="Total users"
                  value={totalUsers.toLocaleString()}
                  change="Current"
                  description="Registered accounts"
                  icon={<Users size={18} />}
                  accentClassName="bg-purple-50 text-purple-600"
                />
                <AnalyticsMetricCard
                  title="Active users"
                  value={(weeklyData?.totalActiveUsers ?? 0).toLocaleString()}
                  change="7 days"
                  description="Active during this period"
                  icon={<UserCheck size={18} />}
                  accentClassName="bg-sky-50 text-sky-600"
                />
              </div>

              <div className="mb-8 grid gap-6 xl:grid-cols-[1.5fr_1.1fr_1.1fr]">
                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">Meal generation trend</h3>
                    <span className="text-xs font-medium text-slate-500">Weekly</span>
                  </div>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mealPlanTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="mealFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#10B981" stopOpacity={0.03} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #E2E8F0" }} />
                        <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fill="url(#mealFill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <section className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-white to-white p-5 shadow-[0_8px_22px_rgba(16,185,129,0.08)]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">Meal category mix</h3>
                    <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">Live</span>
                  </div>
                  <div className="h-72 w-full">
                    {categories.length
                      ? <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={categories} dataKey="value" outerRadius={92} paddingAngle={5} stroke="#ffffff" strokeWidth={4}>
                            {categories.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                            <Label position="center" value={meals.length} />
                          </Pie>
                          <Tooltip formatter={(value) => [`${Number(value ?? 0)}%`, "Share"]} contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #E2E8F0" }} />
                        </PieChart>
                      </ResponsiveContainer>
                      : <p className="flex h-full items-center justify-center text-sm text-slate-500">No meal categories available.</p>}
                  </div>
                  <div className="mt-2 space-y-2.5">
                    {categories.map((item) => (
                      <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white/80 px-2.5 py-2 text-sm text-slate-600 shadow-sm">
                        <div className="flex items-center gap-2.5">
                          <span className="h-3 w-3 rounded-full ring-2 ring-white" style={{ backgroundColor: item.color }} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">Daily active users</h3>
                    <div className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-1 text-[10px] font-semibold text-violet-700">
                      <TrendingUp size={10} /> 7 days
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="cylinderGlow" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.7} />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #E2E8F0" }} />
                        <Bar dataKey="value" fill="#8B5CF6" shape={<CylinderBar />} radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              </div>

              <div className="mt-2 grid items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
                <AnalyticsTopMeals meals={topMeals} />
                <AnalyticsQuickInsights
                  audienceLeader={audienceLeader}
                  mealPlanPeak={mealPlanPeak}
                  userGrowthPeak={userGrowthPeak}
                />
              </div>
            </>}
        </main>
      </div>
    </div>
  );
}
