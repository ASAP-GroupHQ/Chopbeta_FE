"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const toast = useToast();
  const hasProcessed = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const verifyGoogleSession = async () => {
      try {
        const user = await refreshSession();
        if (!user) {
          throw new Error(
            "Google sign-in finished, but the server did not confirm your session.",
          );
        }

        toast.success("Welcome to ChopBeta", "Your Google account is connected.");
        router.replace(
          user.role === "admin" ? "/admin" : "/dashboard",
        );
      } catch (callbackError) {
        const message =
          callbackError instanceof Error
            ? callbackError.message
            : "We could not complete Google sign-in. Please try again.";
        setError(message);
        toast.error("Google sign-in could not be completed.");
      }
    };

    void verifyGoogleSession();
  }, [refreshSession, router, toast]);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center font-sans">
        <section className="w-full max-w-md space-y-4">
          <h1 className="text-2xl font-black text-[#1A1A2E]">
            Google sign-in needs another try
          </h1>
          <p className="text-sm leading-relaxed text-gray-500">{error}</p>
          <Link
            href="/login"
            className="inline-flex rounded-xl bg-green-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-900"
          >
            Return to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white font-sans">
      <LoadingState
        message="Opening your ChopBeta dashboard..."
        messageSteps={[{ afterSeconds: 4, message: "Almost ready for you..." }]}
      />
    </main>
  );
}
