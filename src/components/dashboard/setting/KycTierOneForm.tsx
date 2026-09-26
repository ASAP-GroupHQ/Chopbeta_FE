"use client";

import React, { useState } from "react";
import { SettingSectionCard, StatPill } from "@/components/dashboard/setting/SettingSection";

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
        description="We use this to understand who our students are, where they study, and how we can tailor offers, budget insights, and product recommendations to the right communities."
        badge="Tier 1"
        action={<StatPill label="Status" value="In Progress" />}
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
            <p className="text-sm font-semibold text-emerald-900">Why this matters</p>
            <p className="mt-1 text-sm text-emerald-800">
              Tier 1 verification helps us group user insights by school, faculty,
              department, and student segment so we can make smarter product,
              budgeting, and culinary recommendations for our student audience.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-sm text-gray-500">
              {submitted
                ? "Tier 1 KYC is ready for review."
                : "Add your student profile to unlock segment-level insights."}
            </p>
            <button
              type="submit"
              className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Save Tier 1 KYC
            </button>
          </div>
        </form>
      </SettingSectionCard>
    </div>
  );
}
