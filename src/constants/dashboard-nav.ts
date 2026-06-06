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
  { label: "Explore", href: "/dashboard/explore", icon: ExploreIcon },
  {
    label: "Generate Meal",
    href: "/dashboard/generate",
    icon: GenerateMealIcon,
  },
  { label: "Track", href: "/dashboard/track", icon: TrackIcon },
  { label: "History", href: "/dashboard/history", icon: HistoryIcon },
  { label: "Settings", href: "/dashboard/setting", icon: SettingsIcon },
  { label: "Premium", href: "/dashboard/premium", icon: PremiumIcon },
];

export const MOBILE_BOTTOM_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { label: "Explore", href: "/dashboard/explore", icon: ExploreIcon },

  {
    label: "Generate Meal",
    href: "/dashboard/generate",
    icon: GenerateMealIcon,
    isPrimaryAction: true,
  },

  { label: "Track", href: "/dashboard/track", icon: TrackIcon },
  { label: "Premium", href: "/dashboard/premium", icon: PremiumIcon },
];
