"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiBell,
  FiHelpCircle,
  FiCheckSquare,
  FiInfo,
  FiTrendingDown,
  FiLogOut,
} from "react-icons/fi";
import {
  MOCK_NOTIFICATIONS,
  NotificationItem,
} from "@/constants/notifications";
import { PROFILE_MENU_ITEMS } from "@/constants/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HeaderActions() {
  const { user, logout } = useAuth(); // Wired up logout function 🚀

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      setIsProfileOpen(false);
    }
  };

  const getIcon = (type: "budget" | "meal" | "system") => {
    switch (type) {
      case "meal":
        return (
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-700 text-sm">
            🍲
          </div>
        );
      case "budget":
        return (
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
            <FiTrendingDown size={14} />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <FiInfo size={14} />
          </div>
        );
    }
  };

  return (
    <div className="hidden lg:flex items-center gap-3 relative z-40">
      {/* Help & Support Button */}
      <button
        type="button"
        className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.02)] text-[#1A2E35] hover:bg-gray-50 transition-all cursor-pointer active:scale-95"
      >
        <FiHelpCircle size={20} className="stroke-[2.2]" />
      </button>

      {/* Notifications Wrapper */}
      <div className="relative" ref={notifRef}>
        <button
          type="button"
          onClick={() => {
            setIsNotifOpen(!isNotifOpen);
            setIsProfileOpen(false);
          }}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all cursor-pointer relative active:scale-95 ${
            isNotifOpen
              ? "bg-[#1A2E35] text-white border-[#1A2E35]"
              : "bg-white text-[#1A2E35] border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:bg-gray-50"
          }`}
        >
          <FiBell size={19} className="stroke-[2.2]" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#E85D26] border-2 border-white rounded-full animate-pulse" />
          )}
        </button>

        <AnimatePresence>
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2.5 w-[360px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] overflow-hidden z-50 flex flex-col max-h-[480px]"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-[#1A2E35]">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-[#E85D26] text-white font-black px-2 py-0.5 rounded-full">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="flex items-center gap-1 text-xs text-green-700 font-bold hover:text-green-800 transition-colors cursor-pointer"
                  >
                    <FiCheckSquare size={13} /> Mark all read
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-gray-50/60 max-h-[400px]">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <p className="text-gray-400 text-xs font-semibold">
                      All caught up! ✨
                    </p>
                    <p className="text-gray-400 text-[11px] mt-0.5">
                      No new alerts available.
                    </p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => handleToggleReadStatus(notif.id)}
                      className={`w-full flex gap-3 p-4 text-left transition-colors relative border-0 outline-none select-none text-[#1A2E35] ${
                        notif.isUnread
                          ? "bg-green-50/10 hover:bg-green-50/20"
                          : "bg-white hover:bg-gray-50/60"
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
                            className={`text-xs truncate ${notif.isUnread ? "font-extrabold text-[#1A2E35]" : "font-bold text-gray-600"}`}
                          >
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-gray-400 font-semibold flex-shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium mt-1 leading-relaxed">
                          {notif.description}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive User Profile Menu Panel */}
      <div className="relative" ref={profileRef}>
        <button
          type="button"
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsNotifOpen(false);
          }}
          className={`h-10 flex items-center gap-2 border rounded-xl pl-1.5 pr-3 transition-all cursor-pointer select-none active:scale-[0.98] ${
            isProfileOpen
              ? "bg-[#1A2E35] text-white border-[#1A2E35]"
              : "bg-white text-[#1A2E35] border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:bg-gray-50"
          }`}
        >
          <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-gray-100">
            <Image
              src="/images/team/emmanuel_ozo.JPG"
              alt={
                user?.fullName ? `${user.fullName}'s profile` : "User profile"
              }
              fill
              sizes="28px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-sm font-bold ml-0.5">
            {user?.fullName ? user.fullName.split(" ")[0] : "User"}
          </span>
          <FiChevronDown
            className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] flex-shrink-0 ${
              isProfileOpen ? "rotate-180 text-white" : "text-gray-400"
            }`}
          />
        </button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-2.5 w-64 bg-white border border-gray-100 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] overflow-hidden p-1.5 text-[#1A2E35]"
            >
              <div className="px-3 py-2.5 mb-1 border-b border-gray-50 bg-gray-50/40 rounded-xl">
                <p className="text-xs font-semibold text-gray-400">
                  Signed in as
                </p>
                <p className="text-sm font-bold text-[#1A2E35] truncate mt-0.5">
                  {user?.fullName ? user.fullName : "User account"}
                </p>
              </div>

              <div className="space-y-0.5">
                {PROFILE_MENU_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50/30 text-[#1A2E35] hover:text-green-800 transition-colors group text-left block"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-green-50 group-hover:text-green-700 transition-colors flex items-center justify-center flex-shrink-0">
                        <IconComponent size={15} className="stroke-[2.2]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold leading-none">
                          {item.label}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium truncate mt-1">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Connected Sign Out Action Area */}
              <div className="border-t border-gray-50 mt-1.5 pt-1.5">
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50/50 transition-colors font-bold text-xs text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                    <FiLogOut size={14} className="stroke-[2.2]" />
                  </div>
                  {isLoggingOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
