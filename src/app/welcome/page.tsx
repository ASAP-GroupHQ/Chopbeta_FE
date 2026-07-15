"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: "Eating right just got Easier!!",
    description:
      "Plan your meals daily with ChopBeta, without overthinking or skipping meals.",
    image: "/onboarding-1.jpg",
  },
  {
    id: 2,
    title: "Your week, plated with intention.",
    description:
      "Pick your daily nourished meals in minutes, with over 200 personalization options, eat exactly how you want to eat.",
    image: "/onboarding-2.jpg",
  },
  {
    id: 3,
    title: "Eat well! Study Better!",
    description:
      "The right meal fuel your focus, energy, and performance every day, with ChopBeta got you covered.",
    image: "/onboarding-3.jpg",
  },
];

export default function OnboardingFlow() {
  const router = useRouter();
  const [lifecycle, setLifecycle] = useState<
    "logo-fade" | "loading-active" | "slides"
  >("logo-fade");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const logoTimer = setTimeout(() => setLifecycle("loading-active"), 3500);
    const loadingTimer = setTimeout(() => setLifecycle("slides"), 6000);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chopbeta_onboarded", "true");
    }
    router.push("/login");
  };

  return (
    // Outer Wrapper: Keeps everything dark and centers our content on desktop screens
    <div className="relative w-full h-screen bg-[#0A0E10] overflow-hidden select-none font-sans flex items-center justify-center">
      {/* DESKTOP BACKGROUND DECORATION */}
      {/* This renders a blurred backdrop of the current active slide behind the mobile card frame */}
      <div className="absolute inset-0 w-full h-full hidden md:block opacity-20 filter blur-3xl pointer-events-none scale-110 transition-all duration-700">
        <Image
          src={ONBOARDING_SLIDES[currentSlide]?.image || "/onboarding-1.jpg"}
          alt="Backdrop glow"
          fill
          className="object-cover"
        />
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1 & 2: INTRO SPLASH ENGINE */}
        {(lifecycle === "logo-fade" || lifecycle === "loading-active") && (
          <motion.div
            key="splash-screen"
            // Adapts seamlessly: full-bleed on mobile, an elegant floating card canvas on desktop
            className="w-full h-full md:max-w-md md:h-[85vh] md:rounded-[32px] md:border md:border-gray-100 bg-white flex flex-col items-center justify-center z-50 px-6 md:shadow-2xl relative"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                lifecycle === "loading-active"
                  ? { opacity: 1, scale: 1, y: -40 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{
                duration: lifecycle === "loading-active" ? 0.7 : 1.2,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="relative w-56 h-16 flex items-center justify-center"
            >
              <Image
                src="/chopbeta.png"
                alt="ChopBeta Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {lifecycle === "loading-active" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center justify-center space-y-4"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-16 h-16 border-2 border-transparent border-t-green-800 border-b-orange-500 rounded-full animate-spin [animation-duration:1.2s]"></div>
                  <div className="absolute w-12 h-12 bg-green-50 rounded-full animate-ping opacity-30 [animation-duration:1.8s]"></div>
                  <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm p-1.5 z-10 animate-pulse">
                    <Image
                      src="/chopbeta-favicon.png"
                      alt="ChopBeta Loader Icon"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase animate-pulse">
                  Welcome to ChopBeta!
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* PHASE 3: MAIN INTERACTIVE SLIDES DECK */}
        {lifecycle === "slides" && (
          <motion.div
            key="slides-deck"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // Stays full-screen on mobile, scales into an isolated phone viewport mockup on desktop
            className="relative w-full h-full md:max-w-md md:h-[85vh] md:rounded-[32px] md:border md:border-neutral-800 shadow-2xl bg-[#121212] overflow-hidden transition-all"
          >
            {/* Sliding Background Asset Layers */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10" />
                  <Image
                    src={ONBOARDING_SLIDES[currentSlide].image}
                    alt="Background Feature Layout"
                    fill
                    className="object-cover object-center opacity-85"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Top Bar Context Indicators */}
            <div className="absolute top-0 inset-x-0 w-full p-6 flex justify-between items-center z-30">
              <span className="text-xs font-medium tracking-widest text-white/40 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
                {currentSlide + 1} / {ONBOARDING_SLIDES.length}
              </span>
              <button
                onClick={handleComplete}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md"
              >
                Skip
              </button>
            </div>

            {/* Immersive Card Overlay Text & Controls */}
            <div className="absolute bottom-0 inset-x-0 w-full p-8 pt-24 pb-10 z-20 flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
                  className="space-y-3.5 mb-10 text-left"
                >
                  <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {ONBOARDING_SLIDES[currentSlide].title
                      .split("ChopBeta")
                      .map((chunk, i, arr) => (
                        <React.Fragment key={i}>
                          {chunk}
                          {i < arr.length - 1 && (
                            <span className="text-orange-500">ChopBeta</span>
                          )}
                        </React.Fragment>
                      ))}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed font-normal">
                    {ONBOARDING_SLIDES[currentSlide].description
                      .split("ChopBeta")
                      .map((chunk, i, arr) => (
                        <React.Fragment key={i}>
                          {chunk}
                          {i < arr.length - 1 && (
                            <span className="text-orange-400 font-semibold">
                              ChopBeta
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Nav Matrix Bar */}
              <div className="flex items-center justify-between gap-6 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  {ONBOARDING_SLIDES.map((_, index) => (
                    <div
                      key={index}
                      className="h-1.5 rounded-full bg-white/20 overflow-hidden transition-all duration-300"
                      style={{ width: index === currentSlide ? "24px" : "8px" }}
                    >
                      {index === currentSlide && (
                        <motion.div
                          className="h-full bg-green-600"
                          initial={{ x: "-100%" }}
                          animate={{ x: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-green-700 hover:bg-green-600 active:scale-95 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2"
                >
                  {currentSlide === ONBOARDING_SLIDES.length - 1
                    ? "Get Started"
                    : "Next"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
