"use client";

import React from "react";

interface HistoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function HistoryTabs({
  activeTab,
  setActiveTab,
}: HistoryTabsProps) {
  const tabs = ["All Plans", "Completed", "Partial", "Saved"];

  return (
    <div className="flex border-b border-gray-200 gap-6 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 text-sm font-semibold whitespace-nowrap transition-all relative ${
            activeTab === tab
              ? "text-[#0F623D]"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0F623D] rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
