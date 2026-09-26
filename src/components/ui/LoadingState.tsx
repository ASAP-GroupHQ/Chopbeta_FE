"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingMessageStep {
  afterSeconds: number;
  message: string;
}

interface LoadingStateProps {
  message?: string;
  messageSteps?: LoadingMessageStep[];
}

export default function LoadingState({
  message = "Loading...",
  messageSteps,
}: LoadingStateProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!messageSteps?.length) return;

    const timer = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [messageSteps]);

  const activeMessage = messageSteps?.length
    ? [...messageSteps]
        .sort((first, second) => first.afterSeconds - second.afterSeconds)
        .reduce(
          (currentMessage, step) =>
            elapsedSeconds >= step.afterSeconds ? step.message : currentMessage,
          message,
        )
    : message;

  return (
    <div className="flex flex-col items-center justify-center space-y-5 p-8 animate-fade-in">
      <div className="relative flex items-center justify-center">
        {/* Glowing Outer Ring */}
        <div className="absolute w-20 h-20 border-2 border-transparent border-t-green-800 border-b-orange-500 rounded-full animate-spin [animation-duration:1.5s]"></div>

        {/* Background Shadow */}
        <div className="absolute w-16 h-16 bg-green-50 rounded-full animate-ping opacity-40 [animation-duration:2s]"></div>

        <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm p-2 z-10 animate-pulse [animation-duration:2.5s]">
          <Image
            src="/chopbeta-favicon.png"
            alt="ChopBeta Loader Icon"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {activeMessage && (
        <AnimatePresence mode="wait">
          <motion.p
            key={activeMessage}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-center text-sm font-medium tracking-wide text-gray-600"
          >
            {activeMessage}
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
}
