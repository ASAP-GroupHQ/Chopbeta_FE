"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroBanner from "@/components/dashboard/HeroBanner";
import QuickActions from "@/components/dashboard/QuickActions";
import QuickMeals from "@/components/dashboard/QuickMeals";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { useAuth } from "@/context/AuthContext";
import { trackService } from "@/services/track";
import { StreakData } from "@/types/track";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Hello");
  const [currentDay, setCurrentDay] = useState("Monday");

  // Streak system state integration
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [streakLoading, setStreakLoading] = useState<boolean>(true);

  useEffect(() => {
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

    // Fetch live streak data from track service
    const fetchStreakData = async () => {
      try {
        setStreakLoading(true);
        const response = await trackService.getStreak();
        if (response.success && response.data) {
          setStreak(response.data);
        }
      } catch (error) {
        console.error("Failed to retrieve dashboard streak:", error);
      } finally {
        setStreakLoading(false);
      }
    };

    fetchStreakData();
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* UPPER HEADER STRIP */}
      <div className="flex items-center justify-between w-full">
        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A2E35] flex items-center gap-2">
            {greeting}, {user?.fullName ? user.fullName.split(" ")[0] : "User"}{" "}
            👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Let&apos;s us find your next meal!!!
          </p>
        </div>
        <HeaderActions />
      </div>

      {/* Hero Banner */}
      <div>
        <HeroBanner />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-5">
          <div>
            <QuickActions />
          </div>
          <div>
            <QuickMeals />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-4 space-y-5">
          {/* Today's Progress Card */}
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

              {/* STREAK SECTION WITH PULSING SKELETON LOADER */}
              <div className="space-y-2">
                {streakLoading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-full bg-gray-200" />
                    <div className="h-2 bg-gray-200 rounded w-12 mx-auto" />
                    <div className="h-3 bg-gray-200 rounded w-14 mx-auto" />
                  </div>
                ) : (
                  <>
                    <div className="w-9 h-9 mx-auto rounded-full bg-orange-50 flex items-center justify-center text-[#E85D26]">
                      <div className="relative w-5 h-5">
                        <Image
                          src="/images/meals/fire.png"
                          alt="Streak Fire Icon"
                          fill
                          sizes="20px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] font-medium text-gray-400">
                      Streak
                    </p>
                    <p className="text-xs font-black text-[#1A2E35]">
                      {streak
                        ? `${streak.currentStreak} ${streak.currentStreak === 1 ? "Day" : "Days"}`
                        : "0 Days"}
                    </p>
                  </>
                )}
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
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  className="bg-[#1E6B3C] h-full rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Extra Banner (Premium) */}
          <div className="border border-gray-100 rounded-[24px] bg-white p-6 text-left relative overflow-hidden min-h-[160px] flex flex-col justify-between group shadow-[0_12px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-gray-200/80 transition-all duration-500 ease-out">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#FF7A00]/8 from-10% to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-gradient-to-tr from-[#1E6B3C]/8 from-10% to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between w-full relative z-10">
              <div className="flex items-center bg-gray-50 border border-gray-100/80 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                <span className="text-[10px] uppercase font-black tracking-wider text-[#1E6B3C]">
                  Chop
                </span>
                <span className="text-[10px] uppercase font-black tracking-wider text-[#FF7A00]">
                  Beta
                </span>
                <span className="text-[9px] font-bold text-gray-400 lowercase ml-0.5">
                  pro
                </span>
              </div>

              <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:border-[#1E6B3C]/20 group-hover:bg-white transition-all duration-500 shadow-sm">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#FF7A00"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5 pt-6 pb-4 relative z-10">
              <h4 className="text-sm font-bold text-[#1A2E35] tracking-tight leading-snug group-hover:text-[#1E6B3C] transition-colors duration-300">
                Unlock Advanced Analytics
              </h4>
              <p className="text-[11px] text-gray-500/90 font-medium leading-relaxed max-w-[220px]">
                Automated expense scanning, multi-vendor matching, and smart
                health tracking.
              </p>
            </div>

            <div className="flex items-center justify-between w-full border-t border-gray-100 pt-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E6B3C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1E6B3C]"></span>
                </span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                  Beta Members Only
                </span>
              </div>

              <span className="text-[10px] font-bold text-[#FF7A00] flex items-center gap-0.5 group-hover:gap-1 transition-all duration-300">
                Coming Soon
                <svg
                  className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
