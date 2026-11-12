"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Plus, X } from "lucide-react";
import type { MealWriteData } from "@/services/admin";

interface AddMealDialogProps {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (meal: MealWriteData) => Promise<boolean>;
}

const initialForm = {
  mealTitle: "",
  category: "",
  estimatedPrice: "",
  description: "",
  estimatedCalories: "",
  carbohydrates: "",
  proteins: "",
  fats: "",
};

export default function AddMealDialog({
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
}: AddMealDialogProps) {
  const [form, setForm] = useState(initialForm);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const closeDialog = useCallback(() => {
    if (isSubmitting) return;
    setForm(initialForm);
    onClose();
  }, [isSubmitting, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, isSubmitting, closeDialog]);

  if (typeof document === "undefined") return null;

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericFields = [
      form.estimatedPrice,
      form.estimatedCalories,
      form.carbohydrates,
      form.proteins,
      form.fats,
    ].map(Number);
    if (numericFields.some((value) => !Number.isFinite(value) || value < 0)) {
      return;
    }

    const wasAdded = await onSubmit({
      mealTitle: form.mealTitle.trim(),
      category: form.category,
      estimatedPrice: Number(form.estimatedPrice),
      description: form.description.trim(),
      averageNutritionalInfo: {
        estimatedCalories: Number(form.estimatedCalories),
        macronutrients: {
          carbohydrates: Number(form.carbohydrates),
          proteins: Number(form.proteins),
          fats: Number(form.fats),
        },
      },
    });
    if (wasAdded) {
      setForm(initialForm);
      onClose();
    }
  };

  const inputClassName =
    "mt-1.5 h-11 w-full rounded-xl border border-[#e4e9e5] bg-white px-3.5 text-sm text-[#28352d] outline-none transition placeholder:text-[#a0a9a2] focus:border-[#31844d] focus:ring-2 focus:ring-[#31844d]/10 disabled:opacity-60";

  const numberInput = (
    field: keyof typeof initialForm,
    label: string,
    unit?: string,
  ) => (
    <label className="block min-w-0 text-xs font-semibold text-[#526056]">
      {label}
      <div className="relative">
        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          required
          value={form[field]}
          onChange={(event) => updateField(field, event.target.value)}
          className={`${inputClassName} ${unit ? "pr-14" : ""}`}
          placeholder="0"
          disabled={isSubmitting}
        />
        {unit && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#89948d]">
            {unit}
          </span>
        )}
      </div>
    </label>
  );

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#111122]/65 p-3 backdrop-blur-[2px] sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-meal-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e4e9e5] bg-white shadow-[0_24px_70px_rgba(17,17,34,0.28)]"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-[#edf0ed] px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="add-meal-title"
                  className="text-lg font-bold tracking-tight text-[#1A2E35] sm:text-xl"
                >
                  Add New Meal
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#7b887f]">
                  Enter meal details and nutritional information.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close add meal dialog"
                onClick={closeDialog}
                disabled={isSubmitting}
                className="rounded-lg p-2 text-[#7b887f] transition hover:bg-[#f3f6f3] hover:text-[#344239] disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[min(68vh,620px)] space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-[#526056] sm:col-span-2">
                    Meal title
                    <input
                      ref={firstInputRef}
                      type="text"
                      required
                      maxLength={120}
                      value={form.mealTitle}
                      onChange={(event) =>
                        updateField("mealTitle", event.target.value)
                      }
                      className={inputClassName}
                      placeholder="e.g. Indomie and Eggs"
                      disabled={isSubmitting}
                    />
                  </label>
                  <label className="block text-xs font-semibold text-[#526056]">
                    Category
                    <select
                      required
                      value={form.category}
                      onChange={(event) =>
                        updateField("category", event.target.value)
                      }
                      className={inputClassName}
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                      <option value="quick meal">Quick meal</option>
                    </select>
                  </label>
                  {numberInput("estimatedPrice", "Estimated price", "NGN")}
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
                      className="mt-1.5 w-full resize-y rounded-xl border border-[#e4e9e5] bg-white px-3.5 py-3 text-sm text-[#28352d] outline-none transition placeholder:text-[#a0a9a2] focus:border-[#31844d] focus:ring-2 focus:ring-[#31844d]/10 disabled:opacity-60"
                      placeholder="Describe the meal"
                      disabled={isSubmitting}
                    />
                  </label>
                </div>

                <section className="space-y-3 rounded-xl border border-[#e5ede7] bg-[#f8fbf8] p-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#344239]">
                      Nutritional information
                    </h3>
                    <p className="mt-0.5 text-[11px] text-[#829087]">
                      Enter estimated values per serving.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {numberInput(
                      "estimatedCalories",
                      "Estimated calories",
                      "kcal",
                    )}
                    {numberInput(
                      "carbohydrates",
                      "Carbohydrates",
                      "g",
                    )}
                    {numberInput("proteins", "Proteins", "g")}
                    {numberInput("fats", "Fats", "g")}
                  </div>
                </section>
              </div>

              <footer className="flex flex-col-reverse gap-2 border-t border-[#edf0ed] bg-[#fcfdfc] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={isSubmitting}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfe6e1] px-5 text-sm font-semibold text-[#526056] transition hover:bg-[#f5f8f5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#185a31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6B3C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {isSubmitting ? "Adding meal..." : "Add Meal"}
                </button>
              </footer>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
