"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import DeleteMealDialog from "@/components/admin/price-management/DeleteMealDialog";
import PriceFilters from "@/components/admin/price-management/PriceFilters";
import PriceManagementHeader from "@/components/admin/price-management/PriceManagementHeader";
import PriceStats from "@/components/admin/price-management/PriceStats";
import PriceTable from "@/components/admin/price-management/PriceTable";
import { useToast } from "@/context/ToastContext";
import { adminMealsService } from "@/services/admin-meals";
import type { AdminMeal } from "@/types/admin-meals";
import type {
  ManagedPrice,
  PriceStats as PriceStatsData,
} from "@/types/admin-prices";

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
  const [prices, setPrices] = useState<ManagedPrice[]>([]);
  const [stats, setStats] = useState<PriceStatsData | null>(null);
  const [mealToDelete, setMealToDelete] = useState<ManagedPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const toast = useToast();

  useEffect(() => {
    let active = true;
    adminMealsService
      .getMeals()
      .then((meals) => {
        if (!active) return;
        const rows = meals.map(toPriceRow);
        const amounts = meals.map((meal) =>
          adminMealsService.toPrice(meal.estimatedPrice),
        );
        setPrices(rows);
        setStats({
          totalMeals: meals.length,
          averagePrice: amounts.length
            ? amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length
            : 0,
          highestPrice: amounts.length ? Math.max(...amounts) : 0,
          lowestPrice: amounts.length ? Math.min(...amounts) : 0,
        });
        setLoadError("");
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError(
          error instanceof Error ? error.message : "Could not load meal prices.",
          );
          toast.error(
            "Could not load meal prices",
            error instanceof Error ? error.message : "Please try again.",
          );
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [toast]);

  const closeDeleteDialog = useCallback(() => {
    setMealToDelete(null);
  }, []);
  const filteredPrices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return prices.filter(
      (price) =>
        !query ||
        price.name.toLowerCase().includes(query) ||
        price.category.toLowerCase().includes(query),
    );
  }, [prices, searchQuery]);

  const handlePriceChange = useCallback(
    async (id: string, delta: number) => {
      const item = prices.find((price) => price.id === id);
      if (!item) return;
      const nextPrice = Math.max(0, item.newPrice + delta);
      try {
        await adminMealsService.updateMeal(id, { estimatedPrice: nextPrice });
        const nextPrices = prices.map((price) =>
          price.id === id
            ? {
                ...price,
                currentPrice: `₦${nextPrice.toLocaleString("en-NG")}`,
                newPrice: nextPrice,
                priceChange: `${delta > 0 ? "↑" : "↓"} ₦${Math.abs(delta).toLocaleString("en-NG")}`,
                changeType:
                  delta > 0 ? "increase" as const : "decrease" as const,
              }
            : price,
        );
        setPrices(nextPrices);
        setStats(calculatePriceStats(nextPrices));
        toast.success("Meal price updated.");
      } catch (error) {
        toast.error(
          "Could not update meal price",
          error instanceof Error ? error.message : "Please try again.",
        );
      }
    },
    [prices, toast],
  );

  const handleDeleteMeal = useCallback(async () => {
    if (!mealToDelete) return;
    try {
      await adminMealsService.deleteMeal(mealToDelete.id);
      const nextPrices = prices.filter((item) => item.id !== mealToDelete.id);
      setPrices(nextPrices);
      setStats(calculatePriceStats(nextPrices));
      setMealToDelete(null);
      toast.success("Meal deleted.");
    } catch (error) {
      toast.error(
        "Could not delete meal",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  }, [mealToDelete, prices, toast]);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <PriceManagementHeader />
        <PriceStats stats={stats} />
        {loadError && (
          <p role="alert" className="text-sm text-red-600">
            Could not load meal prices: {loadError}
          </p>
        )}
        <PriceFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <PriceTable
          prices={filteredPrices}
          isLoading={isLoading}
          onPriceChange={handlePriceChange}
          onDelete={setMealToDelete}
        />
      </motion.div>
      <DeleteMealDialog
        meal={mealToDelete}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteMeal}
      />
    </>
  );
}

function toPriceRow(meal: AdminMeal): ManagedPrice {
  const price = adminMealsService.toPrice(meal.estimatedPrice);
  const category = meal.category;
  const normalizedCategory = category.toLowerCase();
  return {
    id: meal._id,
    name: meal.mealTitle,
    category,
    image: meal.imageUrl,
    categoryType: normalizedCategory.includes("breakfast")
      ? "breakfast"
      : normalizedCategory.includes("quick")
        ? "quick"
        : "local",
    currentPrice: `₦${price.toLocaleString("en-NG")}`,
    newPrice: price,
    priceChange: "—",
    changeType: "none",
    status:
      meal.isActive === undefined
        ? "Unknown"
        : meal.isActive
          ? "Active"
          : "Inactive",
    lastUpdated: meal.updatedAt
      ? new Date(meal.updatedAt).toLocaleString()
      : "—",
  };
}

function calculatePriceStats(prices: ManagedPrice[]): PriceStatsData {
  const amounts = prices.map((price) => price.newPrice);
  return {
    totalMeals: prices.length,
    averagePrice: amounts.length
      ? amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length
      : 0,
    highestPrice: amounts.length ? Math.max(...amounts) : 0,
    lowestPrice: amounts.length ? Math.min(...amounts) : 0,
  };
}
