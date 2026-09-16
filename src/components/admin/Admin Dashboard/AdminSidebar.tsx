"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BarChart3, DollarSign, LayoutDashboard, Settings, Utensils, Users } from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Meal Management", href: "/meals", icon: Utensils },
  { label: "Price Management", href: "/pricing", icon: DollarSign },
  { label: "User Management", href: "/admin/users", icon: Users, badge: true },
  { label: "Analytics & Reports", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-gray-100 bg-white p-4">
      <div className="mb-4 flex items-center px-3 py-4">
        <Image src="/chopbeta.png" alt="ChopBeta" width={150} height={50} className="h-[50px] w-[150px] object-contain" priority />
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-emerald-800 text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>
              <span className="flex items-center gap-3"><Icon className="h-5 w-5" />{item.label}</span>
              {item.badge && !isActive && <span className="h-6 w-1.5 rounded-full bg-orange-500" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
