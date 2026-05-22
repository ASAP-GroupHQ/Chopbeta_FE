"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import LayoutWrapper from "@/components/dashboard/LayoutWrapper";
import HeroBanner from "@/components/dashboard/HeroBanner";
import QuickActions from "@/components/dashboard/QuickActions";
import QuickMeals from "@/components/dashboard/QuickMeals";

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Hello");
  const [currentDay, setCurrentDay] = useState("Monday");

  useEffect(() => {
    // 1. Calculate Greeting State
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good Morning");
    else if (currentHour < 16) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayIndex = new Date().getDay();
    setCurrentDay(days[todayIndex]);
  }, []);

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* UPPER HEADER STRIP */}
        <div className="flex items-center justify-between w-full">
          <div className="space-y-0.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A2E35] flex items-center gap-2">
              {greeting}, Victor 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Let us find your next meal!!!
            </p>
          </div>

          {/* Desktop Right Side Header Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.02)] text-[#1A1A2E] hover:bg-gray-50 transition-all">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.838 17.638C13.0793 17.396 13.2 17.1 13.2 16.75C13.2 16.4 13.0793 16.104 12.838 15.862C12.5967 15.62 12.3007 15.4993 11.95 15.5C11.5993 15.5007 11.3037 15.6217 11.063 15.863C10.8223 16.1043 10.7013 16.4 10.7 16.75C10.6987 17.1 10.8197 17.396 11.063 17.638C11.3063 17.88 11.602 18.0007 11.95 18C12.298 17.9993 12.594 17.8783 12.838 17.637M11.05 14.15H12.9C12.9 13.6 12.9627 13.1667 13.088 12.85C13.2133 12.5333 13.5673 12.1 14.15 11.55C14.5833 11.1167 14.925 10.704 15.175 10.312C15.425 9.92 15.55 9.44934 15.55 8.9C15.55 7.96667 15.2083 7.25001 14.525 6.75001C13.8417 6.25001 13.0333 6.00001 12.1 6.00001C11.15 6.00001 10.3793 6.25001 9.788 6.75001C9.19667 7.25001 8.784 7.85001 8.55 8.55001L10.2 9.20001C10.2833 8.9 10.471 8.57501 10.763 8.22501C11.055 7.87501 11.5007 7.70001 12.1 7.70001C12.6333 7.70001 13.0333 7.846 13.3 8.138C13.5667 8.43 13.7 8.75067 13.7 9.10001C13.7 9.43334 13.6 9.74601 13.4 10.038C13.2 10.33 12.95 10.6007 12.65 10.85C11.9167 11.5 11.4667 11.9917 11.3 12.325C11.1333 12.6583 11.05 13.2667 11.05 14.15ZM12 22C10.6167 22 9.31667 21.7377 8.1 21.213C6.88334 20.6883 5.825 19.9757 4.925 19.075C4.025 18.1743 3.31267 17.116 2.788 15.9C2.26333 14.684 2.00067 13.384 2 12C1.99933 10.616 2.262 9.31601 2.788 8.10001C3.314 6.88401 4.02633 5.82567 4.925 4.92501C5.82367 4.02434 6.882 3.31201 8.1 2.78801C9.318 2.26401 10.618 2.00134 12 2.00001C13.382 1.99867 14.682 2.26134 15.9 2.78801C17.118 3.31467 18.1763 4.02701 19.075 4.92501C19.9737 5.82301 20.6863 6.88134 21.213 8.10001C21.7397 9.31867 22.002 10.6187 22 12C21.998 13.3813 21.7353 14.6813 21.212 15.9C20.6887 17.1187 19.9763 18.177 19.075 19.075C18.1737 19.973 17.1153 20.6857 15.9 21.213C14.6847 21.7403 13.3847 22.0027 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.32501C16.125 4.77501 14.2333 4.00001 12 4.00001C9.76667 4.00001 7.875 4.77501 6.325 6.32501C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.02)] text-[#1A1A2E] hover:bg-gray-50 transition-all">
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <g clipPath="url(#clip0_470_967)">
                  <path
                    d="M3.33333 12.0002H12.6667V7.35443C12.6667 4.76554 10.5773 2.66683 8 2.66683C5.42267 2.66683 3.33333 4.76554 3.33333 7.35443V12.0002ZM8 1.3335C11.3137 1.3335 14 4.02915 14 7.35443V13.3335H2V7.35443C2 4.02915 4.68629 1.3335 8 1.3335ZM6.33333 14.0002H9.66667C9.66667 14.9206 8.92047 15.6668 8 15.6668C7.07953 15.6668 6.33333 14.9206 6.33333 14.0002Z"
                    fill="currentColor"
                  />
                  <rect
                    x="9.89258"
                    y="1.62988"
                    width="5"
                    height="5"
                    rx="2.5"
                    fill="#E85D26"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_470_967">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button className="h-10 flex items-center gap-2 bg-white border border-gray-100 rounded-xl pl-1.5 pr-3 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:bg-gray-50 transition-all">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-gray-100">
                <Image
                  src="/images/team/emmanuel_ozo.JPG"
                  alt="Avatar Profile"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-bold text-[#1A2E35] ml-0.5">
                Victor
              </span>
              <FiChevronDown className="w-4 h-4 text-gray-500 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Hero Banner Feature */}
        <HeroBanner />

        {/* TWO-COLUMN GRID SYSTEM DESIGN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT SIDE CANVAS (8 Columns on Large Viewports) */}
          <div className="lg:col-span-8 space-y-5">
            <QuickActions />
            <QuickMeals />
          </div>

          {/* RIGHT SIDE CANVAS (4 Columns on Large Viewports) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Today's Progress Card Panel Component Frame */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#1A2E35]">
                  Today&apos;s Progress
                </h3>
                <span className="text-[11px] font-bold text-gray-400">
                  {currentDay}
                </span>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="space-y-2">
                  <div className="w-9 h-9 mx-auto rounded-full bg-green-50 flex items-center justify-center text-[#1E6B3C]">
                    <svg
                      width="46"
                      height="46"
                      viewBox="0 0 46 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="46"
                        height="46"
                        rx="23"
                        fill="#A8D5B5"
                        fillOpacity="0.39"
                      />
                      <path
                        d="M17.9254 31.9269C16.805 31.9265 15.7194 31.538 14.8532 30.8273C13.4037 29.6376 12.2364 28.141 11.4355 26.4454C10.6345 24.7499 10.2199 22.8977 10.2216 21.0225H35.6174C35.619 22.9054 35.2009 24.765 34.3935 26.466C33.5862 28.1671 32.4098 29.6668 30.95 30.8561C30.0806 31.5639 28.9928 31.9488 27.8717 31.9454L17.9254 31.9269Z"
                        stroke="#2E8B57"
                        strokeWidth="0.686374"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.9251 31.927V32.9908C17.9251 33.3924 18.2505 33.717 18.6513 33.717H27.2948C27.6964 33.717 28.021 33.3924 28.021 32.9908V31.9455M29.6175 17.8845C31.8318 17.8845 33.6273 16.7416 33.6273 15.3311C33.6273 13.9206 31.8324 12.7778 29.6175 12.7778C27.5605 12.7778 25.8665 13.3715 25.6352 14.642L13.1947 14.2872C12.9686 14.2961 12.7547 14.3922 12.5979 14.5554C12.4411 14.7185 12.3535 14.936 12.3535 15.1623C12.3535 15.3886 12.4411 15.6061 12.5979 15.7692C12.7547 15.9323 12.9686 16.0285 13.1947 16.0374L25.6386 16.0258C25.872 17.2935 27.5625 17.8845 29.6175 17.8845Z"
                        stroke="#2E8B57"
                        strokeWidth="0.686374"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Meal Eaten
                  </p>
                  <p className="text-xs font-black text-[#1A2E35]">1/3</p>
                </div>

                <div className="space-y-2">
                  <div className="w-9 h-9 mx-auto rounded-full bg-green-50 flex items-center justify-center text-[#1E6B3C]">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.75 16V19.75C19.75 20.0815 19.6183 20.3995 19.3839 20.6339C19.1495 20.8683 18.8315 21 18.5 21H3.5C2.83696 21 2.20107 20.7366 1.73223 20.2678C1.26339 19.7989 1 19.163 1 18.5V3.5C1 2.83696 1.26339 2.20107 1.73223 1.73223C2.20107 1.26339 2.83696 1 3.5 1H16C16.3315 1 16.6495 1.1317 16.8839 1.36612C17.1183 1.60054 17.25 1.91848 17.25 2.25V6M1 3.5C1 4.16304 1.26339 4.79893 1.73223 5.26777C2.20107 5.73661 2.83696 6 3.5 6H18.5C18.8315 6 19.1495 6.1317 19.3839 6.36612C19.6183 6.60054 19.75 6.91848 19.75 7.25V11"
                        stroke="#1E6B3C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 11V16H16C15.337 16 14.7011 15.7366 14.2322 15.2678C13.7634 14.7989 13.5 14.163 13.5 13.5C13.5 12.837 13.7634 12.2011 14.2322 11.7322C14.7011 11.2634 15.337 11 16 11H21Z"
                        stroke="#1E6B3C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Today&apos;s Budget
                  </p>
                  <p className="text-xs font-black text-[#1A2E35]">₦ 2000</p>
                </div>

                <div className="space-y-2">
                  <div className="w-9 h-9 mx-auto rounded-full bg-orange-50 flex items-center justify-center text-[#E85D26]">
                    🔥
                  </div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Streak
                  </p>
                  <p className="text-xs font-black text-[#1A2E35]">6 Days</p>
                </div>
              </div>

              {/* Budget Progress Bar */}
              <div className="space-y-2 pt-1 border-t border-gray-50">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-gray-400">Budget Used</span>
                  <span className="font-black text-[#1A2E35]">
                    ₦1000
                    <span className="text-gray-300 font-medium">/₦ 2000</span>
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E6B3C] h-full w-1/2 rounded-full" />
                </div>
              </div>
            </div>

            {/* Extra Ad Banner - coming soon */}
            <div className="border border-orange-500/20 rounded-2xl bg-gradient-to-br from-orange-50/20 to-transparent p-5 text-center relative overflow-hidden min-h-[140px] flex flex-col justify-center items-center">
              <div className="absolute top-2 left-4 scale-75 filter saturate-50 opacity-10">
                {/* 👥 */}
              </div>
              <p className="text-xs font-bold text-[#1A2E35] max-w-[180px] leading-relaxed">
                Comming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
