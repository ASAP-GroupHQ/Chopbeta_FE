"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { LoginData, User } from "@/types/auth";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<User>;
  logout: () => void;
  updateUserData: (newData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse stored user data:", err);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginData): Promise<User> => {
    try {
      const response = await authService.studentLogin(credentials);

      // Safe extraction across typical backend API wrapping options
      const extractedToken =
        response?.token ||
        (response?.data as any)?.accessToken ||
        (response?.data as any)?.token;

      const rawUser = response?.data?.user || response?.data || response;

      if (!extractedToken) {
        throw new Error("Authorization token was not issued by the server.");
      }

      // Format user object clean
      const userData: User = {
        _id: rawUser._id || rawUser.id,
        fullName: rawUser.fullName || "",
        email: rawUser.email || "",
        role: rawUser.role || "user",
        isVerified: rawUser.isVerified ?? false,
        allergies: rawUser.allergies || [],
        disLikes: rawUser.disLikes || rawUser.dislikes || [],
        ...rawUser,
      };

      // Persist client state
      localStorage.setItem("token", extractedToken);
      if ((response?.data as any)?.refreshToken) {
        localStorage.setItem(
          "refreshToken",
          (response.data as any).refreshToken,
        );
      }
      localStorage.setItem("user", JSON.stringify(userData));

      // Set cookies for Next.js Middleware route guard
      document.cookie = `token=${extractedToken}; path=/; max-age=86400; SameSite=Lax;`;
      document.cookie = `role=${userData.role}; path=/; max-age=86400; SameSite=Lax;`;

      setToken(extractedToken);
      setUser(userData);

      return userData;
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials. Please try again.");
      throw error;
    }
  };

  const updateUserData = (newData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updated = { ...prevUser, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const logout = async () => {
    try {
      await authService.logoutUser();
    } catch (err: any) {
      console.error("Backend logout failed:", err.message || err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Clear cookies
      document.cookie = "token=; path=/; max-age=0; SameSite=Lax;";
      document.cookie = "role=; path=/; max-age=0; SameSite=Lax;";

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
