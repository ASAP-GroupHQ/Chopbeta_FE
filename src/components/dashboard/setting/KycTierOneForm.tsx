"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiClock } from "react-icons/fi";
import { SettingSectionCard } from "@/components/dashboard/setting/SettingSection";

const initialForm = {
  school: "",
  faculty: "",
  department: "",
  level: "",
  program: "",
//   matricNumber: "",
//   studentId: "",
  yearOfEntry: "",
  expectedGraduation: "",
  modeOfStudy: "",
  residence: "",
  emergencyName: "",
  emergencyPhone: "",
};

export default function KycTierOneForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
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
              submitted
                ? "border-sky-100 bg-sky-50 text-sky-800"
                : "border-emerald-100 bg-emerald-50 text-emerald-800"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                submitted ? "bg-sky-500" : "animate-pulse bg-emerald-500"
              }`}
            />
            {submitted ? "Under review" : "In progress"}
          </span>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">School</span>
              <input
                value={formData.school}
                onChange={(e) => updateField("school", e.target.value)}
                placeholder="e.g. University of Lagos"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Faculty</span>
              <input
                value={formData.faculty}
                onChange={(e) => updateField("faculty", e.target.value)}
                placeholder="e.g. Engineering"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Department</span>
              <input
                value={formData.department}
                onChange={(e) => updateField("department", e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Current Level</span>
              <input
                value={formData.level}
                onChange={(e) => updateField("level", e.target.value)}
                placeholder="e.g. 300 Level"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Program / Course</span>
              <input
                value={formData.program}
                onChange={(e) => updateField("program", e.target.value)}
                placeholder="e.g. B.Sc. Accounting"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            {/* <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Matric Number</span>
              <input
                value={formData.matricNumber}
                onChange={(e) => updateField("matricNumber", e.target.value)}
                placeholder="e.g. 2019/12345"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label> */}

            {/* <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Student ID</span>
              <input
                value={formData.studentId}
                onChange={(e) => updateField("studentId", e.target.value)}
                placeholder="e.g. STU-20481"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label> */}

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Year of Entry</span>
              <input
                value={formData.yearOfEntry}
                onChange={(e) => updateField("yearOfEntry", e.target.value)}
                placeholder="e.g. 2022"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Expected Graduation</span>
              <input
                value={formData.expectedGraduation}
                onChange={(e) => updateField("expectedGraduation", e.target.value)}
                placeholder="e.g. 2026"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Mode of Study</span>
              <input
                value={formData.modeOfStudy}
                onChange={(e) => updateField("modeOfStudy", e.target.value)}
                placeholder="e.g. Full Time / Part Time"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="space-y-2 text-sm text-gray-700 md:col-span-2">
              <span className="font-semibold">Current Residence</span>
              <input
                value={formData.residence}
                onChange={(e) => updateField("residence", e.target.value)}
                placeholder="e.g. Hostel / Off-campus / Parent's home"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            {/* <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Emergency Contact Name</span>
              <input
                value={formData.emergencyName}
                onChange={(e) => updateField("emergencyName", e.target.value)}
                placeholder="e.g. Jane Doe"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label> */}

            {/* <label className="space-y-2 text-sm text-gray-700">
              <span className="font-semibold">Emergency Contact Phone</span>
              <input
                value={formData.emergencyPhone}
                onChange={(e) => updateField("emergencyPhone", e.target.value)}
                placeholder="e.g. +234 800 000 0000"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label> */}
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">How we use these details</p>
            <p className="mt-1 text-xs leading-relaxed text-emerald-800 sm:text-sm">
              Your school and study information helps us understand student needs
              and improve relevant meal and budget recommendations.
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="under-review-banner"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                role="status"
                className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sky-900"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm">
                  <FiClock size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold">Your details are under review</span>
                  <span className="mt-1 block text-xs leading-relaxed text-sky-800 sm:text-sm">
                    We&apos;ll review your Tier 1 information within 24 hours.
                  </span>
                </span>
                <FiCheck className="ml-auto mt-1 shrink-0 text-sky-700" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="submit-kyc"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="text-sm leading-relaxed text-gray-500">
                  Add your student profile to unlock segment-level insights.
                </p>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.99] sm:w-auto sm:py-2.5"
                >
                  Save Tier 1 KYC
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </SettingSectionCard>
    </div>
  );
}
