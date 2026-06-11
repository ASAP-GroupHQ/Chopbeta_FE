import React from "react";

export default function ExploreHeader() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Explore Meals <span className="text-emerald-600 text-lg">⚙️</span></h1>
          <p className="text-xs text-gray-400 mt-0.5">Discover affordable meals near your campus</p>
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          <span className="w-5 h-5" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
            </svg>
          </span>
          <span className="w-5 h-5" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </span>
          <div className="flex items-center gap-2 cursor-pointer border border-gray-200 rounded-full py-1 pl-1 pr-3 bg-white">
            <div className="w-7 h-7 bg-gray-300 rounded-full overflow-hidden">
              <img src="/avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Victor</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">🔍</span>
        <input type="text" placeholder="Search meals, canteens, ingredients..." className="w-full bg-white pl-12 pr-4 py-3.5 rounded-xl border border-transparent shadow-sm text-sm focus:outline-none focus:border-emerald-600 transition-all placeholder-gray-400" />
      </div>
    </div>
  );
}
