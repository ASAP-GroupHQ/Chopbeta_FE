"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/constants/dashboard-nav";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0 px-4 py-6">
      {/* Brand Header Logo */}
      <div className="relative w-32 h-10 mb-8 ml-4">
        <Image
          src="/chopbeta.png"
          alt="ChopBeta Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Interactive Menu List */}
      <nav className="flex-1 space-y-1.5">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all group ${
                isActive
                  ? "bg-[#1E6B3C] text-white shadow-sm shadow-green-900/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#1A2E35]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-[#1A2E35]"
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {/* Desktop Active Accent Line Indicator Bar */}
              {isActive && (
                <span className="w-1 h-5 bg-[#E85D26] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
