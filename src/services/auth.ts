import { apiClient } from "./api-client";
import {
  SignupData,
  LoginData,
  ResendOtpData,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ForgotPasswordResponse,
  ApiResponse,
  LogoutResponse,
  RegenerateTokenResponse,
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

<<<<<<< HEAD
  verifyOtp: async (data: { email: string; otp: string }) => {
=======
  verifyOtp: async (data: OtpVerificationData) => {
>>>>>>> 10f6d5935e61ce14a89220000f6da38a7598c211
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/verify-otp",
      data,
    );
    return response.data;
  },

<<<<<<< HEAD
  resendOtp: async (data: ResendOtpData) => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/user/resend-otp",
      data,
    );
=======
  resendOtp: async (data: { email?: string; phoneNumber?: string }) => {
    const response = await apiClient.post("/auth/user/resend-otp", data);
>>>>>>> 10f6d5935e61ce14a89220000f6da38a7598c211
    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "/auth/user/forgot-password",
      data,
    );
    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post<ResetPasswordResponse>(
      "/auth/user/reset-password",
      data,
    );
    return response.data;
  },

  addAllergiesAndDislikes: async (
    userId: string,
    data: {
      allergies: string[];
      dislikes: string[];
    },
  ) => {
    const response = await apiClient.post<ApiResponse>(
      `/auth/user/add-allergies/${userId}`,
      {
        allergies: data.allergies,
        disLikes: data.dislikes,
      },
    );
    return response.data;
  },

  regenerateToken: async (
    refreshToken: string,
  ): Promise<RegenerateTokenResponse> => {
    const response = await apiClient.post<RegenerateTokenResponse>(
      "/auth/user/regenerate-token",
      { refreshToken },
    );
    return response.data;
  },

  logoutUser: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>("/auth/user/logout");
    return response.data;
  },
};