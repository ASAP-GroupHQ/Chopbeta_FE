"use client";

import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";
import AdminHeader from "./AdminHeader";
import AdminMetricCard from "./AdminMetricCard";
import AdminSidebar from "./AdminSidebar";
import { mockActivities, mockPopularMeals, mockUsers } from "./data";

export default function AdminDashboardView() {
  return (
    <div className="min-h-screen bg-slate-50/50 pl-64">
      <AdminSidebar />
      <AdminHeader title="Admin Dashboard" subtitle="Monitor ChopBeta activity, users and meal performance." />
      <main className="p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><AdminMetricCard title="Total users" value={mockUsers.length} subtext="Registered accounts" trend="up 12%" trendType="up" icon={<Users className="h-5 w-5" />} bgIconColor="bg-emerald-600" /><AdminMetricCard title="Meals selected" value="2,432" subtext="Across all users" trend="up 8%" trendType="up" icon={<BarChart3 className="h-5 w-5" />} bgIconColor="bg-blue-600" /><AdminMetricCard title="Daily revenue" value="N84,200" subtext="Compared with yesterday" trend="up 6%" trendType="up" icon={<DollarSign className="h-5 w-5" />} bgIconColor="bg-orange-500" /><AdminMetricCard title="Meal growth" value="18.4%" subtext="This month" trend="up 4%" trendType="up" icon={<TrendingUp className="h-5 w-5" />} bgIconColor="bg-violet-600" /></div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><h2 className="font-semibold text-gray-900">Popular meals</h2><p className="mb-4 text-sm text-gray-500">Most selected meals this month</p><div className="space-y-4">{mockPopularMeals.map((meal) => <div key={meal.id}><div className="mb-1 flex justify-between text-sm"><span className="font-medium text-gray-700">{meal.name}</span><span className="text-gray-500">{meal.timesChosen.toLocaleString()}</span></div><div className="h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${meal.percentage}%` }} /></div></div>)}</div></section><section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><h2 className="font-semibold text-gray-900">Recent activity</h2><div className="mt-4 space-y-4">{mockActivities.map((activity) => <div key={activity.id} className="flex gap-3"><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${activity.color}`} /><div><p className="text-sm text-gray-700"><span className="font-semibold">{activity.user}</span> {activity.action}</p><p className="mt-1 text-xs text-gray-400">{activity.time}</p></div></div>)}</div></section></div>
      </main>
    </div>
  );
}
