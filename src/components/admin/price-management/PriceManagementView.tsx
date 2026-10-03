"use client";

import { useMemo, useState } from "react";
import AdminHeader from "@/components/admin/Admin Dashboard/AdminHeader";
import AdminSidebar from "@/components/admin/Admin Dashboard/AdminSidebar";
import PriceManagementStats from "./PriceManagementStats";
import PriceManagementTable from "./PriceManagementTable";
import PriceManagementToolbar from "./PriceManagementToolbar";
import { INITIAL_PRICE_MEALS } from "./data";
import type { PriceMealCategory, PriceMealStatus } from "./types";

export default function PriceManagementView() {
  const [meals, setMeals] = useState(INITIAL_PRICE_MEALS);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<PriceMealCategory | "All Categories">("All Categories");
  const [status, setStatus] = useState<PriceMealStatus | "All Status">("All Status");

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

  const handleSavePrice = (id: string) => {
    const updatedAt = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    setMeals((currentMeals) => currentMeals.map((meal) => meal.id === id
      ? { ...meal, currentPrice: meal.newPrice, lastUpdated: updatedAt }
      : meal,
    ));
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
          <PriceManagementStats meals={meals} />
          <PriceManagementToolbar
            searchTerm={searchTerm}
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
        </main>
      </div>
    </div>
  );
}