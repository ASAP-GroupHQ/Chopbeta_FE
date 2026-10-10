"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { adminService, toAmount } from "@/services/admin";
import AdminHeader from "@/components/admin/Admin Dashboard/AdminHeader";
import AdminSidebar from "@/components/admin/Admin Dashboard/AdminSidebar";
import PriceManagementStats from "./PriceManagementStats";
import PriceManagementTable from "./PriceManagementTable";
import PriceManagementToolbar from "./PriceManagementToolbar";
import type { PriceMeal, PriceMealCategory, PriceMealStatus } from "./types";

const formatCategory = (category: string): PriceMealCategory => {
  const normalized = category.trim().toLowerCase();
  if (normalized === "local dish" || normalized === "local dishes") return "Local Dish";
  if (normalized === "quick meal" || normalized === "quick meals") return "Quick meal";
  return normalized ? `${normalized[0].toUpperCase()}${normalized.slice(1)}` : "Local Dish";
};

const categoryEmoji: Record<string, string> = {
  breakfast: "🍳",
  lunch: "🍲",
  dinner: "🍛",
  snacks: "🥟",
  drinks: "🥤",
  "quick meal": "🍜",
};

export default function PriceManagementView() {
  const [meals, setMeals] = useState<PriceMeal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<PriceMealCategory | "All Categories">("All Categories");
  const [status, setStatus] = useState<PriceMealStatus | "All Status">("All Status");
  const [isLoading, setIsLoading] = useState(true);
  const [savingMealId, setSavingMealId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    adminService.getMeals()
      .then((apiMeals) => {
        if (!isCurrent) return;
        setMeals(apiMeals.map((meal) => ({
          id: meal._id,
          name: meal.mealTitle,
          category: formatCategory(meal.category),
          currentPrice: toAmount(meal.estimatedPrice),
          newPrice: toAmount(meal.estimatedPrice),
          status: meal.isActive === false ? "Inactive" : "Active",
          lastUpdated: meal.updatedAt
            ? new Date(meal.updatedAt).toLocaleString()
            : "—",
          image: categoryEmoji[meal.category.toLowerCase()] ?? "🍽️",
        })));
      })
      .catch((loadError: Error) => {
        if (isCurrent) setError(loadError.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const filteredMeals = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return meals.filter((meal) => {
      const matchesSearch = meal.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category === "All Categories" || meal.category === category;
      const matchesStatus = status === "All Status" || meal.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [category, meals, searchTerm, status]);

  const handlePriceChange = (id: string, amount: number) => {
    setMeals((currentMeals) => currentMeals.map((meal) =>
      meal.id === id ? { ...meal, newPrice: Math.max(0, meal.newPrice + amount) } : meal,
    ));
  };

  const handleSavePrice = async (id: string) => {
    const meal = meals.find((item) => item.id === id);
    if (!meal || savingMealId) return;

    setSavingMealId(id);
    setError(null);
    try {
      await adminService.updateMeal(id, { estimatedPrice: meal.newPrice });
      setMeals((currentMeals) => currentMeals.map((item) => item.id === id
        ? { ...item, currentPrice: item.newPrice, lastUpdated: new Date().toLocaleString() }
        : item,
      ));
      toast.success(`${meal.name} price updated.`);
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : "Unable to update the meal price.";
      setError(message);
      toast.error(message);
    } finally {
      setSavingMealId(null);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("All Categories");
    setStatus("All Status");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader
          title="Price Management"
          subtitle="Update meal prices to reflect current market conditions."
        />
        <main className="space-y-6 p-4 sm:p-6 lg:p-8">
          {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          {isLoading
            ? <p className="rounded-xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">Loading meal prices...</p>
            : <>
              <PriceManagementStats meals={meals} />
              <PriceManagementToolbar
                searchTerm={searchTerm}
                categories={[...new Set(meals.map((meal) => meal.category))]}
                category={category}
                status={status}
                onSearchChange={setSearchTerm}
                onCategoryChange={setCategory}
                onStatusChange={setStatus}
                onReset={resetFilters}
              />
              <PriceManagementTable
                meals={filteredMeals}
                onPriceChange={handlePriceChange}
                onSavePrice={handleSavePrice}
              />
              {savingMealId && <p role="status" className="text-xs text-slate-500">Saving price...</p>}
            </>}
        </main>
      </div>
    </div>
  );
}
