"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiDroplet, FiX } from "react-icons/fi";
import type { HydrationFeedback } from "@/lib/hydration";

interface HydrationFeedbackModalProps {
  feedback: HydrationFeedback | null;
  onClose: () => void;
}

const toneStyles = {
  encouraging: {
    icon: "bg-amber-100 text-amber-700",
    accent: "text-amber-700",
    label: "A gentle reminder",
  },
  "on-track": {
    icon: "bg-emerald-100 text-emerald-700",
    accent: "text-emerald-700",
    label: "Hydration check-in",
  },
  "over-target": {
    icon: "bg-sky-100 text-sky-700",
    accent: "text-sky-700",
    label: "You’ve had plenty",
  },
};

export default function HydrationFeedbackModal({
  feedback,
  onClose,
}: HydrationFeedbackModalProps) {
  useEffect(() => {
    if (!feedback) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [feedback, onClose]);

  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="hydration-feedback-title"
            className="relative my-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-emerald-950/20"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close hydration feedback"
              autoFocus
              className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-2 text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <FiX aria-hidden="true" size={18} />
            </button>

            <div className="px-6 pb-6 pt-9 text-center sm:px-9">
              <motion.div
                initial={{ scale: 0.5, rotate: -18 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 16,
                  delay: 0.08,
                }}
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${toneStyles[feedback.tone].icon}`}
              >
                {feedback.tone === "on-track" ? (
                  <FiCheck aria-hidden="true" size={30} strokeWidth={3} />
                ) : (
                  <FiDroplet aria-hidden="true" size={30} />
                )}
              </motion.div>
              <p
                className={`mt-5 text-[10px] font-black uppercase tracking-[0.22em] ${toneStyles[feedback.tone].accent}`}
              >
                {toneStyles[feedback.tone].label}
              </p>
              <h2
                id="hydration-feedback-title"
                className="mt-2 text-xl font-semibold tracking-normal text-slate-900 sm:text-2xl"
              >
                {feedback.title}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                {feedback.message}
              </p>
              <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left">
                <p className="text-xs font-semibold text-slate-700">
                  Your check-in
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  About {feedback.glassesEquivalent} glass
                  {feedback.glassesEquivalent === 1 ? "" : "es"} equivalent;
                  roughly {feedback.expectedByNow} expected by now, out of a
                  daily guide of {feedback.dailyTarget}.
                </p>
              </div>
              <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
                Your entry is just for this check-in. For this
                estimate, a 500 ml bottle or sachet counts as about 2 glasses.
              </p>
            </div>

            <div className="px-6 pb-6 sm:px-8">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1E6B3C] px-5 text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition hover:bg-[#185A31] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 cursor-pointer"
              >
                Got it
              </button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
