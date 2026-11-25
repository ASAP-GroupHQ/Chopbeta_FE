import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiHeart,
  FiMessageCircle,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import HeaderActions from "@/components/dashboard/HeaderActions";

const plannedFeatures = [
  {
    icon: FiMessageCircle,
    title: "Meal-planning guidance",
    description: "Ideas to help make your food budget go further.",
  },
  {
    icon: FiHeart,
    title: "Help that fits your preferences",
    description: "Guidance shaped around the foods you enjoy and avoid.",
  },
  {
    icon: FiTrendingUp,
    title: "Practical next steps",
    description: "Simple ways to get more from your ChopBeta routine.",
  },
];

export default function KiraChatPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-13rem)] max-w-5xl flex-col pb-6 lg:min-h-[calc(100dvh-8rem)]">
      <header className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-emerald-200 hover:text-[#1E6B3C]"
          >
            <FiArrowLeft />
          </Link>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1E6B3C]">
              Your ChopBeta assistant
            </p>
            <h1 className="truncate text-xl font-black text-[#1A2E35] sm:text-2xl">
              Meet KIRA
            </h1>
          </div>
        </div>
        <HeaderActions />
      </header>

      <main className="flex flex-1 items-center">
        <section className="relative isolate w-full overflow-hidden rounded-[2rem] border border-[#E5EEE7] bg-gradient-to-br from-white via-[#F8FBF8] to-[#EAF6EE] px-5 py-8 shadow-[0_16px_44px_rgba(26,46,53,0.07)] sm:px-9 sm:py-10 lg:px-12 lg:py-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#D9EFDF]/70 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D7EBDD] bg-white/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#1E6B3C] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4A642]" />
                Coming soon
              </span>
              <h2 className="mt-5 max-w-lg text-3xl font-black leading-tight tracking-tight text-[#1A2E35] sm:text-4xl">
                A little more help is on its way.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#62716A] sm:text-base">
                KIRA is being thoughtfully built to support your food journey.
                We&apos;re putting something special together, and we can&apos;t
                wait to introduce her in a future update.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E6B3C] px-5 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(30,107,60,0.2)] transition hover:bg-[#185A31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6B3C]"
                >
                  Back to your dashboard
                  <FiArrowUpRight aria-hidden="true" />
                </Link>
                <a
                  href="mailto:support.chopbeta@gmail.com"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#DCE7DE] bg-white/80 px-5 py-3 text-sm font-bold text-[#3D5146] transition hover:border-[#B9D7C1] hover:text-[#1E6B3C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6B3C]"
                >
                  Contact support
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-gray-400">
                In the meantime, your meal plans, tracking, and preferences are
                ready to explore from your dashboard.
              </p>
            </div>

            <aside
              aria-label="A preview of planned KIRA features"
              className="rounded-3xl border border-white/90 bg-white/85 p-5 shadow-[0_12px_34px_rgba(26,46,53,0.08)] backdrop-blur sm:p-6"
            >
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF6EE]">
                    <Image
                      src="/chopbeta-favicon.png"
                      alt=""
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-[#1A2E35]">
                      KIRA
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-gray-500">
                      Your future food companion
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-[#F1F7F2] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#1E6B3C]">
                  In the works
                </span>
              </div>

              <div className="py-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
                  What we&apos;re working towards
                </p>
                <ul className="mt-4 space-y-4">
                  {plannedFeatures.map(({ icon: Icon, title, description }) => (
                    <li key={title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F7F1] text-[#1E6B3C]">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-[#263B30]">
                          {title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-gray-500">
                          {description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-[#F8FAF8] px-3.5 py-3 text-xs font-medium leading-relaxed text-gray-500">
                <FiShield
                  className="shrink-0 text-[#1E6B3C]"
                  aria-hidden="true"
                />
                Designed to make everyday meal decisions feel easier.
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
