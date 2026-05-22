"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { ASAP_TEAM } from "@/constants/team-data";

export default function AboutAsapPage() {
  // Motion Animation Presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delays the animation of each child (card)
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F4FAF6] via-white to-white text-[#1A2E35] font-sans overflow-x-hidden">
      {/* 1. MINIMAL HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-gray-100/50 relative z-20">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-green-700 transition-colors"
        >
          <FiArrowLeft /> Back to ChopBeta
        </Link>
        <div className="relative w-32 h-10">
          <Image
            src="/chopbeta.png"
            alt="ChopBeta Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="text-[11px] font-medium text-gray-400">
          Team Page
        </div>
      </header>

      {/* 2. HERO INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center space-y-4">
        {/* ASAP Bold Green Text Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-5 py-2.5 bg-green-50 rounded-full border border-green-100 shadow-inner"
        >
          <span className="text-2xl font-black text-green-700 tracking-tightest">
            ASAP
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A2E35] leading-tight max-w-2xl mx-auto">
          The brilliant minds powering{" "}
          <span className="text-green-700 bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
            ASAP
          </span>{" "}
          Team
        </h1>
        <p className="text-gray-600 text-lg max-w-lg mx-auto leading-relaxed">
          The dedicated innovators building ChopBeta to make student meal
          planning affordable and smart.
        </p>
      </section>

      {/* 3. TEAM GRID SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {ASAP_TEAM.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="p-6 bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:border-green-600/30 transition-all cursor-pointer text-center group flex flex-col items-center gap-4"
            >
              {/* Member Picture Container */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-gray-100 group-hover:ring-green-100 transition-all duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 96px"
                  className="object-cover"
                />
              </div>

              {/* Member Name */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-[#1A2E35] group-hover:text-green-800 transition-colors">
                  {member.name}
                </h2>

                {/* Member Role - Using Nigerian Student Aesthetic colors */}
                <p className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full inline-block">
                  {member.role}
                </p>
              </div>

              {/* Subtle hover detail indicator */}
              <div className="w-10 h-1 h-0.5 bg-green-200 rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. TEAM CALL-OUT FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <div className="inline-block p-1 bg-green-50 border border-green-100 rounded-full font-bold text-xs text-green-700">
           ASAP (As Soon As Possible)
        </div>
      </footer>
    </main>
  );
}
