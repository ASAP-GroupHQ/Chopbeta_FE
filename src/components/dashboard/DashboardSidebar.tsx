"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/constants/dashboard-nav";
import { LogoutIcon } from "@/components/icons/NavIcons";
import { useAuth } from "@/context/AuthContext"; 

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    console.log("Logging user account out...");
    await logout(); 
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0 px-4 py-6">
      <div className="relative w-32 h-10 mb-8 ml-4">
        <Image
          src="/chopbeta.png"
          alt="ChopBeta Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      <nav className="space-y-1.5">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all group ${
                isActive
                  ? "bg-[#1E6B3C] text-white shadow-sm shadow-green-900/10"
                  : "text-[#525866] hover:bg-gray-50 hover:text-[#1A2E35]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-[#525866] group-hover:text-[#1A2E35]"
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {isActive && (
                <span className="w-1 h-5 bg-[#E85D26] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold text-[#EF4444] hover:bg-red-50/50 transition-all group cursor-pointer w-full text-left"
      >
        <LogoutIcon className="w-5 h-5 text-[#EF4444] group-hover:scale-105 transition-transform" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
