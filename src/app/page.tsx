"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { CORE_FEATURES, SAMPLE_MEALS } from "@/constants/landing-data";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const router = useRouter();

  // Motion Presets
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fabricsContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const hasVisited = localStorage.getItem("chopbeta_onboarded");
  //     if (!hasVisited) {
  //       router.push("/welcome");
  //     }
  //   }
  // }, [router]);

  return (
    <main className="relative min-h-screen bg-linear-to-b from-[#F4FAF6] via-white to-white font-sans text-[#1A2E35] overflow-x-hidden">
      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-50">
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
          <Link
            href="/about-asap"
            className="hover:text-green-700 transition-colors"
          >
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
            className="md:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-lg focus:outline-none relative z-50 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU NAV DRAWER OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark Background Backdrop Blur tint to focus attention on the menu context */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel Element */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 shadow-2xl z-40 pt-24 pb-8 px-6 md:hidden flex flex-col gap-6"
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
                  href="/about-asap"
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
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-12 lg:pt-20 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Call to Action Details */}
        <motion.div
          className="lg:col-span-5 space-y-6 text-center lg:text-left"
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
            <span className="bg-linear-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
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
              Explore
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Sample meal plan preview */}
        <motion.div
          className="relative flex h-112.5 w-full items-center justify-center rounded-4xl border border-[#D8E7DC] bg-[#EEF7F0] p-3 lg:col-span-7 sm:h-137.5 sm:p-7"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative grid h-full w-full max-w-xl grid-cols-1 gap-5 overflow-hidden rounded-[26px] border border-white bg-white p-5 shadow-[0_20px_50px_rgba(30,107,60,0.12)] sm:p-6 md:grid-cols-12">
            {/* Left Side: Budget Metric Cards */}
            <div className="flex flex-col justify-between gap-4 md:col-span-5">
              <motion.div
                whileHover={{ y: -4 }}
                className="space-y-3 rounded-2xl border border-[#E4ECE5] bg-[#FAFCFA] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                    Monthly budget
                  </span>
                  {/* <span className="rounded-full bg-[#E5F3E8] px-2 py-1 text-[10px] font-bold text-[#1E6B3C]">
                    On track
                  </span> */}
                </div>
                <div className="text-2xl font-black text-[#1A2E35]">
                  ₦30,000
                  <span className="text-xs font-normal text-gray-400"> / month</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E7EFE8]">
                  <div className="h-full w-[65%] rounded-full bg-[#1E6B3C]" />
                </div>
                <p className="text-[11px] font-medium text-[#1E6B3C]">
                  ₦4,200 saved this week
                </p>
              </motion.div>

              <div className="relative flex min-h-40 flex-1 flex-col justify-center gap-2 rounded-2xl border border-[#E8EEE9] bg-[#FCFDFC] p-3">
                <div className="mb-1 text-center text-xs font-bold text-[#1A2E35]">
                  Everything in one place
                </div>
                {CORE_FEATURES.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white p-1.5 text-xs font-semibold shadow-sm"
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

            {/* Right Side: Weekly meal plan */}
            <div className="flex flex-col justify-between md:col-span-7">
              <div className="mb-2 flex items-start justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1E6B3C]">
                    A look at your week
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-[#1A2E35]">
                    Meals that fit your pocket
                  </h3>
                </div>
                <span className="rounded-full bg-[#FFF4E9] px-2.5 py-1 text-[10px] font-bold text-[#C96A24]">
                  Sample plan
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center space-y-3">
                {SAMPLE_MEALS.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:border-[#1E6B3C]/30 hover:shadow-md"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#EFF5F0]">
                        <Image
                          src={item.img}
                          alt={item.meal}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-tight text-gray-400">
                          {item.day}
                        </div>
                        <div className="truncate text-xs font-bold text-[#1A2E35]">
                          {item.meal}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-[#1E6B3C]">
                        {item.cost}
                      </div>
                      <span className="block text-[9px] font-medium text-gray-400">
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 border-t border-gray-50 pt-3 text-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6B3C] hover:underline"
                >
                  Build your own weekly plan <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
