// Signup Data
export interface SignupData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// Login Data
export interface LoginData {
  email: string;
  password: string;
}

// OTP Verification Data
export interface OtpVerificationData {
  email: string;
  otp: string;
}

// Resend OTP Data
export interface ResendOtpData {
  email: string;
}

// New: Reset Password Data
export interface ResetPasswordData {
  email: string;
  otp: string;          
  newPassword: string;
}

// Add Allergies and Dislikes Data
export interface AddAllergiesData {
  allergies: string[];
  dislikes: string[];
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