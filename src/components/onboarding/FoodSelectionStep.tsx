"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import {
  ALLERGIES_SLIDES,
  DISLIKES_SLIDES,
  ALLERGY_OPTIONS,
  DISLIKE_OPTIONS,
} from "@/constants/onboarding-slider";
import LoadingState from "@/components/ui/LoadingState";

interface FoodSelectionStepProps {
  type: "allergies" | "dislikes";
  onBack: () => void;
  onContinue: (data: { selectedItems: string[]; customText: string }) => void;
}

export default function FoodSelectionStep({
  type,
  onBack,
  onContinue,
}: FoodSelectionStepProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customText, setCustomText] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Determine dynamic data definitions based on type prop
  const isAllergies = type === "allergies";
  const titleText = isAllergies ? "Any allergies?" : "How about dislikes?";
  const subText = isAllergies
    ? "Let us know what to filter out of your custom budget plan."
    : "Tell us what you prefer not to eat so we keep your menu appetizing.";

  const options = isAllergies ? ALLERGY_OPTIONS : DISLIKE_OPTIONS;
  const slides = isAllergies ? ALLERGIES_SLIDES : DISLIKES_SLIDES;

  // Background Image Slider rotation
  useEffect(() => {
    setCurrentSlide(0);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [type, slides.length]);

  const toggleTag = (tag: string) => {
    if (isLoading) return;
    const standardizedTag = tag.toLowerCase();

    if (standardizedTag === "none") {
      setSelectedTags([tag]);
      setCustomText("");
      return;
    }

    let updated = selectedTags.filter((t) => t.toLowerCase() !== "none");

    if (updated.includes(tag)) {
      updated = updated.filter((t) => t !== tag);
      if (standardizedTag === "others") setCustomText("");
    } else {
      updated.push(tag);
    }
    setSelectedTags(updated);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    setTimeout(() => {
      onContinue({
        selectedItems: selectedTags,
        customText: isOthersSelected ? customText : "",
      });
      setIsLoading(false);
    }, 1800);
  };

  const isOthersSelected = selectedTags.some(
    (t) => t.toLowerCase() === "others",
  );
  const isFormValid =
    selectedTags.length > 0 &&
    (!isOthersSelected || customText.trim().length > 0);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      {/* FORMS & CHIPS SELECTION */}
      <section className="flex flex-col px-6 py-8 md:px-12 lg:px-20 justify-between h-full max-w-2xl mx-auto w-full relative">
        <div className="flex items-center justify-between w-full mb-8">
          <button
            onClick={onBack}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-green-800 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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

        <div className="flex-1 flex flex-col justify-center my-auto space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-[#1A2E35] tracking-tight">
              {titleText}
            </h1>
            <p className="text-sm text-gray-500">{subText}</p>
          </div>

          {/* Render Selection Grid */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {options.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  disabled={isLoading}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 active:scale-[0.98] ${
                    isSelected
                      ? "bg-[#1A2E35] border-[#1A2E35] text-white shadow-sm"
                      : "bg-gray-100 border-transparent text-gray-700 hover:bg-gray-200/80"
                  } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isOthersSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-2"
              >
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1.5">
                  Please specify details
                </label>
                <input
                  type="text"
                  disabled={isLoading}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type any other items separated by commas, or type None"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-green-600 focus:ring-2 focus:ring-green-500/10 text-sm font-medium transition-all text-[#1A2E35] disabled:opacity-60"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-8 min-h-[96px] flex items-center justify-center">
          {isLoading ? (
            <div className="w-full flex justify-center py-2">
              <LoadingState message="Saving your preferences..." />
            </div>
          ) : (
            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleSubmit}
              className={`w-full py-4 text-center text-base font-bold rounded-xl transition-all duration-300 shadow-md cursor-pointer ${
                isFormValid
                  ? "bg-green-700 hover:bg-green-800 text-white active:scale-[0.99]"
                  : "bg-green-700/30 text-white cursor-not-allowed shadow-none"
              }`}
            >
              Continue
            </button>
          )}
        </div>
      </section>

      {/* AUTOMATED CAROUSEL CONTAINER */}
      <section className="hidden lg:block relative w-full h-full min-h-[500px] lg:h-screen p-6 sticky top-0">
        <div className="relative h-full w-full rounded-[40px] overflow-hidden bg-gray-900 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${type}-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={slides[currentSlide]?.image}
                alt={slides[currentSlide]?.alt}
                fill
                sizes="50vw"
                className="object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
