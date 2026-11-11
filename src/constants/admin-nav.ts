import React from "react";
import {
  AdminDashboardIcon,
  MealManagementIcon,
  PriceManagementIcon,
  UserManagementIcon,
  AnalyticsIcon,
  SettingsIcon,
} from "@/components/icons/NavIcons";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isPrimaryAction?: boolean;
}

export const SIDEBAR_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: AdminDashboardIcon },
  {
    label: "Meal Management",
    href: "/admin/meal-management",
    icon: MealManagementIcon,
  },
  {
    label: "Price Management",
    href: "/admin/price-management",
    icon: PriceManagementIcon,
  },
  {
    label: "User Management",
    href: "/admin/user-management",
    icon: UserManagementIcon,
  },
  {
    label: "Analytics & Reporting",
    href: "/admin/analytics",
    icon: AnalyticsIcon,
  },
  { label: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

export const MOBILE_BOTTOM_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: AdminDashboardIcon },
  {
    label: "Meal Management",
    href: "/admin/meal-management",
    icon: MealManagementIcon,
  },

  {
    label: "Price Management",
    href: "/admin/price-management",
    icon: PriceManagementIcon,
    isPrimaryAction: true,
  },

  {
    label: "User Management",
    href: "/admin/user-management",
    icon: UserManagementIcon,
  },
  {
    label: "Analytics & Reporting",
    href: "/admin/analytics",
    icon: AnalyticsIcon,
  },
];
