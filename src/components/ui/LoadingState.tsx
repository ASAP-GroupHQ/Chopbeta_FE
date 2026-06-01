"use client";

import React from "react";
import Image from "next/image";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 animate-fade-in">
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

      {message && (
        <p className="text-sm font-medium text-gray-500 tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
