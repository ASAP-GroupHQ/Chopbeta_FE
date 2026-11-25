import {
  TotalMealsIcon,
  ActiveMealsIcon,
  InactiveMealsIcon,
  CategoriesIcon,
  TotalUserIcon,
  ActiveUsersIcon,
  InactiveUsersIcon,
  AveragePriceIcon,
  HighestPriceIcon,
  LowestPriceIcon,
} from "@/components/icons/AdminIcons";

export const MEAL_STATS = [
  {
    title: "Total Meals",
    subtitle: "All meals in menu",
    icon: TotalMealsIcon,
    borderColor: "border-gray-100",
  },
  {
    title: "Active Meals",
    subtitle: "Currently Available",
    icon: ActiveMealsIcon,
    borderColor: "border-green-200 bg-green-50/20",
  },
  {
    title: "Inactive Meals",
    subtitle: "Not currently available",
    icon: InactiveMealsIcon,
    borderColor: "border-red-200 bg-red-50/20",
  },
  {
    title: "Categories",
    subtitle: "Total Categories",
    icon: CategoriesIcon,
    borderColor: "border-blue-200 bg-blue-50/20",
  },
];

export const USER_STATS = [
  {
    title: "Total Users",
    icon: TotalUserIcon,
    borderColor: "border-gray-100",
  },
  {
    title: "Active Users",
    icon: ActiveUsersIcon,
    borderColor: "border-green-200 bg-green-50/20",
  },
  {
    title: "Inactive Users",
    icon: InactiveUsersIcon,
    borderColor: "border-red-200 bg-red-50/20",
  },
];

export const PRICE_STATS = [
  {
    title: "Total Meal",
    icon: TotalMealsIcon,
    borderColor: "border-gray-100",
  },
  {
    title: "Average Price",
    icon: AveragePriceIcon,
    borderColor: "border-gray-100",
  },
  {
    title: "Highest Price",
    icon: HighestPriceIcon,
    borderColor: "border-red-100 bg-red-50/10",
  },
  {
    title: "Lowest Price",
    icon: LowestPriceIcon,
    borderColor: "border-green-100 bg-green-50/10",
  },
];
