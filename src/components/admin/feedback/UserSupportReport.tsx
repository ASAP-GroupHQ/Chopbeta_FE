"use client";

import { FileDown, FileSpreadsheet, FileText } from "lucide-react";

interface UserSupportReportProps {
  reportGenerated: boolean;
  reportCount: number;
  onGenerate: () => void;
  onDownloadPdf: () => void;
  onDownloadCsv: () => void;
}

export default function UserSupportReport({
  reportGenerated,
  reportCount,
  onGenerate,
  onDownloadPdf,
  onDownloadCsv,
}: UserSupportReportProps) {
  return (
    <section className="grid gap-4 rounded-2xl border border-[#dfe9e3] bg-[#f2f7f4] p-4 shadow-[0_2px_10px_rgba(47,39,68,0.025)] lg:grid-cols-[auto_minmax(220px,1fr)_minmax(230px,0.9fr)_minmax(250px,1.1fr)] lg:items-center lg:gap-5 lg:p-5">
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#32835a] text-white shadow-sm">
        <FileText className="h-8 w-8" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-bold text-[#303044]">
          User Support Report
        </h2>
        <p className="mt-1 text-[11px] leading-relaxed text-[#747486]">
          Generate a report from Kira to see the issues users face while already
          supporting them.
        </p>
      </div>
      <div className="border-l-2 border-[#41956a] pl-4">
        <button
          type="button"
          onClick={onGenerate}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#185633] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#124628] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#185633] active:scale-[0.99]"
        >
          <FileDown className="h-4 w-4" aria-hidden="true" />
          Generate User Support Report
        </button>
        {reportGenerated && (
          <p role="status" className="mt-2 text-[10px] font-medium text-[#397c53]">
            Report generated with {reportCount} feedback entries.
          </p>
        )}
      </div>
      <div className="border-l-2 border-[#41956a] pl-4">
        <p className="mb-2 text-xs font-bold text-[#4a4a5d]">
          Download Report:
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-[#e2e2e7] bg-white px-3 py-2 text-xs font-semibold text-[#444457] transition hover:border-[#d3a6a0] hover:bg-[#fffafa]"
          >
            <FileDown className="h-4 w-4 text-[#c96b5e]" aria-hidden="true" />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onDownloadCsv}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-[#e2e2e7] bg-white px-3 py-2 text-xs font-semibold text-[#444457] transition hover:border-[#9fc8aa] hover:bg-[#f8fcf9]"
          >
            <FileSpreadsheet
              className="h-4 w-4 text-[#4b9a65]"
              aria-hidden="true"
            />
            Download CSV
          </button>
        </div>
      </div>
    </section>
  );
}
