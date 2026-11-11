"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import MobileTopHeader from "@/components/dashboard/MobileTopHeader";
import AdminMobileBottomNav from "@/components/admin/AdminMobileBottomNav";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export default function AdminLayoutWrapper({
  children,
}: AdminLayoutWrapperProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-[#1A2E35]">
      {/* Desktop Column Panel View */}
      <AdminSidebar />

      {/* Content Stream Column Workspace Node */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        {/* Mobile View Top Header strip */}
        <MobileTopHeader />

        {/* Global Content Viewport Port Window Canvas Area */}
        <main className="flex-1 overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-28 lg:p-8 lg:pb-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile App View Footer Dock Bar */}
        <AdminMobileBottomNav />
      </div>
    </div>
  );
}