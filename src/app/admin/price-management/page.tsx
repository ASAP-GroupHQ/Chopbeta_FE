"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import DeleteMealDialog from "@/components/admin/price-management/DeleteMealDialog";
import PriceFilters from "@/components/admin/price-management/PriceFilters";
import PriceManagementHeader from "@/components/admin/price-management/PriceManagementHeader";
import PriceStats from "@/components/admin/price-management/PriceStats";
import PriceTable, {
  type ManagedPrice,
} from "@/components/admin/price-management/PriceTable";
import { PRICE_MANAGEMENT_DATA } from "@/constants/admin-management";

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
  const [mealToDelete, setMealToDelete] = useState<ManagedPrice | null>(null);

  const closeDeleteDialog = useCallback(() => {
    setMealToDelete(null);
  }, []);

  const handlePriceChange = useCallback((id: string, delta: number) => {
    setPrices((previousPrices) =>
      previousPrices.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          newPrice: Math.max(0, item.newPrice + delta),
        };
      }),
    );
  }, []);

  const handleDeleteMeal = useCallback(() => {
    if (!mealToDelete) return;
    setPrices((previousPrices) =>
      previousPrices.filter((item) => item.id !== mealToDelete.id),
    );
    setMealToDelete(null);
  }, [mealToDelete]);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <PriceManagementHeader />
        <PriceStats />
        <PriceFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <PriceTable
          prices={prices}
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
