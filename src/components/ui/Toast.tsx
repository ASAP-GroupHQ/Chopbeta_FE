"use client";

import React from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const variantStyles: Record<
  ToastType,
  { bg: string; iconBg: string; icon: React.ReactNode }
> = {
  success: {
    bg: "bg-[#1E6B3C]",
    iconBg: "bg-[#3E8A5B]",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    bg: "bg-[#D86A5B]",
    iconBg: "bg-[#EE9486]",
    icon: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  info: {
    bg: "bg-[#5A86A8]",
    iconBg: "bg-[#83A9C4]",
    icon: (
      <span className="text-white font-serif font-bold italic text-xs leading-none">
        i
      </span>
    ),
  },
};

export default function Toast({ toast, onClose }: ToastProps) {
  const style = variantStyles[toast.type];

  return (
    <div
      className={`toast-drop relative flex w-full max-w-md items-start justify-between gap-3 overflow-hidden rounded-2xl border border-white/15 p-4 text-white shadow-[0_14px_34px_rgba(26,46,53,0.18)] ${style.bg}`}
    >
      <div className="flex min-w-0 items-start gap-3">
        {/* Type Icon Badge */}
        <div
          className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-white/10 ${style.iconBg}`}
        >
          {style.icon}
        </div>

        {/* Text Content */}
        <div className="min-w-0">
          <h4 className="text-sm font-bold leading-snug tracking-[0.01em]">
            {toast.title}
          </h4>
          {toast.description && (
            <p className="mt-1 text-xs font-normal leading-relaxed text-white/80">
              {toast.description}
            </p>
          )}
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 cursor-pointer rounded-lg p-1.5 text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Close notification"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
