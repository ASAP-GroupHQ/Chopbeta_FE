import { apiClient } from "./api-client";
import {
  SignupData,
  LoginData,
  OtpVerificationData,
  ResendOtpData,
  ResetPasswordData,
  ApiResponse,
  LogoutResponse,
} from "@/types/auth";

export const authService = {
  studentSignup: async (data: SignupData) => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/signup",
      data,
    );
    return response.data;
  },

  studentLogin: async (data: LoginData) => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/login",
      data,
    );
    return response.data;
  },

  verifyOtp: async (data: OtpVerificationData) => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/verify-otp",
      data,
    );
    return response.data;
  },

  resendOtp: async (data: ResendOtpData) => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/resend-otp",
      data,
    );
    return response.data;
  },

  forgotPassword: async (data: ResendOtpData) => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/forgot-password",
      data,
    );
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/reset-password",
      data,
    );
    return response.data;
  },

  addAllergiesAndDislikes: async (data: {
    allergies: string[];
    dislikes: string[];
  }) => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/add-allergies",
      data,
    );
    return response.data;
  },

  logoutUser: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>("/auth/user/logout");
    return response.data;
  },
};

// OAuth Configurations
export const googleOAuthConfig = {
  google: `${apiClient.defaults.baseURL}/auth/google`,
};
