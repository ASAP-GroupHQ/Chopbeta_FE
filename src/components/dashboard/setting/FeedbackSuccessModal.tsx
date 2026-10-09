"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

interface FeedbackSuccessModalProps {
  isOpen: boolean;
  fullName: string;
  onClose: () => void;
}

export default function FeedbackSuccessModal({
  isOpen,
  fullName,
  onClose,
}: FeedbackSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
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
            aria-labelledby="feedback-success-title"
            className="relative my-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-emerald-950/20"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-[#1E6B3C] to-emerald-600 px-6 pb-8 pt-9 text-center text-white sm:px-9">
              <div className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full border-[24px] border-white/10" />
              <div className="pointer-events-none absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-orange-300/15 blur-2xl" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close feedback confirmation"
                autoFocus
                className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FiX aria-hidden="true" size={18} />
              </button>
              <motion.div
                initial={{ scale: 0.5, rotate: -18 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.08 }}
                className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-lg shadow-emerald-950/20"
              >
                <FiCheck aria-hidden="true" size={30} strokeWidth={3} />
              </motion.div>
              <p className="relative mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-100">
                Message sent
              </p>
              <h2
                id="feedback-success-title"
                className="relative mt-2 text-xl font-semibold tracking-normal sm:text-2xl"
              >
                Thanks{fullName ? `, ${fullName.split(" ")[0]}` : ""}
              </h2>
              <p className="relative mx-auto mt-2 max-w-xs text-sm leading-relaxed text-emerald-50">
                We appreciate you taking the time to share this with us.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1E6B3C] px-5 text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition hover:bg-[#185A31] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                Done
              </button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
