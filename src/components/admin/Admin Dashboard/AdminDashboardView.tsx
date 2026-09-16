"use client";

import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AdminHeader from "./AdminHeader";
import AdminMetricCard from "./AdminMetricCard";
import AdminSidebar from "./AdminSidebar";
import MostPopularMeals from "./MostPopularMealsCard";
import { mockActivities, mockUsers } from "./data";

const mealsPlanData = [
  { day: "Mon", meals: 180 },
  { day: "Tue", meals: 310 },
  { day: "Wed", meals: 240 },
  { day: "Thu", meals: 80 },
  { day: "Fri", meals: 220 },
  { day: "Sat", meals: 220 },
  { day: "Sun", meals: 190 },
];

const quickActions = [
  { label: "Add new meals", desc: "Add a new meal to the database", icon: "➕", color: "bg-indigo-50 border-indigo-100" },
  { label: "Update Meal Prices", desc: "Update prices of existing foods", icon: "💵", color: "bg-teal-50 border-teal-100" },
  { label: "View Users", desc: "View and manage user accounts", icon: "👤", color: "bg-blue-50 border-blue-100" },
  { label: "View Analytics", desc: "See detailed platform analytics", icon: "📊", color: "bg-green-50 border-green-100" },
];

function QuickActions() {
  return (
    <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-sm font-bold text-gray-900">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((act, i) => (
          <button
            key={i}
            className={`flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all hover:shadow-md ${act.color}`}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm">
              {act.icon}
            </div>
            <h4 className="mb-1 text-xs font-bold text-gray-900">{act.label}</h4>
            <p className="max-w-[120px] text-[10px] leading-tight text-gray-400">{act.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboardView() {
  return (
    <div className="min-h-screen bg-slate-50/50 pl-64">
      <AdminSidebar />
      <AdminHeader title="Admin Dashboard" subtitle="Monitor ChopBeta activity, users and meal performance." />
      <main className="p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><AdminMetricCard title="Total users" value={mockUsers.length} subtext="Registered accounts" trend="up 12%" trendType="up" icon={<Users className="h-5 w-5" />} bgIconColor="bg-emerald-600" /><AdminMetricCard title="Meals selected" value="2,432" subtext="Across all users" trend="up 8%" trendType="up" icon={<BarChart3 className="h-5 w-5" />} bgIconColor="bg-blue-600" /><AdminMetricCard title="Daily revenue" value="N84,200" subtext="Compared with yesterday" trend="up 6%" trendType="up" icon={<DollarSign className="h-5 w-5" />} bgIconColor="bg-orange-500" /><AdminMetricCard title="Meal growth" value="18.4%" subtext="This month" trend="up 4%" trendType="up" icon={<TrendingUp className="h-5 w-5" />} bgIconColor="bg-violet-600" /></div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <QuickActions />
          </div>
          <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900">Recent activity</h2>
            <div className="mt-4 space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${activity.color}`} />
                  <div>
                    <p className="text-sm text-gray-700"><span className="font-semibold">{activity.user}</span> {activity.action}</p>
                    <p className="mt-1 text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Meals Plan Generated</h2>
              <span className="rounded border border-gray-100 bg-gray-50 px-2 py-1 text-xs text-gray-400">This Week</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mealsPlanData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <YAxis domain={[0, 400]} ticks={[0, 100, 200, 300, 400]} axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #E5E7EB" }} />
                  <Line type="monotone" dataKey="meals" stroke="#6366F1" strokeWidth={2} activeDot={{ r: 6 }} dot={{ stroke: "#6366F1", strokeWidth: 2, fill: "#ffffff", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <MostPopularMeals />
        </div>
      </main>
    </div>
  );
}
