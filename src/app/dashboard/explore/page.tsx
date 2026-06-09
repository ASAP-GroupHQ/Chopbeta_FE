"use client";

import ExploreHeader from "@/components/dashboard/explore/ExploreHeader";
import FilterTags from "@/components/dashboard/explore/FilterTags";
import MealCard from "@/components/dashboard/explore/MealCard";

type Meal = {
  id: number;
  title: string;
  desc: string;
  price: number;
  calories: number;
  img: string;
};

const MEALS: Meal[] = [
  {
    id: 1,
    title: "Jollof Rice",
    desc: "Classic party-style jollof",
    price: 800,
    calories: 420,
    img: "/images/meals/jollof.jpg",
  },
  {
    id: 2,
    title: "Egusi Soup + Eba",
    desc: "Thick melon seed soup with eba",
    price: 950,
    calories: 510,
    img: "/images/meals/egusi.jpg",
  },
  {
    id: 3,
    title: "Beans & Plantain",
    desc: "Honey beans with fried plantain",
    price: 650,
    calories: 380,
    img: "/images/meals/beans.jpg",
  },
  {
    id: 4,
    title: "Fried Rice",
    desc: "Nigerian-style fried rice",
    price: 900,
    calories: 450,
    img: "/images/meals/fried-rice.jpg",
  },
  {
    id: 5,
    title: "Pepper Soup",
    desc: "Spicy goat meat pepper soup",
    price: 1100,
    calories: 290,
    img: "/images/meals/pepper-soup.jpg",
  },
  {
    id: 6,
    title: "Puff Puff",
    desc: "Golden fried dough balls",
    price: 200,
    calories: 180,
    img: "/images/meals/puff-puff.jpg",
  },
  {
    id: 7,
    title: "Ofada Rice + Stew",
    desc: "Local Ofada rice with designer stew",
    price: 1000,
    calories: 480,
    img: "/images/meals/ofada.jpg",
  },
  {
    id: 8,
    title: "Vegetable Soup",
    desc: "Efo riro with assorted protein",
    price: 850,
    calories: 320,
    img: "/images/meals/vegetable.jpg",
  },
];

export default function ExplorePage() {
  return (
    <main className="flex-1 p-8">
      <ExploreHeader />
      <FilterTags />

      <div className="mt-6 text-sm font-medium text-gray-500">
        {MEALS.length} meals found
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {MEALS.map((meal) => (
          <MealCard
            key={meal.id}
            id={meal.id}
            title={meal.title}
            desc={meal.desc}
            price={meal.price}
            calories={meal.calories}
            img={meal.img}
          />
        ))}
      </div>
    </main>
  );
}
