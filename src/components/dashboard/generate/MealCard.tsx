"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiActivity, FiX, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { MealItem } from "@/types/meal";
import { mealService } from "@/services/meal";

interface MealCardProps {
  meal: MealItem;
}

export default function MealCard({ meal }: MealCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  // Extract nutrition properties safely matching the type definition structure
  const nutrition = meal.averageNutritionalInfo || {};

  // Safe cast to support both 'estimatedMacronutrients' and legacy 'macronutrients'
  const macros =
    (nutrition as any).estimatedMacronutrients ||
    (nutrition as any).macronutrients ||
    {};

  const calories = nutrition.estimatedCalories || "0";
  const carbs = macros.carbohydrates || "0";
  const proteins = macros.proteins || "0";
  const fats = macros.fats || "0";

  // Handle live tracking API submission to add the meal to the user's planner
  const handleAddMealPlan = async () => {
    if (isAdding) return;

    setIsAdding(true);

    try {
      // Hit the correct tracker endpoint using the meal database _id
      const response = await mealService.addToPlanned(meal._id);

      if (response.success) {
        setIsAdded(true);
        toast.success(`${meal.mealTitle} added to your plan successfully! 🍽️`);
      } else {
        toast.error(response.message || "Failed to add meal to planner.");
      }
    } catch (error: any) {
      toast.error(
        error.message || "Error adding meal to planner. Please try again.",
      );
    } finally {
      setIsAdding(false);
    }
  };

  // Enhanced fallback imagery matching typical ChopBeta meal options
  const getImagePlaceholder = (title: string) => {
    const lowerTitle = title.toLowerCase();

    if (
      lowerTitle.includes("rice") ||
      lowerTitle.includes("jollof") ||
      lowerTitle.includes("fried rice")
    )
      return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500";
    if (
      lowerTitle.includes("egg") ||
      lowerTitle.includes("bread") ||
      lowerTitle.includes("tea") ||
      lowerTitle.includes("pap") ||
      lowerTitle.includes("akara")
    )
      return "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500";
    if (
      lowerTitle.includes("swallow") ||
      lowerTitle.includes("egusi") ||
      lowerTitle.includes("fufu") ||
      lowerTitle.includes("amala")
    )
      return "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=500";
    if (
      lowerTitle.includes("beans") ||
      lowerTitle.includes("dodo") ||
      lowerTitle.includes("plantain")
    )
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500";
    if (
      lowerTitle.includes("yam") ||
      lowerTitle.includes("potatoes") ||
      lowerTitle.includes("fries")
    )
      return "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=500";
    if (
      lowerTitle.includes("spaghetti") ||
      lowerTitle.includes("pasta") ||
      lowerTitle.includes("indomie") ||
      lowerTitle.includes("noodles")
    )
      return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500";

    return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500";
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col justify-between"
      >
        <div>
          {/* Card Image Area Frame */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-50">
            <img
              src={getImagePlaceholder(meal.mealTitle)}
              alt={meal.mealTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dynamic Add Toggle Button */}
            <button
              type="button"
              onClick={handleAddMealPlan}
              disabled={isAdding}
              className={`absolute top-2 right-2 p-2 rounded-xl shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer z-10 ${
                isAdded
                  ? "bg-green-700 text-white"
                  : "bg-white/90 backdrop-blur-sm text-[#1A2E35] hover:bg-green-50 hover:text-green-700"
              } ${isAdding ? "opacity-75 pointer-events-none" : ""}`}
            >
              {isAdding ? (
                <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiPlus
                  size={16}
                  className={`stroke-[3] transition-colors ${
                    isAdded
                      ? "text-white"
                      : "text-[#1A2E35] group-hover:text-green-700"
                  }`}
                />
              )}
            </button>
          </div>

          <h3 className="font-bold text-[#1A2E35] text-sm px-1 line-clamp-1 mb-1">
            {meal.mealTitle}
          </h3>
        </div>

        {/* Footing Meta Details Blocks */}
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50 px-1">
          <span className="font-extrabold text-green-700 text-sm">
            ₦{parseFloat(meal.estimatedPrice.$numberDecimal).toLocaleString()}
          </span>

          <button
            type="button"
            onClick={() => setShowNutrition(true)}
            className="flex items-center gap-1 text-[11px] font-black text-gray-400 hover:text-green-700 transition-colors cursor-pointer uppercase tracking-wider"
          >
            <FiActivity size={12} /> Nutrition
          </button>
        </div>
      </motion.div>

      {/* MACRONUTRIENT POPUP DETAIL OVERLAY DRAWER */}
      <AnimatePresence>
        {showNutrition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNutrition(false)}
              className="absolute inset-0 bg-[#1A2E35]/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-green-700 uppercase block mb-0.5">
                    Macro Breakdown
                  </span>
                  <h4 className="font-black text-base text-[#1A2E35]">
                    {meal.mealTitle}
                  </h4>
                </div>
                <button
                  onClick={() => setShowNutrition(false)}
                  className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 transition-colors cursor-pointer"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Data Values Matrix Presentation Layout Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-gray-50/70 rounded-xl text-center">
                  <span className="text-[10px] block font-bold text-gray-400 uppercase tracking-wider">
                    Calories
                  </span>
                  <span className="text-base font-black text-[#1A2E35]">
                    {calories} kcal
                  </span>
                </div>
                <div className="p-3 bg-gray-50/70 rounded-xl text-center">
                  <span className="text-[10px] block font-bold text-gray-400 uppercase tracking-wider">
                    Carbs
                  </span>
                  <span className="text-base font-black text-blue-600">
                    {carbs} g
                  </span>
                </div>
                <div className="p-3 bg-gray-50/70 rounded-xl text-center">
                  <span className="text-[10px] block font-bold text-gray-400 uppercase tracking-wider">
                    Proteins
                  </span>
                  <span className="text-base font-black text-emerald-600">
                    {proteins} g
                  </span>
                </div>
                <div className="p-3 bg-gray-50/70 rounded-xl text-center">
                  <span className="text-[10px] block font-bold text-gray-400 uppercase tracking-wider">
                    Fats
                  </span>
                  <span className="text-base font-black text-amber-500">
                    {fats} g
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
0