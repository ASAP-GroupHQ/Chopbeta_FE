import { HistoryIcon, SettingsIcon } from "@/components/icons/NavIcons";

export interface ProfileMenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description: string;
}

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  {
    href: "/dashboard/history",
    label: "Meal History",
    description: "View your full chronological meal records",
    icon: HistoryIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/setting",
    icon: SettingsIcon,
    description: "Manage your account and food preferences",
  },
];
