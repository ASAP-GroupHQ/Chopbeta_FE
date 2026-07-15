"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalDetails from "@/components/dashboard/setting/PersonalDetails";
import { SettingsIcons } from "@/components/dashboard/setting/SettingsIcons";
import HeaderActions from "@/components/dashboard/HeaderActions";

type TabId =
  | "personal"
  | "kyc"
  | "limits"
  | "support"
  | "referral"
  | "contact"
  | "faq"
  | "terms"
  | "privacy"
  | "about";

interface SettingOption {
  id: TabId;
  label: string;
  category: "Personal" | "Services" | "Legal and Compliance";
  icon: React.ComponentType;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId | null>(null);

  const menuItems: SettingOption[] = [
    {
      id: "personal",
      label: "Personal Details",
      category: "Personal",
      icon: SettingsIcons.PersonalDetails,
    },
    {
      id: "kyc",
      label: "KYC Verification",
      category: "Personal",
      icon: SettingsIcons.KYCVerification,
    },
    {
      id: "limits",
      label: "Transaction Limits",
      category: "Personal",
      icon: SettingsIcons.TransactionLimits,
    },
    {
      id: "support",
      label: "Support",
      category: "Services",
      icon: SettingsIcons.Support,
    },
    {
      id: "referral",
      label: "Refer and Earn",
      category: "Services",
      icon: SettingsIcons.ReferAndEarn,
    },
    {
      id: "contact",
      label: "Contact Us",
      category: "Services",
      icon: SettingsIcons.ContactUs,
    },
    { id: "faq", label: "FAQ", category: "Services", icon: SettingsIcons.FAQ },
    {
      id: "terms",
      label: "Terms of Service",
      category: "Legal and Compliance",
      icon: SettingsIcons.TermsOfService,
    },
    {
      id: "privacy",
      label: "Privacy Policy",
      category: "Legal and Compliance",
      icon: SettingsIcons.PrivacyPolicy,
    },
    {
      id: "about",
      label: "About Us",
      category: "Legal and Compliance",
      icon: SettingsIcons.AboutUs,
    },
  ];

  const categories = ["Personal", "Services", "Legal and Compliance"] as const;

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {activeTab
                ? menuItems.find((t) => t.id === activeTab)?.label
                : "Settings"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {activeTab
                ? "Manage configuration and system profiles"
                : "Select a preference channel to manage your profile setup."}
            </p>
          </div>

          <HeaderActions />
        </div>

        <AnimatePresence mode="wait">
          {!activeTab ? (
            <motion.div
              key="grid-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {categories.map((cat) => (
                <div key={cat} className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    {cat}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {menuItems
                      .filter((item) => item.category === cat)
                      .map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 group active:scale-[0.99] transition-all text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-1 group-hover:scale-105 transition-transform duration-200">
                                <Icon />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-900 transition-colors">
                                {item.label}
                              </span>
                            </div>

                            <span className="text-gray-300 group-hover:text-emerald-600 transition-colors transform group-hover:translate-x-1 duration-200">
                              <svg
                                width="6"
                                height="10"
                                viewBox="0 0 6 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.7125 4.773L0 1.0605L1.0605 0L5.8335 4.773L1.0605 9.546L0 8.4855L3.7125 4.773Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="form-viewspace"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setActiveTab(null)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-emerald-700 mb-8 transition-colors cursor-pointer group"
              >
                <span className="transform group-hover:-translate-x-0.5 transition-transform">
                  &larr;
                </span>{" "}
                Back to Settings
              </button>

              <div className="max-w-2xl">
                {activeTab === "personal" ? (
                  <PersonalDetails />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[280px] text-center">
                    <p className="text-gray-400 text-sm font-medium max-w-sm">
                      This section is currently under development and will be
                      available soon.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
