"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MOBILE_BOTTOM_ITEMS } from "@/constants/dashboard-nav";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isItemActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Mobile dashboard navigation"
      className="lg:hidden fixed inset-x-3 bottom-3 z-50 grid h-18 grid-cols-5 items-end rounded-3xl border border-white/80 bg-white/95 px-2 pb-2 shadow-[0_12px_36px_rgba(26,46,53,0.14)] backdrop-blur-xl"
    >
      {MOBILE_BOTTOM_ITEMS.map((item) => {
        const isActive = isItemActive(item.href);

        if (item.isPrimaryAction) {
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="group relative -top-5 flex h-17 flex-col items-center justify-center"
            >
              <motion.span
                whileTap={{ scale: 0.9 }}
                className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-lg transition-colors ${
                  isActive
                    ? "bg-[#185A31] text-white"
                    : "bg-[#1E6B3C] text-white group-hover:bg-[#185A31]"
                }`}
              >
                <item.icon className="h-6 w-6 stroke-[2.5]" />
              </motion.span>
              <span className="absolute -bottom-1 whitespace-nowrap text-[9px] font-extrabold text-[#1E6B3C]">
                {item.label.replace(" Meal", "")}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className="group relative flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-2xl text-[9px] font-bold transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="mobile-nav-active"
                className="absolute inset-x-1 top-1 h-9 rounded-xl bg-[#EAF6EE]"
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-12 items-center justify-center rounded-xl transition-transform group-active:scale-90 ${
                isActive
                  ? "text-[#1E6B3C]"
                  : "text-gray-400 group-hover:text-[#1E6B3C]"
              }`}
            >
              <item.icon className="h-5 w-5 stroke-2" />
            </span>
            <span
              className={`relative z-10 leading-none ${
                isActive ? "text-[#1E6B3C]" : "text-gray-400"
              }`}
            >
              {item.label === "Dashboard" ? "Home" : item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
