"use client";

import React from 'react';
import Image from 'next/image';

// TypeScript interfaces for type safety
interface PopularMealItem {
  id: string;
  name: string;
  category: string;
  timesChosen: string;
  progressPercentage: number;
  trendValue: string;
  imageSrc: string;
}

// Data exactly matching the details in the design
const popularMealsData: PopularMealItem[] = [
  {
    id: '1',
    name: 'Bread & Egg',
    category: 'African Dish',
    timesChosen: '2,432',
    progressPercentage: 85,
    trendValue: '8%',
    imageSrc: '/images/bread-egg.jpg', // Replace with your asset paths
  },
  {
    id: '2',
    name: 'Pap & Akara',
    category: 'African Dish',
    timesChosen: '2,432',
    progressPercentage: 60,
    trendValue: '0%',
    imageSrc: '/images/pap-akara.jpg',
  },
  {
    id: '3',
    name: 'Noodles & Egg',
    category: 'African Dish',
    timesChosen: '2,432',
    progressPercentage: 75,
    trendValue: '8%',
    imageSrc: '/images/noodles-egg.jpg',
  },
  {
    id: '4',
    name: 'Rice & Beans',
    category: 'African Dish',
    timesChosen: '2,432',
    progressPercentage: 45,
    trendValue: '8%',
    imageSrc: '/images/rice-beans.jpg',
  },
];

export default function MostPopularMeals() {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-gray-900">Most Popular Meals</h3>
        <button className="text-xs font-semibold text-emerald-600 hover:underline transition-all">
          View all
        </button>
      </div>

      <div className="space-y-5">
        {popularMealsData.map((meal) => (
          <div key={meal.id} className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
              <Image
                src={meal.imageSrc}
                alt={meal.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">{meal.name}</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{meal.category}</p>
                </div>

                <div className="text-left min-w-[90px]">
                  <span className="text-sm font-bold text-gray-900 block leading-tight">
                    {meal.timesChosen}
                  </span>
                  <span className="text-[11px] text-gray-400 font-normal block">
                    times chosen
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-2">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-emerald-800 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${meal.progressPercentage}%` }}
                  />
                </div>

                <div className="flex items-center text-xs font-semibold text-emerald-600 flex-shrink-0">
                  <svg
                    className="w-3 h-3 mr-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  <span>{meal.trendValue}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
