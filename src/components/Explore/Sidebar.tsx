import React from "react";
import { HomeIcon, ExploreIcon, TrackIcon, HistoryIcon, SettingsIcon, PremiumIcon } from "../icons/NavIcons";

const NAV_ITEMS = [
  { label: "Dashboard", icon: HomeIcon },
  { label: "Explore", icon: ExploreIcon },
  { label: "Track", icon: TrackIcon },
  { label: "Generate Meal", icon: PremiumIcon },
  { label: "History", icon: HistoryIcon },
  { label: "Setting", icon: SettingsIcon },
  { label: "Premium", icon: PremiumIcon },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col gap-8">
      <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs">CB</div>
        ChopBeta
      </div>
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-500 hover:bg-gray-50 hover:text-gray-800`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
