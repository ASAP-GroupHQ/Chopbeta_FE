"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200",
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1200",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[160px] md:h-[200px] rounded-3xl overflow-hidden mb-6 bg-[#122A1E]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BACKGROUND_IMAGES[index]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center text-white z-10">
        <h1 className="text-2xl md:text-3xl font-black mb-2">
          Generate Meal Plan
        </h1>
        <p className="text-gray-200 text-xs md:text-sm font-medium max-w-md">
          Tell{" "}
          <span className="text-green-700 capitalize">
            Chop<span className="text-[#E85D26] capitalize">Beta</span>
          </span>{" "}
          your available budget and we&apos;ll create filling, affordable meals
          instantly.
        </p>
      </div>
    </div>
  );
}
