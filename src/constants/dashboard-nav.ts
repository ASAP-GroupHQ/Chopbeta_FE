import React from "react";
// Import your custom SVGs
import {
  HomeIcon,
  ExploreIcon,
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
  // Temporarily fallback to HomeIcon or others until you extract them all
  { label: "Explore", href: "/explore", icon: ExploreIcon },
  { label: "Track", href: "/track", icon: TrackIcon },
  { label: "History", href: "/history", icon: HistoryIcon },
  { label: "Setting", href: "/settings", icon: SettingsIcon },
  { label: "Premium", href: "/premium", icon: PremiumIcon },
];

export const MOBILE_BOTTOM_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { label: "Track", href: "/track", icon: TrackIcon },
  {
    label: "Explore",
    href: "/explore",
    icon: ExploreIcon,
    isPrimaryAction: true,
  },
  { label: "History", href: "/history", icon: HistoryIcon },
  { label: "Premium", href: "/premium", icon: PremiumIcon },
];
