"use client";

import { useEffect, useMemo, useState } from "react";
import ExploreHeader from "@/components/dashboard/explore/ExploreHeader";
import FilterTags from "@/components/dashboard/explore/FilterTags";
import MealCard from "@/components/dashboard/explore/MealCard";
import LoadingState from "@/components/ui/LoadingState";
import { exploreService, type ExploreMeal } from "@/services/explore";

const TAGS = ["All", "Rice", "Soup", "Swallow", "Snacks", "Protein", "Vegetarian"];

export default function ExplorePage() {
  const [meals, setMeals] = useState<ExploreMeal[]>([]);
  const [activeTag, setActiveTag] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadMeals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await exploreService.getMeals({ tag: activeTag });
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
  }, [activeTag]);

  const visibleMeals = useMemo(() => {
    if (!activeTag || activeTag === "All") {
      return meals;
    }

    return meals.filter((meal) => {
      const tags = meal.tags ?? [];
      const category = meal.category?.toLowerCase();
      return tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase()) ||
        category === activeTag.toLowerCase();
    });
  }, [activeTag, meals]);

  return (
    <main className="flex-1 p-2">
      <ExploreHeader />
      <FilterTags tags={TAGS} activeTag={activeTag} onSelectTag={setActiveTag} />

      <div className="mt-6 text-sm font-medium text-gray-500">
        {isLoading ? "Loading meals..." : `${visibleMeals.length} meals found`}
      </div>

      {isLoading ? (
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <LoadingState message="Fetching meals from the API..." />
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
              img={meal.img}
            />
          ))}
        </div>
      )}
    </main>
  );
}
