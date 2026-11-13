"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, LogOut, X } from "lucide-react";

interface SessionLimitDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SessionLimitDialog({
  isOpen,
  isSubmitting,
  errorMessage,
  onClose,
  onConfirm,
}: SessionLimitDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111922]/55 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isSubmitting
            ) {
              onClose();
            }
          }}
        >
          <motion.section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="session-limit-title"
            aria-describedby="session-limit-description"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#e4e9e5] bg-white shadow-[0_24px_70px_rgba(17,25,34,0.24)]"
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute right-4 top-4 rounded-lg p-2 text-[#7b887f] transition hover:bg-[#f3f6f3] hover:text-[#344239] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-6 pb-6 pt-8 sm:px-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4e8] text-[#c8782b]">
                <LogOut className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2
                id="session-limit-title"
                className="mt-5 text-xl font-bold tracking-tight text-[#26342b]"
              >
                Too many active sessions
              </h2>
              <p
                id="session-limit-description"
                className="mt-2 text-sm leading-relaxed text-[#657168]"
              >
                Your account is signed in on the maximum number of devices.
                This will end all active sessions. You can then sign in again
                from the login page.
              </p>

              {errorMessage && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-3 text-sm text-rose-700"
                >
                  {errorMessage}
                </p>
              )}

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfe6e1] px-5 text-sm font-semibold text-[#526056] transition hover:bg-[#f5f8f5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Not now
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isSubmitting}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-5 text-sm font-bold text-white transition hover:bg-[#185a31] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Signing out all sessions…
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      Sign out all devices
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
