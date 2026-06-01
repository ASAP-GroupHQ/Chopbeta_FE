"use client";

import React, { useState } from "react";
import { FiMail, FiArrowLeft, FiCompass } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import AuthInput from "@/components/auth/AuthInput";
import LoadingState from "@/components/ui/LoadingState";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error(
        "Please enter your email address so we can find your account.",
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("We've sent a reset code to your email inbox!");
      router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
    }, 2000); 
  };

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

      <div className="flex flex-col items-center justify-center w-full pt-16">
        <section className="flex flex-col items-center w-full max-w-md space-y-6">
          {isLoading ? (
            <LoadingState message="Looking up your account details..." />
          ) : (
            <>
              <div className="inline-flex p-3 bg-gray-50 rounded-full mb-2 border border-gray-100 shadow-sm">
                <FiCompass className="w-6 h-6 text-gray-400" />
              </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-[#1A2E35] tracking-tight sm:text-3xl">
                  Forgot Password?
                </h1>
                <p className="text-gray-500 text-sm mt-1.5 max-w-[320px] mx-auto">
                  No worries! Just enter your email below and we&apos;ll
                  help you get right back in.
                </p>
              </div>

              <form className="space-y-5 w-full" onSubmit={handleForgotSubmit}>
                <AuthInput
                  label="Email Address"
                  type="email"
                  placeholder="e.g. name@example.com"
                  Icon={FiMail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />

                <button
                  type="submit"
                  className="w-full py-3.5 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-xl transition-all duration-300 shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Send Verification Code
                </button>
              </form>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-800 font-medium transition-colors pt-4"
              >
                <FiArrowLeft /> Back to Login
              </Link>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
