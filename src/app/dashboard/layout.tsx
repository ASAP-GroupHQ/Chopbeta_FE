"use client";

import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/components/dashboard/LayoutWrapper";
import FoodSelectionStep from "@/components/onboarding/FoodSelectionStep";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth";
import { toast } from "react-toastify";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, updateUserData } = useAuth();

  // Onboarding System States
  const [onboardingStep, setOnboardingStep] = useState<
    "check" | "allergies" | "dislikes" | "complete"
  >("check");
  const [savedAllergies, setSavedAllergies] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      const hasNoPreferences =
        (!user.allergies || user.allergies.length === 0) &&
        (!user.disLikes || user.disLikes.length === 0);

      if (hasNoPreferences) {
        setOnboardingStep("allergies");
      } else {
        setOnboardingStep("complete");
      }
    }
  }, [user, isLoading]);

  const handleAllergiesComplete = (data: {
    selectedItems: string[];
    customText: string;
  }) => {
    let items = [...data.selectedItems].filter(
      (i) => i.toLowerCase() !== "others",
    );
    if (data.customText.trim()) {
      const customItems = data.customText
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      items = [...items, ...customItems];
    }
    setSavedAllergies(items);
    setOnboardingStep("dislikes");
  };

  const handleDislikesComplete = async (data: {
    selectedItems: string[];
    customText: string;
  }) => {
    let finalDislikes = [...data.selectedItems].filter(
      (i) => i.toLowerCase() !== "others",
    );
    if (data.customText.trim()) {
      const customItems = data.customText
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      finalDislikes = [...finalDislikes, ...customItems];
    }

    setIsSubmitting(true);
    try {
      await authService.addAllergiesAndDislikes({
        allergies: savedAllergies,
        dislikes: finalDislikes,
      });

      toast.success("Preferences updated successfully!");

      // Sync React Context and localStorage parameters
      updateUserData({
        allergies: savedAllergies,
        disLikes: finalDislikes,
      });

      setOnboardingStep("complete");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to save preferences. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isSubmitting) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <LoadingState message="Preparing your dashboard ecosystem..." />
      </div>
    );
  }

  // Intercept Viewport Step 1: Allergies Selection
  if (onboardingStep === "allergies") {
    return (
      <FoodSelectionStep
        type="allergies"
        onBack={() => setOnboardingStep("allergies")}
        onContinue={handleAllergiesComplete}
      />
    );
  }

  // Intercept Viewport Step 2: Dislikes Selection
  if (onboardingStep === "dislikes") {
    return (
      <FoodSelectionStep
        type="dislikes"
        onBack={() => setOnboardingStep("allergies")}
        onContinue={handleDislikesComplete}
      />
    );
  }

  // Render main core layout if preferences are present
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
