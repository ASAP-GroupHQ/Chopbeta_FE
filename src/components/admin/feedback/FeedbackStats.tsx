import {
  FeedbackTotalIcon,
  NegativeFeedbackIcon,
  NeutralFeedbackIcon,
  PositiveFeedbackIcon,
} from "@/components/icons/AdminIcons";
import type { FeedbackStats as FeedbackStatsData } from "@/types/admin-feedback";

const icons = {
  total: FeedbackTotalIcon,
  positive: PositiveFeedbackIcon,
  neutral: NeutralFeedbackIcon,
  negative: NegativeFeedbackIcon,
};

const toneStyles = {
  green: "border-[#dcece1] bg-[#f7fbf8]",
  amber: "border-[#f0e7d4] bg-[#fdfaf4]",
  rose: "border-[#f0dede] bg-[#fdf8f8]",
};

export default function FeedbackStats({
  stats,
}: {
  stats: FeedbackStatsData | null;
}) {
  const feedbackStats = [
    { label: "Total feedback", value: stats?.total, tone: "green", icon: "total" },
    { label: "Positive feedback", value: stats?.positive, tone: "green", icon: "positive" },
    { label: "Neutral feedback", value: stats?.neutral, tone: "amber", icon: "neutral" },
    { label: "Negative feedback", value: stats?.negative, tone: "rose", icon: "negative" },
  ] as const;
  return (
    <section
      aria-label="Feedback summary"
      className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4"
    >
      {feedbackStats.map((stat) => {
        const Icon = icons[stat.icon];
        return (
          <article
            key={stat.label}
            className={`flex min-h-[104px] items-center gap-3 rounded-2xl border px-4 py-4 shadow-[0_2px_8px_rgba(47,39,68,0.025)] transition-shadow hover:shadow-[0_6px_18px_rgba(47,39,68,0.06)] sm:px-5 ${toneStyles[stat.tone]}`}
          >
            <Icon className="h-11 w-11 shrink-0" />
            <div className="min-w-0">
              <p className="text-2xl font-bold leading-none tracking-tight text-[#202035]">
                {stat.value?.toLocaleString("en-NG") ?? "—"}
              </p>
              <h2 className="mt-1.5 text-xs font-medium text-[#737387]">
                {stat.label}
              </h2>
            </div>
          </article>
        );
      })}
    </section>
  );
}
