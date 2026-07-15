"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { LoginData } from "@/types/auth";
import { toast } from "react-toastify";

interface AuthContextType {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
  updateUserData: (newData: Partial<any>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (credentials: LoginData) => {
    try {
      const response = await authService.studentLogin(credentials);

      // response is ApiResponse with { status, message, data?, token? }
      const extractedToken =
        response?.token || (response?.data as any)?.accessToken;
      const userData = response?.data || response;

      if (!extractedToken) {
        throw new Error("Authorization token was not issued by the server.");
      }

      // Storing locally for persistent client context
      localStorage.setItem("token", extractedToken);
      if ((response?.data as any)?.refreshToken) {
        localStorage.setItem("refreshToken", (response.data as any).refreshToken);
      }
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
      }

      // Setting the HTTP cookie for your proxy.ts Edge middleware route guard
      document.cookie = `token=${extractedToken}; path=/; max-age=86400; SameSite=Lax;`;

      setToken(extractedToken);
      setUser(userData || {});
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials. Please try again.");
      throw error;
    }
  };

  // Dynamically sync fields after completing taste preferences
  const updateUserData = (newData: Partial<any>) => {
    setUser((prevUser: any) => {
      const updated = { ...prevUser, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = async () => {
    try {
      await authService.logoutUser();
    } catch (err: any) {
      console.error("Backend logout failed to register:", err.message || err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Clear Next.js cookies
      document.cookie = "token=; path=/; max-age=0; SameSite=Lax;";

      setToken(null);
      setUser(null);

      toast.success("Logged out successfully");
      router.replace("/login");
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be mounted inside an AuthProvider");
  return context;
};
