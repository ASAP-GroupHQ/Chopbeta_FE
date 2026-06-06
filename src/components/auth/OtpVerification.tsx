"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiMail, FiArrowLeft, FiKey } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";
import LoadingState from "@/components/ui/LoadingState";
import { authService } from "@/services/auth";

interface OtpVerificationProps {
  email: string;
  initialOtp?: string;
  onBackToSignup: () => void;
  onVerifySuccess: (response: any) => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  email,
  initialOtp = "",
  onBackToSignup,
  onVerifySuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [fetchedOtp, setFetchedOtp] = useState<string>("");
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (initialOtp) {
      setFetchedOtp(initialOtp);
    }
  }, [initialOtp]);

  // 1-minute countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle Resend OTP Request
  const handleResend = async () => {
    if (timeLeft !== 0) return;

    setIsVerifying(true);
    try {
      const response = await authService.resendOtp({ email });

      // Update with the newly generated token code directly from response.data
      if (response?.data) {
        setFetchedOtp(String(response.data));
      } else if (response?.data) {
        // Fallback case just in case the interceptor strips the wrapper
        setFetchedOtp(String(response.data));
      }

      toast.success("A new verification code has been sent!");
      setTimeLeft(59);
      setOtp(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (error: any) {
      toast.error(error.message || "Failed to resend code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChange = async (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance focus to the next input field
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    const finalCode = newOtp.join("");

    if (finalCode.length === 6 && index === 5) {
      setIsVerifying(true);

      try {
        const response = await authService.verifyOtp({
          email,
          otp: finalCode,
        });

        toast.success("Email verified successfully!");

        onVerifySuccess(response);
      } catch (error: any) {
        toast.error(
          error.message ||
            "Invalid verification code. Please check and try again.",
        );
        setOtp(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      } finally {
        setIsVerifying(false);
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

  if (isVerifying) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center min-h-screen w-full">
        <LoadingState message="Creating account..." />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white relative px-4 sm:px-6 lg:px-8 font-sans flex flex-col items-center justify-center">
      {/* Real-time Dynamic Display of Intercepted Backend OTP Code */}
      {fetchedOtp && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-sm mx-auto px-4 z-20">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-900 shadow-sm">
            <div className="p-2 bg-green-600 text-white rounded-xl">
              <FiKey className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] uppercase tracking-wider text-green-700 font-bold">
                Staging Auto-Fetch Code
              </span>
              <span className="text-xl font-black tracking-[4px] text-green-900">
                {fetchedOtp}
              </span>
            </div>
          </div>
        </div>
      )}

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

      <button
        onClick={onBackToSignup}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-green-800 border border-gray-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-white"
      >
        <FiArrowLeft /> Go Back
      </button>

      {/* OTP Container box */}
      <div className="w-full max-w-md text-center space-y-6 pt-16">
        <div className="inline-flex p-3 bg-gray-50 rounded-full border border-gray-100 shadow-sm mx-auto">
          <FiMail className="w-6 h-6 text-gray-400" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#1A2E35] tracking-tight sm:text-3xl">
            Verification Code Sent!
          </h1>
          <p className="text-gray-500 text-sm mt-1.5 max-w-xs mx-auto leading-relaxed">
            We just sent an OTP code to{" "}
            <span className="font-semibold text-gray-800 break-all">
              {email}
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 sm:gap-4 my-8">
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
              className={`w-11 h-12 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-2xl border outline-none transition-all duration-200 ${
                digit
                  ? "bg-[#D1E7DD] border-green-700 text-green-900 shadow-sm"
                  : "bg-white border-gray-200 text-[#1A2E35] focus:border-green-700 focus:ring-2 focus:ring-green-500/10"
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
              onClick={handleResend}
              className="text-orange-500 hover:text-orange-600 font-bold underline transition-colors cursor-pointer bg-transparent border-none outline-none"
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
