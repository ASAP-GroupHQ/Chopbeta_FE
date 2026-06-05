import { HistoryIcon, PremiumIcon } from "@/components/icons/NavIcons";

export interface ProfileMenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
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
    label: "Premium",
    href: "/dashboard/premium",
    icon: PremiumIcon,
    description: "Upgrade your account and unlock exclusive food benefits",
  },
];
