"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/components/dashboard/LayoutWrapper";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/login");
    else if (user.role === "admin") router.replace("/admin/dashboard");
  }, [isLoading, router, user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <LoadingState message="Preparing your dashboard ecosystem..." />
      </div>
    );
  }

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
