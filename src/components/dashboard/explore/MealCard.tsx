"use client";

import React from "react";

type Props = {
  id?: number;
  title: string;
  desc: string;
  price: number;
  calories: number;
  img: string;
};

export default function MealCard({ title, desc, price, calories, img }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-shadow">
      <div className="relative h-44 w-full bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-4 left-4 z-20 text-white space-y-0.5">
          <h3 className="font-bold text-base leading-tight">{title}</h3>
          <p className="text-[11px] text-gray-300 font-light">{desc}</p>
        </div>
      </div>

      <div className="p-4 bg-[#14131B] text-white flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-white">₦{price}</p>
          <p className="text-[10px] text-gray-400">{calories} kcal</p>
        </div>
        <button className="w-full bg-[#1E5E3A] hover:bg-emerald-800 text-white text-xs font-medium py-2.5 rounded-lg transition-colors">
          Add to plan
        </button>
      </div>
    </div>
  );
}
 