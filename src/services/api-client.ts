import axios, { type InternalAxiosRequestConfig } from "axios";
import { authService } from "./auth";

type AuthRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _skipAuthorization?: boolean;
};

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null;
};

const extractAccessToken = (response: unknown): string | null => {
  if (typeof response !== "object" || response === null) return null;
  const data = (response as { data?: unknown }).data;
  if (typeof data !== "object" || data === null) return null;
  const payload = (data as { data?: unknown }).data;
  const accessToken = (data as { accessToken?: unknown }).accessToken;
  const nestedAccessToken =
    typeof payload === "object" && payload !== null
      ? (payload as { accessToken?: unknown }).accessToken
      : undefined;
  const value = accessToken ?? nestedAccessToken;

  return typeof value === "string" && value.length > 0 ? value : null;
};

const clearClientSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax;";
  document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax;";
  document.cookie = "role=; path=/; max-age=0; SameSite=Lax;";
};

const publicAuthPaths = [
  "/auth/user/login",
  "/auth/user/signup",
  "/auth/user/verify-otp",
  "/auth/user/resend-otp",
  "/auth/user/forgot-password",
  "/auth/user/reset-password",
];

export const apiClient = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const request = config as AuthRequestConfig;
    const token =
      typeof window !== "undefined"
        ? readCookie("accessToken") ||
          localStorage.getItem("token") ||
          readCookie("token")
        : null;

    if (request._skipAuthorization) return config;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AuthRequestConfig | undefined;
    const isRefreshRequest = originalRequest?.url?.includes(
      "/auth/user/regenerate-token",
    );
    const isPublicAuthRequest = publicAuthPaths.some((path) =>
      originalRequest?.url?.includes(path),
    );

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest &&
      !isPublicAuthRequest
    ) {
      originalRequest._retry = true;
      const hadSession = Boolean(
        typeof window !== "undefined" &&
          (localStorage.getItem("token") ||
            localStorage.getItem("refreshToken") ||
            readCookie("accessToken") ||
            readCookie("token")),
      );

      try {
        const storedRefreshToken =
          typeof window !== "undefined"
            ? localStorage.getItem("refreshToken") ?? undefined
            : undefined;
        const refreshResponse =
          await authService.regenerateToken(storedRefreshToken);
        const newAccessToken =
          extractAccessToken(refreshResponse) ||
          readCookie("accessToken") ||
          readCookie("token");

        if (newAccessToken) {
          localStorage.setItem("token", newAccessToken);
          document.cookie = `token=${encodeURIComponent(newAccessToken)}; path=/; max-age=86400; SameSite=Lax;`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          originalRequest._skipAuthorization = true;
          delete originalRequest.headers.Authorization;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh sequence failed:", refreshError);
        if (typeof window !== "undefined" && hadSession) {
          clearClientSession();
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";

    console.error("API Error:", errorMessage);
    error.message = errorMessage;
    return Promise.reject(error);
  },
);
