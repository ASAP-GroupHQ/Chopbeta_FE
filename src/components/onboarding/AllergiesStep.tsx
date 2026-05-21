"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import {
  ALLERGIES_SLIDES,
  ALLERGY_OPTIONS,
} from "@/constants/onboarding-slider";

interface AllergiesStepProps {
  onBack: () => void;
  onComplete: (data: {
    selectedAllergies: string[];
    customAllergyText: string;
  }) => void;
}

export default function AllergiesStep({
  onBack,
  onComplete,
}: AllergiesStepProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customText, setCustomText] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background Image Slider loop (4 images)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ALLERGIES_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const toggleTag = (tag: string) => {
    if (tag === "None") {
      // Selecting "None" clears everything else
      setSelectedTags(["None"]);
      setCustomText("");
      return;
    }

    let updated = [...selectedTags];
    // Remove "None" if any specific option is selected
    updated = updated.filter((t) => t !== "None");

    if (updated.includes(tag)) {
      updated = updated.filter((t) => t !== tag);
      if (tag === "Others") setCustomText("");
    } else {
      updated.push(tag);
    }
    setSelectedTags(updated);
  };

  const isOthersSelected = selectedTags.includes("Others");

  // Validation check: must choose at least one option.
  // If "Others" is picked, they must provide text detail.
  const isFormValid =
    selectedTags.length > 0 &&
    (!isOthersSelected || customText.trim().length > 0);

  const handleSubmit = () => {
    if (!isFormValid) return;
    onComplete({
      selectedAllergies: selectedTags,
      customAllergyText: isOthersSelected ? customText : "",
    });
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      {/* LEFT COLUMN: SELECTION MODULE */}
      <section className="flex flex-col px-6 py-8 md:px-12 lg:px-20 justify-between h-full max-w-2xl mx-auto w-full relative">
        {/* Navigation Action Header Bar */}
        <div className="flex items-center justify-between w-full mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-green-800 transition-colors"
          >
            <FiArrowLeft /> Go Back
          </button>

          <div className="relative w-24 h-8 md:hidden">
            <Image
              src="/chopbeta.png"
              alt="ChopBeta Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Core Main Prompt Area */}
        <div className="flex-1 flex flex-col justify-center my-auto space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-[#1A2E35] tracking-tight">
              Any allergies?
            </h1>
            <p className="text-sm text-gray-500">
              Let us know what to filter out of your custom Nigerian student
              meal budget plan.
            </p>
          </div>

          {/* Grid Layout Selection Pills Box */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {ALLERGY_OPTIONS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 active:scale-[0.98] ${
                    isSelected
                      ? "bg-[#1A2E35] border-[#1A2E35] text-white shadow-sm"
                      : "bg-gray-100 border-transparent text-gray-700 hover:bg-gray-200/80"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Conditional Animation Form Node for "Others" selection */}
          <AnimatePresence>
            {isOthersSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-2"
              >
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1.5">
                  Specify other foods / preferences
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Snail, Locust Beans, or type None"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/10 text-sm font-medium transition-all text-[#1A2E35]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Trigger Button Footer */}
        <div className="pt-8">
          <button
            type="button"
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`w-full py-4 text-center text-base font-bold rounded-xl transition-all duration-300 shadow-md ${
              isFormValid
                ? "bg-green-700 hover:bg-green-800 text-white active:scale-[0.99]"
                : "bg-green-700/30 text-white cursor-not-allowed shadow-none"
            }`}
          >
            Continue
          </button>
        </div>
      </section>

      {/* RIGHT COLUMN: HIGH QUALITY IMAGE CAROUSEL MODULE */}
      <section className="hidden lg:block relative p-6 max-h-screen sticky top-0">
        <div className="relative h-full w-full rounded-[40px] overflow-hidden bg-gray-900 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={ALLERGIES_SLIDES[currentSlide].image}
                alt={ALLERGIES_SLIDES[currentSlide].alt}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-[4500ms] scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
