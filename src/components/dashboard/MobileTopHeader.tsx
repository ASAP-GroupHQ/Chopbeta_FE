"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckSquare, FiInfo, FiTrendingDown } from "react-icons/fi";
import {
  HistoryIcon,
  SettingsIcon,
  LogoutIcon,
} from "@/components/icons/NavIcons";
import {
  MOCK_NOTIFICATIONS,
  NotificationItem,
} from "@/constants/notifications";
import { useAuth } from "@/context/AuthContext";

export default function MobileTopHeader() {
  const { logout } = useAuth();

  const [activeSheet, setActiveSheet] = useState<
    "notifications" | "profile" | null
  >(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleToggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: !n.isUnread } : n)),
    );
  };

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error("Mobile logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      setActiveSheet(null);
    }
  };

  const getIcon = (type: "budget" | "meal" | "system") => {
    switch (type) {
      case "meal":
        return (
          <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-700 text-base">
            🍲
          </div>
        );
      case "budget":
        return (
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
            <FiTrendingDown size={16} />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <FiInfo size={16} />
          </div>
        );
    }
  };

  return (
    <>
      <header className="lg:hidden w-full bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-40 select-none">
        <div className="relative w-24 h-8">
          <Image
            src="/chopbeta.png"
            alt="ChopBeta Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Help Button */}
          <button
            type="button"
            className="p-1.5 text-gray-500 hover:text-green-800 transition-colors active:scale-90 cursor-pointer"
            aria-label="Help and Support"
          >
            <svg
              width="22"
              height="22"
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

          {/* Notification Bell */}
          <button
            type="button"
            onClick={() => setActiveSheet("notifications")}
            className="p-1.5 text-[#1A2E35] active:scale-90 relative cursor-pointer"
            aria-label="Open Notifications Sheet"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33333 12.0002H12.6667V7.35443C12.6667 4.76554 10.5773 2.66683 8 2.66683C5.42267 2.66683 3.33333 4.76554 3.33333 7.35443V12.0002ZM8 1.3335C11.3137 1.3335 14 4.02915 14 7.35443V13.3335H2V7.35443C2 4.02915 4.68629 1.3335 8 1.3335ZM6.33333 14.0002H9.66667C9.66667 14.9206 8.92047 15.6668 8 15.6668C7.07953 15.6668 6.33333 14.9206 6.33333 14.0002Z"
                fill="currentColor"
              />
            </svg>

            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E85D26] border-2 border-white rounded-full animate-pulse" />
            )}
          </button>

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={() => setActiveSheet("profile")}
            className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm active:scale-90 transition-transform cursor-pointer"
            aria-label="Open User Account Sheet"
          >
            <Image
              src="/images/team/emmanuel_ozo.JPG"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {activeSheet !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSheet(null)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />

            {/* NOTIFICATIONS */}
            {activeSheet === "notifications" && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[28px] max-h-[85vh] z-50 flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.1)] lg:hidden overflow-hidden"
              >
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto my-3 flex-shrink-0" />

                <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-lg text-[#1A2E35]">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-[#E85D26] text-white font-black px-2 py-0.5 rounded-full">
                        {unreadCount} New
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-1 text-xs text-green-700 font-bold active:scale-95 cursor-pointer"
                      >
                        <FiCheckSquare size={14} /> Mark all read
                      </button>
                    )}
                    <button
                      onClick={() => setActiveSheet(null)}
                      className="p-1 rounded-full bg-gray-100 text-gray-500 active:scale-90 cursor-pointer"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-gray-50 pb-24">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
                      <p className="text-gray-400 text-sm font-semibold">
                        All caught up! ✨
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        No alerts or meals updates available.
                      </p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => handleToggleReadStatus(notif.id)}
                        className={`w-full flex gap-3.5 p-5 text-left transition-colors relative border-0 outline-none select-none ${
                          notif.isUnread
                            ? "bg-green-50/10 active:bg-green-50/30"
                            : "bg-white active:bg-gray-50"
                        }`}
                      >
                        {notif.isUnread && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-700" />
                        )}

                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(notif.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <p
                              className={`text-sm truncate ${notif.isUnread ? "font-extrabold text-[#1A2E35]" : "font-bold text-gray-700"}`}
                            >
                              {notif.title}
                            </p>
                            <span className="text-[10px] text-gray-400 font-semibold flex-shrink-0">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                            {notif.description}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* USER PROFILE OPTIONS */}
            {activeSheet === "profile" && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[28px] z-50 flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.1)] lg:hidden overflow-hidden"
              >
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto my-3 flex-shrink-0" />

                <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-50">
                  <div>
                    <h3 className="font-extrabold text-lg text-[#1A2E35]">
                      Account Menu
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                      Manage your profile and logs
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSheet(null)}
                    className="p-1 rounded-full bg-gray-100 text-gray-500 active:scale-90 cursor-pointer"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <div className="p-4 space-y-2 pb-24">
                  <Link
                    href="/dashboard/history"
                    onClick={() => setActiveSheet(null)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50/60 active:bg-green-50/40 text-[#1A2E35] transition-colors text-left block border-0 outline-none decoration-none"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-green-700 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <HistoryIcon className="w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold text-[#1A2E35]">
                        Meal History
                      </p>
                      <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                        View your full chronological meal records
                      </p>
                    </div>
                  </Link>

                  {/* Settings */}
                  <Link
                    href="/dashboard/setting"
                    onClick={() => setActiveSheet(null)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50/60 active:bg-green-50/40 text-[#1A2E35] transition-colors text-left block border-0 outline-none decoration-none"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-gray-500 border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <SettingsIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold text-[#1A2E35]">
                        Settings
                      </p>
                      <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                        Update configuration and layout preferences
                      </p>
                    </div>
                  </Link>

                  <div className="border-t border-gray-100 mt-2 pt-3">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50/40 active:bg-red-50 text-red-500 transition-colors text-left border-0 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <LogoutIcon className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-extrabold">
                          {isLoggingOut ? "Signing out..." : "Sign out"}
                        </p>
                        <p className="text-xs text-red-400 font-medium truncate mt-0.5">
                          Log out securely from ChopBeta
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
