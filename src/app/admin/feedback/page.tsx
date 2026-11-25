"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import FeedbackDetailsDialog from "@/components/admin/feedback/FeedbackDetailsDialog";
import FeedbackFilters from "@/components/admin/feedback/FeedbackFilters";
import FeedbackHeader from "@/components/admin/feedback/FeedbackHeader";
import FeedbackOverview from "@/components/admin/feedback/FeedbackOverview";
import FeedbackQuickInsights from "@/components/admin/feedback/FeedbackQuickInsights";
import FeedbackStats from "@/components/admin/feedback/FeedbackStats";
import RecentFeedback from "@/components/admin/feedback/RecentFeedback";
import UserSupportReport from "@/components/admin/feedback/UserSupportReport";
import { useToast } from "@/context/ToastContext";
import { adminFeedbackService } from "@/services/admin-feedback";
import type {
  AdminFeedback,
  FeedbackCategory,
  FeedbackOverviewItem,
  FeedbackSentiment,
  FeedbackStats as FeedbackStatsData,
  FeedbackStatus,
} from "@/types/admin-feedback";

export default function FeedbackPage() {
  const toast = useToast();
  const [feedbackItems, setFeedbackItems] = useState<AdminFeedback[]>([]);
  const [feedbackStats, setFeedbackStats] =
    useState<FeedbackStatsData | null>(null);
  const [overview, setOverview] = useState<FeedbackOverviewItem[]>([]);
  const [loadError, setLoadError] = useState("");
  const [summaryErrors, setSummaryErrors] = useState<
    Partial<Record<"stats" | "overview", string>>
  >({});
  const [searchDraft, setSearchDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<
    "All Types" | FeedbackSentiment
  >("All Types");
  const [selectedStatus, setSelectedStatus] = useState<
    "All Status" | FeedbackStatus
  >("All Status");
  const [selectedCategory, setSelectedCategory] = useState<
    "All Categories" | FeedbackCategory
  >("All Categories");
  const [selectedOverviewCategory, setSelectedOverviewCategory] = useState<
    "All Categories" | FeedbackCategory
  >("All Categories");
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<AdminFeedback | null>(null);
  const [dialogMode, setDialogMode] = useState<"view" | "advance" | null>(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    let active = true;
    const loadFeedback = async () => {
      try {
        const items = await adminFeedbackService.getFeedback({
          category:
            selectedCategory === "All Categories"
              ? undefined
              : selectedCategory,
          type: selectedType === "All Types" ? undefined : selectedType,
          status: selectedStatus === "All Status" ? undefined : selectedStatus,
        });
        if (!active) return;
        setFeedbackItems(items);
        setLoadError("");
      } catch (error: unknown) {
        if (!active) return;
        setLoadError(
          error instanceof Error ? error.message : "Could not load feedback.",
        );
        toast.error(
          "Could not load feedback",
          error instanceof Error ? error.message : "Please try again.",
        );
      }
    };
    void loadFeedback();
    return () => {
      active = false;
    };
  }, [selectedCategory, selectedStatus, selectedType, toast]);

  useEffect(() => {
    let active = true;
    adminFeedbackService
      .getStats()
      .then((stats) => {
        if (!active) return;
        setFeedbackStats(stats);
        setSummaryErrors((current) => {
          const next = { ...current };
          delete next.stats;
          return next;
        });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setSummaryErrors((current) => ({
          ...current,
          stats: `Could not load feedback statistics: ${
            error instanceof Error ? error.message : "Please try again."
          }`,
        }));
      });
    adminFeedbackService
      .getCategoryOverview()
      .then((categories) => {
        if (!active) return;
        setOverview(categories);
        setSummaryErrors((current) => {
          const next = { ...current };
          delete next.overview;
          return next;
        });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setSummaryErrors((current) => ({
          ...current,
          overview: `Could not load feedback overview: ${
            error instanceof Error ? error.message : "Please try again."
          }`,
        }));
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredFeedback = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return feedbackItems.filter((item) => {
      const matchesQuery =
        !query ||
        [
          item.name,
          item.email,
          item.type,
          item.category,
          item.message,
        ].some((value) =>
          value.toLowerCase().includes(query),
        );
      return matchesQuery;
    });
  }, [feedbackItems, searchQuery]);

  const visibleFeedback = isShowingAll
    ? filteredFeedback
    : filteredFeedback.slice(0, 3);

  const closeDialog = () => {
    setSelectedFeedback(null);
    setDialogMode(null);
  };

  const showFeedback = (item: AdminFeedback) => {
    setSelectedFeedback(item);
    setDialogMode("view");
  };

  const requestAdvance = (item: AdminFeedback) => {
    setSelectedFeedback(item);
    setDialogMode("advance");
  };

  const advanceFeedback = async () => {
    if (!selectedFeedback || selectedFeedback.status === "Resolved") return;
    try {
      await adminFeedbackService.advanceStatus(selectedFeedback.id);
      const nextStatus =
        selectedFeedback.status === "New" ? "In progress" : "Resolved";
      setFeedbackItems((previous) =>
        previous.map((item) =>
          item.id === selectedFeedback.id
            ? { ...item, status: nextStatus }
            : item,
        ),
      );
      closeDialog();
      toast.success(`Feedback marked ${nextStatus.toLowerCase()}.`);
    } catch (error) {
      toast.error(
        "Could not update feedback status",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  const generateReport = () => {
    setReportGenerated(true);
  };

  const downloadCsv = () => {
    const columns = [
      "User",
      "Email",
      "Feedback Category",
      "Feedback Type",
      "Rating",
      "Message",
      "Date",
      "Status",
    ];
    const rows = feedbackItems.map((item) => [
      item.name,
      item.email,
      item.category,
      item.type,
      String(item.rating),
      item.message,
      item.date,
      item.status,
    ]);
    const csv = [columns, ...rows]
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "chopbeta-feedback-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadPdf = () => {
    const reportWindow = window.open("", "_blank");
    if (!reportWindow) {
      toast.error("Allow pop-ups to print the PDF report.");
      return;
    }

    const escapeHtml = (value: string) =>
      value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return entities[character];
      });
    const reportRows = feedbackItems
      .map(
        (item) => `<tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.category)}</td>
          <td>${escapeHtml(item.type)}</td>
          <td>${escapeHtml(String(item.rating))}/5</td>
          <td>${escapeHtml(item.message)}</td>
          <td>${escapeHtml(item.date)}</td>
          <td>${escapeHtml(item.status)}</td>
        </tr>`,
      )
      .join("");

    reportWindow.document.open();
    reportWindow.document.write(`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>ChopBeta User Support Report</title>
          <style>
            body { color: #202035; font: 14px Arial, sans-serif; margin: 36px; }
            h1 { font-size: 24px; margin-bottom: 6px; }
            p { color: #666; margin: 4px 0 24px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border-bottom: 1px solid #e5e5e9; padding: 10px 8px; text-align: left; vertical-align: top; }
            th { background: #f4f6f4; font-size: 11px; text-transform: uppercase; }
            td { font-size: 12px; }
            @media print { body { margin: 18mm; } }
          </style>
        </head>
        <body>
          <h1>ChopBeta User Support Report</h1>
          <p>Generated ${escapeHtml(new Date().toLocaleDateString())} · ${feedbackItems.length} feedback entries</p>
          <table>
            <thead><tr><th>User</th><th>Feedback Category</th><th>Feedback Type</th><th>Rating</th><th>Message</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>${reportRows}</tbody>
          </table>
          <script>window.onafterprint = () => window.close(); window.onload = () => window.print();</script>
        </body>
      </html>`);
    reportWindow.document.close();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-4"
      >
        <FeedbackHeader />
        <FeedbackStats stats={feedbackStats} />
        {Object.entries(summaryErrors).map(([key, error]) => (
          <p key={key} role="alert" className="text-sm text-red-600">
            {error}
          </p>
        ))}
        <FeedbackFilters
          searchQuery={searchDraft}
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          selectedStatus={selectedStatus}
          onSearchChange={setSearchDraft}
          onSearch={() => setSearchQuery(searchDraft)}
          onCategoryChange={setSelectedCategory}
          onTypeChange={setSelectedType}
          onStatusChange={setSelectedStatus}
        />
        <section className="grid gap-3 xl:grid-cols-2">
          <FeedbackOverview
            overview={overview}
            selectedCategory={selectedOverviewCategory}
            onCategoryChange={setSelectedOverviewCategory}
          />
          <FeedbackQuickInsights overview={overview} />
        </section>
        <RecentFeedback
          feedback={visibleFeedback}
          isShowingAll={isShowingAll}
          onToggleAll={() => setIsShowingAll((showingAll) => !showingAll)}
          onView={showFeedback}
          onAdvance={requestAdvance}
        />
        {loadError && (
          <p role="alert" className="text-sm text-red-600">
            Could not load feedback: {loadError}
          </p>
        )}
        <UserSupportReport
          reportGenerated={reportGenerated}
          reportCount={feedbackItems.length}
          onGenerate={generateReport}
          onDownloadPdf={downloadPdf}
          onDownloadCsv={downloadCsv}
        />
      </motion.div>
      <FeedbackDetailsDialog
        feedback={selectedFeedback}
        mode={dialogMode}
        onClose={closeDialog}
        onConfirmAdvance={advanceFeedback}
      />
    </>
  );
}
