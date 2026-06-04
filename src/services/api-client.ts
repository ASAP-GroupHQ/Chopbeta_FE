import axios from "axios";
import { authService } from "./auth";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:9700/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically inject the token into every single request
apiClient.interceptors.request.use(
  (config) => {
    // Look for the token in localStorage safely in Next.js SSR environment
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Global Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized and ensure we aren't looping endlessly
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken =
          typeof window !== "undefined"
            ? localStorage.getItem("refreshToken")
            : null;

        if (!storedRefreshToken) {
          if (typeof window !== "undefined") {
            localStorage.clear();
            document.cookie = "token=; path=/; max-age=0; SameSite=Lax;";
            window.location.href = "/login";
          }
          return Promise.reject(
            new Error("Session expired. Please log in again."),
          );
        }

        // Hit the regenerate token endpoint
        const refreshResponse =
          await authService.regenerateToken(storedRefreshToken);
        const newAccessToken = refreshResponse?.data?.accessToken;

        if (newAccessToken) {
          // Save fresh access token copies
          localStorage.setItem("token", newAccessToken);
          document.cookie = `token=${newAccessToken}; path=/; max-age=86400; SameSite=Lax;`;

          // Override header and retry original failed execution request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh sequence failed:", refreshError);

        if (typeof window !== "undefined") {
          localStorage.clear();
          document.cookie = "token=; path=/; max-age=0; SameSite=Lax;";
          window.location.href = "/login";
        }
        return Promise.reject(
          new Error("Session expired. Please log in again."),
        );
      }
    }

    // Fallback global custom error message
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";

    console.error("API Error:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  },
);
