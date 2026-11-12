import Link from "next/link";
import HeaderActions from "@/components/dashboard/HeaderActions";
import { Plus } from "lucide-react";

export default function MealManagementHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-black tracking-tight text-[#1A2E35] sm:text-3xl">
          Meal Management
        </h1>
        <p className="text-xs font-medium text-gray-500 sm:text-sm">
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
    </header>
  );
}
