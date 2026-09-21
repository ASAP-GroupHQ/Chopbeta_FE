import React from "react";

interface SettingSectionCardProps {
  title: string;
  description?: string;
  badge?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function SettingSectionCard({
  title,
  description,
  badge,
  children,
  action,
}: SettingSectionCardProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            {badge ? (
              <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                {badge}
              </span>
            ) : null}
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          </div>
          {description ? (
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

interface InfoGridProps {
  items: { label: string; value: string }[];
}

export function InfoGrid({ items }: InfoGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-gray-100 bg-gray-50 p-3.5"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
            {item.label}
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-800">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

interface StatPillProps {
  label: string;
  value: string;
}

export function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-emerald-900">{value}</p>
    </div>
  );
}
