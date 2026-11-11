"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, MessageSquareText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminHeaderActions() {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative z-40 flex shrink-0 items-center gap-2 sm:gap-3">
      <Link
        href="/admin/feedback"
        aria-label="Feedback"
        title="Feedback"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-3 text-sm font-semibold text-[#1A2E35] shadow-[0_2px_6px_rgba(0,0,0,0.02)] transition hover:bg-gray-50 active:scale-95 sm:px-3.5"
      >
        <MessageSquareText className="h-4 w-4" aria-hidden="true" />
        <span>Feedback</span>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-rose-100 bg-white px-3 text-sm font-semibold text-rose-600 shadow-[0_2px_6px_rgba(0,0,0,0.02)] transition hover:bg-rose-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:px-3.5"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </button>
    </div>
  );
}
