"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Ellipsis,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import {
  PRICE_STATS,
  PRICE_MANAGEMENT_DATA,
} from "@/constants/admin-management";

const mealImages: Record<string, string> = {
  "Rice & Beans": "/images/meals/beans and plantain.png",
  "Pap & Akara": "/images/meals/Puff-puff.jpg",
  Noodles: "/images/meals/quick-meal.png",
  "Bread & Egg": "/images/meals/Fried-Rice.png",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export default function PriceManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [prices, setPrices] = useState(PRICE_MANAGEMENT_DATA);
  const [mealToDelete, setMealToDelete] = useState<
    (typeof PRICE_MANAGEMENT_DATA)[number] | null
  >(null);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mealToDelete) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelDeleteRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMealToDelete(null);
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mealToDelete]);

  const handlePriceChange = (id: string, delta: number) => {
    setPrices((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedPrice = Math.max(0, item.newPrice + delta);
          return { ...item, newPrice: updatedPrice };
        }
        return item;
      }),
    );
  };

  const handleDeleteMeal = () => {
    if (!mealToDelete) return;
    setPrices((prev) => prev.filter((item) => item.id !== mealToDelete.id));
    setMealToDelete(null);
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* HEADER BANNER */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black tracking-tight text-[#202035] sm:text-3xl">
              Price Management
            </h1>
            <p className="text-xs font-medium text-[#7b7b8e] sm:text-sm">
              Update and manage prices to reflect current market conditions.
            </p>
          </div>
          <div className="flex justify-end">
            <HeaderActions />
          </div>
        </div>

        {/* STATS SUMMARY ROW */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          {PRICE_STATS.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className={`relative flex min-h-[76px] items-center gap-3 overflow-hidden rounded-xl border bg-white/70 px-3 py-2.5 shadow-[0_2px_8px_rgba(47,39,68,0.03)] sm:px-3.5 ${stat.borderColor}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf4ef]">
                  <IconComponent className="h-9 w-9 object-contain" />
                </div>
                <div className="z-10 min-w-0 flex-1 space-y-0.5">
                  <span className="block truncate text-[11px] font-medium text-[#818193]">
                    {stat.title}
                  </span>
                  <h3 className="text-lg font-bold leading-tight text-[#202035]">
                    {stat.value}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    <span
                      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                        stat.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span>{stat.isPositive ? "↑" : "↑"}</span> {stat.change}
                    </span>
                    <span className="text-[9px] font-medium text-[#89899a]">
                      {stat.trendText}
                    </span>
                  </div>
                </div>

                <div className="z-10 flex h-full shrink-0 flex-col items-end justify-between gap-2">
                  <div className="h-6 w-9">
                    {stat.chartType === "up" && (
                      <svg
                        width="42"
                        height="25"
                        viewBox="0 0 42 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 23.221L14.3333 9.88841L23.2222 18.7768L41 1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="#1E6B3C"
                        />
                        <path
                          d="M32.1055 1H40.9944V9.8884"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="#1E6B3C"
                        />
                      </svg>
                    )}
                    {stat.chartType === "up-red" && (
                      <svg
                        width="40"
                        height="25"
                        viewBox="0 0 40 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 23.221L13.4074 9.88841L21.679 18.7768L38.2222 1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="#DF1C41"
                        />
                        <path
                          d="M29.9453 1H38.2169V9.8884"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="#DF1C41"
                        />
                      </svg>
                    )}
                    {stat.chartType === "down" && (
                      <svg
                        width="38"
                        height="23"
                        viewBox="0 0 38 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M37.2212 11.1112C37.2212 10.6201 37.0033 10.1492 36.6155 9.80197C36.2278 9.45475 35.7018 9.25968 35.1535 9.25968C34.6051 9.25968 34.0791 9.45475 33.6914 9.80197C33.3036 10.1492 33.0858 10.6201 33.0858 11.1112V15.3695L24.3187 6.11218C24.0022 5.78089 23.5653 5.56026 23.0849 5.48913C22.6045 5.41801 22.1115 5.50096 21.6927 5.72337L12.8637 10.5557L3.66241 0.668844C3.48863 0.481627 3.27537 0.326892 3.0348 0.213475C2.79423 0.100058 2.53108 0.0301796 2.26035 0.00782931C1.98963 -0.014521 1.71664 0.0110952 1.45697 0.0832142C1.1973 0.155333 0.956035 0.272543 0.746954 0.428152C0.537873 0.583761 0.365068 0.774722 0.238406 0.990131C0.111743 1.20554 0.0337042 1.44118 0.00874372 1.68359C-0.0162167 1.92601 0.0123905 2.17045 0.092932 2.40296C0.173474 2.63548 0.304372 2.85151 0.478154 3.03873L10.8166 14.1476C11.1314 14.4865 11.5709 14.7137 12.0561 14.7883C12.5412 14.863 13.0402 14.7802 13.4633 14.5549L22.313 9.79661L30.5838 18.5171H24.815C24.2666 18.5171 23.7407 18.7121 23.3529 19.0593C22.9651 19.4066 22.7473 19.8775 22.7473 20.3685C22.7473 20.8596 22.9651 21.3305 23.3529 21.6777C23.7407 22.0249 24.2666 22.22 24.815 22.22H35.1535C35.4079 22.2144 35.6596 22.1706 35.8978 22.0904L36.1873 21.9423C36.2959 21.895 36.3997 21.8392 36.4975 21.7756C36.6097 21.6832 36.7071 21.5773 36.7869 21.4609C36.8569 21.3793 36.9192 21.2926 36.973 21.2017C37.0247 21.1019 37.0595 20.9959 37.0764 20.8869C37.1594 20.7234 37.2084 20.5478 37.2212 20.3685V11.1112Z"
                          fill="#2E8B57"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FILTER & ACTION BAR */}
        <div className="flex flex-col items-stretch justify-between gap-2.5 rounded-xl border border-[#e9e3ed] bg-white/80 p-3 shadow-[0_2px_8px_rgba(47,39,68,0.03)] lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative w-full lg:max-w-md lg:flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a0a0af]"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search meal by name, category or keyword......"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-[#e7e5ec] bg-white pl-9 pr-3 text-xs font-medium text-[#28283c] outline-none transition placeholder:text-[#9292a2] focus:border-[#4c9869] focus:ring-2 focus:ring-[#4c9869]/10"
            />
          </div>

          {/* Filter Dropdowns & Reset */}
          <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
            <div className="relative min-w-0 flex-1 lg:flex-none">
              <select className="h-10 w-full appearance-none rounded-lg border border-[#e7e5ec] bg-white py-2 pl-3 pr-9 text-xs font-semibold text-[#303044] outline-none transition focus:border-[#4c9869] lg:min-w-[145px]">
                <option>All Categories</option>
                <option>Breakfast</option>
                <option>Local Dish</option>
                <option>Quick meal</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77778a]" />
            </div>
            <div className="relative min-w-0 flex-1 lg:flex-none">
              <select className="h-10 w-full appearance-none rounded-lg border border-[#e7e5ec] bg-white py-2 pl-3 pr-9 text-xs font-semibold text-[#303044] outline-none transition focus:border-[#4c9869] lg:min-w-[128px]">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77778a]" />
            </div>
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#e7e5ec] bg-white px-3 text-xs font-semibold text-[#424256] shadow-[0_1px_3px_rgba(47,39,68,0.04)] transition hover:bg-[#faf9fb] sm:w-auto"
            >
              <RotateCcw
                className="h-4 w-4 text-[#747488]"
                aria-hidden="true"
              />{" "}
              Reset Filters
            </button>
          </div>
        </div>

        {/* PRICE MANAGEMENT TABLE */}
        <div className="overflow-hidden rounded-xl border border-[#e9e5ed] bg-white shadow-[0_3px_12px_rgba(47,39,68,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse text-left">
              <thead>
                <tr className="bg-[#eeedf3] text-[10px] font-bold tracking-[0.04em] text-[#38384b] sm:text-[11px]">
                  <th className="px-3 py-2.5 sm:px-4">Meal Image</th>
                  <th className="px-3 py-2.5">Meal Name</th>
                  <th className="px-3 py-2.5">Category</th>
                  <th className="px-3 py-2.5">Current Price</th>
                  <th className="px-3 py-2.5">New Price</th>
                  <th className="px-3 py-2.5">Price Change</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Last updated</th>
                  <th className="px-3 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebe9ef] text-[11px] font-medium text-[#343448] sm:text-xs">
                {prices.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-[#fbfaff]"
                  >
                    {/* Meal Image Thumbnail */}
                    <td className="px-3 py-1.5 sm:px-4">
                      <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-[#eeeaf0] bg-[#f1edf2]">
                        <Image
                          src={
                            mealImages[item.name] ||
                            "/images/meals/Ofada_rice.png"
                          }
                          alt={item.name}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Meal Name */}
                    <td className="whitespace-nowrap px-3 py-1.5 font-semibold text-[#303044]">
                      {item.name}
                    </td>

                    {/* Category Badge */}
                    <td className="px-3 py-1.5">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                          item.categoryType === "local"
                            ? "bg-[#eaf4ed] text-[#378158]"
                            : item.categoryType === "breakfast"
                              ? "bg-[#f8eef9] text-[#b05ac0]"
                              : "bg-[#fff1e9] text-[#ee754c]"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>

                    {/* Current Price */}
                    <td className="whitespace-nowrap px-3 py-1.5 font-medium text-[#737387]">
                      {item.currentPrice}
                    </td>

                    {/* New Price with Stepper */}
                    <td className="px-3 py-1.5">
                      <div className="flex w-[82px] items-center justify-between rounded-md border border-[#e9e7ed] bg-[#fcfbfd] px-2 py-1">
                        <span className="font-semibold text-[#4c4c60]">
                          ₦{item.newPrice.toLocaleString()}
                        </span>
                        <div className="flex flex-col text-[#7a7a8c]">
                          <button
                            type="button"
                            onClick={() => handlePriceChange(item.id, 50)}
                            aria-label={`Increase ${item.name} price`}
                            className="leading-none transition hover:text-[#287749]"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePriceChange(item.id, -50)}
                            aria-label={`Decrease ${item.name} price`}
                            className="leading-none transition hover:text-[#287749]"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Price Change Indicator */}
                    <td className="px-3 py-1.5">
                      <span
                        className={`inline-block whitespace-pre-line text-[10px] font-semibold leading-tight ${
                          item.changeType === "increase"
                            ? "text-[#e0445b]"
                            : item.changeType === "decrease"
                              ? "text-[#369464]"
                              : "text-[#8b8b9b]"
                        }`}
                      >
                        {item.priceChange}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-1.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                          item.status === "Active"
                            ? "bg-[#eaf4ed] text-[#378158]"
                            : "bg-[#f0f1f3] text-[#858896]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td className="whitespace-pre-line px-3 py-1.5 text-[9px] leading-relaxed text-[#77778b] sm:text-[10px]">
                      {item.lastUpdated}
                    </td>

                    {/* Action */}
                    <td className="px-3 py-1.5 text-right">
                      <button
                        type="button"
                        aria-label={`Actions for ${item.name}`}
                        onClick={() => setMealToDelete(item)}
                        className="rounded-md p-1.5 text-[#77778a] transition hover:bg-[#f1eff5] hover:text-[#35354a]"
                      >
                        <Ellipsis className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#eeebf1] px-3 py-3 text-[10px] sm:flex-row sm:px-4">
            <p className="font-medium text-[#858597]">
              Showing{" "}
              <span className="font-semibold text-[#55556a]">1 - 10</span> of{" "}
              <span className="font-semibold text-[#55556a]">2,458 users</span>
            </p>

            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto">
              <button
                type="button"
                className="flex items-center gap-1 whitespace-nowrap rounded-md border border-[#e6e4eb] bg-white px-2.5 py-1.5 font-medium text-[#8a8a9b] transition hover:bg-[#faf9fb]"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2e8b57] font-bold text-white shadow-sm"
                >
                  1
                </button>
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e6e4eb] bg-white font-semibold text-[#55556a] transition hover:bg-[#faf9fb]"
                >
                  2
                </button>
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e6e4eb] bg-white font-semibold text-[#55556a] transition hover:bg-[#faf9fb]"
                >
                  3
                </button>
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e6e4eb] bg-white font-semibold text-[#55556a] transition hover:bg-[#faf9fb]"
                >
                  4
                </button>
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e6e4eb] bg-white font-semibold text-[#55556a] transition hover:bg-[#faf9fb]"
                >
                  5
                </button>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 whitespace-nowrap rounded-md border border-[#e6e4eb] bg-white px-2.5 py-1.5 font-semibold text-[#55556a] transition hover:bg-[#faf9fb]"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mealToDelete && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111122]/75 p-4 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    setMealToDelete(null);
                  }
                }}
              >
                <motion.div
                  role="alertdialog"
                  aria-modal="true"
                  aria-labelledby="delete-meal-title"
                  aria-describedby="delete-meal-description"
                  className="w-full max-w-[390px] rounded-lg border border-[#dedee7] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-5"
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <AlertTriangle
                        className="h-5 w-5 shrink-0 text-[#f21d43]"
                        aria-hidden="true"
                      />
                      <h2
                        id="delete-meal-title"
                        className="text-sm font-semibold tracking-[0.08em] text-[#202035] sm:text-base"
                      >
                        Delete Meal
                      </h2>
                    </div>
                    <button
                      type="button"
                      aria-label="Close dialog"
                      onClick={() => setMealToDelete(null)}
                      className="-mr-1 -mt-1 rounded-md p-1 text-[#77778a] transition hover:bg-[#f3f2f5] hover:text-[#35354a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202035]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <p
                    id="delete-meal-description"
                    className="mt-2 pl-8 text-xs leading-relaxed text-[#737387] sm:text-[13px]"
                  >
                    Are you sure you want to delete {mealToDelete.name}? This
                    action cannot be undone.
                  </p>

                  <div className="mt-5 flex justify-end gap-3">
                    <button
                      ref={cancelDeleteRef}
                      type="button"
                      onClick={() => setMealToDelete(null)}
                      className="min-w-[96px] rounded-md border border-[#dedee7] bg-white px-4 py-2 text-sm font-medium tracking-wide text-[#303044] transition hover:bg-[#f8f7fa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5d5d72]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteMeal}
                      className="min-w-[96px] rounded-md bg-[#e7193f] px-4 py-2 text-sm font-semibold tracking-wide text-white transition hover:bg-[#cc1436] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7193f] active:scale-[0.98]"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
