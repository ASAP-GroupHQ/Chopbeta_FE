import { MEAL_STATS } from "@/constants/admin-management";

export default function MealStats() {
  return (
    <section
      aria-label="Meal statistics"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {MEAL_STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <article
            key={stat.title}
            className={`flex min-h-[106px] items-center gap-4 rounded-2xl border p-4 shadow-[0_2px_8px_rgba(26,46,53,0.04)] sm:p-5 ${stat.borderColor}`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80">
              <Icon className="h-10 w-10 object-contain" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <span className="block text-xs font-semibold text-gray-600">
                {stat.title}
              </span>
              <h2 className="text-xl font-black leading-tight text-[#1A2E35] sm:text-2xl">
                {stat.value}
              </h2>
              <p className="text-[10px] font-medium text-gray-500">
                {stat.subtitle}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
