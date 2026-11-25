import { FiRepeat } from "react-icons/fi";
import {
  FeedbackIcon,
  HistoryIcon,
  SettingsIcon,
} from "@/components/icons/NavIcons";

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

export const ADMIN_PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  {
    href: "/admin/feedback",
    label: "Feedback & Reports",
    description: "Review feedback from ChopBeta users",
    icon: FeedbackIcon,
  },
  {
    href: "/dashboard",
    label: "Switch to user dashboard",
    description: "Explore ChopBeta with the user experience",
    icon: FiRepeat,
  },
];
