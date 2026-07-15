"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiHelpCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import HeroSlider from "@/components/dashboard/generate/HeroSlider";
import MealCard from "@/components/dashboard/generate/MealCard";
import InstructionModal from "@/components/dashboard/generate/InstructionModal";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { mealService, MealItem } from "@/services/meal"; 

export default function GeneratePage() {
  const [budget, setBudget] = useState("");
  const [isReshuffling, setIsReshuffling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showMobileHelp, setShowMobileHelp] = useState(false);

  // State to hold active live backend data
  const [generatedMeals, setGeneratedMeals] = useState<MealItem[]>([]);

  // Main execution submission block hitting the live API routes
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget || parseFloat(budget) <= 0) {
      toast.error("Please enter or select a valid budget");
      return;
    }

    setIsLoading(true);
    try {
      const response = await mealService.generateMeals(budget);
      if (response.success && response.data) {
        setGeneratedMeals(response.data);
        setHasGenerated(true);
        toast.success(response.message || "Optimal feeding array calculated!");
      } else {
        toast.error(
          "Failed to generate suitable options for this budget setup.",
        );
      }
    } catch (error: any) {
      // Axios global errors are already caught and parsed by interceptors
      toast.error(error.message || "Error generating meal pipeline execution.");
    } finally {
      setIsLoading(false);
    }
  };

  // Re-triggers generation pipeline for updates
  const handleReshuffle = async () => {
    if (!budget) return;
    setIsReshuffling(true);
    try {
      const response = await mealService.generateMeals(budget);
      if (response.success && response.data) {
        setGeneratedMeals(response.data);
        toast.info("Meal variations updated.");
      }
    } catch (error: any) {
      toast.error(error.message || "Reshuffle processing failure.");
    } finally {
      setIsReshuffling(false);
    }
  };

  // Safe category filtering supporting both server configurations ('lunch' / 'morning' combos)
  const renderMealSection = (
    sectionTitle: string,
    backendCategories: string[],
  ) => {
    const filteredMeals = generatedMeals.filter((m) =>
      backendCategories.includes(m.category.toLowerCase()),
    );

    if (filteredMeals.length === 0) return null;

    return (
      <div className="space-y-3">
        <h3 className="capitalize text-xs font-black text-gray-400 tracking-widest px-1">
          {sectionTitle}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredMeals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative lg:pr-[300px] pb-24">
      <div className="relative w-full mb-6 flex flex-col-reverse lg:flex-row lg:items-start justify-between gap-4">
        <div className="w-full">
          <HeroSlider />
        </div>

        <div className="flex justify-end lg:absolute lg:-top-2 lg:right-[-280px] flex-shrink-0 z-30">
          <HeaderActions />
        </div>
      </div>

      <div className="relative z-20 -mt-12 sm:-mt-16 lg:-mt-20 mx-auto lg:mx-0 max-w-4xl px-2 sm:px-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-md space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-[#1A2E35] text-xs font-black uppercase tracking-wider mb-2">
                What&apos;s your budget?
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter amount e.g 1500"
                className={`w-full p-4 bg-gray-50/50 rounded-xl border font-bold text-sm outline-none transition-all ${
                  budget
                    ? "border-green-700 bg-white ring-4 ring-green-700/5"
                    : "border-gray-200 focus:border-green-700"
                }`}
              />
            </div>

            {/* Quick Selection Options Grid */}
            <div className="space-y-2">
              <span className="block text-[#1A2E35] text-xs font-black uppercase tracking-wider">
                Quick Select
              </span>
              <div className="flex gap-2 flex-wrap">
                {["1000", "2000", "3000", "4000"].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setBudget(amt)}
                    className={`py-2 px-4 rounded-full text-xs font-extrabold border transition-all cursor-pointer ${
                      budget === amt
                        ? "bg-green-700 border-green-700 text-white shadow-sm"
                        : "bg-white border-gray-200 text-[#1A2E35] hover:border-gray-300"
                    }`}
                  >
                    ₦{parseInt(amt).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {!hasGenerated && (
              <>
                <div className="flex items-center gap-1.5 select-none">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 opacity-50"
                  >
                    <path
                      d="M8.77778 11.1111H8V8H7.22222M8 4.88889H8.00778M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                      stroke="#1A1A2E"
                      strokeOpacity="0.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[11px] font-medium text-gray-400 tracking-tight">
                    Prices may vary by location or market conditions
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-green-700 text-white hover:bg-green-800 font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Analyzing..." : "Generate Meal"}
                </button>
              </>
            )}
          </form>
        </div>

        {hasGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mt-8"
          >
            <div className="flex justify-between items-center px-1">
              <h2 className="text-base font-black text-[#1A2E35]">
                Generated Meals
              </h2>
              <button
                onClick={handleReshuffle}
                disabled={isReshuffling}
                className={`flex items-center gap-2 text-xs font-extrabold py-2 px-4 rounded-xl transition-all cursor-pointer ${
                  isReshuffling
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <FiRefreshCw className={isReshuffling ? "animate-spin" : ""} />
                Reshuffle
              </button>
            </div>

            {/* Support displaying combinations of categories gracefully */}
            {renderMealSection("Breakfast", ["morning", "breakfast"])}
            {renderMealSection("Lunch & Dinner", [
              "afternoon",
              "lunch",
              "evening",
              "dinner",
            ])}

            {generatedMeals.length === 0 && (
              <p className="text-center text-xs font-bold text-gray-400 py-6">
                No matching combinations found inside this budget loop. Try
                selecting a larger target.
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* RIGHT SIDEBAR GUIDE */}
      <aside className="hidden lg:block w-[260px] fixed top-[120px] right-8 bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
        <h4 className="text-xs font-black text-[#1A2E35] flex items-center gap-1.5 capitalize tracking-wide mb-6">
          How <span className="text-green-700 capitalize">ChopBeta</span> Works
        </h4>

        <div className="relative space-y-6">
          {[
            {
              num: "1",
              title: "Tell us your budget",
              desc: "Enter an amount or choose a quick shortcut asset value.",
            },
            {
              num: "2",
              title: "We find the best meals",
              desc: "ChopBeta suggests affordable and filling meals for you.",
            },
            {
              num: "3",
              title: "Review your meal plans",
              desc: "Inspect specific calculated profiles, micro-calories, and savings matrices.",
            },
            {
              num: "4",
              title: "Eat smart & save more",
              desc: "Stick directly to your designated targets and lower your feeding expenses.",
            },
          ].map((item, idx, arr) => (
            <div
              key={item.num}
              className="flex gap-3 items-start relative group"
            >
              {idx !== arr.length - 1 && (
                <div className="absolute left-3 top-6 bottom-[-18px] w-[2px] border-l-2 border-dashed border-gray-200 z-0" />
              )}
              <span className="relative z-10 w-6 h-6 rounded-full bg-green-700 text-green-50 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 shadow-2xs">
                {item.num}
              </span>
              <div className="relative z-10">
                <h5 className="font-bold text-[#1A2E35] text-[11px]">
                  {item.title}
                </h5>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MOBILE FLOATING HELP ACTION TRIGGER */}
      <button
        type="button"
        onClick={() => setShowMobileHelp(true)}
        className="lg:hidden fixed bottom-28 right-6 w-12 h-12 rounded-full bg-green-700 text-white shadow-xl flex items-center justify-center z-40 active:scale-95 transition-transform cursor-pointer"
      >
        <FiHelpCircle size={22} />
      </button>

      <InstructionModal
        isOpen={showMobileHelp}
        onClose={() => setShowMobileHelp(false)}
      />
    </div>
  );
}
