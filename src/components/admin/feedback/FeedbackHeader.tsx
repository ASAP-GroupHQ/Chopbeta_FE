import HeaderActions from "@/components/dashboard/HeaderActions";

export default function FeedbackHeader() {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-black tracking-tight text-[#202035] sm:text-3xl">
          Feedback &amp; Report
        </h1>
        <p className="text-xs font-medium text-[#7b7b8e] sm:text-sm">
          View users feedback and generate support report
        </p>
      </div>
      <div className="flex justify-end">
        <HeaderActions />
      </div>
    </header>
  );
}
