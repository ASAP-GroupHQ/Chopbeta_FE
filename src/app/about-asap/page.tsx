// ==========================================
// 1. TYPES DEFINITION (types.ts)
// ==========================================
export interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendText: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

export interface ActivityItem {
  id: string;
  userName: string;
  avatar: string;
  action: string;
  time: string;
  statusColor: string;
}

export interface PopularMeal {
  id: string;
  name: string;
  category: string;
  count: string;
  trend: string;
  percentage: number;
  image: string;
}

// ==========================================
// 2. MOCK DATA INITIALIZATION (mockData.ts)
// ==========================================
export const mockMetrics: MetricCardProps[] = [
  { title: 'Total Users', value: '48,325', trend: '↑ 20%', trendText: 'vs last week', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', icon: '👤' },
  { title: 'Daily Active Users', value: '12,325', trend: '↑ 8%', trendText: 'vs last week', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', icon: '👥' },
  { title: 'Completed Meals', value: '23,325', trend: '↑ 20%', trendText: 'vs last week', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', icon: '🍲' },
  { title: 'Meals Plans Generated', value: '23,325', trend: '↑ 20%', trendText: 'vs last week', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', icon: '📋' },
  { title: 'Users Retention Rate', value: '96.7%', trend: '↑ 20%', trendText: 'vs last week', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', icon: '📈' },
  { title: 'Meals in Database', value: '96.7%', trend: '↑ 20%', trendText: 'vs last week', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', icon: '🗄️' },
  { title: 'Completed Meals', value: '23,325', trend: '↑ 20%', trendText: 'vs last week', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', icon: '🍲' },
];

export const mockActivities: ActivityItem[] = [
  { id: '1', userName: 'Esther', avatar: 'https://unsplash.com', action: 'updated the price of Jollof Rice', time: '2 minutes ago', statusColor: 'bg-emerald-600' },
  { id: '2', userName: 'Marvelous Admin', avatar: 'https://unsplash.com', action: 'added a new meal Pancake', time: '15 minutes ago', statusColor: 'bg-orange-500' },
  { id: '3', userName: 'Emmanuel O.', avatar: 'https://unsplash.com', action: 'exported user activity report', time: '35 minutes ago', statusColor: 'bg-purple-600' },
  { id: '4', userName: 'Oluwaseyi', avatar: 'https://unsplash.com', action: 'exported user activity report', time: '1 hour ago', statusColor: 'bg-emerald-600' },
];

export const mockPopularMeals: PopularMeal[] = [
  { id: '1', name: 'Bread & Egg', category: 'African Dish', count: '2,432', trend: '↑ 8%', percentage: 85, image: 'https://unsplash.com' },
  { id: '2', name: 'Pap & Akara', category: 'African Dish', count: '2,432', trend: '↑ 8%', percentage: 70, image: 'https://unsplash.com' },
  { id: '3', name: 'Noodles & Egg', category: 'African Dish', count: '2,432', trend: '↑ 8%', percentage: 60, image: 'https://unsplash.com' },
  { id: '4', name: 'Rice & Beans', category: 'African Dish', count: '2,432', trend: '↑ 8%', percentage: 90, image: 'https://unsplash.com' },
];

// ==========================================
// 3. COMPLETE DASHBOARD PAGE LAYER
// ==========================================
import React from 'react';
import { 
  LayoutDashboard, 
  Utensils, 
  DollarSign, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Search,
  ChevronDown,
  PlusCircle,
  RefreshCw,
  Eye,
  TrendingUp
} from 'lucide-react';

export default function ChopBetaDashboard() {
  return (
    <div className="flex bg-[#F8FAFC] min-h-screen text-slate-800 antialiased font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-slate-100 bg-white h-screen fixed left-0 top-0 flex flex-col p-5 z-20">
        <div className="flex items-center gap-2 px-2 py-3 mb-8">
          <div className="w-7 h-7 rounded bg-[#105D38] flex items-center justify-center text-white font-black text-sm">C</div>
          <span className="font-bold text-lg text-[#105D38] tracking-tight">ChopBeta</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-[#105D38] text-white transition-colors relative">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
            <span className="absolute right-3 w-1 h-4 bg-orange-500 rounded-full" />
          </a>
          
          {[
            { label: 'Meal Management', icon: Utensils },
            { label: 'Price Management', icon: DollarSign },
            { label: 'User Management', icon: Users },
            { label: 'Analytics & Reports', icon: BarChart3 },
            { label: 'Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA CONTAINER */}
      <div className="flex-1 pl-64">
        
        {/* APP GLOBAL TOP BAR */}
        <header className="flex items-center justify-between py-4 px-8 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Welcome Back Admin!👋</h1>
            <p className="text-xs text-slate-400 mt-0.5">Here is what's happening with ChopBeta.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50">
              <HelpCircle className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50">
              <Search className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
              <img
                src="https://unsplash.com"
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-100"
              />
              <button className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900">
                Victor
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </header>

        {/* DASHBOARD VIEW METRIC CONTENT CANVAS */}
        <main className="p-8 space-y-6 max-w-[1400px] mx-auto">
          
          {/* HORIZONTAL HORIZON HORIZON METRICS LIST SLIDER */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
            {mockMetrics.map((item, index) => (
              <div key={index} className="min-w-[175px] flex-1 bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{item.title}</p>
                    <p className="text-lg font-bold text-slate-900 tracking-tight">{item.value}</p>
                  </div>
                  <div className={`w-7 h-7 rounded-lg ${item.iconBg} flex items-center justify-center text-xs`}>
                    {item.icon}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-1.5 border-t border-slate-50 text-[9px]">
                  <span className="font-bold text-emerald-600">{item.trend}</span>
                  <span className="text-slate-400 font-medium">{item.trendText}</span>
                  <span className="text-emerald-500 text-[10px] font-bold">📈</span>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS & RECENT ACTIVITIES TWO-COLUMN MIDDLE SPLIT COMPONENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CANVAS: QUICK ACTION BUTTON WIDGETS */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <h3 className="text-xs font-bold text-slate-900 mb-3 tracking-wide uppercase">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {[
                  { label: 'Add new meals', sub: 'Add a new meal to the database', icon: <PlusCircle className="w-4 h-4 text-indigo-600" />, iconBg: 'bg-indigo-50' },
                  { label: 'Update Meal Prices', sub: 'Update prices of existing meals', icon: <DollarSign className="w-4 h-4 text-emerald-600" />, iconBg: 'bg-emerald-50' },
                  { label: 'View Users', sub: 'View and manage user accounts', icon: <Users className="w-4 h-4 text-blue-600" />, iconBg: 'bg-blue-50' },
                  { label: 'View Analytics', sub: 'See detailed platform analytics', icon: <TrendingUp className="w-4 h-4 text-rose-600" />, iconBg: 'bg-rose-50' },
                ].map((act, i) => (
                  <button key={i} className="flex items-center gap-2 rounded-lg border border-slate-100 p-3 text-left transition-colors hover:border-slate-200 hover:bg-slate-50">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${act.iconBg}`}>
                      {act.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[11px] font-semibold text-slate-700">{act.label}</span>
                      <span className="mt-0.5 block text-[9px] text-slate-400">{act.sub}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CANVAS: RECENT ACTIVITY WIDGET */}
            <div className="col-span-1 lg:col-span-2 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Recent Activities</h3>
                  <p className="mt-1 text-[10px] text-slate-400">Latest changes across your platform</p>
                </div>
                <button className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 hover:text-emerald-800">
                  <RefreshCw className="h-3 w-3" /> Refresh
                </button>
              </div>
              <div className="space-y-3">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${activity.statusColor}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-slate-700"><span className="font-semibold">{activity.userName}</span> {activity.action}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{activity.time}</p>
                    </div>
                    <button aria-label={`View activity by ${activity.userName}`} className="rounded p-1 text-slate-300 hover:bg-slate-50 hover:text-slate-500">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* POPULAR MEALS TABLE */}
          <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">Popular Meals</h3>
                <p className="mt-1 text-[10px] text-slate-400">Most selected meals this month</p>
              </div>
              <button className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-800">View all</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {mockPopularMeals.map((meal) => (
                <div key={meal.id} className="rounded-lg border border-slate-100 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{meal.name}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{meal.category}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600">{meal.trend}</span>
                  </div>
                  <div className="mb-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{meal.count} selections</span>
                    <span>{meal.percentage}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: `${meal.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
