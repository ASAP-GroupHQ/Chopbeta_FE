"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

interface OtpVerificationProps {
  onBackToSignup: () => void;
  onVerifySuccess: (otpCode: string) => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  onBackToSignup,
  onVerifySuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // 1-minute countdown mechanism
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
      // For demo purposes, we clear the previous input boxes
      setOtp(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // Only allow numerical digits

    const newOtp = [...otp];
    // Take only the last character if pasted or double-typed
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance focus to the next input field
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Trigger success callback automatically once all 6 slots are fully loaded
    const finalCode = newOtp.join("");
    if (finalCode.length === 6 && index === 5) {
      onVerifySuccess(finalCode);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Return to the previous input field on Backspace press if empty
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
      {/* Top Left Branding Logo */}
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

      {/* Top Right Functional Navigation Go-Back Link trigger */}
      <button
        onClick={onBackToSignup}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-green-800 border border-gray-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
      >
        <FiArrowLeft /> Go Back
      </button>

      {/* OTP Display Card Content Area */}
      <div className="w-full max-w-md text-center space-y-6">
        {/* Verification Sent Envelope Graphic Badge */}
        <div className="inline-flex p-3 bg-gray-50 rounded-full border border-gray-100 shadow-sm mx-auto">
          <FiMail className="w-6 h-6 text-gray-400" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#1A2E35] tracking-tight sm:text-3xl">
            Verification Code Sent!
          </h1>
          <p className="text-gray-500 text-sm mt-1.5">
            We just sent an OTP code to your email address
          </p>
        </div>

        {/* 6 Digit Unified Input Group container row */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 my-8">
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
              className={`w-10 h-10 sm:w-16 sm:h-16 text-center text-xl font-bold rounded-2xl border outline-none transition-all duration-200 ${
                digit
                  ? "bg-[#D1E7DD] border-green-700 text-green-900 shadow-sm"
                  : "bg-white border-gray-200 text-[#1A2E35] focus:border-green-700 focus:ring-2 focus:ring-green-500/10" 
              }`}
            />
          ))}
        </div>

        {/* Countdown & Re-trigger Text Trigger footer block */}
        <div className="text-sm font-medium">
          {timeLeft > 0 ? (
            <p className="text-green-800">
              Resend code in <span className="font-bold">{timeLeft}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-orange-500 hover:text-orange-600 font-bold underline transition-colors cursor-pointer"
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default OtpVerification;
