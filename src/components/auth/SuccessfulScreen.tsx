"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

interface SuccessfulScreenProps {
  message?: string;
  subMessage?: string;
  redirectTo?: string;
  delaySeconds?: number;
}

export default function SuccessfulScreen({
  message = "Successful 🎉",
  subMessage = "You're now ready to explore ChopBeta!",
  redirectTo = "/dashboard",
  delaySeconds = 3.5, // 3 to 4 seconds sweet spot
}: SuccessfulScreenProps) {
  useEffect(() => {
    // Automatically trigger router redirection after the set duration expires
    const timer = setTimeout(() => {
      window.location.href = redirectTo;
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [redirectTo, delaySeconds]);

  return (
    <main className="min-h-screen bg-white relative px-4 font-sans flex flex-col items-center justify-center">
      {/* <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
        <Image
          src="/chopbeta.png"
          alt="ChopBeta Logo"
          width={120}
          height={40}
          className="object-contain h-auto w-auto"
          priority
        />
      </div> */}

      {/* Centered Success Floating Card Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm p-8 bg-white rounded-[32px] border border-gray-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center space-y-5"
      >
        {/* Animated Green Badge Ring Indicator */}
        <div className="inline-flex p-3 bg-[#E8F5E9] rounded-full border border-green-100 shadow-sm mx-auto">
          <div className="p-1 bg-green-700 rounded-full text-white">
            <FiCheck className="w-5 h-5 stroke-[3]" />
          </div>
        </div>

        {/* Messaging Text nodes */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#1A2E35] tracking-tight">
            {message}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed px-2">
            {subMessage.split("ChopBeta!").map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-orange-500 font-bold">ChopBeta!</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </motion.div>
    </main>
  );
}
