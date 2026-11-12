import {
  FeedbackTotalIcon,
  NegativeFeedbackIcon,
  NeutralFeedbackIcon,
  PositiveFeedbackIcon,
} from "@/components/icons/AdminIcons";
import { FEEDBACK_STATS } from "@/constants/admin-feedback";

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

export default function FeedbackStats() {
  return (
    <section
      aria-label="Feedback summary"
      className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4"
    >
      {FEEDBACK_STATS.map((stat) => {
        const Icon = icons[stat.icon];
        return (
          <article
            key={stat.label}
            className={`flex min-h-[104px] items-center gap-3 rounded-2xl border px-4 py-4 shadow-[0_2px_8px_rgba(47,39,68,0.025)] transition-shadow hover:shadow-[0_6px_18px_rgba(47,39,68,0.06)] sm:px-5 ${toneStyles[stat.tone]}`}
          >
            <Icon className="h-11 w-11 shrink-0" />
            <div className="min-w-0">
              <p className="text-2xl font-bold leading-none tracking-tight text-[#202035]">
                {stat.value}
              </p>
              <h2 className="mt-1.5 text-xs font-medium text-[#737387]">
                {stat.label}
              </h2>
            </div>
            <span className="ml-auto hidden h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[#4c9869] sm:flex">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M4 16.5 9.2 11l3.5 3.5L20 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 7H20v4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </article>
        );
      })}
    </section>
  );
}
