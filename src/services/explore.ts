import axios from "axios";

export type ExploreMeal = {
  id: number;
  title: string;
  desc: string;
  price: number;
  calories: number;
  img: string;
  category?: string;
  tags?: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9700/api/v1";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const FALLBACK_MEALS: ExploreMeal[] = [
  {
    id: 1,
    title: "Jollof Rice",
    desc: "Classic party-style jollof",
    price: 800,
    calories: 420,
    img: "/images/meals/quick-meal.png",
    category: "Rice",
    tags: ["Rice", "Lunch"],
  },
  {
    id: 2,
    title: "Egusi Soup + Eba",
    desc: "Thick melon seed soup with eba",
    price: 950,
    calories: 510,
    img: "/images/meals/Egusi_soup.jpg",
    category: "Soup",
    tags: ["Soup", "Swallow"],
  },
  {
    id: 3,
    title: "Beans & Plantain",
    desc: "Honey beans with fried plantain",
    price: 650,
    calories: 380,
    img: "/images/meals/beans and plantain.png",
    category: "Protein",
    tags: ["Protein", "Breakfast"],
  },
  {
    id: 4,
    title: "Fried Rice",
    desc: "Nigerian-style fried rice",
    price: 900,
    calories: 450,
    img: "/images/meals/Fried-Rice.png",
    category: "Rice",
    tags: ["Rice", "Dinner"],
  },
  {
    id: 5,
    title: "Pepper Soup",
    desc: "Spicy goat meat pepper soup",
    price: 1100,
    calories: 290,
    img: "/images/meals/Peppersoup.png",
    category: "Soup",
    tags: ["Soup", "Protein"],
  },
  {
    id: 6,
    title: "Puff Puff",
    desc: "Golden fried dough balls",
    price: 200,
    calories: 180,
    img: "/images/meals/Puff-puff.jpg",
    category: "Snacks",
    tags: ["Snacks", "Breakfast"],
  },
  {
    id: 7,
    title: "Ofada Rice + Stew",
    desc: "Local Ofada rice with designer stew",
    price: 1000,
    calories: 480,
    img: "/images/meals/Ofada_rice.png",
    category: "Rice",
    tags: ["Rice", "Lunch"],
  },
  {
    id: 8,
    title: "Vegetable Soup",
    desc: "Efo riro with assorted protein",
    price: 850,
    calories: 320,
    img: "/images/meals/vegetable-soup.png",
    category: "Vegetarian",
    tags: ["Vegetarian", "Soup"],
  },
];

const ENDPOINTS = [
  "/meals",
  "/meal",
  "/food-items",
  "/foods",
  "/discover/meals",
  "/menu",
];

type ExploreQueryParams = {
  tag?: string;
  category?: string;
  search?: string;
};

function isMealLike(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.title === "string" ||
    typeof candidate.name === "string" ||
    typeof candidate.mealName === "string" ||
    typeof candidate.description === "string" ||
    typeof candidate.desc === "string" ||
    typeof candidate.summary === "string" ||
    typeof candidate.price !== "undefined" ||
    typeof candidate.calories !== "undefined" ||
    typeof candidate.image === "string" ||
    typeof candidate.img === "string"
  );
}

function normalizeMeal(item: Record<string, unknown>, index: number): ExploreMeal {
  const title =
    (item.title as string) ||
    (item.name as string) ||
    (item.mealName as string) ||
    `Meal ${index + 1}`;

  const desc =
    (item.description as string) ||
    (item.desc as string) ||
    (item.summary as string) ||
    "A delicious meal option";

  const price = Number(item.price ?? item.amount ?? 0);
  const calories = Number(item.calories ?? item.kcal ?? 0);
  const img =
    (item.image as string) ||
    (item.img as string) ||
    (item.imageUrl as string) ||
    "/images/meals/quick-meal.png";

  return {
    id: Number(item.id ?? item._id ?? index + 1),
    title,
    desc,
    price: Number.isNaN(price) ? 0 : price,
    calories: Number.isNaN(calories) ? 0 : calories,
    img,
    category: (item.category as string) || (item.tag as string) || undefined,
    tags: Array.isArray(item.tags)
      ? (item.tags as string[])
      : item.tag
        ? [item.tag as string]
        : undefined,
  };
}

function extractMeals(payload: unknown): ExploreMeal[] {
  if (Array.isArray(payload)) {
    return payload
      .filter(isMealLike)
      .map((item, index) => normalizeMeal(item as Record<string, unknown>, index));
  }

  if (payload && typeof payload === "object") {
    const candidate = payload as Record<string, unknown>;
    const candidates: unknown[] = [];

    for (const key of ["meals", "items", "results", "data", "foods", "menu", "response", "payload", "content"]) {
      const value = candidate[key];
      if (Array.isArray(value)) {
        candidates.push(value);
      } else if (value && typeof value === "object") {
        const nested = value as Record<string, unknown>;
        const nestedItems = nested.items ?? nested.meals ?? nested.results ?? nested.data;
        if (Array.isArray(nestedItems)) {
          candidates.push(nestedItems);
        }
      }
    }

    for (const items of candidates) {
      if (Array.isArray(items)) {
        const meals = items.filter(isMealLike).map((item, index) => normalizeMeal(item as Record<string, unknown>, index));
        if (meals.length) {
          return meals;
        }
      }
    }
  }

  return [];
}

function buildQuery(params?: ExploreQueryParams) {
  const normalizedTag = params?.tag && params.tag !== "All" ? params.tag : undefined;
  const query: Record<string, string> = {};

  if (normalizedTag) {
    query.tag = normalizedTag;
    query.category = normalizedTag;
  }

  if (params?.search) {
    query.search = params.search;
  }

  return Object.keys(query).length ? query : undefined;
}

export const exploreService = {
  getMeals: async (params?: ExploreQueryParams) => {
    const query = buildQuery(params);

    for (const endpoint of ENDPOINTS) {
      try {
        const response = await axiosClient.get(endpoint, { params: query });
        const meals = extractMeals(response.data);

        if (meals.length) {
          return meals;
        }
      } catch (error) {
        console.warn(`Explore endpoint ${endpoint} failed`, error);
      }
    }

    return FALLBACK_MEALS;
  },
};
