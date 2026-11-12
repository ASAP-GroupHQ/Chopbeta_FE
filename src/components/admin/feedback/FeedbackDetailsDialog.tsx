"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Star, X } from "lucide-react";
import type { AdminFeedback } from "@/constants/admin-feedback";

interface FeedbackDetailsDialogProps {
  feedback: AdminFeedback | null;
  mode: "view" | "delete" | null;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export default function FeedbackDetailsDialog({
  feedback,
  mode,
  onClose,
  onConfirmDelete,
}: FeedbackDetailsDialogProps) {
  useEffect(() => {
    if (!feedback) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [feedback, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {feedback && mode && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#151522]/55 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role={mode === "delete" ? "alertdialog" : "dialog"}
            aria-modal="true"
            aria-labelledby="feedback-dialog-title"
            className="w-full max-w-lg rounded-2xl border border-[#e9e5ed] bg-white p-5 shadow-[0_24px_70px_rgba(20,20,35,0.22)] sm:p-6"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="feedback-dialog-title"
                  className="text-lg font-bold text-[#202035]"
                >
                  {mode === "delete" ? "Delete feedback?" : "Feedback details"}
                </h2>
                <p className="mt-1 text-xs text-[#858598]">
                  {feedback.name} · {feedback.date}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="rounded-lg p-2 text-[#77778a] transition hover:bg-[#f4f3f6] hover:text-[#343448]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {mode === "view" ? (
              <>
                <div className="mt-5 grid gap-3 rounded-xl bg-[#f8faf8] p-4 text-sm sm:grid-cols-2">
                  <DialogDetail label="Email" value={feedback.email} />
                  <DialogDetail label="Feedback type" value={feedback.type} />
                  <DialogDetail label="Status" value={feedback.status} />
                  <div>
                    <p className="text-xs text-[#858598]">Rating</p>
                    <Rating rating={feedback.rating} />
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-[#eeeaf0] p-4">
                  <p className="text-xs font-semibold text-[#858598]">Message</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#454558]">
                    {feedback.message}
                  </p>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg bg-[#216a40] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#195633]"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#fff7f5] p-4 text-sm text-[#765b57]">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#c96b5e]" />
                  <p>
                    This will remove the feedback from the current sample list.
                    This action cannot be undone.
                  </p>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-[#e5e2e8] px-4 py-2.5 text-sm font-semibold text-[#55556a] transition hover:bg-[#faf9fb]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onConfirmDelete}
                    className="rounded-lg bg-[#bd5147] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a6433a]"
                  >
                    Delete feedback
                  </button>
                </div>
              </>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function DialogDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-[#858598]">{label}</p>
      <p className="mt-1 break-words font-medium text-[#38384b]">{value}</p>
    </div>
  );
}

function Rating({ rating }: { rating: number }) {
  return (
    <div
      className="mt-1 flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <span key={index} className="relative inline-flex">
            <Star className="h-4 w-4 text-[#d3d4d8]" />
            {fill > 0 && (
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-4 w-4 fill-[#d9a51f] text-[#d9a51f]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
