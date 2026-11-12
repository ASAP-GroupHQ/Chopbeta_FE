"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnalyticsCharts from "@/components/admin/analytics/AnalyticsCharts";
import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import AnalyticsStats from "@/components/admin/analytics/AnalyticsStats";
import QuickInsights from "@/components/admin/analytics/QuickInsights";
import TopMeals from "@/components/admin/analytics/TopMeals";
import type { AnalyticsTimeRange } from "@/constants/analytics-data";

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] =
    useState<AnalyticsTimeRange>("30 Days");
  const [showCustomRange, setShowCustomRange] = useState(false);

  const selectRange = (range: AnalyticsTimeRange) => {
    setSelectedRange(range);
    setShowCustomRange(range === "Custom");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-4"
    >
      <AnalyticsHeader
        selectedRange={selectedRange}
        showCustomRange={showCustomRange}
        onSelectRange={selectRange}
      />
      <AnalyticsStats />
      <AnalyticsCharts
        selectedRange={selectedRange}
        onSelectRange={selectRange}
      />
      <section className="grid gap-3 lg:grid-cols-2">
        <TopMeals />
        <QuickInsights />
      </section>
    </motion.div>
  );
}
