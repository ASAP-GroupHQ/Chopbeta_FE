import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:9700/api/v1",
  // timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically inject the token into every single request
apiClient.interceptors.request.use(
  (config) => {
    // Look for the token in localStorage
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

// Global Error Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";

    console.error("API Error:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  },
);
