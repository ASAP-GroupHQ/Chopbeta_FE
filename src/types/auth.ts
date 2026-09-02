export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  allergies?: string[];
  disLikes?: string[];
  isSuspended?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

// Signup Data
export interface SignupData {
  fullName: string;
  email: string;
  password?: string;
}

export interface OtpVerificationProps {
  identifier: string;
  initialOtp?: string;
  onBackToSignup: () => void;
  onVerifySuccess: (response: any) => void;
}

// Login Data
export interface LoginData {
  email: string;
  password: string;
}

// OTP Verification Data
export interface OtpVerificationData {
  email?: string;
  phoneNumber?: string;
  otp: string;
}

export interface ResendOtpData {
  email: string;
}

// Add Allergies and Dislikes Data
export interface AddAllergiesData {
  allergies: string[];
  dislikes: string[];
}

export interface RegenerateTokenRequest {
  refreshToken: string;
}

export interface RegenerateTokenResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// Generic Server Response Shape
export interface ApiResponse<T = any> {
  status?: string;
  success?: boolean;
  message: string;
  data?: T;
  token?: string;
}
