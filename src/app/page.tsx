"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { CORE_FEATURES, SAMPLE_MEALS } from "@/constants/landing-data";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Motion Presets
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fabricsContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F4FAF6] via-white to-white text-[#1A2E35] font-sans overflow-x-hidden relative">
      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-20">
        <div className="relative w-32 h-10">
          <Image
            src="/chopbeta.png"
            alt="ChopBeta Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-green-700 transition-colors">
            Features
          </Link>
          <Link href="#" className="hover:text-green-700 transition-colors">
            Pricing
          </Link>
          <Link href="#" className="hover:text-green-700 transition-colors">
            About ASAP Team
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-block text-sm font-semibold text-gray-700 hover:text-green-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="hidden sm:inline-block px-5 py-2.5 bg-green-700 text-white font-semibold text-sm rounded-xl hover:bg-green-800 transition-all shadow-sm"
          >
            Get Started
          </Link>

          {/* Mobile Hamburg - Close Button Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 p-1 focus:outline-none z-30"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU NAV DRAWER OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full bg-white border-b border-gray-100 shadow-xl z-10 pt-24 pb-8 px-6 md:hidden flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-4 font-semibold text-lg text-gray-700">
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="#"
                className="hover:text-green-700 py-1 transition-colors"
              >
                Features
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="#"
                className="hover:text-green-700 py-1 transition-colors"
              >
                Pricing
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="#"
                className="hover:text-green-700 py-1 transition-colors"
              >
                About ASAP Team
              </Link>
            </nav>

            <hr className="border-gray-100" />

            <div className="flex flex-col gap-3">
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/login"
                className="w-full py-3 border border-gray-200 text-center font-bold rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/signup"
                className="w-full py-3 bg-green-700 text-white text-center font-bold rounded-xl hover:bg-green-800 transition-colors shadow-md"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-12 lg:pt-20 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Call to Action Details */}
        <motion.div
          className="lg:col-span-5 space-y-6 text-center lg:text-left z-10"
          initial="initial"
          animate="animate"
          variants={fabricsContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-xs font-semibold text-green-700"
          >
            🇳🇬 - Made Specially For Nigerian Students
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-extrabold text-[#1A2E35] leading-[1.15] tracking-tight"
          >
            Budget-Friendly Meals, <br />
            <span className="text-green-700 bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              Plan Your Way
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-600 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            The ultimate meal planning platform built to map delicious feeding
            routines matching your actual pocket capacity. Save money, track
            spending, and eat premium.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-700/10 flex items-center justify-center gap-2 group text-base"
            >
              Start Planning{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 border border-gray-200 hover:bg-gray-50 font-bold rounded-2xl transition-all text-center text-base"
            >
              View Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Dashboard Canvas */}
        <motion.div
          className="lg:col-span-7 relative w-full h-[450px] sm:h-[550px] bg-emerald-700/5 rounded-[40px] border border-emerald-500/10 p-4 sm:p-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-400/20 rounded-full filter blur-[80px] -z-10 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-400/10 rounded-full filter blur-[80px] -z-10" />

          {/* Core Interactive Center Wheel Block */}
          <div className="relative w-full h-full max-w-xl bg-white/80 backdrop-blur-md border border-white rounded-[32px] shadow-2xl p-6 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Side: Budget Metric Cards */}
            <div className="md:col-span-5 flex flex-col justify-between gap-4">
              {/* Glassmorphic Balance Block */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2"
              >
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Target Budget
                </span>
                <div className="text-2xl font-black text-[#1A2E35]">
                  ₦30,000
                  <span className="text-xs text-gray-400 font-normal">
                    {" "}
                    /mo
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-600 h-full w-[65%] rounded-full" />
                </div>
                <p className="text-[11px] font-medium text-emerald-600">
                  Saved +₦4,200 this week
                </p>
              </motion.div>

              {/* Dynamic Feature Wheel Visual Cluster */}
              <div className="flex-1 min-h-[160px] relative border border-dashed border-gray-200 rounded-2xl p-3 flex flex-col justify-center gap-2 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="text-center font-bold text-xs text-gray-500 mb-1">
                  ChopBeta System Core
                </div>
                {CORE_FEATURES.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs font-semibold p-1.5 rounded-lg border bg-white shadow-sm"
                    >
                      <div className={`p-1.5 rounded-md border ${item.color}`}>
                        <IconComponent size={14} />
                      </div>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Schedule Feed Stack */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
                <h3 className="font-bold text-sm text-[#1A2E35]">
                  Weekly Generated Plan
                </h3>
                <span className="text-[11px] font-bold text-orange-500 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">
                  Active Cycle
                </span>
              </div>

              {/* Mock Plan Structure */}
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                {SAMPLE_MEALS.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-green-600/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.img}</span>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                          {item.day}
                        </div>
                        <div className="text-xs font-bold text-[#1A2E35]">
                          {item.meal}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-green-700">
                        {item.cost}
                      </div>
                      <span className="text-[9px] text-gray-400 block font-medium">
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Micro Sticky Action Overlay Anchor */}
              <div className="mt-4 pt-3 border-t border-gray-50 text-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:underline"
                >
                  Generate customized matrix layout →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
