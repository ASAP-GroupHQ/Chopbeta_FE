"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiLock, FiMail } from "react-icons/fi";

const PREMIUM_FEATURES = [
  {
    title: "Auto Receipt Scanner",
    description: "Just snap a picture of your food receipt. We'll read the prices and log everything to your budget automatically.",
  },
  {
    title: "Market Price Matcher",
    description: "Compare ingredient and food bundle prices across local vendors instantly so you always buy from the cheapest spot.",
  },
  {
    title: "Smart Health Insights",
    description: "Track your calories and macros effortlessly alongside your spending. Good food, clean budget, healthy body.",
  },
];

export default function PremiumComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 md:p-8 bg-[#F9F8FC] relative overflow-hidden">
      
      {/* Designer Background Aura Blurs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-[#1E6B3C]/5 via-[#FF7A00]/4 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full text-center space-y-10 relative z-10"
      >
        
        {/* Brand Tag */}
        <div className="inline-flex items-center gap-1 bg-white border border-gray-100 px-3.5 py-1.5 rounded-full shadow-sm mx-auto">
          <span className="text-[11px] uppercase font-black tracking-wider text-[#1E6B3C]">Chop</span>
          <span className="text-[11px] uppercase font-black tracking-wider text-[#FF7A00]">Beta</span>
          <span className="text-[9px] font-bold text-white bg-[#FF7A00] px-1.5 py-0.5 rounded-md uppercase tracking-wide ml-1">Pro</span>
        </div>

        {/* Friendly Hero Headers */}
        <div className="space-y-3.5">
          <h1 className="text-3xl md:text-5xl font-black text-[#1A2E35] tracking-tight leading-[1.1]">
            Chop better, <br className="hidden sm:inline" />
            <span className="text-[#1E6B3C]">without breaking the bank.</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-semibold max-w-md mx-auto leading-relaxed">
            We&apos;re cooking up some super smart, automated features to help you track your food spending and health goals completely hands-free.
          </p>
        </div>

        {/* Waitlist Box with Clean Switch Animation */}
        <div className="bg-white border border-gray-100 rounded-[28px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] max-w-md mx-auto relative">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="waitlist-form"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleNotify} 
                className="space-y-4"
              >
                <div className="text-left space-y-1 mb-2">
                  <h3 className="text-sm font-black text-[#1A2E35]">Join the early access list</h3>
                  <p className="text-[11px] text-gray-400 font-medium leading-normal">
                    Be the first to know when we launch and lock in early discounts before anyone else.
                  </p>
                </div>
                
                <div className="relative flex items-center">
                  <FiMail className="absolute left-4 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50/70 border border-gray-100/70 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-semibold text-[#1A2E35] outline-none focus:border-[#1E6B3C]/30 focus:bg-white transition-all placeholder:text-gray-400"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-[#1E6B3C] text-white rounded-2xl py-3.5 text-xs font-bold hover:bg-[#1E6B3C]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1E6B3C]/10 group"
                >
                  Save my spot
                  <FiArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-4 flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-11 h-11 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#1E6B3C]">
                  <FiCheckCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-[#1A2E35]">You&apos;re on the list! 🙌</h3>
                  <p className="text-[11px] text-gray-400 font-medium max-w-[260px] mx-auto leading-relaxed">
                    We saved a spot for <span className="text-[#1E6B3C] font-bold">{email}</span>. We&apos;ll hit you up as soon as the gates open.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Grid Section */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px bg-gray-200/60 w-6" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
              What we&apos;re building
            </span>
            <span className="h-px bg-gray-200/60 w-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {PREMIUM_FEATURES.map((feature, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                key={idx}
                className="bg-white border border-gray-100/80 rounded-2xl p-5 relative overflow-hidden group hover:border-[#1E6B3C]/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-gray-300 group-hover:text-[#FF7A00]/50 transition-colors duration-300">
                  <FiLock className="w-3.5 h-3.5" />
                </div>
                
                <h4 className="text-xs font-black text-[#1A2E35] mb-1.5 pr-4 group-hover:text-[#1E6B3C] transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest pt-4">
          {/* Coming right after our MVP launch 🚀 */}
        </p>
      </motion.div>
    </div>
  );
}