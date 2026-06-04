"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import AuthInput from "@/components/auth/AuthInput";
import SuccessfulScreen from "@/components/auth/SuccessfulScreen";
import LoadingState from "@/components/ui/LoadingState";
import { authService } from "@/services/auth";

function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setEmail(searchParams.get("email") || "");
    setOtp(searchParams.get("otp") || "");
  }, [searchParams]);

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Your password should be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("The passwords don't match. Please check them.");
      return;
    }
    if (!otp) {
      toast.error(
        "Reset token verification context is missing. Try starting over.",
      );
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword({
        email,
        otp,
        newPassword: password,
      });

      toast.success("Your password has been changed successfully.");
      setShowSuccess(true);
    } catch (error: any) {
      toast.error(
        error.message || "Failed to alter authorization credentials.",
      );
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <SuccessfulScreen
        message="All Set! 🎉"
        subMessage="Your password has been changed. Now, login..."
        redirectTo="/login"
        delaySeconds={3}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full pt-16">
      <section className="flex flex-col items-center w-full max-w-md space-y-6">
        {isLoading ? (
          <LoadingState message="Saving your new password secure and safe..." />
        ) : (
          <>
            <div className="inline-flex p-3 bg-gray-50 rounded-full mb-2 border border-gray-100 shadow-sm">
              <FiLock className="w-6 h-6 text-gray-400" />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#1A2E35] tracking-tight sm:text-3xl">
                Choose a New Password
              </h1>
              {email && (
                <p className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md mt-2 inline-block">
                  Resetting password for: {email}
                </p>
              )}
            </div>

            <form className="space-y-5 w-full" onSubmit={handleResetSubmit}>
              <AuthInput
                label="New Password"
                type="password"
                placeholder="At least 6 characters"
                Icon={FiLock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />

              <AuthInput
                label="Confirm New Password"
                type="password"
                placeholder="Type password again to confirm"
                Icon={FiCheckCircle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-xl transition-all duration-300 shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:bg-green-800/60"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-white relative px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-center">
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Image
            src="/chopbeta.png"
            alt="ChopBeta Logo"
            width={140}
            height={45}
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex items-center justify-center">
            <LoadingState message="Loading..." />
          </div>
        }
      >
        <ResetPasswordFormContent />
      </Suspense>
    </main>
  );
}
