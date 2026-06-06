"use client";

import React, { useState, useEffect } from "react";
import LayoutWrapper from "@/components/dashboard/LayoutWrapper";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <LoadingState message="Preparing your dashboard ecosystem..." />
      </div>
    );
  }

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
