"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Ellipsis,
} from "lucide-react";
import { PRICE_MANAGEMENT_DATA } from "@/constants/admin-management";

export type ManagedPrice = (typeof PRICE_MANAGEMENT_DATA)[number];

interface PriceTableProps {
  prices: ManagedPrice[];
  onPriceChange: (id: string, delta: number) => void;
  onDelete: (meal: ManagedPrice) => void;
}

const mealImages: Record<string, string> = {
  "Rice & Beans": "/images/meals/beans and plantain.png",
  "Pap & Akara": "/images/meals/Puff-puff.jpg",
  Noodles: "/images/meals/quick-meal.png",
  "Bread & Egg": "/images/meals/Fried-Rice.png",
};

export default function PriceTable({
  prices,
  onPriceChange,
  onDelete,
}: PriceTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e9e5ed] bg-white shadow-[0_3px_12px_rgba(47,39,68,0.04)]">
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
                <td className="whitespace-nowrap px-3 py-1.5 font-semibold text-[#303044]">
                  {item.name}
                </td>
                <td className="px-3 py-1.5">
                  <CategoryBadge category={item.category} type={item.categoryType} />
                </td>
                <td className="whitespace-nowrap px-3 py-1.5 font-medium text-[#737387]">
                  {item.currentPrice}
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex w-[82px] items-center justify-between rounded-md border border-[#e9e7ed] bg-[#fcfbfd] px-2 py-1">
                    <span className="font-semibold text-[#4c4c60]">
                      ₦{item.newPrice.toLocaleString()}
                    </span>
                    <div className="flex flex-col text-[#7a7a8c]">
                      <button
                        type="button"
                        onClick={() => onPriceChange(item.id, 50)}
                        aria-label={`Increase ${item.name} price`}
                        className="leading-none transition hover:text-[#287749]"
                      >
                        <ChevronUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onPriceChange(item.id, -50)}
                        aria-label={`Decrease ${item.name} price`}
                        className="leading-none transition hover:text-[#287749]"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </td>
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
                <td className="whitespace-pre-line px-3 py-1.5 text-[9px] leading-relaxed text-[#77778b] sm:text-[10px]">
                  {item.lastUpdated}
                </td>
                <td className="px-3 py-1.5 text-right">
                  <button
                    type="button"
                    aria-label={`Actions for ${item.name}`}
                    onClick={() => onDelete(item)}
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
      <PricePagination />
    </section>
  );
}

function CategoryBadge({
  category,
  type,
}: {
  category: string;
  type: ManagedPrice["categoryType"];
}) {
  const color =
    type === "local"
      ? "bg-[#eaf4ed] text-[#378158]"
      : type === "breakfast"
        ? "bg-[#f8eef9] text-[#b05ac0]"
        : "bg-[#fff1e9] text-[#ee754c]";
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-semibold ${color}`}>
      {category}
    </span>
  );
}

function PricePagination() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#eeebf1] px-3 py-3 text-[10px] sm:flex-row sm:px-4">
      <p className="font-medium text-[#858597]">
        Showing <span className="font-semibold text-[#55556a]">1 - 10</span> of{" "}
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
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              aria-current={page === 1 ? "page" : undefined}
              className={`flex h-7 w-7 items-center justify-center rounded-md font-semibold transition ${
                page === 1
                  ? "bg-[#2e8b57] text-white shadow-sm"
                  : "border border-[#e6e4eb] bg-white text-[#55556a] hover:bg-[#faf9fb]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-1 whitespace-nowrap rounded-md border border-[#e6e4eb] bg-white px-2.5 py-1.5 font-semibold text-[#55556a] transition hover:bg-[#faf9fb]"
        >
          Next <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}
