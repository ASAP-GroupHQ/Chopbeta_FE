export interface AdminUserRecord {
  _id: string;
  fullName: string;
  email: string;
  role?: string;
  phoneNumber?: string;
  username?: string;
  profilePicture?: string;
  avatar?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  lastActive?: string;
  isSuspended?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  handle: string;
  email: string;
  phone: string;
  profilePicture?: string;
  role: string;
  status: string;
  dateJoined: string;
  lastActive: string;
  gender?: string;
  stateOfOrigin?: string;
  LGA?: string;
  houseAddress?: string;
  countryOfResidence?: string;
  dateOfBirth?: string;
  allergies?: string[];
  disLikes?: string[];
  isVerified?: boolean;
  isKYCVerified?: boolean;
}

export interface AdminUserPage {
  users: AdminUser[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
}

export interface AdminUserSummary {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface UserEdits {
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  stateOfOrigin: string;
  LGA: string;
  houseAddress: string;
  countryOfResidence: string;
  dateOfBirth: string;
  allergies: string[];
  disLikes: string[];
}

export type UserDialogMode = "view" | "edit" | "activate" | "deactivate";
