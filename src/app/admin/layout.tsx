"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/ui/LoadingState";
import { useAuth } from "@/context/AuthContext";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
    } else if (user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [isLoading, router, user]);

  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <LoadingState message="Verifying admin credentials..." />
      </div>
    );
  }

  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
