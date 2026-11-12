import HeaderActions from "@/components/dashboard/HeaderActions";

export default function PriceManagementHeader() {
  return (
    <header className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-black tracking-tight text-[#202035] sm:text-3xl">
          Price Management
        </h1>
        <p className="text-xs font-medium text-[#7b7b8e] sm:text-sm">
          Update and manage prices to reflect current market conditions.
        </p>
      </div>
      <div className="flex justify-end">
        <HeaderActions />
      </div>
    </header>
  );
}
