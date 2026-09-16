import type { ActivityItem, PopularMeal, User } from "./types";

export const mockUsers: User[] = [
  { id: "1", name: "Treasure Jairus", username: "@treasure_J", email: "Treasy.Jai@gmail.com", phoneNumber: "081 521 9963", role: "Student", status: "Active", dateJoined: "Aug 24, 2026", lastActive: "Today, 9:42 AM", avatarUrl: "https://unsplash.com" },
  { id: "2", name: "Sarah Williams", username: "@sarah_w", email: "Treasy.Jai@gmail.com", avatarUrl: "https://unsplash.com" },
  { id: "3", name: "Anita Eke", username: "@Anita_E", email: "Treasy.Jai@gmail.com", avatarUrl: "https://unsplash.com" },
  { id: "4", name: "Esther Sunday", username: "@esther_s", email: "Treasy.Jai@gmail.com", avatarUrl: "https://unsplash.com" },
  { id: "5", name: "Esther Sunday", username: "@esther_s", email: "Treasy.Jai@gmail.com", avatarUrl: "https://unsplash.com" },
  { id: "6", name: "Esther Sunday", username: "@esther_s", email: "Treasy.Jai@gmail.com", avatarUrl: "https://unsplash.com" },
  { id: "7", name: "Esther Sunday", username: "@esther_s", email: "Treasy.Jai@gmail.com", avatarUrl: "https://unsplash.com" },
];

export const mockActivities: ActivityItem[] = [
  { id: "1", user: "Esther", avatarUrl: "https://unsplash.com", action: "updated the price of Jollof Rice", time: "2 minutes ago", color: "bg-green-500" },
  { id: "2", user: "Marvelous Admin", avatarUrl: "https://unsplash.com", action: "added a new meal Pancake", time: "15 minutes ago", color: "bg-orange-500" },
  { id: "3", user: "Emmanuel O.", avatarUrl: "https://unsplash.com", action: "exported user activity report", time: "35 minutes ago", color: "bg-purple-500" },
  { id: "4", user: "Oluwaseyi", avatarUrl: "https://unsplash.com", action: "exported user activity report", time: "1 hour ago", color: "bg-red-500" },
];

export const mockPopularMeals: PopularMeal[] = [
  { id: "1", name: "Bread & Egg", category: "African Dish", timesChosen: 2432, trend: "up 8%", percentage: 85, imageUrl: "https://unsplash.com" },
  { id: "2", name: "Pap & Akara", category: "African Dish", timesChosen: 2432, trend: "up 8%", percentage: 70, imageUrl: "https://unsplash.com" },
  { id: "3", name: "Noodles & Egg", category: "African Dish", timesChosen: 2432, trend: "up 8%", percentage: 60, imageUrl: "https://unsplash.com" },
  { id: "4", name: "Rice & Beans", category: "African Dish", timesChosen: 2432, trend: "up 8%", percentage: 90, imageUrl: "https://unsplash.com" },
];
