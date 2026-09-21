"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { ASAP_TEAM } from "@/constants/team-data";

export default function AboutAsapPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FBFDFB] font-sans text-[#1A2E35]">
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-[#E6EFE8] px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-[#1E6B3C] sm:text-sm"
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
        <div className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400 sm:block">Our team</div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E6B3C]">ASAP team</p>
          <h1 className="text-4xl font-extrabold leading-[1.08] text-[#1A2E35] sm:text-5xl lg:text-6xl">
            The people behind ChopBeta.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            ChopBeta is shaped by a close-knit team of builders, designers,
            analysts, and product thinkers. Together, we are creating something
            practical, thoughtful, and made for the everyday realities of
            student life.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between gap-5 border-b border-[#E6EFE8] pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Meet the team</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#1A2E35] sm:text-3xl">A team of ten</h2>
          </div>
          <span className="hidden items-center gap-2 text-xs font-medium text-gray-400 sm:flex">
            Lagos · Nigeria <span className="h-1.5 w-1.5 rounded-full bg-[#E85D26]" />
          </span>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {ASAP_TEAM.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group cursor-default"
            >
              <div className="relative aspect-4/4.5 overflow-hidden rounded-[22px] bg-[#EAF3EC]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover grayscale-15 transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              <div className="flex items-start justify-between gap-3 border-b border-[#E6EFE8] py-4">
                <div>
                  <h2 className="text-sm font-bold text-[#1A2E35] transition-colors group-hover:text-[#1E6B3C]">
                  {member.name}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{member.role}</p>
                </div>
                <span className="pt-0.5 text-xs font-bold text-gray-300">0{member.id}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className="mx-auto max-w-7xl border-t border-[#E6EFE8] px-6 pb-20 pt-8">
        <Link href="/" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1E6B3C]">
          Back to ChopBeta <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </footer>
    </main>
  );
}
