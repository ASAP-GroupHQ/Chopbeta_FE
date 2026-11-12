"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import type { ManagedPrice } from "./PriceTable";

interface DeleteMealDialogProps {
  meal: ManagedPrice | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteMealDialog({
  meal,
  onClose,
  onConfirm,
}: DeleteMealDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!meal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [meal, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {meal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111122]/75 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-meal-title"
            aria-describedby="delete-meal-description"
            className="w-full max-w-[390px] rounded-lg border border-[#dedee7] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-5"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <AlertTriangle
                  className="h-5 w-5 shrink-0 text-[#f21d43]"
                  aria-hidden="true"
                />
                <h2
                  id="delete-meal-title"
                  className="text-sm font-semibold tracking-[0.08em] text-[#202035] sm:text-base"
                >
                  Delete Meal
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="-mr-1 -mt-1 rounded-md p-1 text-[#77778a] transition hover:bg-[#f3f2f5] hover:text-[#35354a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202035]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p
              id="delete-meal-description"
              className="mt-2 pl-8 text-xs leading-relaxed text-[#737387] sm:text-[13px]"
            >
              Are you sure you want to delete {meal?.name}? This action cannot
              be undone.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={onClose}
                className="min-w-[96px] rounded-md border border-[#dedee7] bg-white px-4 py-2 text-sm font-medium tracking-wide text-[#303044] transition hover:bg-[#f8f7fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5d5d72]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="min-w-[96px] rounded-md bg-[#e7193f] px-4 py-2 text-sm font-semibold tracking-wide text-white transition hover:bg-[#cc1436] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7193f] active:scale-[0.98]"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
