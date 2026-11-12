import { Activity, ArrowRight, Soup, UsersRound } from "lucide-react";
import { QUICK_INSIGHTS } from "@/constants/analytics-data";

export default function QuickInsights() {
  return (
    <article className="min-w-0 space-y-2">
      <div className="flex items-center gap-2 px-1 py-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7ebe5] text-[#c8856a]">
          <QuickInsightIcon />
        </span>
        <div>
          <h2 className="text-sm font-bold text-[#303044]">Quick Insights</h2>
          <p className="text-[10px] text-[#858598]">
            Key takeaways from platform performance
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {QUICK_INSIGHTS.map((item) => (
          <article
            key={item.title}
            className="group flex items-center gap-3 rounded-xl border border-[#eeeaf0] bg-white/80 px-3 py-3 shadow-[0_2px_8px_rgba(47,39,68,0.025)] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_5px_14px_rgba(47,39,68,0.07)] sm:px-4"
          >
            <InsightIcon type={item.icon} color={item.color} />
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold text-[#37374b] sm:text-xs">
                {item.title === "Meal generation increased by 22%" ? (
                  <>
                    Meal generation increased by{" "}
                    <span className="text-[#339464]">22%</span>
                  </>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-1 text-[10px] leading-relaxed text-[#858598]">
                {item.detail}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#858598] transition-transform group-hover:translate-x-0.5" />
          </article>
        ))}
      </div>
    </article>
  );
}

function InsightIcon({ type, color }: { type: string; color: string }) {
  if (type === "growth") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f3ec] text-[#369464]">
        <Activity className="h-4 w-4" />
      </span>
    );
  }
  if (type === "users") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efedff] text-[#7867ff]">
        <UsersRound className="h-4 w-4" />
      </span>
    );
  }
  if (type === "meal") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf4ed] text-[#2f925d]">
        <Soup className="h-4 w-4" />
      </span>
    );
  }
  return (
    <PeakActivityIcon color={color} />
  );
}

function PeakActivityIcon({ color }: { color: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
      style={{ color, backgroundColor: `${color}14` }}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8"
        fill="none"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="16" fill="#263CCF" fillOpacity="0.1" />
        <path
          d="M12.493 24.292C11.3977 23.8193 10.4447 23.178 9.634 22.368C8.82333 21.558 8.18167 20.606 7.709 19.512C7.23633 18.418 7 17.2483 7 16.003C7 14.7577 7.23633 13.5877 7.709 12.493C8.181 11.3977 8.82133 10.4447 9.63 9.634C10.4387 8.82333 11.391 8.18167 12.487 7.709C13.583 7.23633 14.753 7 15.997 7C17.241 7 18.411 7.23633 19.507 7.709C20.6023 8.181 21.5553 8.82167 22.366 9.631C23.1767 10.4403 23.8183 11.3927 24.291 12.488C24.7637 13.5833 25 14.753 25 15.997C25 17.241 24.764 18.411 24.292 19.507C23.82 20.603 23.1787 21.556 22.368 22.366C21.5573 23.176 20.6053 23.8177 19.512 24.291C18.4187 24.7643 17.249 25.0007 16.003 25C14.757 24.9993 13.587 24.7633 12.493 24.292ZM8 16H16V8C13.7667 8 11.875 8.775 10.325 10.325C8.775 11.875 8 13.7667 8 16Z"
          fill="#263CCF"
        />
      </svg>
    </span>
  );
}

function QuickInsightIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="16" fill="#C8856A" fillOpacity="0.1" />
      <path
        d="M19.87 26.4V23.8H12.1557V26.4C12.1557 27.83 13.3129 29 14.7271 29H17.2986C18.7129 29 19.87 27.83 19.87 26.4ZM11.1143 20.004C11.2814 20.238 11.4871 20.693 11.6671 21.2H20.3586C20.5514 20.693 20.7443 20.238 20.9114 20.004C21.3614 19.354 21.8371 18.795 22.3 18.236C23.6243 16.663 25 15.038 25 12.1C25 7.082 20.9629 3 16 3C11.0371 3 7 7.082 7 12.1C7 15.064 8.37571 16.689 9.7 18.249C10.1629 18.795 10.6386 19.354 11.1014 20.004H11.1143ZM16.0129 6.9V9.5C14.5986 9.5 13.4414 10.67 13.4414 12.1H10.87C10.87 9.227 13.1714 6.9 16.0129 6.9Z"
        fill="#C8856A"
      />
    </svg>
  );
}
