"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <div className="w-10 h-10 bg-white rounded-md rotate-45" />
        </div>

        <h1 className="text-4xl font-extrabold text-[#1A2E35] mb-4">
          Welcome to <span className="text-green-600">ChopBeta</span>
        </h1>

        <p className="text-gray-600 max-w-sm mx-auto mb-8 text-lg">
          The smartest way for students to plan meals on a budget.
        </p>

        <Link href="/signup">
          <button className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-md active:scale-95">
            Get Started
          </button>
        </Link>
      </motion.div>
    </main>
  );
}
