import { mealService } from "./meal";
import type { QuickMealItem } from "@/types/meal";

export enum ExploreCategory {
  All = "All",
  Rice = "Rice",
  Swallow = "Swallow",
  Soups = "Soups",
  Snacks = "Snacks",
  Others = "Others",
}

export interface ExploreMeal {
  id: number;
  title: string;
  desc: string;
  price: number;
  calories: number;
  imageUrl: string;
  tags?: string[];
  category?: string;
}

const CATEGORY_HINTS: Record<string, string> = {
  rice: ExploreCategory.Rice,
  swallow: ExploreCategory.Swallow,
  soup: ExploreCategory.Soups,
  soups: ExploreCategory.Soups,
  snack: ExploreCategory.Snacks,
  snacks: ExploreCategory.Snacks,
  other: ExploreCategory.Others,
  others: ExploreCategory.Others,
};

const inferCategory = (mealTitle: string, fallbackCategory?: string) => {
  const lowerTitle = `${mealTitle} ${fallbackCategory ?? ""}`.toLowerCase();

  if (lowerTitle.includes("rice") || lowerTitle.includes("jollof")) {
    return ExploreCategory.Rice;
  }

  if (
    lowerTitle.includes("swallow") ||
    lowerTitle.includes("amala") ||
    lowerTitle.includes("eba") ||
    lowerTitle.includes("fufu") ||
    lowerTitle.includes("pounded")
  ) {
    return ExploreCategory.Swallow;
  }

  if (
    lowerTitle.includes("soup") ||
    lowerTitle.includes("egusi") ||
    lowerTitle.includes("ewedu") ||
    lowerTitle.includes("ogbono")
  ) {
    return ExploreCategory.Soups;
  }

  if (
    lowerTitle.includes("snack") ||
    lowerTitle.includes("pie") ||
    lowerTitle.includes("chip") ||
    lowerTitle.includes("shawarma")
  ) {
    return ExploreCategory.Snacks;
  }

  return fallbackCategory
    ? (CATEGORY_HINTS[fallbackCategory.toLowerCase()] ?? ExploreCategory.Others)
    : ExploreCategory.Others;
};

const toExploreMeal = (
  meal: QuickMealItem,
  fallbackCategory?: string,
): ExploreMeal => {
  const category = inferCategory(
    meal.mealTitle,
    fallbackCategory ?? meal.category,
  );
  const parsedPrice = Number.parseFloat(
    meal.estimatedPrice?.$numberDecimal ?? "0",
  );
  const caloriesValue = Number.parseFloat(
    String(meal.averageNutritionalInfo?.estimatedCalories ?? "0"),
  );

  // Safe fallback access
  const rawMeal = meal as QuickMealItem & { img?: string; image?: string };
  const imageUrl = rawMeal.imageUrl ?? rawMeal.img ?? rawMeal.image ?? "";

  return {
    id: Number(meal._id) || Math.random(),
    title: meal.mealTitle,
    desc: `${category} meal option`,
    price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
    calories: Number.isFinite(caloriesValue) ? caloriesValue : 0,
    imageUrl,
    tags: [category],
    category,
  };
};

export const exploreService = {
  getMeals: async (params?: {
    tag?: string;
    search?: string;
  }): Promise<ExploreMeal[]> => {
    const normalizedTag = params?.tag?.trim();
    const searchTerm = params?.search?.trim().toLowerCase() ?? "";

    const filters =
      normalizedTag && normalizedTag !== ExploreCategory.All
        ? [normalizedTag.toLowerCase()]
        : ["breakfast", "lunch", "dinner", "snacks"];

    const responses = await Promise.all(
      filters.map((filter) => mealService.getQuickMeals(filter)),
    );
    const meals = responses.flatMap((response, index) =>
      (response?.data?.meals ?? []).map((meal) =>
        toExploreMeal(meal, filters[index]),
      ),
    );

    return meals.filter((meal) => {
      const searchableText = [
        meal.title,
        meal.desc,
        meal.category,
        ...(meal.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      const matchesCategory =
        !normalizedTag ||
        normalizedTag === ExploreCategory.All ||
        meal.category?.toLowerCase() === normalizedTag.toLowerCase() ||
        (meal.tags ?? []).some(
          (tag) => tag.toLowerCase() === normalizedTag.toLowerCase(),
        );

      return matchesSearch && matchesCategory;
    });
  },
};
