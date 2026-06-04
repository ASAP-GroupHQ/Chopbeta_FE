import React from "react";
import {
  HomeIcon,
  ExploreIcon,
  GenerateMealIcon,
  TrackIcon,
  HistoryIcon,
  SettingsIcon,
  PremiumIcon,
} from "@/components/icons/NavIcons";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isPrimaryAction?: boolean;
}

export const SIDEBAR_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { label: "Explore", href: "/explore", icon: ExploreIcon },
  {
    label: "Generate Meal",
    href: "/dashboard/generate",
    icon: GenerateMealIcon,
  },
  { label: "Track", href: "/track", icon: TrackIcon },
  { label: "History", href: "/history", icon: HistoryIcon },
  { label: "Setting", href: "/dashboard/setting", icon: SettingsIcon },
  { label: "Premium", href: "/premium", icon: PremiumIcon },
];

export const MOBILE_BOTTOM_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { label: "Explore", href: "/explore", icon: ExploreIcon },

  {
    label: "Generate Meal",
    href: "/dashboard/generate",
    icon: GenerateMealIcon,
    isPrimaryAction: true,
  },

  { label: "Track", href: "/track", icon: TrackIcon },
  { label: "Setting", href: "/dashboard/setting", icon: SettingsIcon },
];
