import { Bell, HelpCircle } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-50 bg-white/80 px-8 py-4 backdrop-blur">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="Help" className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"><HelpCircle className="h-5 w-5" /></button>
        <button aria-label="Notifications" className="relative rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"><Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" /></button>
        <div className="border-l border-gray-100 pl-2"><p className="text-sm font-semibold text-gray-700">Victor</p></div>
      </div>
    </header>
  );
}
