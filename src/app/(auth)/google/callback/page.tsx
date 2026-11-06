"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { authService } from "@/services/auth";

function parseJsonValue(value: string | null) {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeGoogleLogin } = useAuth();
  const toast = useToast();
  const hasProcessed = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const completeSignIn = async () => {
      try {
        const providerError = searchParams.get("error");
        if (providerError) {
          throw new Error(
            searchParams.get("error_description") ||
              "Google sign-in was cancelled or could not be completed.",
          );
        }

        const callbackParams = Object.fromEntries(searchParams.entries());
        const callbackResponse =
          searchParams.has("code") &&
          !searchParams.has("token") &&
          !searchParams.has("accessToken") &&
          !searchParams.has("access_token")
            ? await authService.googleCallback(callbackParams)
            : null;
        const params = callbackResponse ? new URLSearchParams() : searchParams;
        const data = parseJsonValue(params.get("data"));
        const user = parseJsonValue(params.get("user"));
        const payload =
          callbackResponse?.data?.data ||
          callbackResponse?.data ||
          data?.data ||
          data ||
          {};
        const response = {
          ...callbackResponse,
          ...payload,
          token:
            params.get("token") ||
            params.get("accessToken") ||
            params.get("access_token") ||
            callbackResponse?.token ||
            callbackResponse?.accessToken ||
            callbackResponse?.access_token ||
            payload.token ||
            payload.accessToken ||
            payload.access_token,
          refreshToken:
            params.get("refreshToken") ||
            params.get("refresh_token") ||
            callbackResponse?.refreshToken ||
            callbackResponse?.refresh_token ||
            payload.refreshToken ||
            payload.refresh_token,
          user: user || callbackResponse?.user || payload.user,
          fullName: params.get("fullName") || payload.fullName,
          email: params.get("email") || payload.email,
          role: params.get("role") || payload.role,
        };

        const userData = completeGoogleLogin(response);
        toast.success(
          "Welcome to ChopBeta",
          "Your Google account is connected.",
        );
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
    };

    void completeSignIn();
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

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white font-sans">
          <LoadingState message="Connecting your Google account..." />
        </main>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
