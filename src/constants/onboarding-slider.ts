export interface OnboardingSlide {
  id: number;
  image: string;
  alt: string;
}

export const ALLERGIES_SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    image: "/images/onboarding/allergy-1.jpg",
    alt: "Healthy Meal Options",
  },
  {
    id: 2,
    image: "/images/onboarding/allergy-2.jpg",
    alt: "Fresh Salads and Bowls",
  },
  {
    id: 3,
    image: "/images/onboarding/dislike-2.jpg",
    alt: "Balanced Diet Options",
  },
  {
    id: 4,
    image: "/images/onboarding/dislike-1.jpg",
    alt: "Student Budget Preps",
  },
];

export const DISLIKES_SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    image: "/images/onboarding/dislike-2.jpg",
    alt: "Balanced Diet Options",
  },
  {
    id: 2,
    image: "/images/onboarding/dislike-1.jpg",
    alt: "Student Budget Preps",
  },

  {
    id: 3,
    image: "/images/onboarding/allergy-1.jpg",
    alt: "Healthy Meal Options",
  },
  {
    id: 4,
    image: "/images/onboarding/allergy-2.jpg",
    alt: "Fresh Salads and Bowls",
  },
];

export const ALLERGY_OPTIONS = [
  "Shellfish",
  "Milk",
  "Fish",
  "Nut",
  "Tree nuts",
  "Peanut",
  "Wheat",
  "Pasta",
  "Egg",
  "Palm oil",
  "Soybeans",
  "Corn",
  "None",
  "Others",
];

export const DISLIKE_OPTIONS = [
  "Shellfish",
  "Okra",
  "Beans",
  "Dry fish",
  "Ewedu",
  "beef",
  "Fish",
  "Nut",
  "ponmo",
  "Egg",
  "white rice",
  "pork",
  "Pap",
  "None",
  "Others",
];
