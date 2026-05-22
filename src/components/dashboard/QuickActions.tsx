"use client";

import React from "react";

const ACTIONS = [
  {
    label: "Explore",
    desc: "Discover meals",
    icon: (className: string) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0_470_907)">
          <path
            d="M5.9209 14.5L12.9209 12.5L14.9209 5.5L7.9209 7.5L5.9209 14.5ZM10.4209 11.5C10.0042 11.5 9.65023 11.3543 9.3589 11.063C9.06757 10.7717 8.92157 10.4173 8.9209 10C8.92023 9.58267 9.06623 9.22867 9.3589 8.938C9.65157 8.64733 10.0056 8.50133 10.4209 8.5C10.8362 8.49867 11.1906 8.64467 11.4839 8.938C11.7772 9.23133 11.9229 9.58533 11.9209 10C11.9189 10.4147 11.7732 10.769 11.4839 11.063C11.1946 11.357 10.8402 11.5027 10.4209 11.5ZM10.4209 20C9.03757 20 7.73757 19.7373 6.5209 19.212C5.30423 18.6867 4.2459 17.9743 3.3459 17.075C2.4459 16.1757 1.73357 15.1173 1.2089 13.9C0.684233 12.6827 0.421566 11.3827 0.4209 10C0.420233 8.61733 0.6829 7.31733 1.2089 6.1C1.7349 4.88267 2.44723 3.82433 3.3459 2.925C4.24457 2.02567 5.3029 1.31333 6.5209 0.788C7.7389 0.262667 9.0389 0 10.4209 0C11.8029 0 13.1029 0.262667 14.3209 0.788C15.5389 1.31333 16.5972 2.02567 17.4959 2.925C18.3946 3.82433 19.1072 4.88267 19.6339 6.1C20.1606 7.31733 20.4229 8.61733 20.4209 10C20.4189 11.3827 20.1562 12.6827 19.6329 13.9C19.1096 15.1173 18.3972 16.1757 17.4959 17.075C16.5946 17.9743 15.5362 18.687 14.3209 19.213C13.1056 19.739 11.8056 20.0013 10.4209 20ZM10.4209 18C12.6376 18 14.5252 17.221 16.0839 15.663C17.6426 14.105 18.4216 12.2173 18.4209 10C18.4202 7.78267 17.6412 5.895 16.0839 4.337C14.5266 2.779 12.6389 2 10.4209 2C8.2029 2 6.31523 2.77933 4.7579 4.338C3.20057 5.89667 2.42157 7.784 2.4209 10C2.42023 12.216 3.19957 14.1037 4.7589 15.663C6.31823 17.2223 8.20557 18.0013 10.4209 18Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_470_907">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    label: "Track Meal",
    desc: "Log your meals",
    icon: (className: string) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <path
          d="M3.33325 0.833496V3.3335H0.833252V5.00016H3.33325V7.50016H4.99992V5.00016H7.49992V3.3335H4.99992V0.833496H3.33325ZM2.49992 16.6723V9.16683H4.16659V15.8335H10.8333V11.6668C10.8333 11.2085 11.2083 10.8335 11.6666 10.8335L15.8333 10.8327V4.16683H9.16658V2.50016H16.6721C17.1293 2.50016 17.4999 2.87996 17.4999 3.33555V12.5002L12.4999 17.4968L3.33509 17.5002C2.87384 17.5002 2.49992 17.1294 2.49992 16.6723ZM15.1424 12.4993L12.4999 12.5002V15.141L15.1424 12.4993Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "History",
    desc: "View past plans",
    icon: (className: string) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className={className}
      >
        <path
          d="M10.0001 1.6665C14.6024 1.6665 18.3334 5.39746 18.3334 9.99984C18.3334 14.6022 14.6024 18.3332 10.0001 18.3332C5.39771 18.3332 1.66675 14.6022 1.66675 9.99984H3.33341C3.33341 13.6818 6.31818 16.6665 10.0001 16.6665C13.682 16.6665 16.6667 13.6818 16.6667 9.99984C16.6667 6.31794 13.682 3.33317 10.0001 3.33317C7.7086 3.33317 5.68714 4.48929 4.48717 6.25004L6.66675 6.24984V7.9165H1.66675V2.9165H3.33341L3.33332 4.99915C4.8537 2.97546 7.27402 1.6665 10.0001 1.6665ZM10.8334 5.83317L10.8332 9.654L13.5356 12.3568L12.3571 13.5353L9.16658 10.344L9.16675 5.83317H10.8334Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
      <h3 className="text-sm font-black text-[#1A2E35]">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ACTIONS.map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-3 p-3.5 border border-gray-100 rounded-xl hover:border-green-800/20 hover:bg-gray-50/50 transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-green-800/10 rounded-full text-[#1E6B3C] group-hover:bg-[#1E6B3C] group-hover:text-white transition-all">
              {action.icon("w-5 h-5")}
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A2E35]">{action.label}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                {action.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
