"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExploreHeader from "@/components/dashboard/explore/ExploreHeader";
import FilterTags from "@/components/dashboard/explore/FilterTags";
import MealCard from "@/components/dashboard/explore/MealCard";
import MealDetailsDialog from "@/components/dashboard/explore/MealDetailsDialog";
import LoadingState from "@/components/ui/LoadingState";
import { exploreService } from "@/services/explore";
import type {
  ExploreMeal,
  ExploreMealType,
  ExploreMealsPage,
  ExploreQuickFilter,
} from "@/types/explore";

const QUICK_FILTERS: ExploreQuickFilter[] = [
  { label: "All meals" },
  { label: "Swallow", type: "swallow" },
  { label: "Soup", type: "soup" },
  { label: "Snacks", type: "snacks" },
  { label: "Rice", type: "rice" },
  { label: "Others", type: "others" },
];

const LOADING_MESSAGES = [
  { afterSeconds: 4, message: "Still searching the menu for a good match..." },
  { afterSeconds: 10, message: "Almost there—bringing the meals to you..." },
];

export default function ExplorePage() {
  const [mealsPage, setMealsPage] = useState<ExploreMealsPage | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<ExploreMeal | null>(null);
  const [activeType, setActiveType] = useState<ExploreMealType | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, 350);

    return () => window.clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    let cancelled = false;

    const loadMeals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await exploreService.getMeals({
          page: currentPage,
          mealTitle: debouncedSearch,
          type: activeType ?? undefined,
        });

        if (!cancelled) setMealsPage(response);
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load meals right now.",
          );
          setMealsPage(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadMeals();

    return () => {
      cancelled = true;
    };
  }, [activeType, currentPage, debouncedSearch]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: ExploreMealType | null) => {
    setActiveType(type);
    setCurrentPage(1);
  };

  const closeMealDetails = useCallback(() => setSelectedMeal(null), []);
  const totalPages = mealsPage?.totalPages;
  const pageNumbers =
    totalPages && totalPages > 1
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : [];

  return (
    <main className="min-w-0 flex-1 p-2 sm:p-4">
      <ExploreHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />
      <FilterTags
        tags={QUICK_FILTERS}
        activeTag={activeType}
        onSelectTag={handleTypeChange}
      />

      <div
        className="mt-6 min-h-5 text-sm font-medium text-gray-500"
        aria-live="polite"
      >
        {isLoading
          ? "Finding meals for you..."
          : mealsPage
            ? mealsPage.totalMeals !== undefined
              ? `${mealsPage.totalMeals} meals found`
              : `${mealsPage.meals.length} meals on this page`
            : ""}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-3xl border border-gray-100 bg-white shadow-sm"
          >
            <LoadingState
              message="Looking through the meal menu..."
              messageSteps={LOADING_MESSAGES}
            />
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-700"
          >
            {error}
          </motion.div>
        ) : mealsPage && mealsPage.meals.length > 0 ? (
          <motion.div
            key={`meals-${currentPage}-${activeType ?? "all"}-${debouncedSearch}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {mealsPage.meals.map((meal, index) => (
              <motion.div
                key={meal._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  delay: Math.min(index * 0.035, 0.25),
                }}
              >
                <MealCard meal={meal} onSelect={setSelectedMeal} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500"
          >
            No meals match your search yet. Try another name or quick filter.
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && !error && mealsPage && mealsPage.meals.length > 0 && (
        <nav
          aria-label="Meal results pages"
          className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600"
        >
          <span>
            Page {currentPage}
            {totalPages ? ` of ${totalPages}` : ""}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="rounded-full border border-gray-200 bg-white px-3 py-2 font-semibold transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300"
            >
              Previous
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                aria-current={currentPage === page ? "page" : undefined}
                onClick={() => setCurrentPage(page)}
                className={`rounded-full border px-3 py-2 font-semibold transition-colors ${
                  currentPage === page
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={!mealsPage.hasMore}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-full border border-gray-200 bg-white px-3 py-2 font-semibold transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300"
            >
              Next
            </button>
          </div>
        </nav>
      )}

      <MealDetailsDialog meal={selectedMeal} onClose={closeMealDetails} />
    </main>
  );
}
