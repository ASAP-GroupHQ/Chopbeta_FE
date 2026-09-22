"use client";

import { Bell, HelpCircle, Plus, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import AdminSidebar from "@/components/admin/Admin Dashboard/AdminSidebar";
import AdminHeader from "@/components/admin/Admin Dashboard/AdminHeader";
import MealManagementStats from "./MealManagementStats";
import MealManagementTable from "./MealManagementTable";
import MealManagementToolbar from "./MealManagementToolbar";
import type { MealItem } from "./types";

const INITIAL_MEALS: MealItem[] = [
  {
    id: "1",
    name: "Jollof Rice",
    description: "Delicious party jollof rice cooked to perfection.",
    category: "Breakfast",
    price: 1200,
    calories: 420,
    status: "Active",
    dateAdded: "Aug 15, 2025 10:30 AM",
  },
  {
    id: "2",
    name: "Bread & Egg",
    description: "Fresh bread served with perfect seasoned scrambled eggs.",
    category: "Lunch",
    price: 3500,
    calories: 320,
    status: "Active",
    dateAdded: "May 18, 2025 10:30 AM",
  },
  {
    id: "3",
    name: "Pap & Akara",
    description: "Smooth creamy pap paired with crispy golden akara.",
    category: "Dinner",
    price: 3500,
    calories: 610,
    status: "Inactive",
    dateAdded: "May 18, 2025 10:30 AM",
  },
  {
    id: "4",
    name: "Chicken Pasta",
    description: "Creamy pasta with grilled chicken and veggies.",
    category: "Lunch",
    price: 3500,
    calories: 720,
    status: "Active",
    dateAdded: "May 18, 2025 10:30 AM",
  },
  {
    id: "5",
    name: "Noodles & Egg",
    description: "Savory noodles tossed with vegetables and served with fried egg.",
    category: "Breakfast",
    price: 3500,
    calories: 220,
    status: "Inactive",
    dateAdded: "May 18, 2025 10:30 AM",
  },
  {
    id: "6",
    name: "Beef Suya Bowl",
    description: "Spicy suya beef served with rice and plantain.",
    category: "Dinner",
    price: 5200,
    calories: 780,
    status: "Active",
    dateAdded: "Jun 02, 2025 08:40 AM",
  },
  {
    id: "7",
    name: "Fruit Smoothie",
    description: "Cold mixed fruit smoothie with yogurt and chia seeds.",
    category: "Drinks",
    price: 1800,
    calories: 250,
    status: "Active",
    dateAdded: "Jun 02, 2025 08:40 AM",
  },
  {
    id: "8",
    name: "Yam & Egg Sauce",
    description: "Boiled yam with a rich and savory egg sauce.",
    category: "Snacks",
    price: 2600,
    calories: 480,
    status: "Inactive",
    dateAdded: "Jun 10, 2025 11:45 AM",
  },
];

export default function MealManagementView() {
  const [meals] = useState(INITIAL_MEALS);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Latest");

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

  return (
    <div className="min-h-screen bg-slate-50/60 lg:pl-64">
      <AdminSidebar />
      <AdminHeader title="Meal Management" subtitle="Add, edit and manage all meals in your menu." />

      <main className="space-y-6 px-5 pb-10 pt-6 sm:px-8">
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
            <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">
              <Plus className="h-4 w-4" />
              Plan New Meal
            </button>
          </div>
        </div>

        <MealManagementStats
          total={metrics.total}
          active={metrics.active}
          inactive={metrics.inactive}
          categories={metrics.categories}
        />

        <MealManagementToolbar
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
          onReset={resetFilters}
        />

        <MealManagementTable meals={filteredMeals} />
      </main>
    </div>
  );
}
