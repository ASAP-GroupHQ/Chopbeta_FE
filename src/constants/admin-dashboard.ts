import React from "react";
import {
  TotalUsersIcon,
  DailyActiveUsersIcon,
  CompletedMealsIcon,
  MealsPlanGeneratedIcon,
  MealsInDatabaseIcon,
  UserRetentionIcon,
  AddMealIcon,
  UpdatePriceIcon,
  ViewUsersIcon,
  ViewAnalyticsIcon,
} from "@/components/icons/AdminIcons";

export const ADMIN_STATS_CARDS = [
  {
    title: "Total Users",
    value: "48,325",
    change: "+20% vs last week",
    isPositive: true,
    icon: TotalUsersIcon,
  },
  {
    title: "Daily Active Users",
    value: "12,325",
    change: "+8% vs last week",
    isPositive: true,
    icon: DailyActiveUsersIcon,
  },
  {
    title: "Completed Meals",
    value: "23,325",
    change: "+20% vs last week",
    isPositive: true,
    icon: CompletedMealsIcon,
  },
  {
    title: "Meals Plans Generated",
    value: "23,325",
    change: "+20% vs last week",
    isPositive: true,
    icon: MealsPlanGeneratedIcon,
  },
  {
    title: "Users Retention Rate",
    value: "96.7%",
    change: "+20% vs last week",
    isPositive: true,
    icon: UserRetentionIcon,
  },
  {
    title: "Meals in Database",
    value: "96.7%",
    change: "+20% vs last week",
    isPositive: true,
    icon: MealsInDatabaseIcon,
  },
];

export const ADMIN_QUICK_ACTIONS = [
  {
    title: "Add new meals",
    desc: "Add new meal to the database",
    icon: AddMealIcon,
    link: "/admin/meals/new",
  },
  {
    title: "Update Meal Prices",
    desc: "Update prices of existing meals",
    icon: UpdatePriceIcon,
    link: "/admin/prices",
  },
  {
    title: "View Users",
    desc: "View and manage user accounts",
    icon: ViewUsersIcon,
    link: "/admin/users",
  },
  {
    title: "View Analytics",
    desc: "See detailed platform analytics",
    icon: ViewAnalyticsIcon,
    link: "/admin/analytics",
  },
];

export const ADMIN_RECENT_ACTIVITIES = [
  {
    name: "Esther",
    action: "updated the price of Jollof Rice",
    time: "2 minutes ago",
    avatar: "/images/team/esther.png",
    markerColor: "bg-[#267447]",
  },
  {
    name: "Marvelous Admin",
    action: "added a new meal: Pancake",
    time: "15 minutes ago",
    avatar: "/images/team/marvelous.jpg",
    markerColor: "bg-[#E85D26]",
  },
  {
    name: "Emmanuel O.",
    action: "exported user activity report",
    time: "35 minutes ago",
    avatar: "/images/team/emmanuel_ozo.JPG",
    markerColor: "bg-[#B95AC5]",
  },
  {
    name: "Oluwaseyi",
    action: "exported user activity report",
    time: "1 hour ago",
    avatar: "/images/team/seyi.png",
    markerColor: "bg-[#22C55E]",
  },
];

export const ADMIN_POPULAR_MEALS = [
  {
    name: "Bread & Egg",
    category: "African Dish",
    count: "2,432",
    trend: "8%",
    progress: "80%",
    image: "/images/meals/Puff-puff.jpg",
  },
  {
    name: "Pap & Akara",
    category: "African Dish",
    count: "2,432",
    trend: "8%",
    progress: "75%",
    image: "/images/meals/beans and plantain.png",
  },
  {
    name: "Noodles & Egg",
    category: "African Dish",
    count: "2,432",
    trend: "8%",
    progress: "70%",
    image: "/images/meals/quick-meal.png",
  },
  {
    name: "Rice & Beans",
    category: "African Dish",
    count: "2,432",
    trend: "8%",
    progress: "85%",
    image: "/images/meals/Ofada_rice.png",
  },
];
