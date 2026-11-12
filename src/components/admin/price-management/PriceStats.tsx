import { PRICE_STATS } from "@/constants/admin-management";

export default function PriceStats() {
  return (
    <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
      {PRICE_STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <article
            key={index}
            className={`relative flex min-h-[76px] items-center gap-3 overflow-hidden rounded-xl border bg-white/70 px-3 py-2.5 shadow-[0_2px_8px_rgba(47,39,68,0.03)] sm:px-3.5 ${stat.borderColor}`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf4ef]">
              <Icon className="h-9 w-9 object-contain" />
            </div>
            <div className="z-10 min-w-0 flex-1 space-y-0.5">
              <span className="block truncate text-[11px] font-medium text-[#818193]">
                {stat.title}
              </span>
              <h3 className="text-lg font-bold leading-tight text-[#202035]">
                {stat.value}
              </h3>
              <div className="flex flex-wrap items-center gap-1 pt-0.5">
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span>↑</span> {stat.change}
                </span>
                <span className="text-[9px] font-medium text-[#89899a]">
                  {stat.trendText}
                </span>
              </div>
            </div>
            <div className="z-10 flex h-full shrink-0 flex-col items-end justify-between gap-2">
              <div className="h-6 w-9">
                {stat.chartType === "up" && (
                  <svg
                    width="42"
                    height="25"
                    viewBox="0 0 42 25"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 23.221L14.3333 9.88841L23.2222 18.7768L41 1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#1E6B3C"
                    />
                    <path
                      d="M32.1055 1H40.9944V9.8884"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#1E6B3C"
                    />
                  </svg>
                )}
                {stat.chartType === "up-red" && (
                  <svg
                    width="40"
                    height="25"
                    viewBox="0 0 40 25"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 23.221L13.4074 9.88841L21.679 18.7768L38.2222 1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#DF1C41"
                    />
                    <path
                      d="M29.9453 1H38.2169V9.8884"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#DF1C41"
                    />
                  </svg>
                )}
                {stat.chartType === "down" && (
                  <svg
                    width="38"
                    height="23"
                    viewBox="0 0 38 23"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M37.2212 11.1112C37.2212 10.6201 37.0033 10.1492 36.6155 9.80197C36.2278 9.45475 35.7018 9.25968 35.1535 9.25968C34.6051 9.25968 34.0791 9.45475 33.6914 9.80197C33.3036 10.1492 33.0858 10.6201 33.0858 11.1112V15.3695L24.3187 6.11218C24.0022 5.78089 23.5653 5.56026 23.0849 5.48913C22.6045 5.41801 22.1115 5.50096 21.6927 5.72337L12.8637 10.5557L3.66241 0.668844C3.48863 0.481627 3.27537 0.326892 3.0348 0.213475C2.79423 0.100058 2.53108 0.0301796 2.26035 0.00782931C1.98963 -0.014521 1.71664 0.0110952 1.45697 0.0832142C1.1973 0.155333 0.956035 0.272543 0.746954 0.428152C0.537873 0.583761 0.365068 0.774722 0.238406 0.990131C0.111743 1.20554 0.0337042 1.44118 0.00874372 1.68359C-0.0162167 1.92601 0.0123905 2.17045 0.092932 2.40296C0.173474 2.63548 0.304372 2.85151 0.478154 3.03873L10.8166 14.1476C11.1314 14.4865 11.5709 14.7137 12.0561 14.7883C12.5412 14.863 13.0402 14.7802 13.4633 14.5549L22.313 9.79661L30.5838 18.5171H24.815C24.2666 18.5171 23.7407 18.7122 23.3529 19.0594C22.9651 19.4066 22.7473 19.8775 22.7473 20.3685C22.7473 20.8596 22.9651 21.3305 23.3529 21.6777C23.7407 22.0249 24.2666 22.22 24.815 22.22H35.1535C35.4079 22.2144 35.6596 22.1706 35.8978 22.0904L36.1873 21.9423C36.2959 21.895 36.3997 21.8392 36.4975 21.7756C36.6097 21.6832 36.7071 21.5773 36.7869 21.4609C36.8569 21.3793 36.9192 21.2926 36.973 21.2017C37.0247 21.1019 37.0595 20.9959 37.0764 20.8869C37.1594 20.7234 37.2084 20.5478 37.2212 20.3685V11.1112Z"
                      fill="#2E8B57"
                    />
                  </svg>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
