"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiLoader, FiPlus } from "react-icons/fi";
import { ALLERGY_OPTIONS, DISLIKE_OPTIONS } from "@/constants/onboarding-slider";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { authService } from "@/services/auth";

const normalize = (items?: string[]) =>
  Array.isArray(items) ? items.filter((item) => item.toLowerCase() !== "none") : [];

function preferenceValues(items: string[], options: string[]) {
  const standardOptions = options.filter(
    (option) => option !== "None" && option !== "Others",
  );
  return {
    selected: items.filter((item) =>
      standardOptions.some((option) => option.toLowerCase() === item.toLowerCase()),
    ),
    custom: items.filter(
      (item) =>
        !standardOptions.some((option) => option.toLowerCase() === item.toLowerCase()) &&
        item.toLowerCase() !== "others",
    ),
  };
}

export default function DietaryPreferences() {
  const { user, updateUserData } = useAuth();
  const toast = useToast();
  const [allergies, setAllergies] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [allergyCustom, setAllergyCustom] = useState("");
  const [dislikeCustom, setDislikeCustom] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const allergyValues = preferenceValues(normalize(user?.allergies), ALLERGY_OPTIONS);
    const dislikeValues = preferenceValues(
      normalize(user?.disLikes || user?.dislikes),
      DISLIKE_OPTIONS,
    );
    setAllergies(allergyValues.selected);
    setDislikes(dislikeValues.selected);
    setAllergyCustom(allergyValues.custom.join(", "));
    setDislikeCustom(dislikeValues.custom.join(", "));
  }, [user?.allergies, user?.disLikes, user?.dislikes]);

  const toggleValue = (
    current: string[],
    update: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    if (value === "None") {
      update((previous) => (previous.length === 1 && previous[0] === "None" ? [] : ["None"]));
      return;
    }

    update((previous) => {
      const withoutNone = previous.filter((item) => item !== "None");
      return withoutNone.includes(value)
        ? withoutNone.filter((item) => item !== value)
        : [...withoutNone, value];
    });
  };

  const valuesForSave = (selected: string[], custom: string) => {
    const chosen = selected.filter((item) => item !== "None" && item !== "Others");
    const extras = custom
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    return Array.from(new Set([...chosen, ...extras]));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?._id) {
      toast.error("Could not identify your account. Please sign in again.");
      return;
    }

    const savedAllergies = valuesForSave(allergies, allergyCustom);
    const savedDislikes = valuesForSave(dislikes, dislikeCustom);
    setIsSaving(true);
    try {
      const response = await authService.addAllergiesAndDislikes(user._id, {
        allergies: savedAllergies,
        dislikes: savedDislikes,
      });
      updateUserData({ allergies: savedAllergies, disLikes: savedDislikes });
      toast.success(response.message || "Dietary preferences saved.");
    } catch (error: any) {
      toast.error(error.message || "Could not save your dietary preferences.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderOptions = (
    title: string,
    description: string,
    options: string[],
    selected: string[],
    update: React.Dispatch<React.SetStateAction<string[]>>,
    customText: string,
    setCustomText: React.Dispatch<React.SetStateAction<string>>,
  ) => (
    <section className="space-y-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
      <div>
        <h3 className="text-sm font-extrabold text-[#1A2E35]">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active =
            option === "Others"
              ? customText.length > 0 || selected.includes("Others")
              : selected.some((item) => item.toLowerCase() === option.toLowerCase());
          return (
            <motion.button
              key={option}
              type="button"
              whileTap={{ scale: 0.96 }}
              aria-pressed={active}
              onClick={() => toggleValue(selected, update, option)}
              className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                active
                  ? "border-[#1E6B3C] bg-[#1E6B3C] text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50/60 hover:text-[#1E6B3C]"
              }`}
            >
              {active && <FiCheck className="mr-1 inline" size={12} />}
              {option}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence initial={false}>
        {(selected.includes("Others") || customText.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <label className="mb-1.5 block text-xs font-bold text-gray-500">
              Add other foods, separated by commas
            </label>
            <input
              value={customText}
              onChange={(event) => setCustomText(event.target.value)}
              placeholder="For example: prawns, coconut"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1A2E35] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-500/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );

  return (
    <motion.form
      onSubmit={handleSave}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="border-b border-gray-100 pb-5">
        <h2 className="text-lg font-black text-[#1A2E35]">Dietary Preferences</h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-500">
          Update foods you need to avoid or would rather not see in your meal suggestions.
        </p>
      </div>

      {renderOptions(
        "Allergies and sensitivities",
        "We will exclude these foods from your recommendations.",
        ALLERGY_OPTIONS,
        allergies,
        setAllergies,
        allergyCustom,
        setAllergyCustom,
      )}
      {renderOptions(
        "Foods you dislike",
        "We will use these preferences to make your suggestions a better fit.",
        DISLIKE_OPTIONS,
        dislikes,
        setDislikes,
        dislikeCustom,
        setDislikeCustom,
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-gray-400">
          Your preferences are used to personalize meal recommendations.
        </p>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={isSaving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#185A31] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <FiLoader className="animate-spin" /> : <FiPlus />}
          {isSaving ? "Saving preferences..." : "Save preferences"}
        </motion.button>
      </div>
    </motion.form>
  );
}
