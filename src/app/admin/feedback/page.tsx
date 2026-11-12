"use client";

import { useMemo, useState } from "react";
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
import {
  ADMIN_FEEDBACK,
  type AdminFeedback,
  type FeedbackCategory,
  type FeedbackStatus,
} from "@/constants/admin-feedback";

export default function FeedbackPage() {
  const toast = useToast();
  const [feedbackItems, setFeedbackItems] = useState(ADMIN_FEEDBACK);
  const [searchDraft, setSearchDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<
    "All Types" | FeedbackCategory
  >("All Types");
  const [selectedStatus, setSelectedStatus] = useState<
    "All Status" | FeedbackStatus
  >("All Status");
  const [selectedCategory, setSelectedCategory] = useState<
    "All Categories" | FeedbackCategory
  >("All Categories");
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<AdminFeedback | null>(null);
  const [dialogMode, setDialogMode] = useState<"view" | "delete" | null>(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  const filteredFeedback = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return feedbackItems.filter((item) => {
      const matchesQuery =
        !query ||
        [item.name, item.email, item.type, item.message].some((value) =>
          value.toLowerCase().includes(query),
        );
      const matchesType =
        selectedType === "All Types" || item.type === selectedType;
      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [feedbackItems, searchQuery, selectedStatus, selectedType]);

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

  const requestDelete = (item: AdminFeedback) => {
    setSelectedFeedback(item);
    setDialogMode("delete");
  };

  const deleteFeedback = () => {
    if (!selectedFeedback) return;
    setFeedbackItems((previous) =>
      previous.filter((item) => item.id !== selectedFeedback.id),
    );
    closeDialog();
    toast.success("Feedback removed from this sample list.");
  };

  const generateReport = () => {
    setReportGenerated(true);
  };

  const downloadCsv = () => {
    const columns = [
      "User",
      "Email",
      "Feedback Type",
      "Rating",
      "Message",
      "Date",
      "Status",
    ];
    const rows = feedbackItems.map((item) => [
      item.name,
      item.email,
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
            <thead><tr><th>User</th><th>Feedback Type</th><th>Rating</th><th>Message</th><th>Date</th><th>Status</th></tr></thead>
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
        <FeedbackStats />
        <FeedbackFilters
          searchQuery={searchDraft}
          selectedType={selectedType}
          selectedStatus={selectedStatus}
          onSearchChange={setSearchDraft}
          onSearch={() => setSearchQuery(searchDraft)}
          onTypeChange={setSelectedType}
          onStatusChange={setSelectedStatus}
        />
        <section className="grid gap-3 xl:grid-cols-2">
          <FeedbackOverview
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <FeedbackQuickInsights />
        </section>
        <RecentFeedback
          feedback={visibleFeedback}
          isShowingAll={isShowingAll}
          onToggleAll={() => setIsShowingAll((showingAll) => !showingAll)}
          onView={showFeedback}
          onDelete={requestDelete}
        />
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
        onConfirmDelete={deleteFeedback}
      />
    </>
  );
}
