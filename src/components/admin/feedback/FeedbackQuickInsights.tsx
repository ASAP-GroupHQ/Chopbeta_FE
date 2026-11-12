import { Lightbulb } from "lucide-react";

export default function FeedbackQuickInsights() {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#dcebe1] bg-[#f2f8f4] shadow-[0_2px_10px_rgba(47,39,68,0.035)]">
      <div className="flex min-h-[72px] items-center gap-3 bg-[#28794d] px-5 py-4 text-white">
        <Lightbulb
          className="h-8 w-8 shrink-0 text-[#dcebdc]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="text-base font-bold">Quick Insights</h2>
      </div>
      <div className="flex min-h-[150px] items-center px-5 py-6 sm:px-7">
        <div className="flex gap-4 border-l-2 border-[#41956a] pl-4">
          <Lightbulb
            className="mt-0.5 h-7 w-7 shrink-0 text-[#b58a25]"
            strokeWidth={1.7}
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-bold leading-relaxed text-[#303044]">
              Most Users (60%) are giving suggestions.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#858598]">
              Showing great engagement and ideas for improvement.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
