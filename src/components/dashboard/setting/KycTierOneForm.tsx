"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiCheckCircle, FiLoader } from "react-icons/fi";
import { SettingSectionCard } from "@/components/dashboard/setting/SettingSection";
import { kycService } from "@/services/kyc";
import { useToast } from "@/context/ToastContext";
import { KycData } from "@/types/kyc";

const initialForm = {
  school: "",
  faculty: "",
  department: "",
  currentLevel: "",
  course: "",
  entryYear: "",
  expectedGraduation: "",
  modeOfStudy: "",
  currentResidence: "",
};

const toFormValues = (kyc: KycData) => ({
  school: kyc.school,
  faculty: kyc.faculty,
  department: kyc.department,
  currentLevel: kyc.currentLevel,
  course: kyc.course,
  entryYear: kyc.entryYear,
  expectedGraduation: kyc.expectedGraduation,
  modeOfStudy: kyc.modeOfStudy,
  currentResidence: kyc.currentResidence,
});

export default function KycTierOneForm() {
  const toast = useToast();
  const [formData, setFormData] = useState(initialForm);
  const [hasKyc, setHasKyc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadStatus, setLoadStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  const loadKyc = async () => {
    setLoadStatus("loading");

    try {
      const kyc = await kycService.getKYC();
      if (kyc) {
        setFormData(toFormValues(kyc));
        setHasKyc(true);
      } else {
        setFormData(initialForm);
        setHasKyc(false);
      }
      setLoadStatus("ready");
    } catch (error) {
      setLoadStatus("error");
      toast.error(
        "Could not load KYC",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  useEffect(() => {
    void loadKyc();
    // Load the signed-in user's record when this settings form is mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emptyFields = Object.values(formData).filter((value) => !value.trim());

    if (emptyFields.length > 0) {
      toast.error("Missing required fields", "Please fill out all KYC fields.");
      return;
    }

    setLoading(true);

    try {
      const response = hasKyc
        ? await kycService.editKYC(formData)
        : await kycService.createKYC(formData);

      if (!response.success) {
        throw new Error(response.message || "Could not save KYC data.");
      }

      setHasKyc(true);
      toast.success(
        hasKyc ? "KYC updated" : "KYC saved",
        response.message || "Your KYC information has been saved.",
      );

      try {
        const updatedKyc = await kycService.getKYC();
        if (updatedKyc) {
          setFormData(toFormValues(updatedKyc));
        } else {
          toast.info(
            "KYC saved",
            "Your changes were saved, but the latest record could not be loaded.",
          );
        }
      } catch {
        toast.info(
          "KYC saved",
          "Your changes were saved, but the latest record could not be loaded.",
        );
      }
    } catch (error) {
      toast.error(
        "Submission failed",
        error instanceof Error
          ? error.message
          : "An error occurred while submitting KYC.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SettingSectionCard
        title="Tier 1 Student KYC"
        description="Share your school details to help tailor meal suggestions and student-focused insights."
        badge="Tier 1"
        action={
          <span
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10px] font-bold sm:text-xs ${
              hasKyc
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-100 bg-amber-50 text-amber-800"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                hasKyc ? "bg-emerald-600" : "animate-pulse bg-amber-500"
              }`}
            />
            {loadStatus === "loading"
              ? "Loading"
              : loadStatus === "error"
                ? "Unavailable"
                : hasKyc
                  ? "Done"
                  : "In progress"}
          </span>
        }
      >
        {loadStatus !== "ready" ? (
          <div
            role={loadStatus === "error" ? "alert" : "status"}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm text-gray-600"
          >
            {loadStatus === "loading" ? (
              "Loading your KYC information..."
            ) : (
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>We couldn&apos;t load your KYC information.</span>
                <button
                  type="button"
                  onClick={() => void loadKyc()}
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">School</span>
              <input
                value={formData.school}
                onChange={(e) => updateField("school", e.target.value)}
                placeholder="e.g. FUO"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Faculty</span>
              <input
                value={formData.faculty}
                onChange={(e) => updateField("faculty", e.target.value)}
                placeholder="e.g. Science"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Department</span>
              <input
                value={formData.department}
                onChange={(e) => updateField("department", e.target.value)}
                placeholder="e.g. Microbiology"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Current Level</span>
              <input
                value={formData.currentLevel}
                onChange={(e) => updateField("currentLevel", e.target.value)}
                placeholder="e.g. 300lv"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Course / Program</span>
              <input
                value={formData.course}
                onChange={(e) => updateField("course", e.target.value)}
                placeholder="e.g. Microbiology"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Entry Year</span>
              <input
                value={formData.entryYear}
                onChange={(e) => updateField("entryYear", e.target.value)}
                placeholder="e.g. 2018"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Mode of Study</span>
              <input
                value={formData.modeOfStudy}
                onChange={(e) => updateField("modeOfStudy", e.target.value)}
                placeholder="e.g. Virtual / Full Time"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Expected Graduation</span>
              <input
                value={formData.expectedGraduation}
                onChange={(e) =>
                  updateField("expectedGraduation", e.target.value)
                }
                placeholder="e.g. december, 2026"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700 md:col-span-2">
              <span className="font-semibold">Current Residence</span>
              <input
                value={formData.currentResidence}
                onChange={(e) =>
                  updateField("currentResidence", e.target.value)
                }
                placeholder="e.g. port-harcourt"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              How we use these details
            </p>
            <p className="mt-1 text-xs leading-relaxed text-emerald-800 sm:text-sm">
              Your school and study information helps us understand student
              needs and improve relevant meal and budget recommendations.
            </p>
          </div>

          <AnimatePresence>
            {hasKyc && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                role="status"
                className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <FiCheckCircle size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold">
                    Tier 1 KYC complete
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-emerald-800 sm:text-sm">
                    Your student KYC information has been successfully saved.
                    You can update your details anytime below.
                  </span>
                </span>
                <FiCheck
                  className="ml-auto mt-1 shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-gray-500">
              Add your student profile to unlock segment-level insights.
            </p>
            <button
              type="submit"
              disabled={loading || loadStatus !== "ready"}
              className="w-full rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:py-2.5 cursor-pointer"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <FiLoader className="animate-spin" aria-hidden="true" />
                  {hasKyc ? "Updating..." : "Saving..."}
                </span>
              ) : hasKyc ? (
                "Update Tier 1 KYC"
              ) : (
                "Save Tier 1 KYC"
              )}
            </button>
          </div>
        </form>
        )}
      </SettingSectionCard>
    </div>
  );
}
