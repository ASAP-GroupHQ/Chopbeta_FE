"use client";

import { useEffect, useState } from "react";
import ExploreHeader from "@/components/dashboard/explore/ExploreHeader";
import FilterTags from "@/components/dashboard/explore/FilterTags";
import MealCard from "@/components/dashboard/explore/MealCard";
import LoadingState from "@/components/ui/LoadingState";
import { ExploreCategory, exploreService, type ExploreMeal } from "@/services/explore";

const TAGS = [
  ExploreCategory.All,
  ExploreCategory.Rice,
  ExploreCategory.Soups,
  ExploreCategory.Swallow,
  ExploreCategory.Snacks,
  ExploreCategory.Others,
];

export default function ExplorePage() {
  const [meals, setMeals] = useState<ExploreMeal[]>([]);
  const [activeTag, setActiveTag] = useState<string>(ExploreCategory.All);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    let active = true;

    const loadMeals = async () => {
      setIsLoading(true);
      setError(null);

      setCurrentPage(1);

      try {
        const response = await exploreService.getMeals({ tag: activeTag, search: searchValue });
        if (active) {
          setMeals(response);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load meals right now.");
          setMeals([]);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadMeals();

    return () => {
      active = false;
    };
  }, [activeTag, searchValue]);

  const totalPages = Math.max(1, Math.ceil(meals.length / itemsPerPage));
  const visibleMeals = meals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="flex-1 p-2">
      <ExploreHeader searchValue={searchValue} onSearchChange={setSearchValue} />
      <FilterTags tags={TAGS} activeTag={activeTag} onSelectTag={setActiveTag} />

      <div className="mt-6 text-sm font-medium text-gray-500">
        {isLoading ? "Loading meals..." : `${visibleMeals.length} of ${meals.length} meals found`}
      </div>

      {isLoading ? (
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <LoadingState message="Fetching meals....." />
        </div>
      ) : error ? (
        <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600">
          {error}
        </div>
      ) : visibleMeals.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No meals match this filter yet.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleMeals.map((meal) => (
            <MealCard
              key={meal.id}
              id={meal.id}
              title={meal.title}
              desc={meal.desc}
              price={meal.price}
              calories={meal.calories}
              imageUrl={meal.imageUrl}
            />
          ))}
        </div>
      )}
      {!isLoading && !error && meals.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
          <div>Page {currentPage} of {totalPages}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300"
            >
              1
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300"
            >
              2
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
