"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="w-full bg-[#1E6B3C] rounded-[24px] overflow-hidden p-6 sm:p-8 lg:p-10 relative flex items-center min-h-[200px] sm:min-h-[240px] lg:min-h-[260px] shadow-sm">
      {/* Typography Action Column */}
      <div className="relative z-10 text-white w-full md:max-w-[55%] flex flex-col items-start justify-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
          Generate your <span className="text-[#F4823A]">personalized</span>{" "}
          meal plan in seconds.
        </h2>
        <p className="text-green-50/80 text-xs sm:text-sm font-medium max-w-[280px] sm:max-w-[340px] mt-2 mb-5">
          Tell us your budget and we will handle the rest.
        </p>

        <Link
          href="/dashboard/generate"
          className="group inline-flex items-center justify-center gap-2 bg-white text-[#1A2E35] font-black px-5 py-3 rounded-xl text-xs sm:text-sm hover:bg-gray-50 transition-all active:scale-[0.98] shadow-xs cursor-pointer select-none"
        >
          <span>Generate Meal Plan</span>
          <svg
            width="16"
            height="14"
            viewBox="0 0 21 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0"
          >
            <path
              d="M20.1972 9.36896C20.5174 9.04834 20.6973 8.61372 20.6973 8.16057C20.6973 7.70743 20.5174 7.27281 20.1972 6.95219L13.7494 0.501002C13.4286 0.180216 12.9935 -4.78009e-09 12.5399 0C12.0862 4.78009e-09 11.6511 0.180216 11.3304 0.501002C11.0096 0.821788 10.8294 1.25687 10.8294 1.71053C10.8294 2.16419 11.0096 2.59927 11.3304 2.92005L14.8598 6.45059L1.71002 6.45059C1.2565 6.45059 0.821562 6.63075 0.500877 6.95143C0.180195 7.27212 3.62396e-05 7.70706 3.62396e-05 8.16057C3.62396e-05 8.61409 0.180195 9.04903 0.500877 9.36971C0.821562 9.69039 1.2565 9.87055 1.71002 9.87055L14.8598 9.87055L11.3304 13.4C11.1715 13.5588 11.0455 13.7474 10.9596 13.9549C10.8736 14.1624 10.8294 14.3848 10.8294 14.6095C10.8294 14.8341 10.8736 15.0565 10.9596 15.2641C11.0455 15.4716 11.1715 15.6602 11.3304 15.819C11.4892 15.9778 11.6778 16.1038 11.8853 16.1898C12.0928 16.2758 12.3153 16.32 12.5399 16.32C12.7645 16.32 12.9869 16.2758 13.1945 16.1898C13.402 16.1038 13.5906 15.9778 13.7494 15.819L20.1972 9.36896Z"
              fill="#1A2E35"
            />
          </svg>
        </Link>
      </div>

      {/* Image Box */}
      <div className="hidden md:block absolute right-0 bottom-0 top-0 w-[45%] h-full pointer-events-none select-none z-0">
        <Image
          src="/hero.png"
          alt="Personalized meal assortment container preview mockup"
          fill
          sizes="(max-width: 768px) 0vw, 45vw"
          className="object-contain object-right-bottom scale-105 sm:scale-110 origin-bottom-right"
          priority
        />
      </div>
    </section>
  );
}
