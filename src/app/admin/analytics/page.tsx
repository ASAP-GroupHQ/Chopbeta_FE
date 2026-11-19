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

const EMPTY_ANALYTICS_DATA: AdminAnalyticsData = {
  mealPlans: [],
  userGrowth: [],
  mealCategories: [],
  topMeals: [],
  totalMealPlans: null,
  totalUsers: null,
  activeUsers: null,
  averageMealPrice: null,
  growthPercentage: null,
};

export default function AnalyticsPage() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  const [selectedRange, setSelectedRange] =
    useState<AnalyticsTimeRange>("30 Days");
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [data, setData] = useState(EMPTY_ANALYTICS_DATA);
  const [endpointErrors, setEndpointErrors] = useState<Record<string, string>>(
    {},
  );
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
    const loadEndpoint = <T,>(
      key: string,
      request: Promise<T>,
      apply: (result: T) => Partial<AdminAnalyticsData>,
    ) => {
      request
        .then((result) => {
          if (!active) return;
          setData((current) => ({ ...current, ...apply(result) }));
          setEndpointErrors((current) => {
            const next = { ...current };
            delete next[key];
            return next;
          });
        })
        .catch((cause: unknown) => {
          if (!active) return;
          const message =
            cause instanceof Error ? cause.message : "Please try again.";
          setEndpointErrors((current) => ({
            ...current,
            [key]: `Could not load ${key}: ${message}`,
          }));
        });
    };
    const customRange =
      selectedRange === "Custom"
        ? { startDate: customStartDate, endDate: customEndDate }
        : undefined;

    loadEndpoint(
      "Generated meal analysis",
      adminAnalyticsService.getGeneratedMealsAnalysis(
        selectedRange,
        customRange,
      ),
      (result) => result,
    );
    loadEndpoint(
      "User growth",
      adminAnalyticsService.getGrowthRate(selectedRange),
      (result) => result,
    );
    loadEndpoint(
      "Analytics records",
      adminAnalyticsService.getAnalyticsRecord(),
      (result) => result,
    );
    loadEndpoint(
      "Top meals",
      adminAnalyticsService
        .getTopMeals(selectedRange)
        .then((topMeals) => ({ topMeals })),
      (result) => result,
    );
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
      {Object.entries(endpointErrors).map(([endpoint, error]) => (
        <p key={endpoint} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ))}
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
    </motion.div>
  );
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
