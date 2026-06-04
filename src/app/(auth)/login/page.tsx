"use client";

import React, { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import AuthInput from "@/components/auth/AuthInput";
import SuccessfulScreen from "@/components/auth/SuccessfulScreen";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await login({ email: identifier, password });
      setShowSuccess(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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

      <div className="flex flex-col items-center justify-center h-full pt-20 sm:pt-24 lg:pt-32">
        <section className="flex flex-col items-center w-full max-w-md space-y-8">
          {isLoading ? (
            <LoadingState message="Signing you in... hang tight!" />
          ) : (
            <>
              <div className="inline-flex rounded-full mb-4">
                <svg
                  width="62"
                  height="62"
                  viewBox="0 0 62 62"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.5713 0.357422C47.2581 0.357422 60.7861 13.8845 60.7861 30.5713C60.7861 47.2582 47.2582 60.7861 30.5713 60.7861C13.8845 60.7861 0.357422 47.2581 0.357422 30.5713C0.357497 13.8845 13.8845 0.357497 30.5713 0.357422Z"
                    fill="url(#paint0_linear_240_1715)"
                  />
                  <path
                    d="M30.5713 0.357422C47.2581 0.357422 60.7861 13.8845 60.7861 30.5713C60.7861 47.2582 47.2582 60.7861 30.5713 60.7861C13.8845 60.7861 0.357422 47.2581 0.357422 30.5713C0.357497 13.8845 13.8845 0.357497 30.5713 0.357422Z"
                    stroke="url(#paint1_linear_240_1715)"
                    strokeWidth="0.714286"
                  />
                  <g filter="url(#filter0_d_240_1715)">
                    <rect
                      x="12"
                      y="12"
                      width="37.1429"
                      height="37.1429"
                      rx="18.5714"
                      fill="white"
                    />
                    <rect
                      x="12.3571"
                      y="12.3571"
                      width="36.4286"
                      height="36.4286"
                      rx="18.2143"
                      stroke="#E2E4E9"
                      strokeWidth="0.714286"
                    />
                    <path
                      d="M24.8571 37.7143C24.8571 34.5584 27.4155 32 30.5714 32C33.7274 32 36.2857 34.5584 36.2857 37.7143H34.8571C34.8571 35.3474 32.9384 33.4286 30.5714 33.4286C28.2045 33.4286 26.2857 35.3474 26.2857 37.7143H24.8571ZM30.5714 31.2857C28.2036 31.2857 26.2857 29.3679 26.2857 27C26.2857 24.6321 28.2036 22.7143 30.5714 22.7143C32.9393 22.7143 34.8571 24.6321 34.8571 27C34.8571 29.3679 32.9393 31.2857 30.5714 31.2857ZM30.5714 29.8571C32.15 29.8571 33.4286 28.5786 33.4286 27C33.4286 25.4214 32.15 24.1429 30.5714 24.1429C28.9929 24.1429 27.7143 25.4214 27.7143 27C27.7143 28.5786 28.9929 29.8571 30.5714 29.8571Z"
                      fill="#292D50"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_240_1715"
                      x="9.14286"
                      y="10.5714"
                      width="42.8571"
                      height="42.8571"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1.42857" />
                      <feGaussianBlur stdDeviation="1.42857" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.04 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_240_1715"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_240_1715"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_240_1715"
                      x1="30.5714"
                      y1="-77.4193"
                      x2="30.5714"
                      y2="61.1712"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#1A7E41" />
                      <stop
                        offset="0.482824"
                        stopColor="#1E6B3C"
                        stopOpacity="0.5"
                      />
                      <stop offset="1" stopColor="#E4E5E7" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_240_1715"
                      x1="30.5714"
                      y1="-16.7859"
                      x2="30.5714"
                      y2="61.1712"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#1E6B3C" />
                      <stop offset="1" stopColor="#E4E5E7" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[#1A2E35] tracking-tight sm:text-3xl">
                  Welcome Back 👋
                </h1>
                <p className="text-gray-500 text-sm mt-1.5">
                  Enter your details to access your ChopBeta
                </p>
              </div>

              <form className="space-y-5 w-full" onSubmit={handleLoginSubmit}>
                <AuthInput
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  Icon={FiMail}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={isLoading}
                  required
                />

                <AuthInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  Icon={FiLock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />

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
