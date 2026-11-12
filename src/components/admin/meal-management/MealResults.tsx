"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, Pencil, Search, Trash2 } from "lucide-react";
import { MEALS_DATA } from "@/constants/admin-management";

type Meal = (typeof MEALS_DATA)[number];

interface MealResultsProps {
  meals: Meal[];
  resultCount: number;
  firstItem: number;
  lastItem: number;
  currentPage: number;
  pageCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export default function MealResults({
  meals,
  resultCount,
  firstItem,
  lastItem,
  currentPage,
  pageCount,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: MealResultsProps) {
  return (
    <>
      <div className="hidden overflow-x-auto border-t border-gray-100 md:block">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-[#E8EBF7] text-[11px] font-semibold tracking-wide text-[#4D5EAE]">
              <th scope="col" className="px-4 py-3.5 sm:px-5">Meal</th>
              <th scope="col" className="px-4 py-3.5">Category</th>
              <th scope="col" className="px-4 py-3.5">Price</th>
              <th scope="col" className="px-4 py-3.5">Calories</th>
              <th scope="col" className="px-4 py-3.5">Status</th>
              <th scope="col" className="px-4 py-3.5">Date Added</th>
              <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-xs text-[#344054]">
            {meals.map((meal) => (
              <tr
                key={meal.id}
                className="bg-[#F7F8FC] transition hover:bg-[#F0F2FA]"
              >
                <td className="px-4 py-3 sm:px-5">
                  <div className="flex min-w-[220px] items-center gap-3">
                    <MealImage meal={meal} size="table" />
                    <div className="min-w-0">
                      <h3 className="font-bold text-[#1A2E35]">{meal.name}</h3>
                      <p className="mt-0.5 max-w-[220px] truncate text-[10px] text-gray-500">
                        {meal.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{meal.category}</td>
                <td className="px-4 py-3 font-semibold text-[#1A2E35]">{meal.price}</td>
                <td className="px-4 py-3 text-gray-600">{meal.calories}</td>
                <td className="px-4 py-3"><MealStatus status={meal.status} /></td>
                <td className="whitespace-pre-line px-4 py-3 text-[10px] leading-4 text-gray-500">
                  {meal.dateAdded}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end"><MealActions meal={meal} /></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-gray-100 border-t border-gray-100 md:hidden">
        {meals.map((meal) => (
          <article key={meal.id} className="space-y-3 bg-white p-4">
            <div className="flex items-start gap-3">
              <MealImage meal={meal} size="card" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#1A2E35]">{meal.name}</h3>
                  <MealStatus status={meal.status} compact />
                </div>
                <p className="mt-1 text-[11px] leading-4 text-gray-500">{meal.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#F7F8FC] p-3 text-[10px]">
              <div>
                <p className="text-gray-400">Category</p>
                <p className="mt-0.5 font-semibold text-gray-700">{meal.category}</p>
              </div>
              <div>
                <p className="text-gray-400">Price</p>
                <p className="mt-0.5 font-semibold text-gray-700">{meal.price}</p>
              </div>
              <div>
                <p className="text-gray-400">Calories</p>
                <p className="mt-0.5 font-semibold text-gray-700">{meal.calories}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <span className="whitespace-pre-line text-[10px] leading-4 text-gray-400">
                Added {meal.dateAdded}
              </span>
              <MealActions meal={meal} />
            </div>
          </article>
        ))}
      </div>

      {meals.length === 0 && <EmptyMeals />}

      <footer className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-center font-medium text-gray-500 sm:text-left">
          Showing{" "}
          <span className="font-bold text-[#1A2E35]">{firstItem}–{lastItem}</span>{" "}
          of <span className="font-bold text-[#1A2E35]">{resultCount}</span> meals
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#1E6B3C] px-2 font-bold text-white">
              {currentPage}
            </span>
            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage >= pageCount}
              onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <label className="flex items-center gap-2 text-gray-500">
            <span className="sr-only">Meals per page</span>
            <select
              value={itemsPerPage}
              onChange={(event) => onItemsPerPageChange(Number(event.target.value))}
              className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-[11px] font-medium text-[#344054] outline-none focus:border-[#1E6B3C]"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </label>
        </div>
      </footer>
    </>
  );
}

function MealImage({ meal, size }: { meal: Meal; size: "table" | "card" }) {
  const isCard = size === "card";
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-gray-100 ${
        isCard ? "h-14 w-14 rounded-xl" : "h-10 w-10 rounded-lg"
      }`}
    >
      <Image
        src={meal.image}
        alt={meal.name}
        fill
        sizes={isCard ? "56px" : "40px"}
        className="object-cover"
      />
    </div>
  );
}

function MealStatus({
  status,
  compact = false,
}: {
  status: string;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#E4F1E9] px-2.5 py-1 text-[10px] font-semibold text-[#1E6B3C] ${
        compact ? "shrink-0 px-2" : ""
      }`}
    >
      {!compact && <span className="h-1.5 w-1.5 rounded-full bg-[#1E6B3C]" />}
      {status}
    </span>
  );
}

function MealActions({ meal }: { meal: Meal }) {
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={`/admin/meals/${meal.id}`}
        aria-label={`View ${meal.name}`}
        className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        <Eye className="h-3 w-3" />
        <span>View</span>
      </Link>
      <Link
        href={`/admin/meals/${meal.id}/edit`}
        aria-label={`Edit ${meal.name}`}
        className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        <Pencil className="h-3 w-3" />
        <span>Edit</span>
      </Link>
      <button
        type="button"
        onClick={() => alert(`Delete meal ${meal.name}?`)}
        aria-label={`Delete ${meal.name}`}
        className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-700 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
      >
        <Trash2 className="h-3 w-3" />
        <span>Delete</span>
      </button>
    </div>
  );
}

function EmptyMeals() {
  return (
    <div className="border-t border-gray-100 px-5 py-12 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Search className="h-5 w-5" />
      </div>
      <p className="mt-3 text-sm font-semibold text-[#1A2E35]">No meals found</p>
      <p className="mt-1 text-xs text-gray-500">
        Try changing your search or filters.
      </p>
    </div>
  );
}
