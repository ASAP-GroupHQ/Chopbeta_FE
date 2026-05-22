"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_BOTTOM_ITEMS } from "@/constants/dashboard-nav";

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100/80 px-4 py-2 flex items-center justify-between z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] h-16 max-w-full">
      {MOBILE_BOTTOM_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        // Primary Highlight Trigger Rule Layout Configuration
        if (item.isPrimaryAction) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative -top-4 flex flex-col items-center justify-center bg-green-700 hover:bg-green-800 text-white w-14 h-14 rounded-full shadow-lg border-4 border-white transition-all active:scale-95"
            >
              <item.icon className="w-6 h-6 stroke-[2.5]" />
            </Link>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center flex-1 py-1"
          >
            <div
              className={`p-2 rounded-xl transition-colors ${isActive ? "text-green-800 bg-green-50/50" : "text-gray-400"}`}
            >
              <item.icon className="w-5 h-5 stroke-[2]" />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
