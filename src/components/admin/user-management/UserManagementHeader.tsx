import HeaderActions from "@/components/dashboard/HeaderActions";

export default function UserManagementHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-black tracking-tight text-[#1A2E35] sm:text-3xl">
          User Management
        </h1>
        <p className="text-xs font-medium text-gray-500 sm:text-sm">
          View, manage and monitor all registered users on ChopBeta.
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <HeaderActions />
      </div>
    </header>
  );
}
