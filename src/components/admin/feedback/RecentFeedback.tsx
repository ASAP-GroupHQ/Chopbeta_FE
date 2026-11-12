"use client";

import { ArrowRight, Eye, Star, Trash2 } from "lucide-react";
import type { AdminFeedback } from "@/constants/admin-feedback";

interface RecentFeedbackProps {
  feedback: AdminFeedback[];
  isShowingAll: boolean;
  onToggleAll: () => void;
  onView: (item: AdminFeedback) => void;
  onDelete: (item: AdminFeedback) => void;
}

export default function RecentFeedback({
  feedback,
  isShowingAll,
  onToggleAll,
  onView,
  onDelete,
}: RecentFeedbackProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e9e5ed] bg-white shadow-[0_2px_10px_rgba(47,39,68,0.035)]">
      <header className="flex items-center justify-between gap-3 border-b border-[#ebe8ef] px-4 py-3.5 sm:px-5">
        <h2 className="text-sm font-bold text-[#303044]">Recent Feedback</h2>
        <button
          type="button"
          onClick={onToggleAll}
          aria-expanded={isShowingAll}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#287749] transition hover:text-[#195633]"
        >
          {isShowingAll ? "Show Recent" : "View All"}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </header>

      <div className="divide-y divide-[#eeebf1] lg:hidden">
        {feedback.map((item) => (
          <article key={item.id} className="space-y-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <Avatar name={item.name} />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-[#343448]">
                    {item.name}
                  </p>
                  <p className="truncate text-[10px] text-[#858598]">
                    {item.email}
                  </p>
                </div>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <CategoryBadge type={item.type} />
            <p className="text-xs leading-relaxed text-[#626276]">
              {item.message}
            </p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <RatingStars rating={item.rating} />
                <p className="mt-1 text-[10px] text-[#858598]">{item.date}</p>
              </div>
              <RowActions
                onView={() => onView(item)}
                onDelete={() => onDelete(item)}
              />
            </div>
          </article>
        ))}
        {feedback.length === 0 && <EmptyFeedback />}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="bg-[#f6f5f8] text-[11px] font-semibold text-[#5b5b6d]">
              <th className="px-4 py-3">User</th>
              <th className="px-3 py-3">Feedback Type</th>
              <th className="px-3 py-3">Rating</th>
              <th className="px-3 py-3">Message</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eeebf1]">
            {feedback.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-[#fbfafc]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={item.name} />
                    <span className="whitespace-nowrap text-xs font-semibold text-[#343448]">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <CategoryBadge type={item.type} />
                </td>
                <td className="px-3 py-3">
                  <RatingStars rating={item.rating} />
                </td>
                <td className="max-w-[260px] px-3 py-3 text-xs text-[#555568]">
                  <span className="line-clamp-2">{item.message}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[10px] text-[#626276]">
                  {item.date}
                </td>
                <td className="px-3 py-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <RowActions
                      onView={() => onView(item)}
                      onDelete={() => onDelete(item)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {feedback.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10">
                  <EmptyFeedback />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-[#eeebf1] px-4 py-2.5 text-[10px] text-[#858598]">
        Showing {feedback.length} {feedback.length === 1 ? "entry" : "entries"}
      </div>
    </section>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f2eb] text-[10px] font-bold text-[#287749]"
    >
      {name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")}
    </span>
  );
}

function CategoryBadge({ type }: { type: AdminFeedback["type"] }) {
  const styles: Record<AdminFeedback["type"], string> = {
    Suggestion: "bg-[#edf5ef] text-[#397c53]",
    Compliment: "bg-[#edf3fa] text-[#4c7eaf]",
    Complaint: "bg-[#fbefed] text-[#b7655a]",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[type]}`}
    >
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: AdminFeedback["status"] }) {
  const styles: Record<AdminFeedback["status"], string> = {
    New: "bg-[#edf3fa] text-[#4c7eaf]",
    "In progress": "bg-[#fbefed] text-[#b7655a]",
    Resolved: "bg-[#edf5ef] text-[#397c53]",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <span key={index} className="relative inline-flex">
            <Star className="h-3.5 w-3.5 text-[#d3d4d8]" />
            {fill > 0 && (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className="h-3.5 w-3.5 fill-[#d9a51f] text-[#d9a51f]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function RowActions({
  onView,
  onDelete,
}: {
  onView: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="View feedback"
        onClick={onView}
        className="rounded-full bg-[#eff3f1] p-2 text-[#438469] transition hover:bg-[#e1ebe5]"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Delete feedback"
        onClick={onDelete}
        className="rounded-full bg-[#fbefed] p-2 text-[#bd665c] transition hover:bg-[#f5dfdb]"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function EmptyFeedback() {
  return (
    <div className="py-8 text-center">
      <p className="text-sm font-semibold text-[#434357]">No feedback found</p>
      <p className="mt-1 text-xs text-[#858598]">
        Try adjusting your search or filters.
      </p>
    </div>
  );
}
