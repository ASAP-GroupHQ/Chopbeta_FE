"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AddMealDialog from "@/components/admin/meal-management/AddMealDialog";
import MealActionDialog, {
  type MealDialogMode,
  type MealEdits,
  type ManagedMeal,
} from "@/components/admin/meal-management/MealActionDialog";
import MealFilters from "@/components/admin/meal-management/MealFilters";
import MealManagementHeader from "@/components/admin/meal-management/MealManagementHeader";
import MealResults from "@/components/admin/meal-management/MealResults";
import MealStats from "@/components/admin/meal-management/MealStats";
import { useToast } from "@/context/ToastContext";
import { MEALS_DATA } from "@/constants/admin-management";
import { adminService, type MealWriteData } from "@/services/admin";

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
  const toast = useToast();
  const [meals, setMeals] = useState<ManagedMeal[]>(MEALS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("latest");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [activeMealDialog, setActiveMealDialog] = useState<{
    meal: ManagedMeal;
    mode: MealDialogMode;
  } | null>(null);
  const closeAddMealDialog = useCallback(() => {
    setIsAddMealOpen(false);
  }, []);
  const closeMealDialog = useCallback(() => {
    setActiveMealDialog(null);
  }, []);

  const categories = useMemo(
    () => [...new Set(meals.map((meal) => meal.category))].sort(),
    [meals],
  );

  const filteredMeals = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredMeals = meals.filter((meal) => {
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

    return filteredMeals.sort((first, second) => {
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
  }, [meals, searchQuery, selectedCategory, selectedStatus, sortBy]);

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

  const addMeal = async (meal: MealWriteData): Promise<boolean> => {
    setIsAddingMeal(true);
    try {
      const id = await adminService.createMeal(meal);
      const now = new Date();
      const dateAdded = `${now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}\n${now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
      const calories = meal.averageNutritionalInfo.estimatedCalories;

      setMeals((previousMeals) => [
        {
          id,
          name: meal.mealTitle,
          description: meal.description,
          category:
            meal.category.charAt(0).toUpperCase() + meal.category.slice(1),
          price: `₦${meal.estimatedPrice.toLocaleString("en-NG")}`,
          calories: `${calories} Kcal`,
          status: "Active",
          dateAdded,
          image: "/images/meals/quick-meal.png",
        },
        ...previousMeals,
      ]);
      setCurrentPage(1);
      toast.success("Meal added successfully.");
      return true;
    } catch (error) {
      toast.error(
        "Could not add meal",
        error instanceof Error ? error.message : "Please try again.",
      );
      return false;
    } finally {
      setIsAddingMeal(false);
    }
  };

  const saveMealEdits = (id: string, updates: MealEdits) => {
    setMeals((previousMeals) =>
      previousMeals.map((meal) =>
        meal.id === id ? { ...meal, ...updates } : meal,
      ),
    );
    setActiveMealDialog(null);
    toast.success("Meal updated successfully.");
  };

  const deleteMeal = (mealToDelete: ManagedMeal) => {
    setMeals((previousMeals) =>
      previousMeals.filter((meal) => meal.id !== mealToDelete.id),
    );
    setActiveMealDialog(null);
    toast.success("Meal deleted successfully.");
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <MealManagementHeader onAddMeal={() => setIsAddMealOpen(true)} />
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
            onView={(meal) => setActiveMealDialog({ meal, mode: "view" })}
            onEdit={(meal) => setActiveMealDialog({ meal, mode: "edit" })}
            onDelete={(meal) => setActiveMealDialog({ meal, mode: "delete" })}
          />
        </section>
      </motion.div>
      <AddMealDialog
        isOpen={isAddMealOpen}
        isSubmitting={isAddingMeal}
        onClose={closeAddMealDialog}
        onSubmit={addMeal}
      />
      <MealActionDialog
        isOpen={Boolean(activeMealDialog)}
        meal={activeMealDialog?.meal ?? null}
        mode={activeMealDialog?.mode ?? "view"}
        onClose={closeMealDialog}
        onSave={saveMealEdits}
        onDelete={deleteMeal}
      />
    </>
  );
}
