"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { MEAL_STATS, MEALS_DATA } from "@/constants/admin-management";

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

  const renderMealActions = (meal: (typeof MEALS_DATA)[number]) => (
    <div className="flex items-center gap-1.5">
      <Link
        href={`/admin/meals/${meal.id}`}
        aria-label={`View ${meal.name}`}
        className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        <Eye className="h-3 w-3" />
        <span>View</span>
      </Link>
      <Link
        href={`/admin/meals/${meal.id}/edit`}
        aria-label={`Edit ${meal.name}`}
        className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        <Pencil className="h-3 w-3" />
        <span>Edit</span>
      </Link>
      <button
        type="button"
        onClick={() => alert(`Delete meal ${meal.name}?`)}
        aria-label={`Delete ${meal.name}`}
        className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-700 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
      >
        <Trash2 className="h-3 w-3" />
        <span>Delete</span>
      </button>
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* HEADER BANNER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-black tracking-tight text-[#1A2E35] sm:text-3xl">
            Meal Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Add, edit and manage all meals in your menu.
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <Link
            href="/admin/meals/new"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#1E6B3C] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#154d2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            <span>Plan New Meal</span>
          </Link>
          <HeaderActions />
        </div>
      </div>

      {/* STATS SUMMARY ROW */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {MEAL_STATS.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.title}
              className={`flex min-h-[106px] items-center gap-4 rounded-2xl border p-4 shadow-[0_2px_8px_rgba(26,46,53,0.04)] sm:p-5 ${stat.borderColor}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80">
                <IconComponent className="h-10 w-10 object-contain" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="block text-xs font-semibold text-gray-600">
                  {stat.title}
                </span>
                <h3 className="text-xl font-black leading-tight text-[#1A2E35] sm:text-2xl">
                  {stat.value}
                </h3>
                <p className="text-[10px] font-medium text-gray-500">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="overflow-hidden rounded-2xl border border-[#E1E5EB] bg-white shadow-[0_2px_10px_rgba(26,46,53,0.04)]">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F4EC] px-2.5 py-1 text-[10px] font-semibold text-[#1E6B3C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1E6B3C]" />
            {selectedStatus === "All Status" ? "All meals" : selectedStatus}
          </span>
          <p className="text-[11px] font-medium text-gray-400">
            {filteredMeals.length}{" "}
            {filteredMeals.length === 1 ? "meal" : "meals"}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2.5 bg-[#FCFCFD] p-3 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(140px,1fr))] sm:p-4">
          <label className="relative block">
            <span className="sr-only">Search meals</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search meals by name..."
              value={searchQuery}
              onChange={(event) =>
                updateFilter(() => setSearchQuery(event.target.value))
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs font-medium text-[#1A2E35] outline-none transition placeholder:text-gray-400 focus:border-[#1E6B3C] focus:ring-2 focus:ring-green-700/10"
            />
          </label>

          <label>
            <span className="sr-only">Filter by category</span>
            <select
              value={selectedCategory}
              onChange={(event) =>
                updateFilter(() => setSelectedCategory(event.target.value))
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-[#344054] outline-none transition focus:border-[#1E6B3C] focus:ring-2 focus:ring-green-700/10"
            >
              <option>All Categories</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filter by status</span>
            <select
              value={selectedStatus}
              onChange={(event) =>
                updateFilter(() => setSelectedStatus(event.target.value))
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-[#344054] outline-none transition focus:border-[#1E6B3C] focus:ring-2 focus:ring-green-700/10"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>

          <label>
            <span className="sr-only">Sort meals</span>
            <select
              value={sortBy}
              onChange={(event) =>
                updateFilter(() => setSortBy(event.target.value))
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-[#344054] outline-none transition focus:border-[#1E6B3C] focus:ring-2 focus:ring-green-700/10"
            >
              <option value="latest">Sort by: Latest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="price">Sort by: Price High-Low</option>
            </select>
          </label>
        </div>

        {/* DESKTOP MEAL TABLE */}
        <div className="hidden overflow-x-auto border-t border-gray-100 md:block">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-[#E8EBF7] text-[11px] font-semibold tracking-wide text-[#4D5EAE]">
                <th scope="col" className="px-4 py-3.5 sm:px-5">
                  Meal
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Category
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Price
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Calories
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Date Added
                </th>
                <th scope="col" className="px-4 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs text-[#344054]">
              {pageMeals.map((meal) => (
                <tr
                  key={meal.id}
                  className="bg-[#F7F8FC] transition hover:bg-[#F0F2FA]"
                >
                  <td className="px-4 py-3 sm:px-5">
                    <div className="flex min-w-[220px] items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={meal.image}
                          alt={meal.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#1A2E35]">
                          {meal.name}
                        </h4>
                        <p className="mt-0.5 max-w-[220px] truncate text-[10px] text-gray-500">
                          {meal.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{meal.category}</td>
                  <td className="px-4 py-3 font-semibold text-[#1A2E35]">
                    {meal.price}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{meal.calories}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4F1E9] px-2.5 py-1 text-[10px] font-semibold text-[#1E6B3C]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1E6B3C]" />
                      {meal.status}
                    </span>
                  </td>
                  <td className="whitespace-pre-line px-4 py-3 text-[10px] leading-4 text-gray-500">
                    {meal.dateAdded}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      {renderMealActions(meal)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE MEAL CARDS */}
        <div className="divide-y divide-gray-100 border-t border-gray-100 md:hidden">
          {pageMeals.map((meal) => (
            <article key={meal.id} className="space-y-3 bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#1A2E35]">
                      {meal.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#E4F1E9] px-2 py-1 text-[10px] font-semibold text-[#1E6B3C]">
                      {meal.status}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-4 text-gray-500">
                    {meal.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#F7F8FC] p-3 text-[10px]">
                <div>
                  <p className="text-gray-400">Category</p>
                  <p className="mt-0.5 font-semibold text-gray-700">
                    {meal.category}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Price</p>
                  <p className="mt-0.5 font-semibold text-gray-700">
                    {meal.price}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Calories</p>
                  <p className="mt-0.5 font-semibold text-gray-700">
                    {meal.calories}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span className="whitespace-pre-line text-[10px] leading-4 text-gray-400">
                  Added {meal.dateAdded}
                </span>
                {renderMealActions(meal)}
              </div>
            </article>
          ))}
        </div>

        {pageMeals.length === 0 && (
          <div className="border-t border-gray-100 px-5 py-12 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-semibold text-[#1A2E35]">
              No meals found
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* PAGINATION FOOTER */}
        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-center font-medium text-gray-500 sm:text-left">
            Showing{" "}
            <span className="font-bold text-[#1A2E35]">
              {firstItem}–{lastItem}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1A2E35]">
              {filteredMeals.length}
            </span>{" "}
            meals
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={visiblePage <= 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#1E6B3C] px-2 font-bold text-white">
                {visiblePage}
              </span>
              <button
                type="button"
                aria-label="Next page"
                disabled={visiblePage >= pageCount}
                onClick={() =>
                  setCurrentPage((page) => Math.min(pageCount, page + 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <label className="flex items-center gap-2 text-gray-500">
              <span className="sr-only">Meals per page</span>
              <select
                value={itemsPerPage}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                }}
                className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-[11px] font-medium text-[#344054] outline-none focus:border-[#1E6B3C]"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
