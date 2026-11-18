"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnalyticsCharts from "@/components/admin/analytics/AnalyticsCharts";
import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import AnalyticsStats from "@/components/admin/analytics/AnalyticsStats";
import QuickInsights from "@/components/admin/analytics/QuickInsights";
import TopMeals from "@/components/admin/analytics/TopMeals";
import type {
  AdminAnalyticsData,
  AnalyticsTimeRange,
} from "@/types/admin-analytics";
import { adminAnalyticsService } from "@/services/admin-analytics";

export default function AnalyticsPage() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  const [selectedRange, setSelectedRange] =
    useState<AnalyticsTimeRange>("30 Days");
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [error, setError] = useState("");
  const [customStartDate, setCustomStartDate] = useState(
    toDateInputValue(thirtyDaysAgo),
  );
  const [customEndDate, setCustomEndDate] = useState(toDateInputValue(today));

  const selectRange = (range: AnalyticsTimeRange) => {
    setSelectedRange(range);
    setShowCustomRange(range === "Custom");
  };

  useEffect(() => {
    let active = true;
    adminAnalyticsService
      .getAnalytics(
        selectedRange,
        selectedRange === "Custom"
          ? { startDate: customStartDate, endDate: customEndDate }
          : undefined,
      )
      .then((result) => {
        if (active) {
          setData(result);
          setError("");
        }
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Could not load analytics.",
          );
        }
      });
    return () => {
      active = false;
    };
  }, [customEndDate, customStartDate, selectedRange]);

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
        customStartDate={customStartDate}
        customEndDate={customEndDate}
        onCustomDateChange={(field, value) =>
          field === "startDate"
            ? setCustomStartDate(value)
            : setCustomEndDate(value)
        }
      />
      {error && (
        <p role="alert" className="text-sm text-red-600">
          Could not load analytics: {error}
        </p>
      )}
      {!data && !error ? (
        <p role="status" className="text-sm text-gray-500">
          Loading analytics…
        </p>
      ) : data ? (
        <>
          <AnalyticsStats data={data} />
          <AnalyticsCharts
            data={data}
            selectedRange={selectedRange}
            onSelectRange={selectRange}
          />
          <section className="grid gap-3 lg:grid-cols-2">
            <TopMeals meals={data.topMeals} />
            <QuickInsights data={data} />
          </section>
        </>
      ) : null}
    </motion.div>
  );
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
