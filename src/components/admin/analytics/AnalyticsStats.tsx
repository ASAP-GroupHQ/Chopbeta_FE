import { ANALYTICS_STATS } from "@/constants/analytics-data";

export default function AnalyticsStats() {
  return (
    <section
      aria-label="Analytics summary"
      className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {ANALYTICS_STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <article
            key={stat.title}
            className="flex min-h-[76px] items-center gap-3 rounded-xl border border-[#e9e3ed] bg-white/70 px-3 py-2.5 shadow-[0_2px_8px_rgba(47,39,68,0.03)] sm:px-3.5"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${stat.tint}`}
            >
              <Icon className="h-9 w-9 object-contain" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-[#818193]">
                {stat.title}
              </p>
              <p className="mt-0.5 text-lg font-bold leading-tight text-[#202035]">
                {stat.value}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="rounded-full bg-[#e8f4ec] px-1.5 py-0.5 text-[9px] font-semibold text-[#339464]">
                  ↑ {stat.trend}
                </span>
                <span className="text-[9px] font-medium text-[#89899a]">
                  vs last 30 days
                </span>
              </div>
            </div>
            <TrendSparkline color={stat.sparklineColor} />
          </article>
        );
      })}
    </section>
  );
}

function TrendSparkline({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 42 22"
      fill="none"
      className="h-6 w-9 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M2 19L13 11L23 14L39 3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
