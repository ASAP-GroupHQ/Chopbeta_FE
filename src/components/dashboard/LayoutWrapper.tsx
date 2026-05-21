"use client";

import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import MobileTopHeader from "./MobileTopHeader";
import MobileBottomNav from "./MobileBottomNav";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-[#1A2E35]">
      {/* Desktop Column Panel View */}
      <DashboardSidebar />

      {/* Content Stream Column Workspace Node */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        {/* Mobile View Top Header strip */}
        <MobileTopHeader />

        {/* Global Content Viewport Port Window Canvas Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Mobile App View Footer Dock Bar */}
        <MobileBottomNav />
      </div>
    </div>
  );
}
