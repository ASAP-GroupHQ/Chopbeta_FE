"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import AuthInput from "@/components/auth/AuthInput";
import OtpVerification from "@/components/auth/OtpVerification";
import FoodSelectionStep from "@/components/onboarding/FoodSelectionStep";
import { SLIDER_DATA } from "@/constants/auth-slider";
import SuccessfulScreen from "@/components/auth/SuccessfulScreen";
import LoadingState from "@/components/ui/LoadingState";
import { authService } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const { updateUserData } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [initialOtp, setInitialOtp] = useState("");
  const [isPreferencesStage, setIsPreferencesStage] = useState(false);

  const [preferenceSubStep, setPreferenceSubStep] = useState<
    "allergies" | "dislikes"
  >("allergies");

  const [finalPreferences, setFinalPreferences] = useState({
    allergies: [] as string[],
    allergyCustom: "",
    dislikes: [] as string[],
    dislikeCustom: "",
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-slide effect for the initial side banner
  useEffect(() => {
    if (isOtpStage || isPreferencesStage || isCompleted) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_DATA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOtpStage, isPreferencesStage, isCompleted]);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match! Please check and try again.");
      return;
    }

    setIsLoading(true);

    const payload = { fullName, email, password };

    try {
      const response = await authService.studentSignup(payload);

      if (response?.data?.otp) {
        setInitialOtp(String(response.data.otp));
      }

      toast.success("Account created! Please verify your email.");
      setIsOtpStage(true);
    } catch (error: any) {
      toast.error(
        error.message || "Failed to create account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpCompletion = (response: any) => {
    if (response?.data) {
      updateUserData(response.data);
    }
    setIsOtpStage(false);
    setIsPreferencesStage(true);
    setPreferenceSubStep("allergies");
  };

  const handlePreferenceStepContinue = async (data: {
    selectedItems: string[];
    customText: string;
  }) => {
    if (preferenceSubStep === "allergies") {
      setFinalPreferences((prev) => ({
        ...prev,
        allergies: data.selectedItems,
        allergyCustom: data.customText,
      }));
      setPreferenceSubStep("dislikes");
    } else {
      setIsLoading(true);
      try {
        toast.success("Preferences saved successfully!");
        setIsPreferencesStage(false);
        setIsCompleted(true);
      } catch (error: any) {
        setIsPreferencesStage(false);
        setIsCompleted(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePreferenceStepBack = () => {
    if (preferenceSubStep === "dislikes") {
      setPreferenceSubStep("allergies");
    } else {
      setIsPreferencesStage(false);
      setIsOtpStage(true);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center min-h-screen w-full">
        <LoadingState message="Creating account..." />
      </div>
    );
  }

  if (isCompleted) {
    return (
      <SuccessfulScreen
        message="Verification Successful 🎉"
        subMessage="Account verification and personalization complete."
        redirectTo="/login"
        delaySeconds={2.5}
      />
    );
  }

  if (isPreferencesStage) {
    return (
      <FoodSelectionStep
        type={preferenceSubStep}
        onBack={handlePreferenceStepBack}
        onContinue={handlePreferenceStepContinue}
      />
    );
  }

  if (isOtpStage) {
    return (
      <OtpVerification
        identifier={email}
        initialOtp={initialOtp}
        onBackToSignup={() => setIsOtpStage(false)}
        onVerifySuccess={handleOtpCompletion}
      />
    );
  }

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      <section className="flex flex-col px-6 py-8 md:px-12 lg:px-20 justify-center h-full max-w-2xl mx-auto w-full">
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

        <div className="text-center mb-8">
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
          <h1 className="text-2xl font-bold text-[#1A2E35]">
            Create Your Account
          </h1>
          <p className="text-gray-500 text-sm mt-1.5">
            Input your details to create a new account
          </p>
        </div>

        <form className="space-y-4 w-full" onSubmit={handleSignupSubmit}>
          <AuthInput
            label="Full Name"
            placeholder="John Doe"
            Icon={FiUser}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
            required
          />

          <AuthInput
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            Icon={FiMail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <AuthInput
            label="Create a New Password"
            type="password"
            placeholder="Enter new password"
            Icon={FiLock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <AuthInput
            label="Confirm New Password"
            type="password"
            placeholder="Re-type your password to confirm"
            Icon={FiLock}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="flex items-center gap-2 text-[13px] text-gray-600 py-2">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 accent-green-700 cursor-pointer"
              id="terms"
              disabled={isLoading}
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
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 cursor-pointer disabled:opacity-50 w-full"
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

      {/* Side Slider Graphic remains identical */}
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
                <motion.h2 className="text-4xl font-bold mb-4 leading-tight">
                  {SLIDER_DATA[currentSlide].title}
                </motion.h2>
                <motion.p className="text-gray-200 text-lg font-light leading-relaxed">
                  {SLIDER_DATA[currentSlide].description}
                </motion.p>
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
  )
};
