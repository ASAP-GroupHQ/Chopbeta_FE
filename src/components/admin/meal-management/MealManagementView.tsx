"use client";

import { Bell, HelpCircle, Plus, ChevronDown, Save, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { adminService, toAmount } from "@/services/admin";
import AdminSidebar from "@/components/admin/Admin Dashboard/AdminSidebar";
import AdminHeader from "@/components/admin/Admin Dashboard/AdminHeader";
import MealManagementStats from "./MealManagementStats";
import MealManagementTable from "./MealManagementTable";
import MealManagementToolbar from "./MealManagementToolbar";
import type { MealItem } from "./types";

const mapApiMeal = (meal: Awaited<ReturnType<typeof adminService.getMeals>>[number]): MealItem => {
  const category = meal.category.trim();
  const calories = Number.parseFloat(String(meal.averageNutritionalInfo?.estimatedCalories ?? 0));

  return {
    id: meal._id,
    name: meal.mealTitle,
    description: meal.description ?? "",
    category: category ? `${category[0].toUpperCase()}${category.slice(1)}` : "Other",
    price: toAmount(meal.estimatedPrice),
    calories: Number.isFinite(calories) ? calories : 0,
    nutritionalInfo: meal.averageNutritionalInfo,
    status: meal.isActive === false ? "Inactive" : "Active",
    dateAdded: meal.createdAt ? new Date(meal.createdAt).toLocaleString() : "—",
  };
};

export default function MealManagementView() {
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create" | null>(null);
  const [activeMenuMealId, setActiveMenuMealId] = useState<string | null>(null);
  const [draftMeal, setDraftMeal] = useState<MealItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    adminService.getMeals()
      .then((apiMeals) => {
        if (isCurrent) setMeals(apiMeals.map(mapApiMeal));
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

  const selectedMeal = meals.find((meal) => meal.id === selectedMealId) ?? null;

  const metrics = useMemo(() => {
    const active = meals.filter((meal) => meal.status === "Active").length;
    const inactive = meals.filter((meal) => meal.status === "Inactive").length;
    const categories = new Set(meals.map((meal) => meal.category)).size;

    return {
      total: meals.length,
      active,
      inactive,
      categories,
    };
  }, [meals]);

  const filteredMeals = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return [...meals]
      .filter((meal) => {
        const matchesSearch = meal.name.toLowerCase().includes(normalizedQuery);
        const matchesCategory = categoryFilter === "All Categories" || meal.category === categoryFilter;
        const matchesStatus = statusFilter === "All Status" || meal.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "Price: Low to High") return a.price - b.price;
        if (sortBy === "Price: High to Low") return b.price - a.price;
        if (sortBy === "Latest") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        return 0;
      });
  }, [categoryFilter, meals, searchTerm, sortBy, statusFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All Categories");
    setStatusFilter("All Status");
    setSortBy("Latest");
  };

  const handleViewMeal = (meal: MealItem) => {
    setSelectedMealId(meal.id);
    setDraftMeal(null);
    setModalMode("view");
  };

  const handleAddMeal = () => {
    const now = new Date();
    const newMeal: MealItem = {
      id: `meal-${Date.now()}`,
      name: "",
      description: "",
      category: "Breakfast",
      price: 0,
      calories: 0,
      status: "Active",
      dateAdded: now.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setSelectedMealId(null);
    setDraftMeal(newMeal);
    setModalMode("create");
  };

  const handleEditMeal = (meal: MealItem) => {
    setSelectedMealId(meal.id);
    setDraftMeal({ ...meal });
    setModalMode("edit");
  };

  const handleDeleteMeal = async (mealId: string) => {
    setError(null);
    try {
      await adminService.deleteMeal(mealId);
      setMeals((currentMeals) => currentMeals.filter((meal) => meal.id !== mealId));
      if (selectedMealId === mealId) setSelectedMealId(null);
      setModalMode(null);
      setDraftMeal(null);
      setActiveMenuMealId(null);
      toast.success("Meal deleted.");
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : "Unable to delete the meal.";
      setError(message);
      toast.error(message);
    }
  };

  const handleSaveMeal = async () => {
    if (!draftMeal || isSaving) return;
    if (!draftMeal.name.trim()) {
      setError("Meal name is required.");
      return;
    }

    const nutritionalInfo = {
      ...draftMeal.nutritionalInfo,
      estimatedCalories: Number(draftMeal.calories),
      macronutrients: draftMeal.nutritionalInfo?.macronutrients ?? {
        carbohydrates: 0,
        proteins: 0,
        fats: 0,
      },
    };
    const writeData = {
      mealTitle: draftMeal.name.trim(),
      category: draftMeal.category.toLowerCase(),
      estimatedPrice: Number(draftMeal.price),
      description: draftMeal.description.trim(),
      averageNutritionalInfo: nutritionalInfo,
    };

    setIsSaving(true);
    setError(null);
    try {
      if (modalMode === "create") {
        const id = await adminService.createMeal(writeData);
        if (draftMeal.status === "Inactive") await adminService.toggleMealStatus(id);
      } else {
        const existingMeal = meals.find((meal) => meal.id === draftMeal.id);
        await adminService.updateMeal(draftMeal.id, writeData);
        if (existingMeal && existingMeal.status !== draftMeal.status) {
          await adminService.toggleMealStatus(draftMeal.id);
        }
      }

      setMeals((await adminService.getMeals()).map(mapApiMeal));
      toast.success(modalMode === "create" ? "Meal added." : "Meal updated.");
      setModalMode(null);
      setDraftMeal(null);
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : "Unable to save the meal.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleMenu = (mealId: string) => {
    setActiveMenuMealId((current) => (current === mealId ? null : mealId));
  };

  const closeModal = () => {
    setModalMode(null);
    setDraftMeal(null);
  };

  return (
    <div className="admin-page-background min-h-screen lg:pl-64">
      <AdminSidebar />
      <AdminHeader title="Meal Management" subtitle="Add, edit and manage all meals in your menu." />

      <main className="space-y-6 px-4 pb-10 pt-16 sm:px-8 lg:pt-6">
        {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Menu overview</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">Meal catalog</h2>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" aria-label="Help" className="rounded-full p-2 text-slate-400 transition hover:bg-white hover:text-slate-600">
              <HelpCircle className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Notifications" className="rounded-full p-2 text-slate-400 transition hover:bg-white hover:text-slate-600">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">V</div>
              <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700">
                Victor <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddMeal}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              <Plus className="h-4 w-4" />
              Plan New Meal
            </button>
          </div>
        </div>

        {isLoading
          ? <p className="rounded-xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">Loading meals...</p>
          : <>
            <MealManagementStats
              total={metrics.total}
              active={metrics.active}
              inactive={metrics.inactive}
              categories={metrics.categories}
            />

            <MealManagementToolbar
              searchTerm={searchTerm}
              categories={[...new Set(meals.map((meal) => meal.category))]}
              categoryFilter={categoryFilter}
              statusFilter={statusFilter}
              sortBy={sortBy}
              onSearchChange={setSearchTerm}
              onCategoryChange={setCategoryFilter}
              onStatusChange={setStatusFilter}
              onSortChange={setSortBy}
              onReset={resetFilters}
              onAddMeal={handleAddMeal}
            />
          </>}

        {modalMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]">
            <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {modalMode === "view" ? "Meal details" : modalMode === "edit" ? "Edit meal" : "Add new meal"}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">{modalMode === "create" ? draftMeal?.name || "New Meal" : selectedMeal?.name || "Meal"}</h3>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {modalMode === "view" && selectedMeal ? (
                <div className="space-y-5 px-5 py-5">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Category</p>
                      <p className="mt-2 text-sm font-semibold text-slate-800">{selectedMeal.category}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Price</p>
                      <p className="mt-2 text-sm font-semibold text-slate-800">₦{selectedMeal.price.toLocaleString()}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Status</p>
                      <p className="mt-2 text-sm font-semibold text-slate-800">{selectedMeal.status}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Description</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{selectedMeal.description}</p>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    <span>Calories</span>
                    <span className="font-semibold text-slate-800">{selectedMeal.calories} kcal</span>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftMeal({ ...selectedMeal });
                        setModalMode("edit");
                      }}
                      className="rounded-xl bg-emerald-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      Edit meal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 px-5 py-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-slate-600">
                      <span className="mb-1.5 block font-medium text-slate-700">Meal name</span>
                      <input
                        value={draftMeal?.name ?? ""}
                        onChange={(event) => setDraftMeal((current) => current ? { ...current, name: event.target.value } : current)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-500"
                      />
                    </label>

                    <label className="text-sm text-slate-600">
                      <span className="mb-1.5 block font-medium text-slate-700">Category</span>
                      <select
                        value={draftMeal?.category ?? "Breakfast"}
                        onChange={(event) => setDraftMeal((current) => current ? { ...current, category: event.target.value } : current)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-500"
                      >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snacks</option>
                        <option>Drinks</option>
                      </select>
                    </label>

                    <label className="text-sm text-slate-600">
                      <span className="mb-1.5 block font-medium text-slate-700">Price</span>
                      <input
                        type="number"
                        value={draftMeal?.price ?? 0}
                        onChange={(event) => setDraftMeal((current) => current ? { ...current, price: Number(event.target.value) } : current)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-500"
                      />
                    </label>

                    <label className="text-sm text-slate-600">
                      <span className="mb-1.5 block font-medium text-slate-700">Calories</span>
                      <input
                        type="number"
                        value={draftMeal?.calories ?? 0}
                        onChange={(event) => setDraftMeal((current) => current ? { ...current, calories: Number(event.target.value) } : current)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-500"
                      />
                    </label>

                    <label className="text-sm text-slate-600 md:col-span-2">
                      <span className="mb-1.5 block font-medium text-slate-700">Description</span>
                      <textarea
                        value={draftMeal?.description ?? ""}
                        onChange={(event) => setDraftMeal((current) => current ? { ...current, description: event.target.value } : current)}
                        rows={4}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-500"
                      />
                    </label>

                    <label className="text-sm text-slate-600 md:col-span-2">
                      <span className="mb-1.5 block font-medium text-slate-700">Status</span>
                      <select
                        value={draftMeal?.status ?? "Active"}
                        onChange={(event) => setDraftMeal((current) => current ? { ...current, status: event.target.value as "Active" | "Inactive" } : current)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-emerald-500"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveMeal}
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      <Save className="h-4 w-4" />
                      {isSaving ? "Saving..." : modalMode === "create" ? "Add meal" : "Save changes"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!isLoading && <MealManagementTable
          meals={filteredMeals}
          activeMenuMealId={activeMenuMealId}
          onView={handleViewMeal}
          onEdit={handleEditMeal}
          onDelete={handleDeleteMeal}
          onToggleMenu={handleToggleMenu}
        />}
      </main>
    </div>
  );
}
