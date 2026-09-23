"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BarChart3, DollarSign, LayoutDashboard, Menu, Settings, Utensils, Users, X } from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Meal Management", href: "/admin/meal-management", icon: Utensils },
  { label: "Price Management", href: "/pricing", icon: DollarSign },
  { label: "User Management", href: "/admin/users", icon: Users, badge: true },
  { label: "Analytics & Reports", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navContent = (
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "bg-emerald-800 text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="flex items-center gap-3"><Icon className="h-5 w-5" />{item.label}</span>
            {item.badge && !isActive && <span className="h-6 w-1.5 rounded-full bg-orange-500" />}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setIsOpen((value) => !value)}
        className="fixed left-4 top-4 z-40 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-gray-100 bg-white p-4 lg:flex">
        <div className="mb-4 flex items-center px-3 py-4">
          <Image src="/chopbeta.png" alt="ChopBeta" width={150} height={50} className="h-[50px] w-[150px] object-contain" priority />
        </div>
        {navContent}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden">
          <aside className="h-screen w-72 max-w-[82vw] translate-x-0 border-r border-gray-100 bg-white p-4 shadow-xl transition-transform duration-300 ease-out animate-in slide-in-from-left-2">
            <div className="mb-4 flex items-center justify-between px-3 py-4">
              <Image src="/chopbeta.png" alt="ChopBeta" width={150} height={50} className="h-[50px] w-[150px] object-contain" priority />
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
