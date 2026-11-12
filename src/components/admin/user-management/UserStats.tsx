import { USER_STATS } from "@/constants/admin-management";

const iconColors = [
  "bg-[#eaf4ee] text-[#247443]",
  "bg-[#e8f5ed] text-[#208149]",
  "bg-[#fff0eb] text-[#df6848]",
];

export default function UserStats() {
  return (
    <section
      aria-label="User statistics"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
    >
      {USER_STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <article
            key={stat.title}
            className="rounded-2xl border border-[#edf0ed] bg-white p-5 shadow-[0_3px_15px_rgba(27,56,38,0.04)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#748078]">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-[#17211b]">
                  {stat.value}
                </p>
              </div>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconColors[index]}`}
              >
                <Icon className="h-7 w-7" />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span className="font-semibold text-[#25834a]">
                +{stat.change}
              </span>
              <span className="text-[#829087]">{stat.trendText}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
