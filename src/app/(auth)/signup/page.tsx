"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiLock, FiSmartphone } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import AuthInput from "@/components/auth/AuthInput";
import OtpVerification from "@/components/auth/OtpVerification";
import { SLIDER_DATA } from "@/constants/auth-slider";

export default function SignUpPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOtpStage, setIsOtpStage] = useState(false);

  useEffect(() => {
    if (isOtpStage) return; // Freeze slide intervals when the OTP form screen overrides the viewport
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_DATA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOtpStage]);

  // Handle Form Submission Redirect Simulation
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOtpStage(true); // Jump directly into the local OTP prompt block
  };

  const handleOtpCompletion = (code: string) => {
    alert(`Account verified with code: ${code}`);

    // Verify OTP here
  };

  // If user hits submit, cleanly render the full screen responsive OTP overlay
  if (isOtpStage) {
    return (
      <OtpVerification
        onBackToSignup={() => setIsOtpStage(false)}
        onVerifySuccess={handleOtpCompletion}
      />
    );
  }

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      {/* Left Side: Form Container */}
      <section className="flex flex-col px-6 py-8 md:px-12 lg:px-20 justify-center h-full max-w-2xl mx-auto w-full">
        {/* Branding - visible on all screens */}
        <div className="flex items-center gap-2 mb-10 self-start">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Image
              src="/chopbeta.png"
              alt="ChopBeta Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gray-50 rounded-full mb-3 border border-gray-100">
            <FiUser className="w-5 h-5 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A2E35]">
            Create Your Account
          </h1>
          <p className="text-gray-500 text-sm mt-1.5">
            Input your details to create a new account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4 w-full" onSubmit={handleSignupSubmit}>
          <AuthInput
            label="Full Name"
            placeholder="Enter full name"
            Icon={FiUser}
            required
          />
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            Icon={FiMail}
            required
          />
          <AuthInput
            label="Create a New Password"
            type="password"
            placeholder="Enter new password"
            Icon={FiLock}
            required
          />
          <AuthInput
            label="Confirm New Password"
            type="password"
            placeholder="Re-type your password to confirm"
            Icon={FiLock}
            required
          />

          <div className="flex items-center gap-2 text-[13px] text-gray-600 py-2">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 accent-green-700 cursor-pointer"
              id="terms"
              required
            />
            <label htmlFor="terms" className="cursor-pointer select-none">
              I agree to the{" "}
              <Link
                href="#"
                className="text-green-700 font-medium hover:underline"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-green-700 font-medium hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Create Your Account
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100"></span>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[2px] text-gray-400">
            <span className="bg-white px-4">Or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-700"
          >
            <FiSmartphone className="text-gray-500" size={18} /> Phone number
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-700"
          >
            <FcGoogle size={18} /> Google
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-700 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </section>

      {/* Right Side: Image Slider */}
      <section className="hidden lg:block relative p-6 max-h-screen sticky top-0">
        <div className="relative h-full w-full rounded-[40px] overflow-hidden bg-gray-100 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={SLIDER_DATA[currentSlide].image}
                className="w-full h-full object-cover"
                alt="ChopBeta Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-20 left-12 right-12 text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-4 leading-tight"
                >
                  {SLIDER_DATA[currentSlide].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-200 text-lg font-light leading-relaxed"
                >
                  {SLIDER_DATA[currentSlide].description}
                </motion.p>

                {/* Pagination Dots */}
                <div className="flex gap-2 mt-8">
                  {SLIDER_DATA.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "w-10 bg-orange-500" : "w-2 bg-white/50 hover:bg-white"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
