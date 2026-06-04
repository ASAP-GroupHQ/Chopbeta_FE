"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiHelpCircle } from "react-icons/fi";
import { toast } from "react-toastify";
// import LayoutWrapper from "@/components/dashboard/LayoutWrapper";
import HeroSlider from "./components/HeroSlider";
import MealCard from "./components/MealCard";
import InstructionModal from "./components/InstructionModal";
import HeaderActions from "@/components/dashboard/HeaderActions";

const MOCK_GENERATED_MEALS = [
  {
    _id: "6a182cbd175c1e1e9f0b8bfc",
    mealTitle: "Rice and Beans",
    category: "morning",
    estimatedPrice: { $numberDecimal: "2000" },
    averageNutritionalInfo: {
      estimatedCalories: 350,
      macronutrients: { carbohydrates: 45, proteins: 14, fats: 8 },
    },
  },
  {
    _id: "6a182cbd175c1e1e9f0b8bfd",
    mealTitle: "Pap & Akara",
    category: "morning",
    estimatedPrice: { $numberDecimal: "1000" },
    averageNutritionalInfo: {
      estimatedCalories: 280,
      macronutrients: { carbohydrates: 38, proteins: 9, fats: 6 },
    },
  },
  {
    _id: "6a182d40e8972f804a0a6522",
    mealTitle: "Indomie and Eggs",
    category: "afternoon",
    estimatedPrice: { $numberDecimal: "1000" },
    averageNutritionalInfo: {
      estimatedCalories: 410,
      macronutrients: { carbohydrates: 52, proteins: 12, fats: 14 },
    },
  },
];

export default function GeneratePage() {
  const [budget, setBudget] = useState("");
  const [isReshuffling, setIsReshuffling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showMobileHelp, setShowMobileHelp] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget || parseFloat(budget) <= 0) {
      toast.error("Please enter or select a valid budget");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasGenerated(true);
      toast.success("Optimal feeding array calculated!");
    }, 1500);
  };

  const handleReshuffle = () => {
    setIsReshuffling(true);
    setTimeout(() => {
      setIsReshuffling(false);
      toast.info("Meal variations updated successfully.");
    }, 1200);
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
                {["500", "1000", "1500", "2000"].map((amt) => (
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
                    ₦{amt}
                  </button>
                ))}
              </div>
            </div>

            {!hasGenerated && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-green-700 text-white hover:bg-green-800 font-extrabold text-sm rounded-xl transition-all mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.05995 3.90862L4.34563 5.42864L5.86564 2.71432L4.34563 0L7.05995 1.52002L9.77426 0L8.25425 2.71432L9.77426 5.42864L7.05995 3.90862ZM20.0887 14.5488L22.803 13.0287L21.283 15.7431L22.803 18.4574L20.0887 16.9374L17.3744 18.4574L18.8944 15.7431L17.3744 13.0287L20.0887 14.5488ZM22.803 0L21.283 2.71432L22.803 5.42864L20.0887 3.90862L17.3744 5.42864L18.8944 2.71432L17.3744 0L20.0887 1.52002L22.803 0ZM13.4006 11.7041L16.0498 9.05497L13.748 6.75323L11.0989 9.4024L13.4006 11.7041ZM14.5189 5.7435L17.0595 8.2841C17.4829 8.68582 17.4829 9.39155 17.0595 9.81498L4.38905 22.4854C3.96562 22.9089 3.2599 22.9089 2.85818 22.4854L0.317575 19.9448C-0.105858 19.5431 -0.105858 18.8374 0.317575 18.4139L12.988 5.7435C13.4115 5.32007 14.1172 5.32007 14.5189 5.7435Z"
                    fill="white"
                  />
                </svg>
                {isLoading ? "Analyzing..." : "Generate Meal"}{" "}
              </button>
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
                Generated Meal
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

            {["morning", "afternoon"].map((sec) => (
              <div key={sec} className="space-y-3">
                <h3 className="capitalize text-xs font-black text-gray-400 tracking-widest px-1">
                  {sec === "morning" ? "Breakfast" : "Lunch"}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {MOCK_GENERATED_MEALS.filter((m) => m.category === sec).map(
                    (meal) => (
                      <MealCard key={meal._id} meal={meal} />
                    ),
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* RIGHT SIDEBAR GUIDE */}
      <aside className="hidden lg:block w-[260px] fixed top-[120px] right-8 bg-white border border-gray-100 rounded-2xl p-5 shadow-xs">
        <h4 className="text-xs font-black text-[#1A2E35] flex items-center gap-1.5 capitalize tracking-wide mb-6">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.1473 17.7982C15.9557 16.9693 17.8274 15.8274 18.1705 12.9697C18.3076 12.0946 18.2618 11.2006 18.0362 10.3441C17.8106 9.48762 17.41 8.68714 16.8597 7.99313C16.3093 7.29913 15.6212 6.72666 14.8386 6.31181C14.056 5.89696 13.196 5.64873 12.3128 5.58276C11.4295 5.51678 10.5421 5.6345 9.70662 5.92849C8.8711 6.22249 8.10556 6.68638 7.45823 7.29092C6.81089 7.89547 6.29582 8.62756 5.94547 9.44105C5.59512 10.2545 5.41709 11.1318 5.42261 12.0175C5.42261 15.5833 7.58311 16.8798 8.50144 17.7982C9.22161 18.5401 9.11044 18.818 9.11044 20.0143C9.10207 20.165 9.12451 20.3159 9.17639 20.4578C9.22826 20.5996 9.30849 20.7294 9.41218 20.8391C9.51587 20.9489 9.64084 21.0365 9.77947 21.0964C9.91809 21.1563 10.0675 21.1873 10.2185 21.1875H13.4302C13.5814 21.1878 13.7309 21.1571 13.8697 21.0974C14.0085 21.0377 14.1337 20.9501 14.2374 20.8402C14.3411 20.7303 14.4211 20.6003 14.4727 20.4583C14.5242 20.3162 14.5461 20.1651 14.5371 20.0143C14.4827 18.795 14.3377 18.6295 15.1473 17.7982Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.96354 21.1213V22.9483C9.96354 23.4473 10.2415 23.857 10.5834 23.857H13.0641C13.4085 23.857 13.6852 23.4461 13.6852 22.9483V21.1213M10.8819 8.38546C10.1684 8.38578 9.48425 8.66943 8.97986 9.17405C8.47547 9.67867 8.19213 10.3629 8.19213 11.0764M20.6839 12.2618H22.9M18.4533 4.99729L20.0253 3.42525M19.6616 18.4195L21.2337 19.9903M11.8244 0.75V2.54196M3.65604 3.42404L5.21721 4.99729M2.44771 19.9903L4.00888 18.4195M2.96488 12.2618H0.75"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          How{" "}
          <span className="text-green-700 capitalize">
            Chop<span className="text-[#E85D26] capitalize">Beta</span>
          </span>{" "}
          Works
        </h4>

        {/* Timeline Node Chain Layout */}
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
              desc: "ChopBeta suggest affordable and filling meals for you.",
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
              {/* Dotted Vertical Connector Line Lineage */}
              {idx !== arr.length - 1 && (
                <div className="absolute left-3 top-6 bottom-[-18px] w-[2px] border-l-2 border-dashed border-gray-200 z-0" />
              )}

              {/* Step Circular Index Node */}
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
