"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { LoginData, User } from "@/types/auth";
import { useToast } from "@/context/ToastContext";
import { getUserProfile } from "@/services/settings";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<User>;
  logoutAllSessions: (email: string) => Promise<void>;
  refreshSession: (fallbackUser?: DataRecord) => Promise<User | null>;
  logout: () => Promise<void>;
  updateUserData: (newData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type DataRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is DataRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toRecord = (value: object): DataRecord =>
  Object.fromEntries(Object.entries(value));

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
};

const getRoleFromToken = (token: string | null): User["role"] | null => {
  if (!token) return null;

  try {
    // The claim is only a routing hint; API authorization remains server-side.
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;
    const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const claims: unknown = JSON.parse(
      window.atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")),
    );
    if (!isRecord(claims)) return null;
    return claims.role === "admin" || claims.role === "user"
      ? claims.role
      : null;
  } catch {
    return null;
  }
};

const getResponseToken = (response: unknown, key: string): string | null => {
  if (!isRecord(response)) return null;
  const data = isRecord(response.data) ? response.data : null;
  const nestedData = data && isRecord(data.data) ? data.data : null;
  const value = response[key] ?? data?.[key] ?? nestedData?.[key];

  return typeof value === "string" && value.length > 0 ? value : null;
};

const getResponseUser = (response: unknown): DataRecord => {
  if (!isRecord(response)) return {};
  const data = isRecord(response.data) ? response.data : null;
  const nestedData = data && isRecord(data.data) ? data.data : null;

  if (isRecord(response.user)) return response.user;
  if (data && isRecord(data.user)) return data.user;
  if (nestedData && isRecord(nestedData.user)) return nestedData.user;
  return nestedData ?? data ?? response;
};

const readStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    const parsed: unknown = JSON.parse(storedUser);
    return isRecord(parsed) ? normalizeUser(parsed, null) : null;
  } catch (error) {
    console.error("Failed to parse stored user data:", error);
    return null;
  }
};

const persistAccessToken = (accessToken: string) => {
  localStorage.setItem("token", accessToken);
  document.cookie = `token=${encodeURIComponent(accessToken)}; path=/; max-age=86400; SameSite=Lax;`;
};

const clearClientSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax;";
  document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax;";
  document.cookie = "role=; path=/; max-age=0; SameSite=Lax;";
};

const normalizeUser = (profile: object, fallback: object | null): User => {
  const user = {
    ...(fallback ? toRecord(fallback) : {}),
    ...toRecord(profile),
  };
  const fullName = user.fullName;
  const email = user.email;
  const role = user.role;

  const userData: User = {
    ...user,
    _id:
      (typeof user._id === "string" && user._id) ||
      (typeof user.id === "string" && user.id) ||
      "",
    fullName: typeof fullName === "string" ? fullName : "",
    email: typeof email === "string" ? email : "",
    role: role === "admin" ? "admin" : "user",
    isVerified: typeof user.isVerified === "boolean" ? user.isVerified : true,
    allergies: Array.isArray(user.allergies) ? user.allergies : [],
    disLikes: Array.isArray(user.disLikes)
      ? user.disLikes
      : Array.isArray(user.dislikes)
        ? user.dislikes
        : [],
  };
  return userData;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshSession = useCallback(
    async (fallbackUser?: DataRecord): Promise<User | null> => {
      setIsLoading(true);
      try {
        const cachedUser = readStoredUser();
        const accessToken =
          readCookie("accessToken") ||
          readCookie("token") ||
          localStorage.getItem("token");

        if (accessToken) {
          persistAccessToken(accessToken);
          setToken(accessToken);
        }

        const response = await getUserProfile();
        const roleHint = getRoleFromToken(accessToken);
        const sessionFallback = fallbackUser ?? cachedUser;
        const userData = normalizeUser(
          response.data,
          roleHint
            ? { ...(sessionFallback ?? {}), role: roleHint }
            : sessionFallback,
        );
        localStorage.setItem("user", JSON.stringify(userData));
        document.cookie = `role=${encodeURIComponent(userData.role)}; path=/; max-age=86400; SameSite=Lax;`;
        setUser(userData);
        setToken(accessToken);
        return userData;
      } catch (error: any) {
        setUser(null);
        if (error.response?.status === 401) {
          clearClientSession();
          setToken(null);
          return null;
        }

        console.error("Failed to verify the current user session:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void refreshSession().catch(() => undefined);
  }, [refreshSession]);

  const login = useCallback(
    async (credentials: LoginData): Promise<User> => {
      try {
        const response = await authService.studentLogin(credentials);
        const accessToken =
          getResponseToken(response, "accessToken") ??
          getResponseToken(response, "token") ??
          readCookie("accessToken");
        const refreshToken = getResponseToken(response, "refreshToken");

        if (accessToken) {
          persistAccessToken(accessToken);
          setToken(accessToken);
        }
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

        const profile = await refreshSession(getResponseUser(response));
        if (!profile) {
          throw new Error("The server could not verify your login.");
        }

        return profile;
      } catch (error: any) {
        if (error.response?.status !== 403) {
          toast.error(error.message || "Invalid credentials. Please try again.");
        }
        throw error;
      }
    },
    [refreshSession, toast],
  );

  const logoutAllSessions = useCallback(async (email: string) => {
    await authService.logoutAllSessions(email);
    clearClientSession();
    setToken(null);
    setUser(null);
  }, []);

  const updateUserData = useCallback((newData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updated = { ...prevUser, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const logout = useCallback(async () => {
    let logoutError: unknown = null;
    try {
      await authService.logoutUser();
    } catch (error) {
      logoutError = error;
      console.error("Backend logout failed:", error);
    } finally {
      clearClientSession();
      setToken(null);
      setUser(null);
      router.replace("/login");
    }

    if (logoutError) {
      toast.error(
        "You were logged out on this device, but the server session could not be revoked.",
      );
    } else {
      toast.success("Logged out successfully");
    }
  }, [router, toast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logoutAllSessions,
        refreshSession,
        logout,
        updateUserData,
      }}
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
