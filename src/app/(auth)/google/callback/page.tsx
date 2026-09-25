"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

function parseJsonValue(value: string | null) {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeGoogleLogin } = useAuth();
  const toast = useToast();
  const hasProcessed = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    try {
      const data = parseJsonValue(searchParams.get("data"));
      const user = parseJsonValue(searchParams.get("user"));
      const payload = data?.data || data || {};
      const response = {
        ...payload,
        token:
          searchParams.get("token") ||
          searchParams.get("accessToken") ||
          payload.token ||
          payload.accessToken,
        refreshToken:
          searchParams.get("refreshToken") || payload.refreshToken,
        user: user || payload.user,
        fullName: searchParams.get("fullName") || payload.fullName,
        email: searchParams.get("email") || payload.email,
        role: searchParams.get("role") || payload.role,
      };

      const userData = completeGoogleLogin(response);
      toast.success("Welcome to ChopBeta", "Your Google account is connected.");
      router.replace(
        userData.role === "admin" ? "/admin/dashboard" : "/dashboard",
      );
    } catch (callbackError: any) {
      setError(
        callbackError?.message ||
          "We could not complete Google sign-in. Please try again.",
      );
      toast.error("Google sign-in could not be completed.");
    }
  }, [completeGoogleLogin, router, searchParams, toast]);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center font-sans">
        <section className="w-full max-w-md space-y-4">
          <h1 className="text-2xl font-black text-[#1A2E35]">
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
