import type { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  status?: "Active" | "Inactive";
  dateJoined?: string;
  lastActive?: string;
  avatarUrl: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  trend: string;
  trendType: "up" | "down";
  icon: ReactNode;
  bgIconColor: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatarUrl: string;
  action: string;
  time: string;
  color: string;
}

export interface PopularMeal {
  id: string;
  name: string;
  category: string;
  timesChosen: number;
  trend: string;
  percentage: number;
  imageUrl: string;
}
