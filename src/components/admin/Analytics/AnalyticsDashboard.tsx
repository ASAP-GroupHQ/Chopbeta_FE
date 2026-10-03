"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronRight,
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
import AdminHeader from "@/components/admin/Admin Dashboard/AdminHeader";
import AdminSidebar from "@/components/admin/Admin Dashboard/AdminSidebar";
import AnalyticsQuickInsights from "./AnalyticsQuickInsights";
import AnalyticsMetricCard from "./AnalyticsMetricCard";
import AnalyticsTopMeals from "./AnalyticsTopMeals";

const mealPlanTrendData = [
  { name: "Apr 25", value: 21 },
  { name: "Apr 30", value: 20 },
  { name: "May 5", value: 14 },
  { name: "May 15", value: 12 },
  { name: "May 20", value: 33 },
  { name: "May 24", value: 12 },
];

const categoryData = [
  { name: "Local Dishes", value: 38.5, color: "#10B981" },
  { name: "Breakfast", value: 22.8, color: "#3B82F6" },
  { name: "Quick Meals", value: 12.4, color: "#06B6D4" },
  { name: "Snacks", value: 15.6, color: "#F43F5E" },
  { name: "Others", value: 10.7, color: "#A855F7" },
];

const userGrowthData = [
  { name: "Apr 25", value: 24 },
  { name: "Apr 30", value: 23 },
  { name: "May 5", value: 15 },
  { name: "May 15", value: 13 },
  { name: "May 20", value: 38 },
  { name: "May 24", value: 13 },
];

const rangeTabs = ["Custom", "Today", "7 Days", "30 Days", "90 Days"];

function CylinderBar(props: any) {
  const { fill, x, y, width, height } = props;
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
  const [timeRange, setTimeRange] = useState("30 Days");
  const audienceLeader = categoryData.reduce((leader, item) => item.value > leader.value ? item : leader);
  const mealPlanPeak = mealPlanTrendData.reduce((peak, item) => item.value > peak.value ? item : peak);
  const userGrowthPeak = userGrowthData.reduce((peak, item) => item.value > peak.value ? item : peak);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-slate-800">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader title="Analytics" subtitle="Track platform performance, user activity and meal trends with real-time insights." />

        <main className="p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-1">
              {rangeTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTimeRange(tab)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                    timeRange === tab ? "bg-emerald-800 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab === "Custom" && <Calendar size={12} className="mr-1 inline -mt-0.5" />}
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
              <Calendar size={14} className="text-slate-400" />
              <span>Apr 25, 2025 - May 24, 2025</span>
            </div>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <AnalyticsMetricCard
              title="Total Meal plans"
              value="48,732"
              change="12.5%"
              description="vs last 30 days"
              icon={<UtensilsCrossed size={18} />}
              accentClassName="bg-emerald-50 text-emerald-600"
            />
            <AnalyticsMetricCard
              title="Average Price"
              value="₦800"
              change="12.5%"
              description="vs last 30 days"
              icon={<DollarSign size={18} />}
              accentClassName="bg-green-50 text-green-600"
            />
            <AnalyticsMetricCard
              title="Total User"
              value="48,732"
              change="12.5%"
              description="vs last 30 days"
              icon={<Users size={18} />}
              accentClassName="bg-purple-50 text-purple-600"
            />
            <AnalyticsMetricCard
              title="New Subscribers"
              value="8,324"
              change="8.7%"
              description="in the last month"
              icon={<UserCheck size={18} />}
              accentClassName="bg-sky-50 text-sky-600"
            />
          </div>

          <div className="mb-8 grid gap-6 xl:grid-cols-[1.5fr_1.1fr_1.1fr]">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Meal plan trend</h3>
                <button type="button" className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700">
                  Weekly overview <ChevronRight size={12} />
                </button>
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
                    <Tooltip
                      cursor={{ stroke: "#CBD5E1", strokeDasharray: "4 4" }}
                      contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #E2E8F0" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fill="url(#mealFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-white to-white p-5 shadow-[0_8px_22px_rgba(16,185,129,0.08)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Audience mix</h3>
                <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">Live</span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" outerRadius={92} paddingAngle={5} stroke="#ffffff" strokeWidth={4}>
                      {categoryData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                      <Label
                        position="center"
                        content={(props: any) => {
                          const { cx, cy } = props.viewBox;
                          const total = categoryData.reduce((sum, item) => sum + item.value, 0);

                          return (
                            <g>
                              <circle cx={cx} cy={cy} r={30} fill="#ffffff" />
                              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="#1E293B" fontSize={16} fontWeight={700}>
                                {total}%
                              </text>
                            </g>
                          );
                        }}
                      />
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${Number(value ?? 0)}%`, "Share"]}
                      contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #E2E8F0" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 space-y-2.5">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white/80 px-2.5 py-2 text-sm text-slate-600 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full ring-2 ring-white" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">User growth</h3>
                <div className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-1 text-[10px] font-semibold text-violet-700">
                  <TrendingUp size={10} /> 8.4%
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
            </div>
          </div>

          <div className="mt-2 grid items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
            <AnalyticsTopMeals />
            <AnalyticsQuickInsights
              audienceLeader={audienceLeader}
              mealPlanPeak={mealPlanPeak}
              userGrowthPeak={userGrowthPeak}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
