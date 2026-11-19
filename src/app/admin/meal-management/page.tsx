"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AddMealDialog from "@/components/admin/meal-management/AddMealDialog";
import MealActionDialog, {
  type MealDialogMode,
} from "@/components/admin/meal-management/MealActionDialog";
import MealFilters from "@/components/admin/meal-management/MealFilters";
import MealManagementHeader from "@/components/admin/meal-management/MealManagementHeader";
import MealResults from "@/components/admin/meal-management/MealResults";
import MealStats from "@/components/admin/meal-management/MealStats";
import { useToast } from "@/context/ToastContext";
import { adminMealsService } from "@/services/admin-meals";
import type {
  AdminMeal,
  MealEdits,
  MealStats as MealStatsData,
  MealWriteData,
  ManagedMeal,
} from "@/types/admin-meals";

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
  const [meals, setMeals] = useState<ManagedMeal[]>([]);
  const [mealStats, setMealStats] = useState<Partial<MealStatsData>>({});
  const [mealStatsErrors, setMealStatsErrors] = useState<
    Partial<Record<keyof MealStatsData, string>>
  >({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("latest");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const loadMeals = useCallback(
    async (isActive: () => boolean = () => true) => {
      const mealRecords = await adminMealsService.getMeals();
      if (isActive()) setMeals(mealRecords.map(toManagedMeal));
    },
    [],
  );

  const loadMealStats = useCallback(
    (isActive: () => boolean = () => true) => {
      const loadStat = (
        key: keyof MealStatsData,
        request: Promise<number>,
      ) => {
        request
          .then((value) => {
            if (!isActive()) return;
            setMealStats((current) => ({ ...current, [key]: value }));
            setMealStatsErrors((current) => {
              const next = { ...current };
              delete next[key];
              return next;
            });
          })
          .catch((error: unknown) => {
            if (!isActive()) return;
            const message =
              error instanceof Error ? error.message : "Please try again.";
            setMealStatsErrors((current) => ({
              ...current,
              [key]: `Could not load ${key}: ${message}`,
            }));
          });
      };

      loadStat("totalMeals", adminMealsService.getTotalMeals());
      loadStat("activeMeals", adminMealsService.getActiveMeals());
      loadStat("inactiveMeals", adminMealsService.getInactiveMeals());
      loadStat("categories", adminMealsService.getCategoryCount());
    },
    [],
  );

  useEffect(() => {
    let active = true;
    loadMeals(() => active)
      .catch((error: unknown) => {
        if (active) {
          toast.error(
            "Could not load meals",
            error instanceof Error ? error.message : "Please try again.",
          );
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    loadMealStats(() => active);

    return () => {
      active = false;
    };
  }, [loadMealStats, loadMeals, toast]);

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

  const addMeal = async (
    meal: MealWriteData,
    image?: File,
  ): Promise<boolean> => {
    setIsAddingMeal(true);
    try {
      const id = await adminMealsService.createMeal(meal);
      loadMealStats();
      if (image) {
        try {
          await adminMealsService.uploadMealImage(id, image);
        } catch (error) {
          try {
            await loadMeals();
          } catch (refreshError) {
            toast.error(
              "Meal was added, but the list could not be refreshed",
              refreshError instanceof Error
                ? refreshError.message
                : "Please refresh the page.",
            );
          }
          toast.error(
            "Meal added, but its image could not be uploaded",
            error instanceof Error ? error.message : "Please try again.",
          );
          return true;
        }
      }
      try {
        await loadMeals();
      } catch (error) {
        toast.error(
          "Meal added, but the list could not be refreshed",
          error instanceof Error ? error.message : "Please refresh the page.",
        );
        return true;
      }
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

  const saveMealEdits = async (id: string, updates: MealEdits) => {
    const original = meals.find((meal) => meal.id === id);
    if (!original) return;
    try {
      await adminMealsService.updateMeal(id, {
        mealTitle: updates.name,
        description: updates.description,
        category: updates.category,
        estimatedPrice: Number(updates.price.replace(/[^\d.]/g, "")),
        averageNutritionalInfo: {
          ...original.source.averageNutritionalInfo,
          estimatedCalories: Number(updates.calories.replace(/[^\d.]/g, "")),
        },
      });
    } catch (error) {
      toast.error(
        "Could not update meal",
        error instanceof Error ? error.message : "Please try again.",
      );
      return;
    }
    setMeals((previousMeals) =>
      previousMeals.map((meal) =>
        meal.id === id
          ? {
              ...meal,
              ...updates,
              source: {
                ...meal.source,
                mealTitle: updates.name,
                category: updates.category,
                estimatedPrice: Number(
                  updates.price.replace(/[^\d.]/g, ""),
                ),
                description: updates.description,
              },
            }
          : meal,
      ),
    );
    setActiveMealDialog(null);
    toast.success("Meal updated successfully.");
  };

  const deleteMeal = async (mealToDelete: ManagedMeal) => {
    try {
      await adminMealsService.deleteMeal(mealToDelete.id);
      setMeals((previousMeals) =>
        previousMeals.filter((meal) => meal.id !== mealToDelete.id),
      );
      loadMealStats();
      setActiveMealDialog(null);
      toast.success("Meal deleted successfully.");
    } catch (error) {
      toast.error(
        "Could not delete meal",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  const toggleMealStatus = async (meal: ManagedMeal) => {
    try {
      await adminMealsService.toggleMealStatus(meal.id);
      const updatedMeal: ManagedMeal = {
        ...meal,
        status: meal.status === "Active" ? "Inactive" : "Active",
        source: {
          ...meal.source,
          isActive: meal.status !== "Active",
        },
      };
      setMeals((previousMeals) =>
        previousMeals.map((item) =>
          item.id === meal.id ? updatedMeal : item,
        ),
      );
      setActiveMealDialog((current) =>
        current?.meal.id === meal.id
          ? { ...current, meal: updatedMeal }
          : current,
      );
      setMealStats((current) =>
        current
          ? {
              ...current,
              activeMeals:
                current.activeMeals === undefined
                  ? undefined
                  : current.activeMeals + (meal.status === "Active" ? -1 : 1),
              inactiveMeals:
                current.inactiveMeals === undefined
                  ? undefined
                  : current.inactiveMeals + (meal.status === "Active" ? 1 : -1),
            }
          : current,
      );
      toast.success(
        meal.status === "Active" ? "Meal deactivated." : "Meal activated.",
      );
    } catch (error) {
      toast.error(
        "Could not change meal status",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
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
        <MealStats stats={mealStats} />
        {Object.entries(mealStatsErrors).map(([key, error]) => (
          <p key={key} role="alert" className="text-sm text-red-600">
            {error}
          </p>
        ))}
        {isLoading && (
          <p role="status" className="text-sm text-gray-500">
            Loading meals…
          </p>
        )}
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
        onToggleStatus={toggleMealStatus}
      />
    </>
  );
}

function toManagedMeal(meal: AdminMeal): ManagedMeal {
  const calories =
    meal.averageNutritionalInfo?.estimatedCalories ??
    meal.averageNutritionalInfo?.estimatedMacronutrients?.calories;
  return {
    id: meal._id,
    name: meal.mealTitle,
    description: meal.description ?? "",
    category: meal.category,
    price: `₦${adminMealsService.toPrice(meal.estimatedPrice).toLocaleString("en-NG")}`,
    calories: calories === undefined ? "—" : `${calories} Kcal`,
    status:
      meal.isActive === undefined
        ? "Unknown"
        : meal.isActive
          ? "Active"
          : "Inactive",
    dateAdded: meal.createdAt
      ? new Date(meal.createdAt).toLocaleString()
      : "—",
    image: meal.imageUrl,
    source: meal,
  };
}
