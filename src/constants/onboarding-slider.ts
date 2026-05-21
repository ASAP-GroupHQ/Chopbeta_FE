export interface OnboardingSlide {
  id: number;
  image: string;
  alt: string;
}

export const ALLERGIES_SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    image: "/images/onboarding/allergie-1.png",
    alt: "Healthy Meal Options",
  },
  {
    id: 2,
    image: "/images/onboarding/allergie-2.png",
    alt: "Fresh Salads and Bowls",
  },
  {
    id: 3,
    image: "/images/onboarding/dislike-2.png",
    alt: "Balanced Diet Options",
  },
  {
    id: 4,
    image: "/images/onboarding/dislike-1.png",
    alt: "Student Budget Preps",
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
