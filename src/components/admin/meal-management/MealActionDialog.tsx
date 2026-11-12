"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Pencil,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { MEALS_DATA } from "@/constants/admin-management";

export type ManagedMeal = (typeof MEALS_DATA)[number];
export type MealDialogMode = "view" | "edit" | "delete";

interface MealActionDialogProps {
  isOpen: boolean;
  meal: ManagedMeal | null;
  mode: MealDialogMode;
  onClose: () => void;
  onSave: (id: string, updates: MealEdits) => void;
  onDelete: (meal: ManagedMeal) => void;
}

export interface MealEdits {
  name: string;
  description: string;
  category: string;
  price: string;
  calories: string;
}

const categories = ["Breakfast", "Lunch", "Dinner", "Quick meal"];

const inputClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-[#e4e9e5] bg-white px-3.5 text-sm text-[#28352d] outline-none transition placeholder:text-[#a0a9a2] focus:border-[#31844d] focus:ring-2 focus:ring-[#31844d]/10";

export default function MealActionDialog({
  isOpen,
  meal,
  mode,
  onClose,
  onSave,
  onDelete,
}: MealActionDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  const title =
    mode === "view"
      ? "Meal details"
      : mode === "edit"
        ? "Edit meal"
        : "Delete meal";
  const subtitle =
    mode === "view"
      ? "Review the meal information below."
      : mode === "edit"
        ? "Update the details for this meal."
        : "This meal will be removed from the list.";

  return createPortal(
    <AnimatePresence>
      {isOpen && meal && (
        <motion.div
          key={`${mode}-${meal.id}`}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#111122]/65 p-3 backdrop-blur-[2px] sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role={mode === "delete" ? "alertdialog" : "dialog"}
            aria-modal="true"
            aria-labelledby="meal-action-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[#e4e9e5] bg-white shadow-[0_24px_70px_rgba(17,17,34,0.28)]"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-[#edf0ed] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    mode === "delete"
                      ? "bg-[#fbefed] text-[#bd665c]"
                      : "bg-[#eaf4ee] text-[#247443]"
                  }`}
                >
                  {mode === "delete" ? (
                    <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                  ) : mode === "edit" ? (
                    <Pencil className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0">
                  <h2
                    id="meal-action-title"
                    className="text-lg font-bold tracking-tight text-[#1A2E35] sm:text-xl"
                  >
                    {title}
                  </h2>
                  <p className="mt-0.5 text-xs text-[#7b887f]">
                    {subtitle}
                  </p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close dialog"
                onClick={onClose}
                className="rounded-lg p-2 text-[#7b887f] transition hover:bg-[#f3f6f3] hover:text-[#344239]"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {mode === "view" && (
              <div className="space-y-5 px-5 py-5 sm:px-6">
                <div className="relative h-48 overflow-hidden rounded-xl bg-[#f2f4f3] sm:h-56">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm leading-relaxed text-[#657168]">
                  {meal.description}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Detail label="Category" value={meal.category} />
                  <Detail label="Price" value={meal.price} />
                  <Detail label="Calories" value={meal.calories} />
                  <Detail label="Status" value={meal.status} />
                </div>
                <p className="whitespace-pre-line text-xs leading-relaxed text-[#89948d]">
                  Added {meal.dateAdded}
                </p>
                <DialogFooter onCancel={onClose} />
              </div>
            )}

            {mode === "edit" && (
              <EditMealForm
                key={meal.id}
                meal={meal}
                onCancel={onClose}
                onSave={onSave}
              />
            )}

            {mode === "delete" && (
              <div className="px-5 py-5 sm:px-6">
                <p className="text-sm leading-relaxed text-[#657168]">
                  Delete{" "}
                  <span className="font-semibold text-[#344239]">{meal.name}</span>
                  ? This action cannot be undone.
                </p>
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfe6e1] px-5 text-sm font-semibold text-[#526056] transition hover:bg-[#f5f8f5]"
                  >
                    Keep meal
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(meal)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#bd5147] px-5 text-sm font-bold text-white transition hover:bg-[#a6433a] active:scale-[0.98]"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Delete meal
                  </button>
                </div>
              </div>
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function EditMealForm({
  meal,
  onCancel,
  onSave,
}: {
  meal: ManagedMeal;
  onCancel: () => void;
  onSave: (id: string, updates: MealEdits) => void;
}) {
  const [form, setForm] = useState<MealEdits>(() => ({
    name: meal.name,
    description: meal.description,
    category: meal.category,
    price: meal.price.replace(/[^\d.]/g, ""),
    calories: meal.calories.replace(/[^\d.]/g, ""),
  }));

  const updateField = (field: keyof MealEdits, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(form.price);
    const calories = Number(form.calories);
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isFinite(calories) ||
      calories < 0
    ) {
      return;
    }

    onSave(meal.id, {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      price: `₦${price.toLocaleString("en-NG")}`,
      calories: `${calories} Kcal`,
    });
  };

  return (
    <form onSubmit={submitEdit}>
      <div className="grid max-h-[min(65vh,560px)] gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-6">
        <label className="block text-xs font-semibold text-[#526056] sm:col-span-2">
          Meal name
          <input
            type="text"
            required
            maxLength={120}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="block text-xs font-semibold text-[#526056]">
          Category
          <select
            required
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className={inputClassName}
          >
            {!categories.includes(form.category) && (
              <option value={form.category}>{form.category}</option>
            )}
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-semibold text-[#526056]">
          Price (NGN)
          <input
            type="number"
            required
            min="0"
            step="any"
            inputMode="decimal"
            value={form.price}
            onChange={(event) => updateField("price", event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="block text-xs font-semibold text-[#526056]">
          Calories (Kcal)
          <input
            type="number"
            required
            min="0"
            step="any"
            inputMode="decimal"
            value={form.calories}
            onChange={(event) => updateField("calories", event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="block text-xs font-semibold text-[#526056] sm:col-span-2">
          Description
          <textarea
            required
            rows={3}
            maxLength={1000}
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            className={`${inputClassName} h-auto py-3`}
          />
        </label>
      </div>
      <DialogFooter
        onCancel={onCancel}
        submitLabel="Save changes"
        className="px-5 pb-5 sm:px-6"
      />
    </form>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#f7f9f7] p-3">
      <p className="text-[10px] font-medium text-[#89948d]">{label}</p>
      <p className="mt-1 text-xs font-bold text-[#344239]">{value}</p>
    </div>
  );
}

function DialogFooter({
  onCancel,
  submitLabel,
  className = "",
}: {
  onCancel: () => void;
  submitLabel?: string;
  className?: string;
}) {
  return (
    <footer
      className={`flex flex-col-reverse gap-2 border-t border-[#edf0ed] pt-4 sm:flex-row sm:justify-end ${className}`}
    >
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfe6e1] px-5 text-sm font-semibold text-[#526056] transition hover:bg-[#f5f8f5]"
      >
        Close
      </button>
      {submitLabel && (
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-5 text-sm font-bold text-white transition hover:bg-[#185a31]"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          {submitLabel}
        </button>
      )}
    </footer>
  );
}
