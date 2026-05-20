import { FiCompass, FiCalendar, FiTarget } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";

export const CORE_FEATURES = [
  {
    label: "Set Budget",
    icon: TbCurrencyNaira,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    label: "Daily Planner",
    icon: FiCalendar,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    label: "Discover Local Meals",
    icon: FiCompass,
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    label: "Avoid Hunger",
    icon: FiTarget,
    color: "text-rose-600 bg-rose-50 border-rose-100",
  },
];

export const SAMPLE_MEALS = [
  {
    day: "Monday",
    meal: "Suya Rice",
    status: "High Energy",
    img: "🍛",
    cost: "₦1,200",
  },
  {
    day: "Tuesday",
    meal: "Akara & Giwa",
    status: "Budget Friendly",
    img: "🧆",
    cost: "₦600",
  },
  {
    day: "Wednesday",
    meal: "Fufu & Egusi",
    status: "Heavy / Solid",
    img: "🍲",
    cost: "₦1,500",
  },
];
