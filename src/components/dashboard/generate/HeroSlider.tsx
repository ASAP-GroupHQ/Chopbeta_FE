"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200",
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1200",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-45 md:h-55 rounded-3xl overflow-hidden mb-6 bg-[#122A1E] shadow-[0_12px_30px_rgba(18,42,30,0.16)]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.32, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BACKGROUND_IMAGES[index]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-r from-[#10291D]/90 via-[#10291D]/55 to-[#10291D]/20" />

      <motion.div
        key={`copy-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
        className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center text-white z-10"
      >
        <span className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-200">
          Your next good meal
        </span>
        <h1 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
          Generate Meal Plan
        </h1>
        <p className="text-gray-200 text-xs md:text-sm font-medium max-w-md leading-relaxed">
          Tell{" "}
          <span className="text-green-700 capitalize">
            Chop<span className="text-[#E85D26] capitalize">Beta</span>
          </span>{" "}
          your available budget and we&apos;ll create filling, affordable meals
          instantly.
        </p>
      </motion.div>

      <div className="absolute bottom-5 right-6 z-20 flex items-center gap-1.5">
        {BACKGROUND_IMAGES.map((_, imageIndex) => (
          <button
            key={imageIndex}
            type="button"
            aria-label={`Show banner ${imageIndex + 1}`}
            onClick={() => setIndex(imageIndex)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              imageIndex === index ? "w-7 bg-white" : "w-1.5 bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
