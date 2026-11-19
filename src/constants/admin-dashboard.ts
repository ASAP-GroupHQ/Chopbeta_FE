import {
  AddMealIcon,
  CompletedMealsIcon,
  DailyActiveUsersIcon,
  MealsInDatabaseIcon,
  MealsPlanGeneratedIcon,
  TotalUsersIcon,
  UpdatePriceIcon,
  UserRetentionIcon,
  ViewAnalyticsIcon,
  ViewUsersIcon,
} from "@/components/icons/AdminIcons";

export const ADMIN_STATS_CARDS = [
  { title: "Total Users", icon: TotalUsersIcon },
  { title: "Daily Active Users", icon: DailyActiveUsersIcon },
  { title: "Completed Meals", icon: CompletedMealsIcon },
  { title: "Planned Meals", icon: MealsPlanGeneratedIcon },
  { title: "Users Retention Rate", icon: UserRetentionIcon },
  { title: "Total Meals", icon: MealsInDatabaseIcon },
] as const;

export const ADMIN_QUICK_ACTIONS = [
  {
    title: "Add new meals",
    desc: "Add new meal to the database",
    icon: AddMealIcon,
    link: "/admin/meal-management",
  },
  {
    title: "Update Meal Prices",
    desc: "Update prices of existing meals",
    icon: UpdatePriceIcon,
    link: "/admin/price-management",
  },
  {
    title: "View Users",
    desc: "View and manage user accounts",
    icon: ViewUsersIcon,
    link: "/admin/user-management",
  },
  {
    title: "View Analytics",
    desc: "See detailed platform analytics",
    icon: ViewAnalyticsIcon,
    link: "/admin/analytics",
  },
] as const;