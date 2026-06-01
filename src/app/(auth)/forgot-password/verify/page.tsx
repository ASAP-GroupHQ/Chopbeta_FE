"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import LoadingState from "@/components/ui/LoadingState";

function OtpVerificationFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft === 0) {
      setTimeLeft(59);
      setOtp(["", "", "", "", "", ""]);
      toast.success("A new code has been sent to your email!");
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    const finalCode = newOtp.join("");
    // Trigger automatically when the 6th box gets its value
    if (finalCode.length === 5 && value) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        toast.success("Awesome! Your code matches perfectly.");
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);
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

      <button
        onClick={() => router.push("/forgot-password")}
        disabled={isVerifying}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-green-800 border border-gray-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-white disabled:opacity-50"
      >
        <FiArrowLeft /> Go Back
      </button>

      <div className="w-full max-w-md text-center space-y-6">
        {isVerifying ? (
          <LoadingState message="Checking your code... hold on a second." />
        ) : (
          <>
            <div className="inline-flex p-3 bg-gray-50 rounded-full border border-gray-100 shadow-sm mx-auto">
              <FiMail className="w-6 h-6 text-gray-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#1A2E35] tracking-tight sm:text-3xl">
                Check Your Email
              </h1>
              <p className="text-gray-500 text-sm mt-1.5 max-w-[340px] mx-auto">
                We just sent an OTP code to{" "}
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
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-11 h-11 sm:w-14 sm:h-14 text-center text-xl font-bold rounded-xl border outline-none transition-all duration-200 ${
                    digit
                      ? "bg-[#D1E7DD] border-green-700 text-green-900 shadow-sm"
                      : "bg-gray-50 border-gray-200 text-[#1A2E35] focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/5"
                  }`}
                />
              ))}
            </div>

            <div className="text-sm font-medium">
              {timeLeft > 0 ? (
                <p className="text-green-800">
                  Resend code in <span className="font-bold">{timeLeft}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-orange-500 hover:text-orange-600 font-bold underline transition-colors cursor-pointer bg-transparent border-none"
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
          <LoadingState message="Setting things up..." />
        </div>
      }
    >
      <OtpVerificationFormContent />
    </Suspense>
  );
}
