"use client";

import React, { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import AuthInput from "@/components/auth/AuthInput";
import SuccessfulScreen from "@/components/auth/SuccessfulScreen";
import LoadingState from "@/components/ui/LoadingState";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Friendly validation checks
    if (!identifier.trim() || !password.trim()) {
      toast.error(
        "Please fill all fields.",
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <SuccessfulScreen
        message="Welcome Back! 👋"
        subMessage="Logging you back into your ChopBeta account..."
        redirectTo="/dashboard"
        delaySeconds={2.5}
      />
    );
  }

  return (
    <main className="min-h-screen bg-white relative px-4 sm:px-6 lg:px-8 font-sans">
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

      {/* Main Form Content */}
      <div className="flex flex-col items-center justify-center h-full pt-20 sm:pt-24 lg:pt-32">
        <section className="flex flex-col items-center w-full max-w-md space-y-8">
          {isLoading ? (
            <LoadingState message="Signing you in... hang tight!" />
          ) : (
            <>
              {/* User Icon Container */}
              <div className="inline-flex p-3 bg-gray-50 rounded-full mb-4 border border-gray-100 shadow-sm">
                <FiUser className="w-6 h-6 text-gray-400" />
              </div>

              {/* Heading Description */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#1A2E35] tracking-tight sm:text-3xl">
                  Welcome Back 👋
                </h1>
                <p className="text-gray-500 text-sm mt-1.5">
                  Enter your details to access your ChopBeta
                </p>
              </div>

              {/* Form Fields */}
              <form className="space-y-5 w-full" onSubmit={handleLoginSubmit}>
                <AuthInput
                  label="Email Address or Phone number"
                  type="text"
                  placeholder="Enter email address or Phone number"
                  Icon={FiMail}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={isLoading}
                />

                <AuthInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  Icon={FiLock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />

                {/* Remember Me and Forgot Password Layout */}
                <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      disabled={isLoading}
                      className="w-4 h-4 rounded border-gray-300 accent-green-800 cursor-pointer focus:ring-green-600"
                    />
                    <label
                      htmlFor="remember"
                      className="text-gray-500 font-medium cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-orange-500 font-semibold hover:underline transition-all"
                  >
                    Forgot Password
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-xl transition-all duration-300 shadow-md active:scale-[0.99] mt-2 text-center cursor-pointer disabled:opacity-50"
                >
                  Login
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="text-green-800 font-bold hover:underline transition-all"
                >
                  Sign Up
                </Link>
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
