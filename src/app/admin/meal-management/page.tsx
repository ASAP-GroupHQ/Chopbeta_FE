"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import MealFilters from "@/components/admin/meal-management/MealFilters";
import MealManagementHeader from "@/components/admin/meal-management/MealManagementHeader";
import MealResults from "@/components/admin/meal-management/MealResults";
import MealStats from "@/components/admin/meal-management/MealStats";
import { MEALS_DATA } from "@/constants/admin-management";

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

export default function MealManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("latest");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () => [...new Set(MEALS_DATA.map((meal) => meal.category))].sort(),
    [],
  );

  const filteredMeals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const meals = MEALS_DATA.filter((meal) => {
      const matchesSearch =
        !query ||
        meal.name.toLowerCase().includes(query) ||
        meal.description.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === "All Categories" ||
        meal.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All Status" || meal.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return meals.sort((first, second) => {
      if (sortBy === "oldest") {
        return (
          new Date(first.dateAdded.replace("\n", " ")).getTime() -
          new Date(second.dateAdded.replace("\n", " ")).getTime()
        );
      }
      if (sortBy === "price") {
        const getPrice = (price: string) => Number(price.replace(/[^\d]/g, ""));
        return getPrice(second.price) - getPrice(first.price);
      }
      return (
        new Date(second.dateAdded.replace("\n", " ")).getTime() -
        new Date(first.dateAdded.replace("\n", " ")).getTime()
      );
    });
  }, [searchQuery, selectedCategory, selectedStatus, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredMeals.length / itemsPerPage));
  const visiblePage = Math.min(currentPage, pageCount);
  const pageMeals = filteredMeals.slice(
    (visiblePage - 1) * itemsPerPage,
    visiblePage * itemsPerPage,
  );
  const firstItem = filteredMeals.length
    ? (visiblePage - 1) * itemsPerPage + 1
    : 0;
  const lastItem = Math.min(visiblePage * itemsPerPage, filteredMeals.length);

  const updateFilter = (update: () => void) => {
    update();
    setCurrentPage(1);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <MealManagementHeader />
      <MealStats />
      <section className="overflow-hidden rounded-2xl border border-[#E1E5EB] bg-white shadow-[0_2px_10px_rgba(26,46,53,0.04)]">
        <MealFilters
          categories={categories}
          resultCount={filteredMeals.length}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSearchChange={(value) => updateFilter(() => setSearchQuery(value))}
          onCategoryChange={(value) =>
            updateFilter(() => setSelectedCategory(value))
          }
          onStatusChange={(value) =>
            updateFilter(() => setSelectedStatus(value))
          }
          onSortChange={(value) => updateFilter(() => setSortBy(value))}
        />
        <MealResults
          meals={pageMeals}
          resultCount={filteredMeals.length}
          firstItem={firstItem}
          lastItem={lastItem}
          currentPage={visiblePage}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </section>
    </motion.div>
  );
}
