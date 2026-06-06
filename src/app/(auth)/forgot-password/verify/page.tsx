"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { FiMail, FiArrowLeft, FiKey } from "react-icons/fi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import LoadingState from "@/components/ui/LoadingState";
import { authService } from "@/services/auth";

function OtpVerificationFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const initialOtp = searchParams.get("otp") || null;

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [fetchedOtp, setFetchedOtp] = useState<string | null>(initialOtp);
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (initialOtp) {
      setFetchedOtp(initialOtp);
    }
  }, [initialOtp]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const handleResend = async () => {
    if (timeLeft === 0) {
      try {
        const response = await authService.forgotPassword({ email });
        setFetchedOtp(response.data);
        setTimeLeft(59);
        setOtp(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) inputRefs.current[0].focus();
        toast.success("A new code has been generated!");
      } catch (err: any) {
        toast.error(err.message || "Failed to resend code.");
      }
    }
  };

  const handleChange = async (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next box if filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    const finalCode = newOtp.join("");

    if (finalCode.length === 6) {
      setIsVerifying(true);
      try {
        await authService.verifyOtp({ email, otp: finalCode });

        toast.success("OTP Code Verified!");
        router.push(
          `/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(finalCode)}`,
        );
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Invalid OTP");
        setOtp(["", "", "", "", "", ""]);
        setIsVerifying(false);
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <main className="min-h-screen bg-white relative px-4 sm:px-6 lg:px-8 font-sans flex flex-col items-center justify-center">
      {fetchedOtp && (
        <div className="absolute top-10 sm:top-24 left-1/2 -translate-x-1/2 w-full max-w-sm mx-auto px-4 z-20">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-900 shadow-sm transition-all">
            <div className="p-2 bg-green-600 text-white rounded-xl shadow-inner">
              <FiKey className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-green-700 font-bold leading-none mb-1">
                Staging Auto-Fetch Code
              </span>
              <span className="text-xl font-black tracking-[4px] text-green-900 leading-none">
                {fetchedOtp}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Image
            src="/chopbeta.png"
            alt="Logo"
            width={140}
            height={45}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      <button
        onClick={() => router.push("/forgot-password")}
        disabled={isVerifying}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-green-800 border border-gray-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-white disabled:opacity-50"
      >
        <FiArrowLeft /> Go Back
      </button>

      <div className="w-full max-w-md text-center space-y-6">
        {isVerifying ? (
          <LoadingState message="Verifying code security with server..." />
        ) : (
          <>
            <div className="inline-flex p-3 bg-gray-50 rounded-full border border-gray-100 shadow-sm mx-auto">
              <FiMail className="w-6 h-6 text-gray-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#1A2E35]">
                Check Your Email
              </h1>
              <p className="text-gray-500 text-sm mt-1.5">
                OTP sent to{" "}
                <span className="font-semibold text-gray-700 break-all">
                  {email}
                </span>
              </p>
            </div>

            <div className="flex justify-center items-center gap-2 sm:gap-3 my-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  disabled={isVerifying}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-11 h-11 sm:w-14 sm:h-14 text-center text-xl font-bold rounded-xl border outline-none transition-all duration-200 ${
                    digit
                      ? "bg-[#D1E7DD] border-green-700 text-green-900 shadow-sm"
                      : "bg-gray-50 border-gray-200 text-[#1A2E35] focus:border-green-700 focus:bg-white"
                  }`}
                />
              ))}
            </div>

            <div className="text-sm font-medium">
              {timeLeft > 0 ? (
                <p className="text-green-800">
                  Resend in <b>{timeLeft}s</b>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  type="button"
                  className="text-orange-500 font-bold underline cursor-pointer bg-transparent border-none"
                >
                  Resend code
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function OtpVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <LoadingState message="Loading..." />
        </div>
      }
    >
      <OtpVerificationFormContent />
    </Suspense>
  );
}
