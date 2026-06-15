// Signup Data
// Updated Signup Data to cleanly accept either identifier method
export interface SignupData {
  fullName: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

export interface OtpVerificationProps {
  identifier: string; // Dynamic field accepting either email or phone number
  type: "email" | "phoneNumber";
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
// export interface OtpVerificationData {
//   email: string;
//   otp: string;
// }

// Resend OTP Data
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

// Generic Server Response Shape (Axios automatically wraps this)
export interface ApiResponse<T = any> {
  status: string;
  message: string;
  data?: T;
  token?: string;
}
